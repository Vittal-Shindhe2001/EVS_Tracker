import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startStaffStation } from "../../Actions/stationAction";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "../../confi_axios/axios";
const StaffStations = (props) => {
    const history = useHistory()
    const token = localStorage.getItem('token')
    let tokendata
    if (token) {
        tokendata = jwtDecode(token)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startStaffStation(tokendata.name))
    }, [dispatch, tokendata.name])
    const staff = useSelector((state) => {
        return state.station.data
    })
    const handleBook = (ele) => {
        if (window.confirm("You want to book the slot")) {
            history.push({
                pathname: "/booking",
                state: { station: ele }
            });
        }
    }
    const handleLocation = async (ele) => {
        const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${ele.latitude}+${ele.longitude}&key=21f121c390e64295a445928b4d642f54`)
        const res = (result.data.results.map(ele => ele.components.city
        ));
        alert(res)
    }
    return (
        <div className="card shodow divWidth">
            <div className="card-body ">
            {staff && staff.length > 0 ? (
                <table className="table-responsive">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>address</th>
                            <th>Landmark</th>
                            <th>Location</th>
                            <th>portTypes</th>
                            <th>Staff</th>
                        </tr>
                    </thead>
                    <tbody>
                            {staff && staff?.map((ele) => (
                                <tr key={ele._id}>
                                    <td>{ele.name}</td>
                                    <td>{ele.address}</td>
                                    <td>{ele.landmark}</td>
                                    <td><button className="btn btn-primary" onClick={() => { handleLocation(ele.geo) }}>Location</button></td>
                                    <td><select>
                                        {ele.chargingOptions.map((portType, i) => {
                                            return <option key={i}>{portType.portType}</option>
                                        })
                                        }
                                    </select></td>
                                    <td>{ele.staff}</td>
                                    <td>
                                        <button onClick={() => { handleBook(ele) }}>Book</button>

                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>): (
                          
                                <h1>No stations found.</h1>
                        )}
            </div>
        </div>
    )
}
export default StaffStations