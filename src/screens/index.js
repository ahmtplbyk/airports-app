import React, { Component } from 'react';
import { SafeAreaView, FlatList, StyleSheet, TextInput, View } from 'react-native';
import Card from '../components/Card';
import airports from '../data/airports.json';
var result = [];
for (var i in airports) {
    result.push(airports[i]);
}

export default class Home extends Component {
    state = {
        goingText: '',
        comingText: '',
        airportResultsGoing: '',
        airportResultsComing: '',
    }
    constructor(props) {
        super(props);
    }
    filterGoing = goingText => {
        const newData = result.filter(item => {
            const listItemName = `${item.name.toLowerCase()}`;
            const listItemCity = `${item.city.toLowerCase()}`;
            let listItemiata = ``;
            if (item.iata) {
                listItemiata = `${item.iata.toLowerCase()}`;
            }

            return (listItemName.indexOf(goingText.toLowerCase()) > -1 || listItemCity.indexOf(goingText.toLowerCase()) > -1 || listItemiata.indexOf(goingText.toLowerCase()) > -1);
        });
        if (goingText === '') {
            this.setState({
                airportResultsGoing: '',
            });
        }
        else {
            this.setState({
                airportResultsGoing: newData,
            });
        }
    };
    filterComing = comingText => {
        const newData = result.filter(item => {
            const listItemName = `${item.name.toLowerCase()}`;
            return listItemName.indexOf(comingText.toLowerCase()) > -1;
        });
        if (comingText === '') {

            this.setState({
                airportResultsComing: '',
            });
        }
        else {
            this.setState({
                airportResultsComing: newData,
            });
        }
    };
    headerGoing = () => {
        const { goingText } = this.state;
        return (
            <View style={styles.searchContainer}>
                <TextInput placeholder={"Gidiş Yeri..."} style={styles.searchInput} value={goingText} onChangeText={goingText => {
                    this.setState({
                        goingText,
                    });
                    this.filterGoing(goingText);
                }
                } />
            </View>)
    };
    headerComing = () => {
        const { comingText } = this.state;
        return (
            <View style={styles.searchContainer}>
                <TextInput placeholder={"Varış Yeri..."} style={styles.searchInput} value={comingText} onChangeText={comingText => {
                    this.setState({
                        comingText,
                    });
                    this.filterComing(comingText);
                }
                } />
            </View>)
    };
    getData = () => {
        console.log(result);

    };

    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#187bcd',
            }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        ListHeaderComponent={this.headerGoing()}
                        data={this.state.airportResultsGoing}
                        numColumns={1}
                        keyExtractor={(item) => item.icao}
                        renderItem={({ item }) => <Card name={item.name} city={item.city} iata={item.iata} />}
                    />
                    <FlatList
                        ListHeaderComponent={this.headerComing()}
                        data={this.state.airportResultsComing}
                        numColumns={1}
                        keyExtractor={(item) => item.icao}
                        renderItem={({ item }) => <Card name={item.name} />}
                    />
                </View>
                <View style={{ flex: 2 }}>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    searchInput: {
        fontSize: 16,
        padding: 10,
        flex: 1
    },
    searchContainer: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    searchIcon: {
        padding: 5
    },
});