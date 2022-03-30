import React from "react"
import Navbar from "../components/navbar"
import "../style/style.css"

export default class First extends React.Component{
    constructor(){
        super()
        this.state = {
            token: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        } 
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    
    render(){
        return(
            <div className="">
                <Navbar />
                <br></br>
                <div className="container" style={{marginTop: "100px"}}>
                    <div className="row">
                        <div className="" style={{marginTop: "70px", marginLeft:"25px"}}>
                            <h1 className="my-2">
                                <strong>Laundry</strong> <strong style={{color: "#17a2b7"}}>Moklet</strong>
                            </h1>
                            <h6 className="my-2" style={{color: "grey",fontSize: "18px"}}>
                                Let’s get wet, tumble around, and dry off, together!
                            </h6>
                            <a  href="/transaksi">
                            <button className="btn btn-info" style={{marginTop: "10px"}}>
                                Entry Transaksi
                            </button>
                            </a>
                            <a  href="/">
                            <button className="btn btn-outline-dark" style={{marginTop: "10px",marginLeft:"6px"}}>
                                Dashboard
                            </button>
                            </a>
                        </div>
                        <div className="" style={{ marginLeft:"100px"}}>
                            <img src={require('../image/stry-1.svg').default} height={350}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
