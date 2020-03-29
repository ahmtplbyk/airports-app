import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Dimensions, Platform, Text } from 'react-native';


let TouchableCmp = TouchableOpacity;

if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
}
const Card = ({ name, city, iata }) => (
    <TouchableCmp >
        <View style={{
            borderWidth: 0.5,
            borderColor: 'white',
            height: 30,
            marginHorizontal: 10,
            marginVertical: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            flexDirection: 'row',
            flex: 1
        }}>
            <View style={{paddingHorizontal:10}}>
                <Text numberOfLines={1} style={styles.name}>{name}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                <Text numberOfLines={1} style={styles.city}>{city}</Text>
                <Text numberOfLines={1} style={styles.iata}> {iata}</Text>
            </View>

        </View>
    </TouchableCmp>
);
export default Card;

const styles = StyleSheet.create({
    searchContainer: {
    },
    name: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        maxHeight: 20,
        maxWidth: Dimensions.get('window').width - 150,
    },
    city: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        maxHeight: 20,
        maxWidth: Dimensions.get('window').width/5 - 12,
    },
    iata: {
        color: 'grey',
        fontSize: 14,
        textAlign: 'center',
        maxHeight: 20,
        maxWidth: Dimensions.get('window').width/5 - 12,
    }
});