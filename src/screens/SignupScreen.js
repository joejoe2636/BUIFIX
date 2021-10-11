import React, {useState} from 'react';
import { View, Text, TextInput,StyleSheet, Platform, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { HEIGHT, WIDTH, APP_COLOR} from '../constants/constants';

const SignupScreen = ({navigation})=>{

    const [names, setNames] = useState('')
    const [email, setEmail] = useState('')
    const [nid, setNid] = useState('')
    const [password, setPassword] = useState('')
    const [comfirmPassword, setConfirmPassword] = useState('')

    return(
        <SafeAreaView style={styles.container}>
            <View style = { styles.header }>
                <Text style = {styles.title}>Create</Text>
                <Text style = {styles.title}>Account</Text>
            </View>
            <View style = {styles.form}>
                <Text style = { styles.label}>Full Name</Text>
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    value = {names}
                    onChangeText = {(names)=>setNames(names)}
                />

                <Text style = { styles.label}>Email</Text>
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    value = {email}
                    keyboardType = "email-address"
                    onChangeText = {(email)=>setEmail(email)}
                />

                <Text style = { styles.label}>National Id</Text>
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    value = {nid}
                    keyboardType = "number-pad"
                    maxLength = {16}
                    onChangeText = {(nid)=>setNid(nid)}
                />

                <Text style = { styles.label }>Password</Text>
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    secureTextEntry = {true}
                    value = {password}
                    onChangeText = {(password)=>setPassword(password)}
                />

                <Text style = { styles.label }>Re-type Password</Text>
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    secureTextEntry = {true}
                    value = {comfirmPassword}
                    onChangeText = {(password)=>setConfirmPassword(password)}
                />

                <View style = {styles.buttonGroup}>
                    <TouchableOpacity 
                        style = {styles.signButton}
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
    form:{
        flex: 1
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
        justifyContent: 'center'
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