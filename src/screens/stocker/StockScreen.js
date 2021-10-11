import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { HEIGHT, WIDTH } from '../../constants/constants';

const StockScreen = ({navigation})=>{

    const stock = [
        {
            mid: 1,
            name: 'ciment',
            qauntity: 25,
            unityPrice: 100000,
            activity: 'roof'
        },
        {
            mid: 2,
            name: 'ferabe',
            qauntity: 25,
            unityPrice: 100000,
            activity: 'roof'
        },
        {
            mid: 3,
            name: 'sss',
            qauntity: 25,
            unityPrice: 100000,
            activity: 'roof'
        },
        {
            mid: 4,
            name: 'bbbb',
            qauntity: 25,
            unityPrice: 100000,
            activity: 'roof'
        }
    ]
    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.headerTitleText}>mid</Text>
                <Text style = {styles.headerTitleText}>m name</Text>
                <Text style = {styles.headerTitleText}>Qua</Text>
                <Text style = {styles.headerTitleText}>U price</Text>
            </View>
            <FlatList
                data = {stock}
                keyExtractor = {stock => stock.name} 
                renderItem = {({index, item})=>{
                    return (
                        <View>
                            <View style = {styles.row}>
                                <Text style = {{fontWeight: 'bold'}}>{item.mid}</Text>
                                <Text style = {{fontWeight: 'bold'}}>{item.name}</Text>
                                <Text>{item.qauntity}</Text>
                                <Text>{item.unityPrice} Rwf</Text>
                            </View>
                        </View>
                       
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header:{
        marginTop: HEIGHT * .05,
        width: WIDTH - 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#c5d9c7',

    },
    headerTitleText:{
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    row:{
        flexDirection: 'row',
        backgroundColor: '#c5d9c7',
        width: WIDTH -60,
        marginTop: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 5,
        flex: 1
    }
});

export default StockScreen;