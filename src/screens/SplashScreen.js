import React, {useEffect, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../contexts/ApplicationContext';

const SplashScreen = ({navigation}) => {

    const {tryLocalSignin } = useContext(AuthContext);

    useEffect(()=>{
        tryLocalSignin({navigation})
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="green"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default SplashScreen
