import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../constants/constants';


const EmployeeForm = ({navigation})=>{
    return(
        <SafeAreaView style = {styles.container}>
            <View>
                <TextInput
                    placeholder = "First Name"
                    style = {styles.inputField}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                />

                <TextInput
                    placeholder = "Last Name"
                    style = {styles.inputField}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                />

                <TextInput
                    placeholder = "National Id"
                    style = {styles.inputField}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                />

                <TextInput
                    placeholder = "Email"
                    style = {styles.inputField}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                />

                <TextInput
                    placeholder = "Password of Employee"
                    style = {styles.inputField}
                    autoCapitalize = "none"
                    autoCorrect= {false}
                    secureTextEntry = {true}
                />

                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {()=>navigation.goBack()}
                >
                    <Text style = {styles.buttonTitle}>Register</Text>
                </TouchableOpacity>
            </View>
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