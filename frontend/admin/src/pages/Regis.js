import React from "react"
import axios from "axios"
import { base_url } from "../config";
import "../style/style.css"

export default class Regis extends React.Component{
    constructor(){
        super()
        this.state = {
            user: [],
            token: "",
            action: "",
            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: ""
        }

    }

    saveUser = event => {

        this.setState({
            id_user: 0,
            nama: "",
            username: "",
            password: "",
            role: ""
        })

        event.preventDefault()
        let form = {
            id_user: this.state.id_user,
            nama: this.state.nama,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }
    
        let url = base_url + "/user"
        axios.post(url, form)
        .then(response => {
            window.alert(response.data.message)
        })
        .catch(error => console.log(error))
        this.props.history.push("/login")
    }

    render(){
        return(
            <div className="rgs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={require('../image/rgs.svg').default} height={500} style={{marginLeft: "50px", marginTop: "150px"}}/>
                        </div>
                        <div className="col-md-6">
                        <div className="d-flex h-100 justify-content-center align-items-center"  style={{marginRight: "100px", marginTop: "52px"}} >
                            <div className="col-md-12">
                                <div className="card">
                                    <img src={require('../image/logo2.svg').default} height={70} style={{marginTop: "20px"}}/>
                                    {/* <div className="card-header text-center">
                                        <img src={require('../image/logo2.svg').default} height={70}/>
                                    </div> */}
                                    <form onSubmit={ev => this.saveUser(ev)} className="needs-validation" >
                                        <div className="card-body">
                                            <label>Nama</label>
                                            <input type="text" className="form-control mb-1" value={this.state.nama}
                                            onChange={ev => this.setState({nama: ev.target.value})} required/>
                                            <label>Username</label>
                                            <input type="text" className="form-control mb-1" value={this.state.username}
                                            onChange={ev => this.setState({username: ev.target.value})} required/>
                                            <label>Password</label>
                                            <input type="password" className="form-control mb-1" value={this.state.password}
                                            onChange={ev => this.setState({password: ev.target.value})}
                                            autoComplete="false" required/>
                                            <label>Role</label>
                                            <div className="form-group was-validated">
                                                <select class="form-control mb-1" value={this.state.role} 
                                                onChange={ev => this.setState({role: ev.target.value})} required>
                                                    <option value="">Pilih Role</option>
                                                    <option value="admin">
                                                        Admin
                                                    </option>
                                                    <option value="kasir">
                                                        Kasir
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="text-center"></div>
                                        </div>

                                        
                                        <div className="card-footer text-center">
                                            <button className="btn btn-outline-info " type="submit">
                                                Save Data
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>      
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}