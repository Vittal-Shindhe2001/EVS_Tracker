import { toast } from "react-toastify";
import axios from "../confi_axios/axios";
export const ADD_BOOKING = 'ADD_BOOKING'
export const GET_BOOKING = 'GET_BOOKING'
export const GETALL_BOOKING = 'GETALL_BOOKING'
export const SETALL_BOOKING = 'SETALL_BOOKING'

export const setBooking = (data) => {
    return {
        type: ADD_BOOKING,
        payload: data
    }
}

export const getBooking = (data) => {
    return {
        type: GET_BOOKING,
        payload: data
    }
}

export const getAllBookings = (data) => {
    return {
        type: GETALL_BOOKING,
        payload: data
    }
}

export const setAllBooking = (data) => {
    return {
        type: SETALL_BOOKING,
        payload: data
    }
}

export const startBooking = (props,formData, reset,tokendata) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const booking = await axios.post('/api/booking', formData, { headers: { 'Authorization': localStorage.getItem('token') } })
                    if (booking.data.hasOwnProperty('error')) {
                        alert()
                        toast.warn(booking.data.error, {
                            position: "top-right",
                            autoClose: 5000,
                            theme: "colored",
                            });
                    } else {
                        dispatch(setBooking(booking.data))
                        reset()
                        toast.success('Booked successfully', {
                            position: "top-right",
                            autoClose: 5000,
                            theme: "colored",
                            });
                       {tokendata.role='Customer'? props.history.push('/history'): props.history.push('/allBooking')}
                    }
                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        theme: "colored",
                        });
                }
            }
        )()
    }
}

export const startGetUserBooking = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const booking = await axios.get(`/api/booking`, { headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(getBooking(booking.data))

                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        theme: "colored",
                        });
                }
            }
        )()
    }
}


export const startGetStaffBooking = (stationId) => {
    return async (dispatch) => {
        try {
            const queryParams = { stationId: stationId };
            const booking = await axios.get(`/api/staff/booking`, {
                params: queryParams,
                headers: { Authorization: localStorage.getItem("token") },
            });
            dispatch(getAllBookings(booking.data));
        } catch (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
                });
        }
    };
};


export const startGetAllBooking = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const booking = await axios.get(`/api/all/booking`, { headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(setAllBooking(booking.data))
                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        theme: "colored",
                        });
                }
            }
        )()
    }
}