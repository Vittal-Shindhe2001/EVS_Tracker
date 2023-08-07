import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteStation, startGetAllStations, setSearchStation, startStationName } from "../../Actions/stationAction";
import Station from "../Station";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import StationLocation from "./StationLocation";



export const AllStationD = (props) => {
    const [modal, setModal] = useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };
    const [edit, setEdit] = useState({});
    const [location, setLocation] = useState({});
    const [search, setSearch] = useState('')
    const [display, setDisplay] = useState(false)
    const [sort,setSort]=useState('')
    const [sorted,setSorted]=useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetAllStations());
    }, [dispatch, search]);

    const station = useSelector((state) => {
        return state;
    });
    //handle delete station
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure?");
        if (confirm) {
            dispatch(startDeleteStation(id));
        }
        // dispatch(startDeleteStation(id))
    };
    //handle Edit station
    const handleEdit = (ele) => {
        setShow1(false);
        setShow(true);
        toggle();
        setEdit(ele);
    };

    const handleLocation = (ele) => {
        setShow(false);
        setShow1(true);
        toggle();
        setLocation(ele);
    }
    //search
    const handleSearch = (e) => {
        setDisplay(true)
        setSearch(e.target.value)
        dispatch(setSearchStation(search))
    }
    //sorting 
    const handleSort=(e)=>{
        setSorted(!sort)
        setSort(e.target.value)
        dispatch(startStationName(sort))
    }
    return (
        <div className="card-container">

            <div className="row">
                <div className="col-md-2">
                    <form>
                        <input
                            className="form-control"
                            type="text"
                            value={search}
                            onChange={handleSearch}

                            placeholder="Search"
                        />
                    </form>
                </div>
                <div className="col-md-8">

                </div>
                <div className="col-md-2">
                    <form>
                        <select name="sort" id="sort" className="sort-selection-style" value={sort} onChange={handleSort}>
                            <option value='#' >sort </option>
                            <option value='1' >a-z</option>
                            <option value='-1' >z-a</option>
                        </select>
                    </form>
                </div>
            </div>

            {display ?
                <>
                    {station.station.search.length > 0 ?
                        <div>
                            <h3>List of Station({station.station.search.length})</h3>

                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">


                                {station.station.search.map((ele, i) => (
                                    <div key={i} className="col mb-4">
                                        <div className="card h-100">
                                            <div className="card-header">
                                                <h4>Station Name:{ele.name}</h4>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    <strong>Address:</strong> {ele.address}
                                                </p>
                                                <p>
                                                    <strong>Landmark:</strong> {ele.landmark}
                                                </p>
                                                <p>
                                                    <strong>Staff:</strong> {ele.staff}
                                                </p>
                                                <p>
                                                    <strong>Charging Options:</strong>
                                                </p>
                                                <ul>
                                                    {station.station &&
                                                        ele.chargingOptions &&
                                                        ele.chargingOptions.map((option, j) => (
                                                            <li key={j}>{option.portType}</li>
                                                        ))}
                                                </ul>
                                            </div>
                                            <div className="card-footer">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => {
                                                        handleLocation(ele.geo);
                                                    }}
                                                >
                                                    Location
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={(e) => {
                                                        handleEdit(ele);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger "
                                                    onClick={(e) => {
                                                        handleDelete(ele._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> : (
                            <h1>No Station Found</h1>
                        )
                    }
                </>
                :
                <>
                    {station.station.data.length !== 0 ? (
                        <div>
                            <h3>List of  Station({station.station.data.length})</h3>

                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">


                                {station.station.data.map((ele, i) => (
                                    <div key={i} className="col mb-4">
                                        <div className="card h-100">
                                            <div className="card-header">
                                                <h4>Station Name:{ele.name}</h4>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    <strong>Address:</strong> {ele.address}
                                                </p>
                                                <p>
                                                    <strong>Landmark:</strong> {ele.landmark}
                                                </p>
                                                <p>
                                                    <strong>Staff:</strong> {ele.staff}
                                                </p>
                                                <p>
                                                    <strong>Charging Options:</strong>
                                                </p>
                                                <ul>
                                                    {station.station &&
                                                        ele.chargingOptions &&
                                                        ele.chargingOptions.map((option, j) => (
                                                            <li key={j}>{option.portType}</li>
                                                        ))}
                                                </ul>
                                            </div>
                                            <div className="card-footer">
                                                <button
                                                    className="btn btn-primary "
                                                    onClick={() => {
                                                        handleLocation(ele.geo);
                                                    }}
                                                >
                                                    Location
                                                </button>
                                                <button
                                                    className="btn btn-secondary "
                                                    onClick={(e) => {
                                                        handleEdit(ele);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e) => {
                                                        handleDelete(ele._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <h1>No Station Found</h1>
                    )
                    }
                </>
            }


            {show && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Edit Station</ModalHeader>
                    <ModalBody>
                        <div className="col-md-12">
                            <Station data={edit} toggle={toggle} />
                        </div>
                    </ModalBody>
                </Modal>
            )}
            {show1 && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Station Location</ModalHeader>
                    <ModalBody>
                        <div className="col-md-12">
                            <StationLocation data={location} />
                        </div>
                    </ModalBody>
                </Modal>
            )}
        </div>
    );
};