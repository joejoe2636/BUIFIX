import React, {useState, useContext} from 'react';
import { View, Text, TextInput,StyleSheet, Platform, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { HEIGHT, WIDTH, APP_COLOR} from '../constants/constants';
import { BottomSheet } from 'react-native-btr';
import { Context as AuthContext } from '../contexts/ApplicationContext';
import { AppActivityIndictor } from '../components/AppActivityIndictor'
import validator from 'validator';

const SignupScreen = ({navigation})=>{

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [nid, setNid] = useState('')
    const [password, setPassword] = useState('')
    const [comfirmPassword, setConfirmPassword] = useState('');
    const [showActivityIndicator, setShowActivityIndicator] = useState(false)

    const {state, signup, setErrorMessage, clearErrorMessage} = useContext(AuthContext);
    const { errorMessage } = state;

    return(
        <SafeAreaView style={styles.container}>
            <View style = { styles.header }>
                <Text style = {styles.title}>Create</Text>
                <Text style = {styles.title}>Account</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator = {false}>
                <View style = {styles.mainForm}>
                    <View style={styles.form}>
                        <ScrollView showsVerticalScrollIndicator = {false}>
                            <Text style = { styles.label}>First Name</Text>
                            <TextInput 
                                style={[styles.textInput, {borderBottomColor: fname.length < 4 && fname.length !== 0 ? 'red': 'grey'}]}
                                autoCapitalize = "none"
                                autoCorrect = {false}
                                value = {fname}
                                onChangeText = {(name)=>{
                                    clearErrorMessage();
                                    setFname(name)
                                }}
                            />

                            <Text style = { styles.label}>Last Name</Text>
                            <TextInput 
                                style={[styles.textInput, {borderBottomColor: lname.length < 4 && lname.length !== 0 ? 'red': 'grey'}]}
                                autoCapitalize = "none"
                                autoCorrect = {false}
                                value = {lname}
                                onChangeText = {(name)=>{
                                    clearErrorMessage();
                                    setLname(name)
                                }}
                            />

                            <Text style = { styles.label}>Email</Text>
                            <TextInput 
                                style={[styles.textInput, {borderBottomColor: validator.isEmail(email) || email.length === 0 ? 'grey': 'red'}]}
                                autoCapitalize = "none"
                                autoCorrect = {false}
                                value = {email}
                                keyboardType = "email-address"
                                onChangeText = {(email)=>{
                                    clearErrorMessage();
                                    setEmail(email)
                                }}
                            />

                            <Text style = { styles.label}>Phone</Text>
                            <TextInput 
                                style={[styles.textInput, {borderBottomColor: phone.length === 10 || email.length === 0 ? 'grey': 'red'}]}
                                autoCapitalize = "none"
                                autoCorrect = {false}
                                value = {phone}
                                keyboardType = 'phone-pad'
                                onChangeText = {(phone)=>{
                                    clearErrorMessage();
                                    setPhone(phone)
                                }}
                            />

                            <Text style = { styles.label}>National Id</Text>
                            <TextInput 
                                style={[styles.textInput, { borderBottomColor: nid.length !==16  && nid.length !== 0 ? 'red' : 'grey'}]}
                                autoCapitalize = "none"
                                autoCorrect = {false}
                                value = {nid}
                                keyboardType = "number-pad"
                                maxLength = {16}
                                onChangeText = {(nid)=>{
                                    clearErrorMessage();
                                    setNid(nid)
                                }}
                            />

                            <Text style = { styles.label }>Password</Text>
                            <TextInput 
                                style={styles.textInput}
                                autoCapitalize = "none"
                                autoCorrect = {false}
                                secureTextEntry = {true}
                                value = {password}
                                onChangeText = {(password)=>{
                                    clearErrorMessage();
                                    setPassword(password)
                                }}
                            />

                            <Text style = { styles.label }>Re-type Password</Text>
                            <TextInput 
                                style={styles.textInput}
                                autoCapitalize = "none"
                                autoCorrect = {false}
                                secureTextEntry = {true}
                                value = {comfirmPassword}
                                onChangeText = {(password)=>{
                                    clearErrorMessage();
                                    setConfirmPassword(password)
                                }}
                            />          
                        </ScrollView>
                    </View>

                    {errorMessage? <Text style = {{alignSelf: 'center', color: 'red'}}>{errorMessage}</Text> : null}

                    <View style = {styles.buttonGroup}>
                        <TouchableOpacity 
                            style = {styles.signButton}
                            onPress = {()=>{

                                if(!validator.isEmail(email)){
                                    return setErrorMessage("Wrong Email")
                                }
                                if(password !== comfirmPassword){
                                    return setErrorMessage("Password dos not mutch")
                                }

                                setShowActivityIndicator(true);
                                signup({fname, lname, email, phone, country: 'Rwanda', nid, password}, 
                                // ()=>{
                                //     setShowActivityIndicator(false)
                                //     navigation.goBack();
                                // }, 
                                navigation,
                                closeActivityIndicator = ()=>setShowActivityIndicator(false))
                            }}
                        >
                            <Text style = { styles.signText}>Signup</Text>
                        </TouchableOpacity>

                        <View style = {styles.link}>
                            <Text>Back to </Text>
                            <TouchableOpacity
                                onPress = {()=> navigation.navigate("Signin")}
                            >
                                <Text style = {{fontSize: 18, color: APP_COLOR}}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <BottomSheet visible = {showActivityIndicator}>
                <AppActivityIndictor/>
            </BottomSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 12 : StatusBar.currentHeight,
        marginHorizontal: 30,
    },
    header:{
        height: HEIGHT * .20,
        justifyContent: 'center'
    },
    title:{
        color: APP_COLOR,
        fontSize: 30,
        fontWeight: 'bold'
    },
    mainForm:{
        flex: 1
    },
    form:{
        height : HEIGHT * .55
    },
    label:{
        fontSize: 20,
        color: 'grey'
    },
    textInput:{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginBottom: 25,
        fontSize: 20
    },
    buttonGroup:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 120
    },
    signButton:{
        backgroundColor: APP_COLOR,
        height: HEIGHT * .06,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: HEIGHT * .02,
        marginTop: 15,
        width: WIDTH - 60
    },
    signWithGoogleBtn:{
        backgroundColor: '#c5d9c7',
        height: HEIGHT * .06,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: HEIGHT * .02,
        marginTop: 15,
        width: WIDTH - 60
    },
    signText:{
        color: '#fff',
        fontSize: 20
    },
    signWithGoogle:{
        color: APP_COLOR,
        fontSize: 20,
        fontWeight: 'bold'
    },
    link:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30
    }
});

export default SignupScreen;