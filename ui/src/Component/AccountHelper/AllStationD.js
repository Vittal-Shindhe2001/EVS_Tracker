import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteStation, startGetAllStations } from "../../Actions/stationAction";
import Station from "../Station";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import axios from "../../confi_axios/axios";
import { toast } from "react-toastify";


export const AllStationD = (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [edit, setEdit] = useState({})
    const dispatch = useDispatch()
    const station = useSelector(state => { return state.station })
    useEffect(() => {
        dispatch(startGetAllStations())
    }, [dispatch])
    //handle delete station
    const handleDelete = (id) => {
        const confirm=window.confirm("Are you sure?")
        if(confirm){
            dispatch(startDeleteStation(id))
        }
        // dispatch(startDeleteStation(id))
    }
    //handle Edit station
    const handleEdit = (ele) => {
        toggle()
        setEdit(ele)
    }

    const handleLocation = async (ele) => {
        const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${ele.latitude}+${ele.longitude}&key=21f121c390e64295a445928b4d642f54`)
        const res = (result.data.results.map(ele => ele.components.city
        ));
        alert(res)
    }
    return (
        <div className="table-container">
            <div className="card shodow">
                <div className="card-body">
                    {station.data.length !== 0 ? <div> <h3>List Of All Station({station.data.length})</h3>
                        <div className="table-responsive">
                            <table >
                                <thead>
                                    <tr>
                                        <th>S.no</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Landmark</th>
                                        <th>Staff</th>
                                        <th>Location</th>
                                        <th>ChargingOptions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {station && station.data.map((ele, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{ele.name}</td>
                                            <td>{ele.address}</td>
                                            <td>{ele.landmark}</td>
                                            <td>{ele.staff}</td>
                                            <td><button className="btn btn-primary" onClick={() => { handleLocation(ele.geo) }}>Location</button></td>
                                            <td><select className="form-select">
                                                {station && ele.chargingOptions && ele.chargingOptions.map((ele, j) => {
                                                    return <option key={j}>{ele.portType}</option>
                                                })}
                                            </select></td>
                                            <td><button className="btn btn-secondary" onClick={(e) => { handleEdit(ele) }}>Edit</button></td>
                                            <td><button className="btn btn-danger" onClick={(e) => { handleDelete(ele._id) }}>Delete</button></td>

                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div> : <h1>No Station Found</h1>}
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit Station</ModalHeader>
                <ModalBody >
                    <div className="col-md-12">
                        <Station data={edit} toggle={toggle} />
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
