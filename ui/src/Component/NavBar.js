import React,{useEffect,lazy,Suspense} from "react"
import { Link, Route, withRouter, useLocation } from "react-router-dom/cjs/react-router-dom.min"
import PrivateRoute from "../helper/PrivateRoute"
import Home from './Home'
import RegistrationForm from "./register"
import Login from "./login"
import DashBoard from "./DashBoard"
import jwt_decode from "jwt-decode";
import Account from "./Account"
import Setting from "./Setting"
// import Map from "./customer/Map"
import Booking from "./customer/Booking"
import StaffDashBoard from "./staff/StaffDashBoard"
import BookingHistrory from "./staff/BookingHistory"
import History from "./customer/History"
import AccountDelete from "./customer/AccountDelete"
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { AiFillSetting, AiFillHome, AiFillDashboard } from "react-icons/ai";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { FaMapMarkedAlt, FaRegIdBadge, FaHistory } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify"
const Map=React.lazy(()=>import('./customer/Map'))
const Navbar = (props) => {

    let token = localStorage.getItem('token')
    let tokendata
    if (token) {
        tokendata = jwt_decode(token)
    }

    const location = useLocation()
    useEffect(() => {
        console.log(location);
    }, [location])
    return (

        <div className="container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                {token && tokendata.role === 'admin' &&
                    (<>
                        <div className="container-fluid">
                            <span className="navbar-brand span" href="#"><span className="span">EV CHARGER</span></span>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/' ? "active" : ""} `} aria-current="page" to='/'><AiFillHome />Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/dashboard' ? "active" : ""} `} aria-current="page" to='/dashboard'><AiFillDashboard />DashBoard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/account' ? "active" : ""} `} aria-current="page" to='/account'><BsFillFileEarmarkPersonFill />Account</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/setting' ? "active" : ""} `} aria-current="page" to='/setting'><AiFillSetting />Setting</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" onClick={(e) => {
                                            const confirm = window.confirm('Are You Sure')
                                            if (confirm) {
                                                toast.info('See you soon..!', {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    theme: "colored",
                                                    });
                                                localStorage.clear()
                                                props.history.push('/login')
                                            }
                                        }}><BiLogOut />Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </>
                    )}
                {token && tokendata.role === 'staff' &&
                    (<>
                        <div className="container-fluid">
                            <span className="navbar-brand" href="#">EV CHARGER</span>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/' ? "active" : ""} `} aria-current="page" to='/'><AiFillHome />Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/dashboard' ? "active" : ""} `} aria-current="page" to='/dashboard'><AiFillDashboard />DashBoard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/allBooking' ? "active" : ""} `} aria-current="page" to='/allBooking'><FaHistory />SlotsHistory</Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link active" aria-current="page" to='/logout'
                                            onClick={(e) => {
                                                const confirm = window.confirm('Are You Sure')
                                                if (confirm) {
                                                    toast.info('See you soon..!', {
                                                        position: "top-right",
                                                        autoClose: 5000,
                                                        theme: "colored",
                                                        });
                                                    localStorage.clear()
                                                    props.history.push('/login')
                                                }
                                            }}><BiLogOut />LogOut</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                    )}

                {token && tokendata.role === 'Customer' &&
                    (<>
                        <div className="container-fluid">
                            <span className="navbar-brand" href="#">EV CHARGER TRACKER</span>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/' ? "active" : ""} `} aria-current="page" to='/'><AiFillHome />Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/map' ? "active" : ""} `} aria-current="page" to='/map'><FaMapMarkedAlt />Map</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/history' ? "active" : ""} `} aria-current="page" to='/history'><GrHistory />History</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname==='/setting' ? "active" : ""} `} aria-current="page" to='/setting'><AiFillSetting />Setting</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" onClick={(e) => {
                                            const confirm = window.confirm('Are You Sure')
                                            if (confirm) {
                                                toast.info('See you soon..!', {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    theme: "colored",
                                                    });
                                                localStorage.clear()
                                                props.history.push('/login')
                                            }
                                            
                                        }}><BiLogOut />LogOut</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </>
                    )}
                {
                    !token &&
                    <div className="container-fluid">
                        <span className="navbar-brand" href="#">EV CHARGER</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/'><AiFillHome />Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/register'><FaRegIdBadge />Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/login'><BiLogIn />Login</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                }
            </nav>
            <Route path='/' component={Home} exact={true} />
            <Route path='/register' component={RegistrationForm} />
            <Route path='/login'
                render={(props) => (
                    <Login {...props} />
                )} />

            {token && tokendata.role === 'admin' && <div><PrivateRoute path='/dashboard' component={DashBoard} />
                <PrivateRoute path='/account' component={Account} />
                <PrivateRoute path='/setting' component={Setting} />
            </div>}
            {token && tokendata.role === 'Customer' &&
             <div>
                <Suspense fallback={<div>Please wait...</div>}>
                <PrivateRoute path='/map' component={Map} />
                </Suspense>
                <PrivateRoute path='/booking' component={Booking} />
                <PrivateRoute path='/history' component={History} />
                <PrivateRoute path='/setting' component={AccountDelete} />

            </div>
            
            }
            {token && tokendata.role === 'staff' && <div>
                <PrivateRoute path='/dashBoard' component={StaffDashBoard} />
                <PrivateRoute path='/allBooking' component={BookingHistrory} />
                <PrivateRoute path='/booking' component={Booking} />

            </div>
            }
            <ToastContainer/>
        </div >
    )
}
export default withRouter(Navbar)