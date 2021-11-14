import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import buifixApi from '../api/buifixApi';


const AuthReducer = (state, action)=>{

    switch(action.type){
        case 'signin':
            return {...state, user: action.payload.user, token: action.payload.token}

        case 'set_error':
            return { ...state, errorMessage: action.payload}
        case 'clear_error':
            return { ...state, errorMessage: ''}
        
        default:
            return state
    };
};

const navigateTo = (userType, navigation)=>{
    switch(userType){

        case 0:
            return navigation.navigate("OwnerFlow")
        case 1:
            return navigation.navigate("EngineerFlow")
        case 2:
            return navigation.navigate("StockerFlow")
        default:
            return state;
    }
}

const signup = dispatch => async({fname, lname, email, phone, country, nid, password}, navigation, closeActivityIndicator)=>{
    try {
        const response = await buifixApi.post('/users/signup', { fname, lname, email, phone, country, nid, password});
        const { message, status, user}  = response.data;
        
        await AsyncStorage.setItem('@buifix_data', JSON.stringify(user));
        dispatch({type: 'signin', payload: {user, token: user.token}})

        closeActivityIndicator();
        navigateTo(user.userType, navigation)

    } catch (error) {
        closeActivityIndicator();
        dispatch({type: 'set_error', payload: error.response.data.error})
    }
}

const signin = dispatch => async({email, password}, closeActivityIndicator, navigation)=>{

    try {
        const response = await buifixApi.post('/users/signin', {email, password});

        const { message, status, user} = response.data;
        await AsyncStorage.setItem('@buifix_data', JSON.stringify(user));

        dispatch({type: 'signin', payload: {user, token: user.token}})

        closeActivityIndicator()

        navigateTo(user.userType, navigation)

    } catch (error) {
        console.log("error")
        closeActivityIndicator()
        dispatch({type: 'set_error', payload: error.response.data.error})
    }
}

const tryLocalSignin = dispatch => async({navigation})=>{

    const data = await AsyncStorage.getItem('@buifix_data')
    const user = JSON.parse(data)
  
    if(data){
        dispatch({type: 'signin', payload: {user, token: user.token}})
        navigateTo(user.userType, navigation)
    }else{
        navigation.navigate("Signin")
    }
  }

const signout = dispatch => async(token, callback)=>{
    try {
        const response = await buifixApi.post('/users/signout', {
            //..
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        await AsyncStorage.removeItem('@buifix_data');
  
        callback ? callback() : null;
    } catch (error) {
        dispatch({type: 'set_error', payload: error.response.data.error})
    }
}

const registerEmployee = dispatch => async({fname, lname, nid, email, salary, password, employeeType, token}, callback, closeActivityIndicator)=>{
    try {
        const response = await buifixApi.post(`/admin/register/employee/${employeeType}`, {
            fname, lname, nid, email, salary, password
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if(response.data.message === "sucessfull"){

            dispatch({type: 'set_error', payload: 'Register Employee Successfull'})
            return callback ? callback(): null
        }

        dispatch({type: 'set_error', payload: 'something went wrong'})
    } catch (error) {
        closeActivityIndicator();
        dispatch({type: 'set_error', payload: error.response.data.error})
    }
}

const registerWageEmployee = dispatch => async({names, nid, phone, wage, token}, closeActivityIndicator)=>{
    try {
        const response = await buifixApi.post('/users/register/wage_employee', {
            names, nid, phone, wage
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        closeActivityIndicator();
    } catch (error) {
        closeActivityIndicator();
        dispatch({type: 'set_error', payload: error.response.data.error})
    }
}

const setErrorMessage = dispatch =>(error)=> dispatch({type: 'set_error', payload: error})
const clearErrorMessage = dispatch =>()=> dispatch({type: 'clear_error'})

export const { Context, Provider } = createDataContext(
    AuthReducer,
    { signup, signin, tryLocalSignin, signout, registerEmployee, registerWageEmployee, setErrorMessage, clearErrorMessage},
    {user: null, token: null, errorMessage: ''}
)