import React, {useContext} from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../../constants/constants';
import { Context as AppContext } from '../../contexts/ApplicationContext';


const HomeScreen = ({navigation})=>{
    const {state} = useContext(AppContext);
    const { user} = state;

    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.headerTitle}>Hello {user.fname}</Text>
            </View>
            <View style = {styles.advat}>
                <Image
                    style = {styles.image}
                    source = {require('../../../assets/construction.png')}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress = {()=>navigation.navigate("EmployeeForm", {employeeType: 'engineer'})}
                    style = {styles.button}
                >
                    <Text style = {styles.buttonTitle}>Add enginer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=>navigation.navigate("EmployeeForm", {employeeType: 'stoker'})}
                >
                    <Text style = {styles.buttonTitle}>add stok manager</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
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
    headerTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        color: APP_COLOR
    },
    advat:{
        flex: 1
    },
    image:{
        width:  WIDTH - (WIDTH * .1),
        height: HEIGHT - (HEIGHT * .5),
        borderRadius: 15
    },
    button:{
        height: HEIGHT * .05,
        backgroundColor: APP_COLOR,
        width: WIDTH - (WIDTH * .3),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginVertical: 10,
        marginBottom: 20,
        resizeMode: 'stretch'
    },
    buttonTitle:{
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default HomeScreen;