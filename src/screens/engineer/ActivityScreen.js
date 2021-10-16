import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, StatusBart, SafeAreaView, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../../constants/constants';
import { Entypo, MaterialIcons  } from '@expo/vector-icons';

const ActivityScreen = ({navigation})=>{

    const activites = [
        {
            name: 'roof',
            budget: 500000,
            expenses: '400,0000',
            rest: '100,000',
            progress: '82 %'
        },
        {
            name: 'roofs',
            budget: 500000,
            expenses: '400,0000',
            rest: '100,000',
            progress: '82 %'
        }
    ]
    return(
        <SafeAreaView>
            <View style = {{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
                marginHorizontal: 20
            }}>
                <TouchableOpacity style={{backgroundColor: APP_COLOR, borderWidth: 1, borderRadius: 10, width: '40%', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Entypo name="plus" size={35} color= "#fff" />
                    <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Activity</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: APP_COLOR, borderWidth: 1, borderRadius: 10, width: '40%', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <MaterialIcons  name="update" size={35} color= "#fff" />
                    <Text style = {{fontSize: 20, fontWeight: 'bold', color: "#fff"}}>Activity</Text>
                </TouchableOpacity>

            </View>
            <FlatList
                data = {activites}
                keyExtractor = {activity => activity.name}
                renderItem = {({index, item})=>{
                    return(
                        <View>
                            <TouchableOpacity style = {styles.activity}>
                                <View style = {styles.card}>
                                    <Text style = {styles.title}>{item.name}</Text>
                                    <Text style = {styles.title}>--------</Text>

                                    <View style={styles.row}>
                                        <Text style = {styles.key}>Budget : </Text>
                                        <Text style = {styles.value}> {item.budget} Rwf</Text>
                                    </View>

                                    <View style={styles.row}>
                                        <Text style = {styles.key}>Expenses : </Text>
                                        <Text style = {styles.value}> {item.expenses} Rwf</Text>
                                    </View>

                                    <View style={styles.row}>
                                        <Text style = {styles.key}>Rest : </Text>
                                        <Text style = {styles.value}> {item.rest} Rwf</Text>
                                    </View>

                                    <View style={styles.row}>
                                        <Text style = {styles.key}>Progress : </Text>
                                        <Text style = {styles.value}> {item.progress}</Text>
                                    </View>
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    activity:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        color: APP_COLOR,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },  
    card:{
        backgroundColor: '#d9d9d4',
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 25
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    key:{
        fontSize: 20,
        fontWeight: 'bold',
        color: APP_COLOR
    },
    value:{
        fontSize: 20
    }
});

export default ActivityScreen;