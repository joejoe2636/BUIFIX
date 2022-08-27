import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Platform, StatusBart, SafeAreaView, StyleSheet } from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../../constants/constants';
import { Context as AppContext } from '../../contexts/ApplicationContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';
import { BottomSheet } from 'react-native-btr';
import buifixApi from '../../api/buifixApi';

const fetchAllActivity = async (token, setActivity, setShowActivityIndicator, setErrorMessage) => {
    try {
        setShowActivityIndicator(true);
        const response = await buifixApi.get('/admin/actities', {
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

const ActivityScreen = ({ navigation }) => {
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [activites, setActivity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { state } = useContext(AppContext);
    const { user, token } = state;

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setErrorMessage('')
            fetchAllActivity(token, setActivity, setShowActivityIndicator, setErrorMessage)
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView>
            {/* <View>
                <Text>MAnage Employee</Text>
            </View> */}
            <FlatList
                data={activites}
                keyExtractor={activity => activity.name}
                renderItem={({ index, item }) => {
                    return (
                        <View>
                            <View style={styles.activity}>
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
                                        <Text style={styles.value}>{item.budget - item.expenses} Rwf</Text>
                                    </View>

                                    <View style={styles.row}>
                                        <Text style={styles.key}>Progress : </Text>
                                        <Text style={styles.value}> {(item.expenses * 100) / item.budget} %</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    )
                }}
            />
            <BottomSheet visible={showActivityIndicator}>
                <AppActivityIndictor />
            </BottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        paddingHorizontal: 20,
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
    }
});

export default ActivityScreen;