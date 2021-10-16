import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { APP_COLOR, WIDTH } from '../../constants/constants';


const Employees = [
    {
        names: 'Emmanuel NTIVUGURUZWA',
        nid: '11998800616325',
        wage: 20000
    },
    {
        names: 'Michel DUKUZUMUREMYI',
        nid: '11998800616326',
        wage: 20000
    },
    {
        names: 'Rabah SIGENIYO',
        nid: '11998800616327',
        wage: 20000
    },
    {
        names: 'RUKUNDO Jean',
        nid: '11998800616328',
        wage: 20000
    }
]


const EmployeeScreen = ({navigation})=>{
    return(
        <View style={{marginTop: 50, flex: 1}}>

            <Text style={{fontWeight: 'bold', fontSize: 25, alignSelf: 'center', color:APP_COLOR}}>Wage Employee List</Text>

            <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: WIDTH -15, paddingHorizontal: 10, alignSelf: 'center', backgroundColor: APP_COLOR, height: 40, borderRadius: 10}}>
                <Text style={{color: '#fff', fontSize: 18}}>National Id</Text>
                <Text style={{color: '#fff', fontSize: 18}}>Names</Text>
                <Text style={{color: '#fff', fontSize: 18}}>Wage</Text>
            </View>
            <View>
                <FlatList
                    data = {Employees}
                    keyExtractor = {employee => employee.nid}
                    renderItem = {({item, index})=>{
                        return(
                            <View style = {{justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: .5, borderBottomColor: 'grey', backgroundColor: index % 2 ===0 ? 'pink': null, marginTop: 15, alignSelf: 'center', width: WIDTH -10}}>
                                <Text style={{fontSize: 16}}>{item.nid}</Text>
                                <Text>{item.names}</Text>
                                <Text>{item.wage}</Text>
                            </View>
                        )
                    }}
                />
            </View>

        </View>
    );
};


const styles = StyleSheet.create({})

export default EmployeeScreen;