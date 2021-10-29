import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { APP_COLOR, WIDTH } from '../../constants/constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';
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

const deleteEmployee = async(token, nid, setShowActivityIndicator)=>{
    try {
        setShowActivityIndicator(true);
        const response = await buifixApi.delete(`/users/wage_employee/${nid}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        setShowActivityIndicator(false);
    } catch (error) {
        setShowActivityIndicator(false);
    }
}

const EmployeeScreen = ({navigation, route})=>{

    const [showActivityIndicator, setShowActivityIndicator] = useState(false)
    const { state } = useContext(AuthContext);
    const { token } = state;
    const { action } = route.params

    useEffect(()=>{
        fetchAllEmployee(token, setEmployees, setShowActivityIndicator)
    }, [])

    const [Employees, setEmployees] = useState([]);
    const [searchKey, setSearch ] = useState('');


    return(
        <View style={{marginTop: 50, flex: 1}}>
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={30} color={APP_COLOR} style={{marginLeft: 10}} />
            </TouchableOpacity>

            <Text style={{fontWeight: 'bold', fontSize: 25, alignSelf: 'center', color:APP_COLOR}}>Wage Employee List</Text>

            <View>
                <TextInput
                    style = {{borderColor: 'grey', borderWidth: .5, marginHorizontal: 20, borderRadius: 10, padding: 7, fontSize: 18, color: 'grey', fontWeight: 'bold', marginTop: 10}}
                    placeholder = "Search"
                    value = {searchKey}
                    keyboardType = "number-pad"
                    onChangeText = {(key)=>{
                        setSearch(key)

                        const temp = Employees.filter((employee)=>{
                            const item = `${employee.nid}`;
                            const itemUppercase = item.toLowerCase();
                            const textData = key.toLowerCase();
                            return itemUppercase.indexOf(textData) > -1;
                        })

                        if(searchKey.length === 0){
                            fetchAllEmployee(token, setEmployees, setShowActivityIndicator)
                        }

                        setEmployees(temp)
                    }}
                />
            </View>

            <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: WIDTH -15, paddingHorizontal: 10, alignSelf: 'center', backgroundColor: APP_COLOR, height: 40, borderRadius: 10}}>
                <Text style={{color: '#fff', fontSize: 18}}>National Id</Text>
                <Text style={{color: '#fff', fontSize: 18}}>Names</Text>
                <Text style={{color: '#fff', fontSize: 18}}>{action === "deleteEmployee" ? "Action" : "Wage"}</Text>
            </View>
            <View>
                <FlatList
                    data = {Employees}
                    keyExtractor = {employee => employee.nid}
                    renderItem = {({item, index})=>{
                        return(
                            <ScrollView showsVerticalScrollIndicator = {false}>
                                <View style = {{justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: .5, borderBottomColor: 'grey', backgroundColor: index % 2 ===0 ? '#50b1cc5555': null, marginTop: 15, alignSelf: 'center', width: WIDTH -10}}>
                                    <Text style={{fontSize: 16}}>{item.nid}</Text>
                                    <Text>{item.names}</Text>

                                    {action === "deleteEmployee" ? 
                                        <TouchableOpacity
                                            style = {{width: 40, marginLeft: 10}}
                                            onPress = {()=> deleteEmployee(token, item.nid, setShowActivityIndicator)}
                                        >
                                            <AntDesign name="deleteuser" size={24} color="red" />
                                        </TouchableOpacity>

                                        :

                                        <Text>{item.wage}</Text>
                                    }
                                </View>
                            </ScrollView>
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

export default EmployeeScreen;