import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT } from '../constants/constants';
import { ScrollView } from 'react-native-gesture-handler';


const MaterialForm = ({cleanForm, materialId, setMaterialId, quantity, setQuantity, action, changeFormVisiblity})=>{

    return(
        <ScrollView>
            <View style = {styles.activity_form}>
                <View style = {{width: '90%'}}>
                    <TextInput 
                        style={{borderBottomColor: 'grey', borderBottomWidth: .5, fontSize: 18, marginTop: 50}}
                        placeholder = "Material Id"
                        value={materialId}
                        autoCorrect = {false}
                        keyboardType = "decimal-pad"
                        onChangeText = {setMaterialId}
                    />

                    <TextInput 
                        style={{borderBottomColor: 'grey', borderBottomWidth: .5, fontSize: 20, marginVertical: 50}}
                        placeholder = "Quantity"
                        value={quantity}
                        autoCorrect = {false}
                        keyboardType = "number-pad"
                        onChangeText = {setQuantity}
                    />
                </View>

                <View style = {styles.activity_btn_group}>
                    <TouchableOpacity 
                        onPress = {()=>{
                            cleanForm;
                            changeFormVisiblity(false);
                        }}
                        style={{backgroundColor: 'red', borderRadius: 5, alignItems: 'center', justifyContent: 'center',  width: 80, height: 40}}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress = {()=>{
                            cleanForm;
                            changeFormVisiblity(false);
                        }}
                        style={{backgroundColor: APP_COLOR, borderRadius: 5, alignItems: 'center', justifyContent: 'center',  width: 80, height: 40}}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>{action}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    activity_form:{
        backgroundColor: '#fff',
        height: 300,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: HEIGHT * 0.3,
        alignItems: 'center'
    },
    activity_btn_group:{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    }
})

export {MaterialForm}