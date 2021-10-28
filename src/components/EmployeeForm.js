import React, { useEffect, useState, useContext }from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../constants/constants';
import { AppActivityIndictor } from '../components/AppActivityIndictor';
import { Context as AppContext } from '../contexts/ApplicationContext';
import { BottomSheet } from 'react-native-btr';
import validator from 'validator';



const EmployeeForm = ({navigation, route})=>{

    const [employeeType, setEmployeeType ] = useState(route.params.employeeType);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [fname, setFname ] = useState('');
    const [lname, setLname ] = useState('');
    const [nid, setNid ] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [password, setPassword ] = useState('');

    const { state, registerEmployee, setErrorMessage, clearErrorMessage } = useContext(AppContext);

    const { token, errorMessage } = state;

    return(
        <SafeAreaView style = {styles.container}>
            <View>
                <TextInput
                    placeholder = "First Name"
                    style = {[styles.inputField, {borderColor: fname.length < 4  && fname.length !== 0 ? 'red' : '#d9d9d4', borderWidth: 1}]}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                    value={fname}
                    onChangeText = {(name)=>{
                        clearErrorMessage();
                        setFname(name);
                    }}
                />

                <TextInput
                    placeholder = "Last Name"
                    style = {[styles.inputField, {borderColor: lname.length < 4  && lname.length !== 0 ? 'red' : '#d9d9d4', borderWidth: 1}]}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                    value={lname}
                    onChangeText = {(name)=>{
                        clearErrorMessage();
                        setLname(name);
                    }}
                />

                <TextInput
                    placeholder = "National Id"
                    style = {[styles.inputField, {borderColor: nid.length !==16  && nid.length !== 0 ? 'red' : '#d9d9d4', borderWidth: 1}]}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                    autoComplete = {true}
                    keyboardType = 'number-pad'
                    value = {nid}
                    maxLength = {16}
                    onChangeText = {(nid)=> {
                        clearErrorMessage();
                        setNid(nid)
                    }}
                />

                <TextInput
                    placeholder = "Email"
                    style = {[styles.inputField, {borderColor: validator.isEmail(email) || email.length === 0 ? '#d9d9d4': 'red', borderWidth: 1}]}                    
                    autoCapitalize = "none"
                    autoCorrect= {false}
                    autoComplete = {true}
                    value = {email}
                    onChangeText = {(email) => {
                        clearErrorMessage()
                        setEmail(email)
                    }}
                />

                <TextInput
                    placeholder = "Salary"
                    style = {[styles.inputField, {borderColor: salary.length < 3  && salary.length !== 0 ? 'red' : '#d9d9d4', borderWidth: 1}]}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                    keyboardType = 'number-pad'
                    value = {salary}
                    onChangeText = {(salary) => {
                        clearErrorMessage()
                        setSalary(salary)
                    }}
                />

                <TextInput
                    placeholder = "Password of Employee"
                    style = {[styles.inputField, {borderColor: password.length < 6  && password.length !== 0 ? 'red' : '#d9d9d4', borderWidth: 1}]}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                    secureTextEntry = {true}
                    value = {password}
                    onChangeText = {(password)=> {
                        clearErrorMessage();
                        setPassword(password);
                    }}
                />

                {errorMessage ? <Text style={{alignSelf: 'center', marginBottom: 10, color: 'red'}}>{errorMessage}</Text> : null}
                
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {()=>{

                        if(fname.length === 0){
                            return setErrorMessage('First name shout not be empty')
                        }

                        if(lname.length === 0){
                            return setErrorMessage('First name shout not be empty')
                        }

                        if(nid.length !== 16){
                            return setErrorMessage('Check well National Id');
                        }

                        setShowActivityIndicator(true)
                        registerEmployee({fname, lname, nid, email, salary,password, employeeType, token}, ()=>{
                            setShowActivityIndicator(false);
                        }, closeActivityIndicator = ()=> setShowActivityIndicator(false));
                    }}
                >
                    <Text style = {styles.buttonTitle}>Register</Text>
                </TouchableOpacity>
            </View>

            <BottomSheet visible = {showActivityIndicator}>
                <AppActivityIndictor/>
            </BottomSheet>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputField:{
        backgroundColor: '#d9d9d4',
        height: HEIGHT * .05,
        width : WIDTH - 60,
        fontSize: 20,
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 20
    },
    button:{
        height: HEIGHT * .05,
        backgroundColor: APP_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonTitle:{
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default EmployeeForm