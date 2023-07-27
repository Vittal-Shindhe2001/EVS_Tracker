
import axios from "../confi_axios/axios"

export const ADD_STATION = 'ADD_STATION'
export const GET_STATION = 'GET_STATION'
export const DELETE_STATION = 'DELETE_STATION'
export const STAFF_STATION = 'STAFF_STATION'
export const EDIT_STATION = 'EDIT_STATION'

export const setStation = (data) => {
    return {
        type: ADD_STATION,
        payload: data
    }
}

export const startRegisterStation = (formData, resetForm) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const station = await axios.post('/api/station', formData, { headers: { "Authorization": localStorage.getItem('token') } })
                    if (station.data.hasOwnProperty('error')) {
                        alert(station.data.error)
                    } else {
                        dispatch(setStation(station.data))
                        resetForm()
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        )()
    }
}

//get All stations details
export const setAllStations = (data) => {
    return {
        type: GET_STATION,
        payload: data
    }
}

export const startGetAllStations = () => {
    return (dispatch) => {
        (
            async () => {
                const station = await axios.get('/api/station', { headers: { 'Authorization': localStorage.getItem('token') } })
                dispatch(setAllStations(station.data))
            }
        )()
    }
}

//delete station
export const setDeleteStation = (data) => {
    return {
        type: DELETE_STATION,
        payload: data
    }
}

export const startDeleteStation = (id) => {
    return (dispatch) => {
        (
            async () => {
                const station = await axios.delete(`/api/station/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
                dispatch(setDeleteStation(station.data))
            }
        )()
    }
}

//FIND STATION ON STAFF NAME
export const setStaffStation = (data) => {
    return {
        type: STAFF_STATION,
        payload: data
    }
}
export const startStaffStation = (name) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const staff = await axios.get(`/station/staffname?staff=${name}`, { headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(setStaffStation(staff.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

//Edit station details
export const setEditStation = (data) => {
    return {
        type: EDIT_STATION,
        payload: data
    }
}

export const StartEditStation = (id, chargingOptionId, formData) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const queryParams = { chargingOptionId: chargingOptionId }
                    const edit = await axios.put(`/api/station/${id}`, formData, { params: queryParams, headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(setEditStation(edit.data))

                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}