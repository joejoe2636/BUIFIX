import React, {useState} from 'react';
import { View, Text,Modal, TouchableOpacity, Image, SafeAreaView, StyleSheet} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import EmployeeModel from '../../components/EmployeeModel';
import { MaterialForm } from '../../components/MaterialForm';
import { APP_COLOR, HEIGHT, WIDTH } from '../../constants/constants';


const HomeScreen = ({navigation})=>{

    const [isModelVisible, setIsModelVisible] = useState(false);
    const [option, setOption] = useState('');

    const [materialId, setMaterialId] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [action, setAction] = useState('');
    const [materialFormVisibility, setMaterialFormVisibility] = useState(false);


    const changeModelVisible = (bool)=>{
        setIsModelVisible(bool);
    }

    const cleanMaterialForm = ()=>{
        setMaterialId(null);
        setQuantity(null);
    }


    return(
        <SafeAreaView style = {styles.container}>
            {option ? <Text>{option}</Text> : null}
            <View style = {styles.header}>
                <Text style = {styles.headerTitle}>Hello Emmanuel</Text>
            </View>
            <View style = {styles.advat}>
                <Image
                    style = {styles.image}
                    source = {require('../../../assets/construction.png')}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress = {()=>{
                        setAction('Import');
                        setMaterialFormVisibility(true)
                    }}
                    style = {styles.button}
                >
                    <Text style = {styles.buttonTitle}>Import Materials</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {()=>{
                        setAction('Export');
                        setMaterialFormVisibility(true)
                    }}
                    style = {styles.button}
                >
                    <Text style = {styles.buttonTitle}>Export Materials</Text>
                </TouchableOpacity>

                <Modal
                    transparent = {true}
                    animationType = "fade"
                    visible = {isModelVisible}
                    nRequestClose = {()=> changeModelVisible(true)}
                >
                    <EmployeeModel
                        changeModelVisible = {changeModelVisible}
                        setOption = {setOption}
                    />           
                </Modal>
            </View>

            <BottomSheet visible = {materialFormVisibility}>
                <MaterialForm
                    cleanForm = {()=>cleanMaterialForm()}
                    materialId = {materialId}
                    quantity = {quantity}
                    setMaterialId = {(mid)=> setMaterialId(mid) }
                    setQuantity = {(quantity)=> setQuantity(quantity) }
                    action = {action}
                    changeFormVisiblity = {(value) =>setMaterialFormVisibility(value)}
                />
            </BottomSheet>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        height: HEIGHT * .1,
        width: WIDTH,
        marginTop: 20
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