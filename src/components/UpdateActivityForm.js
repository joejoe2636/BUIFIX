import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT } from '../constants/constants';
import { ScrollView } from 'react-native-gesture-handler';


const UpdateActivityForm = ({ cleanForm, expenses, addExpenses, changeFormVisiblity})=>{

    return(
        <ScrollView>
            <View style = {styles.activity_form}>
                <View style = {{width: '90%'}}>

                    <TextInput 
                        style={{borderBottomColor: 'grey', borderBottomWidth: .5, fontSize: 20, marginVertical: 50}}
                        placeholder = "New Expenses"
                        value={expenses}
                        autoCorrect = {true}
                        keyboardType = "decimal-pad"
                        onChangeText = {(expenses)=> addExpenses(expenses)}
                    />
                </View>

                <View style = {styles.activity_btn_group}>
                    <TouchableOpacity 
                        onPress = {()=>{
                            cleanForm();
                            changeFormVisiblity(false);
                        }}
                        style={{backgroundColor: 'red', borderRadius: 5, alignItems: 'center', justifyContent: 'center',  width: 80, height: 40}}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress = {()=>{
                            cleanForm();
                            changeFormVisiblity(false);
                        }}
                        style={{backgroundColor: APP_COLOR, borderRadius: 5, alignItems: 'center', justifyContent: 'center',  width: 80, height: 40}}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    activity_form:{
        backgroundColor: '#fff',
        height: 200,
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

export {UpdateActivityForm}