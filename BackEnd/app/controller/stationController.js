
const Booking = require('../models/booking')
const Station = require('../models/station')

const stationController = {}

stationController.create = async (req, res) => {
    try {
        const body = req.body
        const station = new Station(body)
        const res = await station.save()
        if (res) {
            res.json(res)
        } else {
            res.json({})
        }
    }
    catch (err) {
        res.json(err)
    }
}

stationController.show = async (req, res) => {
    try {
        const id = req.params.id
        const station = await Station.findById(id)
        if (station) {
            res.json(station)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}
//list all the station
stationController.list = async (req, res) => {
    try {
        const station = await Station.find()
        if (station) {
            res.json(station)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}
//update the 
stationController.update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { chargingOptionId } = req.query;
        const station = await Station.findById(id);
        if (station) {
            // Update the station details
            station.set(body);
            // Check if the "geo" property exists in the request body
            if (body.geo) {
                // Update the "geo" object within the station details
                station.geo = { ...station.geo, ...body.geo };
            }
            await station.save();

            if (chargingOptionId) {
                const resultId = station.chargingOptions.map((ele => ele._id !== chargingOptionId))
                if (resultId !== -1) {
                    // Update an existing charging option
                    station.chargingOptions[resultId] = { ...station.chargingOptions[resultId], ...body }
                } else {
                    //add a new charging option
                    const newOption = { _id: chargingOptionId, ...body }
                    station.chargingOptions.push(newOption)
                }
                await station.save();
            }
            res.json(station);
        } else {
            res.status(404).json({ error: "Station not found" });
        }
    }
    catch (err) {
        res.json(err)
    }
};

//delete station and that related booking also delete
stationController.deletemany = async (req, res) => {
    try {
        const { id } = req.params
        const station =  Station.findByIdAndDelete(id)
        const booking=Booking.deleteMany({stationId:id})
        const promise=await Promise.all([station,booking])
        if (promise) {
            res.json(promise[0])
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

//find station on staff name
stationController.findOnStaffName = async (req, res) => {
    try {
        const { staff } = req.query
        const result = await Station.find({ staff: { $regex: staff, $options: 'i' } });
        if (result) {
            res.json(result)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}


module.exports = stationController