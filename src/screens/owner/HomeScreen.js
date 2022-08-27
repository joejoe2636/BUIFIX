import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../../constants/constants';
import { Context as AppContext } from '../../contexts/ApplicationContext';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-btr';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';

const HomeScreen = ({ navigation }) => {

    const [showActivityIndicator, setShowActivityIndicator] = useState(false)
    const { state, registerWageEmployee } = useContext(AppContext);
    const [addEmployee, setAddEmployee] = useState(false);
    const { user, errorMessage, token } = state;
    const [employee_name, setEmployeeName] = useState('');
    const [employee_phone, setEmployeePhone] = useState('');
    const [employee_nid, setEmployeeNid] = useState('');
    const [employee_wage, setEmployeeWage] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello {user.fname}</Text>
            </View>
            <View style={styles.advat}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/construction.png')}
                />
            </View>

            <View style={styles.buttom_card}>
                <View style={styles.button_group}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("StockerFlow")}
                        style={styles.button}
                    >
                        <MaterialIcons name="storage" style={styles.icon} />
                        <View style={{ backgroundColor: APP_COLOR, width: 110, alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 30 }}>
                            <Text style={styles.buttonTitle}>Stock</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("EmployeeList", { action: "employeeList" })}
                        style={styles.button}
                    >
                        <FontAwesome name="list-ol" style={styles.icon} />
                        <View style={{ backgroundColor: APP_COLOR, width: 110, alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 30 }}>
                            <Text style={styles.buttonTitle}>Employee</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.button_group}>
                    <TouchableOpacity onPress={() => navigation.navigate("EmployeeForm", { employeeType: 'engineer' })} style={styles.button}>
                        <Ionicons name="man" style={styles.icon} />
                        <View style={{ backgroundColor: APP_COLOR, width: 110, alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 30 }}>
                            <Text style={styles.buttonTitle}>Engineer</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("EmployeeForm", { employeeType: 'stoker' })}
                        style={styles.button}
                    >
                        <Ionicons name="man" style={styles.icon} />
                        <View style={{ backgroundColor: APP_COLOR, width: 110, alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 30 }}>
                            <Text style={styles.buttonTitle}>SK ManA</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomSheet
                visible={addEmployee}>
                <ScrollView>
                    <View style={{
                        backgroundColor: '#fff',
                        height: 350,
                        width: '90%',
                        marginVertical: HEIGHT * 0.25,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}>

                        <Text style={{ fontSize: 25, textTransform: 'capitalize', fontWeight: 'bold' }}>Employee Details</Text>

                        <TextInput
                            placeholder="Employee Names"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={employee_name}
                            onChangeText={(name) => setEmployeeName(name)}
                            style={{ width: '80%', height: 60, fontSize: 18, borderBottomColor: 'grey', borderBottomWidth: .5 }}
                        />

                        <TextInput
                            placeholder="Phone Number"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            value={employee_phone}
                            maxLength={10}
                            minLength={10}
                            onChangeText={(phone) => setEmployeePhone(phone)}
                            style={{ width: '80%', height: 60, fontSize: 18, borderBottomColor: employee_phone.length === 10 || employee_phone.length === 0 ? 'grey' : 'red', color: employee_phone.length === 10 || employee_phone.length === 0 ? 'grey' : 'red', borderBottomWidth: .5 }}
                        />
                        <TextInput
                            placeholder="National Id"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            value={employee_nid}
                            maxLength={16}
                            minLength={16}
                            onChangeText={(id) => setEmployeeNid(id)}
                            style={{ width: '80%', height: 60, fontSize: 18, borderBottomColor: employee_nid.length === 16 || employee_nid.length === 0 ? 'grey' : 'red', color: employee_nid.length === 16 || employee_nid.length === 0 ? 'grey' : 'red', borderBottomWidth: .5 }}
                        />

                        <TextInput
                            placeholder="Wage"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={employee_wage}
                            keyboardType="number-pad"
                            onChangeText={(wage) => setEmployeeWage(wage)}
                            style={{ width: '80%', height: 60, fontSize: 18, borderBottomColor: 'grey', borderBottomWidth: .5 }}
                        />

                        <View style={{ width: '68%', marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <TouchableOpacity onPress={() => setAddEmployee(false)} style={{ backgroundColor: 'red', width: 100, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: 'green', width: 100, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                                    onPress={() => {
                                        if (employee_nid.length !== 16) {
                                            return;
                                        }

                                        if (employee_wage.length < 2) {
                                            return;
                                        }

                                        if (employee_name.length < 4) {
                                            return;
                                        }

                                        setAddEmployee(false)

                                        setShowActivityIndicator(true)
                                        registerWageEmployee({ names: employee_name, nid: employee_nid, phone: employee_phone, wage: employee_wage, token }, closeActivityIndicator = () => setShowActivityIndicator(false))
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </BottomSheet>

            <BottomSheet visible={showActivityIndicator}>
                <AppActivityIndictor />
            </BottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#94c4d8'
    },
    header: {
        height: HEIGHT * .1,
        width: WIDTH,
        marginTop: 20,
        // backgroundColor: 'red'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        color: APP_COLOR
    },
    advat: {
        flex: 1
    },
    image: {
        width: WIDTH - (WIDTH * .1),
        height: HEIGHT - (HEIGHT * .7),
        borderRadius: 15
    },
    buttom_card: {
        // backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#fff',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: HEIGHT * .2,
        marginBottom: 20
    },
    button_group: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    icon: {
        fontSize: 30,
        color: '#fff'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '48.5%',
        marginRight: 10,
        borderWidth: 1,
        backgroundColor: APP_COLOR,
        borderRadius: 10

    },
    buttonTitle: {
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default HomeScreen;