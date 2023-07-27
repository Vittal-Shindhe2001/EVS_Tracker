
import axios from '../confi_axios/axios';
export const GET_USER = 'GET_USER'
export const USER_INFO = 'USER_INFO'
export const startRegisterUser = (formdata, props) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.post(`/user/register`, formdata)
                    if (user.data._id) {
                        props.props.history.push('/login')
                    }
                    else if (user.data._message) {
                        alert(user.data._message)
                    }
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}
//user login and get userinfo
export const setUserInfo = (data) => {
    return {
        type: USER_INFO,
        payload: data
    }
}

export const startGetUserInfo = (token) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.get('user/info', { headers: { 'Authorization': token } })

                    dispatch(setUserInfo(user.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

export const startLoginUser = (formdata, reset, history) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.post(`/user/login`, formdata)
                    localStorage.setItem('token', user.data.token)
                    if (localStorage.getItem('token') !== 'undefined') {
                        dispatch(startGetUserInfo(user.data.token))
                        reset()
                        history.push('/')
                    } else {
                        alert('Please Enter valid email or password')
                    }
                } catch (error) {
                    alert(error)
                }
            }
        )()

    }
}

export const setAllUser = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}
export const startAllUserInfo = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.get('user/list', { headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(setAllUser(user.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

export const startDeleteUserAccount = (props, id, formdata) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.post(`/user/account/delete/${id}`, formdata, { headers: { 'Authorization': localStorage.getItem('token') } })
                    if ((user.data.hasOwnProperty('error'))) {
                        alert(user.data.error)

                    } else {
                        localStorage.clear()
                        props.history.push('/login')
                    }

                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}