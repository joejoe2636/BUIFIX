import React, { useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { APP_COLOR, WIDTH } from '../../constants/constants';
import { MaterialIcons, Entypo, Ionicons   } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheet } from 'react-native-btr';
import buifixApi from '../../api/buifixApi';
import { Context as AuthContext } from '../../contexts/ApplicationContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';


const fetchAllEmployee = async(token, setEmployees, setShowActivityIndicator)=>{
    try {
        setShowActivityIndicator(true);
        const response = await buifixApi.get('/users/wage/employees',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        const {status, message, numberOfEmployees, employees} = response.data;

        if(status === 200){
            setEmployees(employees)
            setShowActivityIndicator(false)
        }

    } catch (error) {
        setShowActivityIndicator(false);
    }
}

const PaymentScreen = ({navigation})=>{

    const [showActivityIndicator, setShowActivityIndicator] = useState(false)
    const [Employees, setEmployees] = useState([]);

    const { state } = useContext(AuthContext);
    const { token } = state;

    useEffect(()=>{
        fetchAllEmployee(token, setEmployees, setShowActivityIndicator);
    }, [])


    return(
        <View style={{marginTop: 50, flex: 1}}>

            <TouchableOpacity
                onPress={()=>navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={30} color={APP_COLOR} style={{marginLeft: 10}} />
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 25, alignSelf: 'center', color:APP_COLOR}}>Employee Payments</Text>

            <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: WIDTH -15, paddingHorizontal: 10, alignSelf: 'center', backgroundColor: APP_COLOR, height: 40, borderRadius: 10}}>
                <Text style={{color: '#fff', fontSize: 18}}>National Id</Text>
                <Text style={{color: '#fff', fontSize: 18}}>Names</Text>
                <Text style={{color: '#fff', fontSize: 18}}>Action</Text>
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
                                <View style ={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 60}}>
                                    <TouchableOpacity>
                                        <MaterialIcons name="cancel" size={24} color="red" />
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Entypo name="check" size={24} color={APP_COLOR} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>

            <BottomSheet visible = {showActivityIndicator}>
                <AppActivityIndictor/>
            </BottomSheet>
        </View>
    );
};


const styles = StyleSheet.create({})

export default PaymentScreen;