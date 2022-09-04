import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import buifixApi from '../api/buifixApi';


const AuthReducer = (state, action) => {

    let employees = null;
    let remainedEmployeeList = null;

    switch (action.type) {
        case 'signin':
            return { ...state, user: action.payload.user, token: action.payload.token }

        case 'set_error':
            return { ...state, errorMessage: action.payload }
        case 'clear_error':
            return { ...state, errorMessage: '' }

        case 'add_payed_employee':
            remainedEmployeeList = state.employeeList;
            employees = state.paidEmployee;
            employees.push(action.payload);
            remainedEmployeeList = remainedEmployeeList.filter((employee) => employee != action.payload)
            return { ...state, employeeList: remainedEmployeeList, paidEmployee: employees }

        case 'add_un_payed_employee':
            remainedEmployeeList = state.employeeList;
            employees = state.unpaidEmployee;
            employees.push(action.payload);
            remainedEmployeeList = remainedEmployeeList.filter((employee) => employee != action.payload)
            return { ...state, employeeList: remainedEmployeeList, unpaidEmployee: employees }

        case 'update_employee_list':
            return { ...state, employeeList: action.payload }

        case 'emailresult':
            return { ...state, emailResult: action.payload }

        case 'clear_cookies':
            return { ...state, paidEmployee: [], unpaidEmployee: [], employeeList: [] }
        default:
            return state
    };
};

const navigateTo = (userType, navigation) => {
    switch (userType) {

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

const signup = dispatch => async ({ fname, lname, email, phone, country, nid, password }, navigation, closeActivityIndicator) => {
    try {
        const response = await buifixApi.post('/users/signup', { fname, lname, email, phone, country, nid, password });
        const { message, status, user } = response.data;

        await AsyncStorage.setItem('@buifix_data', JSON.stringify(user));
        dispatch({ type: 'signin', payload: { user, token: user.token } })

        closeActivityIndicator();
        navigateTo(user.userType, navigation)

    } catch (error) {
        closeActivityIndicator();
        dispatch({ type: 'set_error', payload: error.response.data.error })
    }
}

const signin = dispatch => async ({ email, password }, closeActivityIndicator, navigation) => {

    try {
        const response = await buifixApi.post('/users/signin', { email, password });

        const { message, status, user } = response.data;
        await AsyncStorage.setItem('@buifix_data', JSON.stringify(user));

        dispatch({ type: 'signin', payload: { user, token: user.token } })

        closeActivityIndicator()

        navigateTo(user.userType, navigation)

    } catch (error) {
        closeActivityIndicator()
        dispatch({ type: 'set_error', payload: error.response.data.error })
    }
}

const tryLocalSignin = dispatch => async ({ navigation }) => {

    const data = await AsyncStorage.getItem('@buifix_data')
    const user = JSON.parse(data)

    if (data) {
        dispatch({ type: 'signin', payload: { user, token: user.token } })
        navigateTo(user.userType, navigation)
    } else {
        navigation.navigate("Signin")
    }
}

const signout = dispatch => async (token, callback) => {
    try {
        const response = await buifixApi.post('/users/signout', {
            //..
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        await AsyncStorage.removeItem('@buifix_data');

        callback ? callback() : null;
    } catch (error) {
        dispatch({ type: 'set_error', payload: error.response.data.error })
    }
}

const registerEmployee = dispatch => async ({ fname, lname, nid, email, salary, password, employeeType, token }, callback, closeActivityIndicator) => {
    try {
        const response = await buifixApi.post(`/admin/register/employee/${employeeType}`, {
            fname, lname, nid, email, salary, password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.message === "sucessfull") {

            dispatch({ type: 'set_error', payload: 'Register Employee Successfull' })
            return callback ? callback() : null
        }

        dispatch({ type: 'set_error', payload: 'something went wrong' })
    } catch (error) {
        closeActivityIndicator();
        dispatch({ type: 'set_error', payload: error.response.data.error })
    }
}

const registerWageEmployee = dispatch => async ({ names, nid, phone, wage, token }, closeActivityIndicator) => {
    try {
        const response = await buifixApi.post('/users/register/wage_employee', {
            names, nid, phone, wage
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        closeActivityIndicator();
    } catch (error) {
        closeActivityIndicator();
        dispatch({ type: 'set_error', payload: error.response.data.error })
    }
}
const payWageEmployee = dispatch => async ({ employees, token }, closeActivityIndicator) => {
    try {
        await buifixApi.post('/users/pay/wage_employee', employees, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        resetCookies();
        closeActivityIndicator();
    } catch (error) {
        closeActivityIndicator();
        console.log({ error: error.response.data })
        dispatch({ type: 'set_error', payload: error.response.data.error })
    }
}

const addPaidEmployee = dispatch => (employee) => dispatch({ type: 'add_payed_employee', payload: employee })
const addUnPaidEmployee = dispatch => (employee) => dispatch({ type: 'add_un_payed_employee', payload: employee })
const updateEmployeeList = dispatch => (employee) => dispatch({ type: 'update_employee_list', payload: employee })
const setErrorMessage = dispatch => (error) => dispatch({ type: 'set_error', payload: error })
const clearErrorMessage = dispatch => () => dispatch({ type: 'clear_error' })
const resetCookies = dispatch => () => dispatch({ type: 'clear_cookies' })

const pushEmail = dispatch => async ({ data, email }) => {
    const response = await buifixApi.post('/pushemail', { data, email });
    dispatch({ type: 'emailresult', payload: response?.data?.message })
}

export const { Context, Provider } = createDataContext(
    AuthReducer,
    { signup, signin, tryLocalSignin, signout, registerEmployee, registerWageEmployee, addPaidEmployee, addUnPaidEmployee, updateEmployeeList, payWageEmployee, setErrorMessage, clearErrorMessage, pushEmail },
    { user: null, token: null, errorMessage: '', paidEmployee: [], unpaidEmployee: [], employeeList: [], emailResult: '' }
)