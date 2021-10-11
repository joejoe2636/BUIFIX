import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, StatusBart, SafeAreaView, StyleSheet} from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../../constants/constants';

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
            <FlatList
                data = {activites}
                keyExtractor = {activity => activity.name}
                renderItem = {({index, item})=>{
                    return(
                        <View>
                            <View style = {styles.activity}>
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
                                
                            </View>
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