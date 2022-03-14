import React from "react"
import Navbar from "./Navbar"
import "../style2.css"

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
            <div className="cov">
                <Navbar />
                <div className="container mt-2">
                    <div className="title">
                        <h1 className="my-2 text-center text-white">
                            <strong>Laundry Moklet</strong>
                        </h1>
                        <h5 className="my-2 text-center text-white">
                            - Let’s get wet, tumble around, and dry off, together -
                        </h5>
                    </div>
                </div>
            </div>
        )
    }
}
