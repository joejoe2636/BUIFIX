import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../../constants/constants';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-btr';
import { NewActivityForm } from '../../components/NewActivityForm';
import { UpdateActivityForm } from '../../components/UpdateActivityForm';
import buifixApi from '../../api/buifixApi';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';
import { Context as AuthContext } from '../../contexts/ApplicationContext';

const registerActivity = async (name, budget, token, setErrorMessage, setShowActivityIndicator) => {
    try {
        setShowActivityIndicator(true)
        const response = await buifixApi.post('/users/register/activity', {
            name, budget
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setShowActivityIndicator(false)
        setErrorMessage('')
    } catch (error) {
        setShowActivityIndicator(false)
        setErrorMessage(error.response.data.errorMessage)
    }
}

const fetchAllActivity = async (token, setActivity, setShowActivityIndicator, setErrorMessage) => {

    try {
        setShowActivityIndicator(true);
        const response = await buifixApi.get('/users/actities', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { status, message, actities } = response.data;

        if (status === 200) {
            setActivity(actities)
            setShowActivityIndicator(false)
        }
        setErrorMessage('')
    } catch (error) {
        setShowActivityIndicator(false)
        setErrorMessage(error.response.data.errorMessage)
    }
}

const updateActivityProgress = async (token, activityId, newExpenses, setShowActivityIndicator, setErrorMessage) => {
    try {
        setShowActivityIndicator(true)
        const response = await buifixApi.patch(`/users/employees/actities/${activityId}?expenses=${newExpenses}`, {

        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setShowActivityIndicator(false)
        setErrorMessage('')
    } catch (error) {
        setShowActivityIndicator(false)
        setErrorMessage(error.response.data.errorMessage)
    }
}


const ActivityScreen = ({ navigation }) => {
    const [activityName, setActivityName] = useState('')
    const [activityBudget, setActivityBudget] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [visibleNewActivityFom, setvisibleNewActivityFom] = useState(false)
    const [updateActivityFormVisibility, setUpdateActivityFormVisibility] = useState(false)
    const [showActivityIndicator, setShowActivityIndicator] = useState(false)
    const [activites, setActivity] = useState([])
    const [activityId, setActivityId] = useState('');

    const { state } = useContext(AuthContext);
    const { token } = state;
    const [errorMessage, setErrorMessage] = useState('')


    const clearNewActivityForm = () => {
        setActivityName('')
        setActivityBudget(null)
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAllActivity(token, setActivity, setShowActivityIndicator, setErrorMessage)
        });

        return unsubscribe;
    }, [navigation]);


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => setvisibleNewActivityFom(true)}
                    style={{ backgroundColor: APP_COLOR, borderWidth: 1, borderRadius: 10, width: '40%', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Entypo name="plus" size={35} color="#fff" />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Activity</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: APP_COLOR, borderWidth: 1, borderRadius: 10, width: '40%', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                    onPress={() => {
                        fetchAllActivity(token, setActivity, setShowActivityIndicator, setErrorMessage)
                    }}
                >
                    <MaterialIcons name="update" size={35} color="#fff" />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}>Activity</Text>
                </TouchableOpacity>

            </View>

            {errorMessage ? <Text style={{ alignSelf: 'center', color: 'red', marginTop: 10 }}>{errorMessage}</Text> : null}

            <View style={{ marginBottom: HEIGHT * .2 }}>
                <FlatList
                    data={activites}
                    keyExtractor={activity => activity.name}
                    renderItem={({ index, item }) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setActivityId(item._id)
                                        setUpdateActivityFormVisibility(true);
                                    }}
                                    style={styles.activity}>
                                    <View style={styles.card}>
                                        <Text style={styles.title}>{item.name}</Text>
                                        <Text style={styles.title}>--------</Text>

                                        <View style={styles.row}>
                                            <Text style={styles.key}>Budget : </Text>
                                            <Text style={styles.value}> {item.budget} Rwf</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.key}>Expenses : </Text>
                                            <Text style={styles.value}> {item.expenses} Rwf</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.key}>Rest : </Text>
                                            <Text style={styles.value}> {item.budget - item.expenses} Rwf</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.key}>Progress : </Text>
                                            <Text style={styles.value}> {(item.expenses * 100) / item.budget} %</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>

            <BottomSheet visible={visibleNewActivityFom}>
                <NewActivityForm
                    cleanForm={() => clearNewActivityForm()}
                    activityName={activityName}
                    activityBudget={activityBudget}
                    setActivityName={(name) => setActivityName(name)}
                    setActivityBudget={(budget) => setActivityBudget(budget)}
                    changeFormVisiblity={(value) => setvisibleNewActivityFom(value)}
                    saveActivity={() => registerActivity(activityName, activityBudget, token, setErrorMessage, setShowActivityIndicator)}
                />
            </BottomSheet>

            <BottomSheet visible={updateActivityFormVisibility}>
                <UpdateActivityForm
                    cleanForm={() => clearNewActivityForm()}
                    expenses={expenses}
                    addExpenses={(expenses) => setExpenses(expenses)}
                    changeFormVisiblity={(value) => setUpdateActivityFormVisibility(value)}
                    updateActivityProgress={() => {
                        updateActivityProgress(token, activityId, expenses, setShowActivityIndicator, setErrorMessage);
                    }}
                />
            </BottomSheet>

            <BottomSheet visible={showActivityIndicator}>
                <AppActivityIndictor />
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
        marginHorizontal: 20,
        marginBottom: 10
    },
    activity: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: APP_COLOR,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    card: {
        backgroundColor: '#d9d9d4',
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: 50,
        // width: '80%',
        paddingVertical: 20,
        marginTop: 25
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    key: {
        fontSize: 20,
        fontWeight: 'bold',
        color: APP_COLOR
    },
    value: {
        fontSize: 20
    },
    new_activity_form: {
        backgroundColor: '#fff',
        height: 300,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: HEIGHT / 4,
        alignItems: 'center'
    },
    new_activity_btn_group: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    }

});

export default ActivityScreen;