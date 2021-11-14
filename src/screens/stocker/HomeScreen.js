import React, {useState, useEffect, useContext} from 'react';
import { View, Text,Modal, TouchableOpacity, Image, SafeAreaView, StyleSheet} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import EmployeeModel from '../../components/EmployeeModel';
import { MaterialForm } from '../../components/MaterialForm';
import { APP_COLOR, HEIGHT, WIDTH } from '../../constants/constants';
import { Context as AuthContext } from '../../contexts/ApplicationContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';
import buifixApi from '../../api/buifixApi';

const exMaterial = async(mid, quantity, type, token, setErrorMessage, setShowActivityIndicator)=>{
    try {
        setShowActivityIndicator(true);

        let response = null;

        switch(type){

            case 'import':
                response = await buifixApi.patch('/users/register/materials/min', {
                    mid, quantity
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
            
            case 'export':
                response = await buifixApi.patch('/users/register/materials/mout', {
                    mid, quantity
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });

            default: 
                return setShowActivityIndicator(false);
        }
    } catch (error) {
        setErrorMessage(error.response.data.error);
        setShowActivityIndicator(false);
    }
}

const HomeScreen = ({navigation})=>{

    const [isModelVisible, setIsModelVisible] = useState(false);
    const [option, setOption] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [materialId, setMaterialId] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [action, setAction] = useState('');
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [materialFormVisibility, setMaterialFormVisibility] = useState(false);

    const { state } = useContext(AuthContext);
    const { token, user } = state;


    const changeModelVisible = (bool)=>{
        setIsModelVisible(bool);
    }

    const cleanMaterialForm = ()=>{
        setMaterialId(null);
        setQuantity(null);
    }

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            cleanMaterialForm()
            setErrorMessage('')
        });

        return unsubscribe;
    }, [navigation]);

    return(
        <SafeAreaView style = {styles.container}>
            {option ? <Text>{option}</Text> : null}
            <View style = {styles.header}>
                <Text style = {styles.headerTitle}>Hello {user.fname}</Text>
            </View>
            {errorMessage ? <Text style = {{color: 'red'}}>{errorMessage}</Text> : null}
            <View style = {styles.advat}>
                <Image
                    style = {styles.image}
                    source = {require('../../../assets/construction.png')}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress = {()=>{
                        setAction('import');
                        setMaterialFormVisibility(true)
                    }}
                    style = {styles.button}
                >
                    <Text style = {styles.buttonTitle}>Import Materials</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {()=>{
                        setAction('export');
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
                    movMaterial = {()=>exMaterial(materialId, quantity, action, token, setErrorMessage, setShowActivityIndicator)}
                />
            </BottomSheet>

            <BottomSheet visible = {showActivityIndicator}>
                <AppActivityIndictor/>
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