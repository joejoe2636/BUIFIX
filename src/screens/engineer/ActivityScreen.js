import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../../constants/constants';
import { Entypo, MaterialIcons  } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-btr';
import { NewActivityForm } from '../../components/NewActivityForm';
import { UpdateActivityForm } from '../../components/UpdateActivityForm';
import { activites } from '../../api/buifixApi';


const ActivityScreen = ()=>{
    const [activityName, setActivityName] = useState('')
    const [activityBudget, setActivityBudget] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [visibleNewActivityFom, setvisibleNewActivityFom ] = useState(false)
    const [updateActivityFormVisibility, setUpdateActivityFormVisibility ] = useState(false)

    const clearNewActivityForm = ()=>{
        setActivityName('')
        setActivityBudget(null)
    }

    return(
        <SafeAreaView>
            <View style = {styles.container}>
                <TouchableOpacity
                    onPress = {()=> setvisibleNewActivityFom(true)} 
                    style={{backgroundColor: APP_COLOR, borderWidth: 1, borderRadius: 10, width: '40%', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
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
                            <TouchableOpacity 
                                onPress = {()=> setUpdateActivityFormVisibility(true)}
                                style = {styles.activity}>
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

            <BottomSheet visible = {visibleNewActivityFom}>
                <NewActivityForm 
                    cleanForm = {()=> clearNewActivityForm()} 
                    activityName = {activityName}
                    activityBudget = {activityBudget}
                    setActivityName = {(name)=> setActivityName(name)} 
                    setActivityBudget = {(budget)=> setActivityBudget(budget)}
                    changeFormVisiblity = {(value)=> setvisibleNewActivityFom(value)}
                />
            </BottomSheet>

            <BottomSheet visible = {updateActivityFormVisibility}>
                <UpdateActivityForm 
                    cleanForm = {()=> clearNewActivityForm()} 
                    expenses = {expenses}
                    addExpenses = {(expenses)=> setExpenses(expenses)}
                    changeFormVisiblity = {(value)=> setUpdateActivityFormVisibility(value)}
                />
            </BottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 20
    },
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
    },
    new_activity_form:{
        backgroundColor: '#fff',
        height: 300,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: HEIGHT/4,
        alignItems: 'center'
    },
    new_activity_btn_group:{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    }
    
});

export default ActivityScreen;