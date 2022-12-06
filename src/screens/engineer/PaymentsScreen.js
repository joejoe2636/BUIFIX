import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { APP_COLOR, WIDTH } from '../../constants/constants';
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheet } from 'react-native-btr';
import buifixApi from '../../api/buifixApi';
import { Context as AuthContext } from '../../contexts/ApplicationContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';


const fetchAllEmployee = async (token, setEmployees, updateEmployeeList, setShowActivityIndicator) => {
    try {
        setShowActivityIndicator(true);
        const response = await buifixApi.get('/users/wage/employees', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { status, message, numberOfEmployees, employees } = response.data;

        if (status === 200) {
            updateEmployeeList(employees)
            setEmployees(employees)
            setShowActivityIndicator(false)
        }

    } catch (error) {
        setShowActivityIndicator(false);
    }
}

const pushNotification = async ({email, amount, setShowActivityIndicator}) => {
    try {
        console.log(email, amount)
        setShowActivityIndicator(true);
        const response = await buifixApi.post('/pushnotification', {
            email, amount
        });

        const { status, message} = response.data;

        if (status === 201) {
            setShowActivityIndicator(false)
        }

    } catch (error) {
        console.log(error)
        setShowActivityIndicator(false);
    }
}

const PaymentScreen = ({ navigation }) => {

    const [showActivityIndicator, setShowActivityIndicator] = useState(false)
    const [Employees, setEmployees] = useState([]);

    const { state, addPaidEmployee, addUnPaidEmployee, updateEmployeeList, payWageEmployee} = useContext(AuthContext);
    const { token, employeeList } = state;

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            fetchAllEmployee(token, setEmployees, updateEmployeeList, setShowActivityIndicator);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ marginTop: 50, flex: 1 }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={30} color={APP_COLOR} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 25, alignSelf: 'center', color: APP_COLOR }}>Employee Payments</Text>

            <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: WIDTH - 15, paddingHorizontal: 10, alignSelf: 'center', backgroundColor: APP_COLOR, height: 40, borderRadius: 10 }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>National Id</Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>Names</Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>Action</Text>
            </View>
            <View>
                <FlatList
                    data={employeeList}
                    keyExtractor={employee => employee.nid}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: .5, borderBottomColor: 'grey', backgroundColor: index % 2 === 0 ? 'pink' : null, marginTop: 15, alignSelf: 'center', width: WIDTH - 10 }}>
                                <Text style={{ fontSize: 16 }}>{item.nid}</Text>
                                <Text>{item.names}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 60 }}>
                                    <TouchableOpacity
                                        onPress={() => addUnPaidEmployee(item)}
                                    >
                                        <MaterialIcons name="cancel" size={24} color="red" />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => pushNotification({email: item?.email ? item?.email : "joelmuhinda4@gmail.com", amount: item.wage, setShowActivityIndicator})}
                                    >
                                        <Entypo name="check" size={24} color={APP_COLOR} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>

            {
                employeeList.length !== 0 ? null
                    :
                    <View style={{ flex: 1, alignItems: 'center', width: '100%', marginTop: 20 }}>
                        <TouchableOpacity style={{
                            backgroundColor: APP_COLOR,
                            width: 120,
                            height: 50,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress = {()=>{
                            setShowActivityIndicator(true)
                            payWageEmployee({employees: state.paidEmployee, token}, closeActivityIndicator = ()=> setShowActivityIndicator(false))
                        }}
                        >
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
            }

            <BottomSheet visible={showActivityIndicator}>
                <AppActivityIndictor />
            </BottomSheet>
        </View>
    );
};


const styles = StyleSheet.create({})

export default PaymentScreen;