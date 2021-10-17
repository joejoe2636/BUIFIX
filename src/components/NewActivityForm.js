import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT } from '../constants/constants';
import { ScrollView } from 'react-native-gesture-handler';


const NewActivityForm = ({ cleanForm, activityName, setActivityName, activityBudget, setActivityBudget, changeFormVisiblity})=>{

    return(
        <ScrollView>
            <View style = {styles.activity_form}>
                <View style = {{width: '90%'}}>
                    <TextInput 
                        style={{borderBottomColor: 'grey', borderBottomWidth: .5, fontSize: 18, marginTop: 50}}
                        placeholder = "Activity Name"
                        value={activityName}
                        autoCorrect = {true}
                        onChangeText = {(name)=> setActivityName(name)}
                    />

                    <TextInput 
                        style={{borderBottomColor: 'grey', borderBottomWidth: .5, fontSize: 20, marginVertical: 50}}
                        placeholder = "Budget"
                        value={activityBudget}
                        autoCorrect = {true}
                        keyboardType = "number-pad"
                        onChangeText = {(budget)=> setActivityBudget(budget)}
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

export {NewActivityForm}