import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, StatusBar, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { HEIGHT, WIDTH, APP_COLOR } from '../constants/constants';
import { Context as AuthContext } from '../contexts/ApplicationContext';
import { AppActivityIndictor } from '../components/AppActivityIndictor';
import { BottomSheet } from 'react-native-btr';


const SigninScreen = ({ navigation }) => {

    const { state, signin, setErrorMessage, clearErrorMessage } = useContext(AuthContext)
    const { errorMessage } = state

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showActivityIndicator, setShowActivityIndicator] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.title}>Back</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={(email) => {
                            clearErrorMessage()
                            setEmail(email)
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(password) => {
                            clearErrorMessage()
                            setPassword(password)
                        }}
                    />
                </View>


                {errorMessage ? <Text style={{ alignSelf: 'center', color: 'red' }}>{errorMessage}</Text> : null}

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.signButton}
                        // onPress = {()=>navigation.navigate("OwnerFlow")}

                        onPress={() => {
                            if (email.length === 0 || password === 0) {
                                return setErrorMessage("you must provide email and password")
                            }

                            if (email.length < 8) {
                                return setErrorMessage("wrong email")
                            }

                            if (password.length < 8) {
                                return setErrorMessage("wrong password");
                            }

                            setShowActivityIndicator(true)
                            signin({ email, password }, closeActivityIndicator = () => setShowActivityIndicator(false), navigation);
                        }}
                    >
                        <Text style={styles.signText}>Signin</Text>
                    </TouchableOpacity>

                    <Text style={{ color: 'grey', marginTop: 10, fontSize: 16 }}>or</Text>

                    <TouchableOpacity
                        style={styles.signWithGoogleBtn}
                    // onPress = {()=>navigation.navigate("StockerFlow")}
                    >
                        <Text style={styles.signWithGoogle}>Signin with Google</Text>
                    </TouchableOpacity>

                    <View style={styles.link}>
                        <Text>create account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <Text style={{ fontSize: 18, color: APP_COLOR }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <BottomSheet visible={showActivityIndicator}>
                <AppActivityIndictor />
            </BottomSheet>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 12 : StatusBar.currentHeight,
        marginHorizontal: 30,
    },
    header: {
        height: HEIGHT * .35,
        justifyContent: 'center'
    },
    title: {
        color: APP_COLOR,
        fontSize: 30,
        fontWeight: 'bold'
    },
    form: {
        flex: 1
    },
    label: {
        fontSize: 20,
        color: 'grey'
    },
    textInput: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginBottom: 25,
        fontSize: 20
    },
    buttonGroup: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    signButton: {
        backgroundColor: APP_COLOR,
        height: HEIGHT * .06,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: HEIGHT * .02,
        marginTop: 15,
        width: WIDTH - 60
    },
    signWithGoogleBtn: {
        backgroundColor: '#c5d9c7',
        height: HEIGHT * .06,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: HEIGHT * .02,
        marginTop: 15,
        width: WIDTH - 60
    },
    signText: {
        color: '#fff',
        fontSize: 20
    },
    signWithGoogle: {
        color: APP_COLOR,
        fontSize: 20,
        fontWeight: 'bold'
    },
    link: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30
    }
});

export default SigninScreen;