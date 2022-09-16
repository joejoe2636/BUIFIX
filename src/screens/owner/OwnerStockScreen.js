import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { HEIGHT, WIDTH, APP_COLOR } from '../../constants/constants';
import { MaterialForm } from '../../components/MaterialForm';
import { BottomSheet } from 'react-native-btr';
import buifixApi from '../../api/buifixApi';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';
import { Context as AuthContext } from '../../contexts/ApplicationContext';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

const findStock = async ({ token, setStok, setShowActivityIndicator }) => {
    try {
        setShowActivityIndicator(true);

        const response = await buifixApi.get('/users/stock', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { message, stock } = response.data;

        setShowActivityIndicator(false);

        if (message === "successfull") {
            return setStok(response.data.stock);
        }
    } catch (error) {
        setShowActivityIndicator(false)
        console.log("Something went wrong");
    }
}

const OwnerStockScreen = ({ navigation }) => {

    const [materialId, setMaterialId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [action, setAction] = useState('');
    const [materialFormVisibility, setMaterialFormVisibility] = useState(false);
    const [stock, setStok] = useState([]);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false)

    const { state, pushEmail } = useContext(AuthContext);
    const { token } = state;

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            findStock({ token, setStok, setShowActivityIndicator });
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH - 30, justifyContent: 'space-between', marginTop: 10 }}>
                <Ionicons
                    name="arrow-back" size={30}
                    color={APP_COLOR}
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.goBack()}
                />
                <Feather
                    name="download-cloud" size={27}
                    color={APP_COLOR}
                    style={{ marginLeft: 10 }}
                    onPress={() => {
                        let stocktoSend = stock;
                        stocktoSend.map((item) => {
                            delete item.activity
                            delete item.owner
                        })
                        pushEmail({ data: stocktoSend, email: 'joelmuhinda4@gmail.com' })
                        alert("report sent to your email please check, and make sure that you have verifyed email")
                    }}
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerTitleText}>mid</Text>
                <Text style={styles.headerTitleText}>m name</Text>
                <Text style={styles.headerTitleText}>Qua</Text>
                <Text style={styles.headerTitleText}>U price</Text>
            </View>
            <FlatList
                data={stock}
                keyExtractor={stock => stock.name}
                renderItem={({ index, item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => alert("Only stok manager allowed to import and export materials")}
                        >
                            <View style={styles.row}>
                                <Text style={{ fontWeight: 'bold' }}>{item.mid}</Text>
                                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                <Text>{item.quantity}</Text>
                                <Text>{item.unityPrice} Rwf</Text>
                            </View>
                        </TouchableOpacity>

                    )
                }}
            />

            <BottomSheet visible={materialFormVisibility}>
                <MaterialForm
                    cleanForm={() => cleanMaterialForm()}
                    materialId={materialId}
                    quantity={quantity}
                    setMaterialId={(mid) => setMaterialId(mid)}
                    setQuantity={(quantity) => setQuantity(quantity)}
                    action={action}
                    changeFormVisiblity={(value) => setMaterialFormVisibility(value)}
                />
            </BottomSheet>

            <BottomSheet visible={showActivityIndicator}>
                <AppActivityIndictor />
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25
    },
    header: {
        marginTop: HEIGHT * .05,
        width: WIDTH - 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#c5d9c7',

    },
    headerTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#c5d9c7',
        width: WIDTH - 60,
        marginTop: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 5,
        flex: 1
    }
});

export default OwnerStockScreen;