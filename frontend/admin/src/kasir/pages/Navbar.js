import React from "react"
import {Link} from "react-router-dom"
class Navbar extends React.Component{
    Logout= () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/login"
    }
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
                <a className="navbar-brand">
                    Laundry Moklet
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* menu */}
                <div id="menu" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/page2" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/kasir" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/memberK" className="nav-link">
                                Member
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transaksiK" className="nav-link">
                                Transaksi
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Navbar;
