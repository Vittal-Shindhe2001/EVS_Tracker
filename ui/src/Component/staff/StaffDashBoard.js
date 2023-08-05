import React from "react";
import Station from "../Station";
import StaffStations from "./StaffStations";

const StaffDashBoard=(props)=>{

    return(
        <div className="container-fluid">
        <div className="row">
            {/* <div className="col-md-5">
                <Station />
            </div> */}
            <div className="col-md-6 divPadding ">
                <StaffStations />
            </div>
            
        </div>
    </div>
    )
}
export default StaffDashBoard