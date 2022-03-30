import React from "react"
import {Link} from "react-router-dom"
import "../style/style.css"
class Navbar extends React.Component{
    Logout= () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/login"
    }
    render(){
        return(
            <div className="container">
                <div className="navbar navbar-expand-lg bg-white sticky-top" style={{justifyContent: "space-between", padding: "8px"}}>
                    <div>
                    <a className="navbar-brand">
                        <img src={require('../image/logo2.svg').default} height={65}/>
                    </a>
                    </div>

                    {/* show and hide menu */}
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* menu */}
                    <div style={{display: "flex"}}>
                    <div id="menu" className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto " style={{fontSize: "18px", fontWeight: 500, color: "black"}}>
                            <li className="nav-item">
                                <Link to="/page" className="nav-link" style={{color: "black"}}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link" style={{color: "black"}}>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/member" className="nav-link" style={{color: "black"}}>
                                    Member
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user" className="nav-link" style={{color: "black"}}>
                                    User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/paket" className="nav-link" style={{color: "black"}}>
                                    Paket
                                </Link>
                            </li>
                            <li className="nav-item hvr">
                                <Link to="/transaksi" className="nav-link" style={{color: "black"}}>
                                    Transaksi
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => this.Logout()} style={{color: "#17a2b7", }} >
                                    Logout <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16" style={{marginLeft: "3px", marginBottom: "3px"}}>
                                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                    </svg>
                                </Link>
                            </li>
                            {/* style={{marginLeft: "3px", marginBottom: "3px"}} */}
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Navbar;
