import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {  aboutUsText, APP_COLOR, HEIGHT } from '../constants/constants';

export const AboutUs = ({changeVisibility})=>{
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style = {{flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                    <TouchableOpacity
                        onPress = {changeVisibility}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" style={{width: 50, height: 40}} />
                    </TouchableOpacity>

                    <Text style = {{fontSize: 25, fontWeight: 'bold', width: '70%'}}>About Us</Text>
                </View>
                
                <View style = {{with: '90%', marginHorizontal: 20}}>
                    <Text>{aboutUsText}</Text>
                </View>                                             

            </View>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingTop: HEIGHT * .05,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})