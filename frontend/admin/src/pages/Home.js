import React from "react"
import Navbar from "../components/navbar"
import axios from "axios"
import { base_url } from "../config.js"
import "../style/style.css"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            userName: null,
            dataMember: 0,
            dataUser: 0,
            dataPaket: 0,
            dataTransaksi: 0,
            
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

    getUserG = () => {
        let url = base_url + "/user"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({dataUser: response.data.length})
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

    getPaket = () => {
        let url = base_url + "/paket"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({dataPaket: response.data.length})
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

    componentDidMount(){
        this.getUser()
        this.getMember()
        this.getUserG()
        this.getPaket()
        this.getTransaksi()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container mt-2">
                    <br></br>
                    <br></br>
                    <br></br>
                    <h3 className="my-2 text-center ">
                        <strong>Halo {this.state.userName}</strong>
                    </h3>
                    <h5 className="my-2 text-center ">
                        - Welcome Admin - 
                    </h5>
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
                                        <strong>{this.state.dataMember}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* user count */}
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                            <div className="card border-dark">
                                <div className="card-header">
                                    <h4 className="text-center">
                                        <strong>Data User</strong>
                                    </h4>
                                </div>
                                <div className="card-body text-center">
                                    <h1 className="">
                                        <strong>{this.state.dataUser}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* paket count */}
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                            <div className="card border-dark">
                                <div className="card-header">
                                    <h4 className="text-center">
                                        <strong>Data Paket</strong>
                                    </h4>
                                </div>
                                <div className="card-body text-center">
                                    <h1 className="">
                                        <strong>{this.state.dataPaket}</strong>
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
                                        <strong>{this.state.dataTransaksi}</strong>
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
