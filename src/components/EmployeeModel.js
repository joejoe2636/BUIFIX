import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { HEIGHT, WIDTH } from '../constants/constants';
const HEIGHT_MODEL = 150;

const EmployeeModel = ({changeModelVisible, setOption})=>{

    const closeModel = (bool, option)=>{
        changeModelVisible(bool)
        setOption(option)
    }
    return(
        <TouchableOpacity
            disabled = {true}
            style = {styles.container}
        >
            <View style={styles.model}>
                <View>
                    <TextInput 
                        placeholder = "Material Id"
                        autoCapitalize = "none"
                        keyboardType = "number-pad"
                        style = {{backgroundColor: 'pink'}}
                        height = {40}
                    />
                </View>
                <View style = {styles.buttonView}>
                    <TouchableOpacity
                        style = {styles.touchableOpacity}
                        onPress = {()=> {
                            closeModel(false, 'Cancel')
                        }}
                    >

                        <Text
                            style = {[styles.text, {color: 'blue'}]}
                        >Cancel</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.touchableOpacity}
                        onPress = {()=> closeModel(false, 'Ok')}
                    >

                        <Text
                            style = {[styles.text, {color: 'blue'}]}
                        >Ok</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    model:{
        height: HEIGHT_MODEL,
        width: WIDTH -80,
        paddingTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    textView:{
        flex: 1,
        alignItems: 'center'
    },
    text:{
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonView:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    touchableOpacity:{
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center'
    }
});

export default EmployeeModel;