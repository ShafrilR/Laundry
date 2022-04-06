import React from "react"
import Navbar from "./Navbar"
import axios from "axios"
import { base_url } from "../config"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            userName: null,
            dataMember: 0,
            dataTransaksi: 0
            
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

    getUser = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({userName: user.nama})
    }

    getMember = () => {
        let url = base_url + "/member"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({dataMember: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getTransaksi = () => {
        let url = base_url + "/transaksi"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({dataTransaksi: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getID = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({id_user: user.id_user})
    }

    componentDidMount(){
        this.getUser()
        this.getID()
        this.getMember()
        this.getTransaksi()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container mt-2" style={{width: 800}}>
                    <br></br>
                    <br></br>
                    <h3 className="my-2 text-center ">
                        <strong >Hi </strong> <strong style={{color: "#17a2b7"}}>{this.state.userName}</strong>
                    </h3>
                    <h5 className="my-2 text-center" style={{color: "grey"}}>
                         Welcome Kasir - <strong style={{color: "#17a2b7"}}>Your ID - {this.state.id_user}</strong>
                    </h5>
                    <br></br>
                    <br></br>
                    <div className="row">
                        {/* member count */}
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                            <div className="card border-dark">
                                <div className="card-header">
                                    <h4 className="text-center">
                                        <strong>Data Member</strong>
                                    </h4>
                                </div>
                                <div className="card-body text-center">
                                    <h1 className="">
                                        <strong style={{color: "#17a2b7"}}>{this.state.dataMember}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* transaksi count */}
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                            <div className="card border-dark">
                            <div className="card-header">
                                    <h4 className="text-center">
                                        <strong>Data Transaksi</strong>
                                    </h4>
                                </div>
                                <div className="card-body text-center">
                                    <h1 className="">
                                        <strong style={{color: "#17a2b7"}}>{this.state.dataTransaksi}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
