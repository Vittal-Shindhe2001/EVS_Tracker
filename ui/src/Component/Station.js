
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { StartEditStation, startRegisterStation } from '../Actions/stationAction'
import Location from './Location'

const Station = (props) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [landmark, setLandmark] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [chargingOptions, setChargingOptions] = useState([{ portType: '' }])
    const [staff, setStaff] = useState('')
    const [chargingOptionId, setChargingOptionIds] = useState('')
    const [showMap, setShowMap] = useState(false)

    useEffect(() => {
        if (props.data) {
            setName(props.data.name || "")
            setAddress(props.data.address || "")
            setLandmark(props.data.landmark || "")
            setLatitude(props.data.geo.latitude || "")
            setLongitude(props.data.geo.longitude || "")
            setChargingOptions(props.data.chargingOptions || [{ portType: "" }])
            setStaff(props.data.staff || "")
            // Extract chargingOptions IDs
            const chargingOptionIds = props.data.chargingOptions.map((option) => option._id)
            setChargingOptionIds(chargingOptionIds)
        }
    }, [props.data])

    const dispatch = useDispatch()

    const handleChangeOption = (index, value) => {
        const options = [...chargingOptions]
        options[index].portType = value
        setChargingOptions(options)
    }
    const handleAddOption = () => {
        setChargingOptions([...chargingOptions, { portType: '' }])
    }

    const handleRemoveOption = (index) => {
        const options = [...chargingOptions]
        options.splice(index, 1)
        setChargingOptions(options)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        // Create an object with the form data
        const formData = {
            name,
            address,
            landmark,
            geo: {
                latitude,
                longitude
            },
            chargingOptions,
            staff
        }

        // Reset the form
        const resetForm = () => {
            setName('')
            setAddress('')
            setLandmark('')
            setLatitude('')
            setLongitude('')
            setChargingOptions([{ portType: '' }])
            setStaff('')
        }

        // send it to a server
        if (props.data) {
            dispatch(StartEditStation(props.data._id, chargingOptionId, formData))
            props.toggle()
        } else {
            dispatch(startRegisterStation(formData, resetForm))
        }
    }

    // //LOCATION 
    const location = (latitude, longitude) => {
        setLatitude(latitude)
        setLongitude(longitude)

    }
    return (
        <div className="container">
            <h2>Add Station</h2>
            <div className="card shodow" >
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="form-label text-left" >Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                className="form-control inputBorder"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                className="form-control"
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="landmark">Landmark</label>
                            <input
                                type="text"
                                id="landmark"
                                value={landmark}
                                className="form-control"
                                onChange={(e) => setLandmark(e.target.value)}
                                required
                            />
                        </div>
                        {showMap ?
                            <div className='card shodow'>
                                <div className='card-body'>
                                    <button className='btn btn-success' onClick={(() => { setShowMap(!showMap) })}>Ok</button>
                                    <Location geo={location} />
                                </div>
                            </div>
                            : <button className='btn btn-primary' onClick={() => { setShowMap(!showMap) }}>Location</button>

                        }
                        {latitude && longitude && <h5>Latitude:{latitude},Longitude:{longitude}  </h5>}
                        <div>
                            <label className="form-label labelFont" >ChargingOptions(portTypes)</label>
                            {chargingOptions.map((option, index) => (
                                <div key={index} className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={option.portType}
                                        onChange={(e) => handleChangeOption(index, e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveOption(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddOption}
                            >
                                Add Option
                            </button>
                        </div>

                        <div>
                            <label htmlFor="staff">Staff</label>
                            <input
                                type="text"
                                id="staff"
                                value={staff}
                                className="form-control"
                                onChange={(e) => setStaff(e.target.value)}
                            />
                        </div>

                        <button type="submit" className='btn btn-primary'>{props.data ? 'Edit' : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Station