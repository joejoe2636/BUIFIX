import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { HEIGHT, WIDTH } from '../../constants/constants';
import { MaterialForm } from '../../components/MaterialForm';
import { BottomSheet } from 'react-native-btr';
import { stock } from '../../api/buifixApi';

const StockScreen = ()=>{

    const [materialId, setMaterialId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [action, setAction] = useState('');
    const [materialFormVisibility, setMaterialFormVisibility] = useState(false);


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
                        <TouchableOpacity
                            onPress = {()=>{
                                setAction("Export")
                                setMaterialId(item.mid)
                                setQuantity(item.qauntity)
                                setMaterialFormVisibility(true);
                            }}
                        >
                            <View style = {styles.row}>
                                <Text style = {{fontWeight: 'bold'}}>{item.mid}</Text>
                                <Text style = {{fontWeight: 'bold'}}>{item.name}</Text>
                                <Text>{item.qauntity}</Text>
                                <Text>{item.unityPrice} Rwf</Text>
                            </View>
                        </TouchableOpacity>
                       
                    )
                }}
            />

            <BottomSheet visible = {materialFormVisibility}>
                <MaterialForm
                    cleanForm = {()=>cleanMaterialForm()}
                    materialId = {materialId}
                    quantity = {quantity}
                    setMaterialId = {(mid)=> setMaterialId(mid) }
                    setQuantity = {(quantity)=> setQuantity(quantity) }
                    action = {action}
                    changeFormVisiblity = {(value) =>setMaterialFormVisibility(value)}
                />
            </BottomSheet>
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