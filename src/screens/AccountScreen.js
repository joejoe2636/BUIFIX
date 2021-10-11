import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../constants/constants';

const AccountScreen = ({navigation})=>{
    return(
        <SafeAreaView style = {styles.container}>
            <View style= {styles.header}>
                <Image
                    style = {styles.image}
                    source = {require('../../assets/construction.png')}
                />
                <View>
                    <Text style = {styles.names}>Emmanuel</Text>
                    <Text style = {styles.names}>NTIVUGURUZWA</Text>
                    <View style = {styles.userTypeCard}>
                        <Text style = {styles.userType}>Owner</Text>
                    </View>
                </View>
            </View>

            <View >
                <TouchableOpacity
                    style = {styles.button}
                >
                    <Text style = {styles.buttonTitle}>About</Text>
                    <Text style = {styles.buttonDescription}>Know who we are</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.button}
                >
                    <Text style = {styles.buttonTitle}>Term and Conditions</Text>
                    <Text style = {styles.buttonDescription}>important for both of us</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.button}
                >
                    <Text style = {styles.buttonTitle}>Support</Text>
                    <Text style = {styles.buttonDescription}>get help from our team</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=>navigation.navigate("Signin")}
                >
                    <Text style = {styles.buttonTitle}>Sign out</Text>
                    <Text style = {styles.buttonDescription}>@emmanuel</Text>
                </TouchableOpacity>
            </View>

            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        width: WIDTH -60,
        marginBottom: HEIGHT * .05
    },
    image:{
        width:  100,
        height: 100,
        borderRadius: 100,
        marginRight: 20
    },
    button:{
        width: WIDTH - 60,
        borderBottomColor: 'grey',
        borderBottomWidth: .5
    },
    names:{
        fontWeight: 'bold'
    },
    userTypeCard:{
        backgroundColor: APP_COLOR,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    userType:{

    },
    buttonTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15
    },
    buttonDescription:{
        color: 'grey',
        fontSize: 14,
        marginBottom: 15
    }
    
});

export default AccountScreen;