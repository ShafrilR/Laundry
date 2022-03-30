import React from "react"
import axios from "axios"
import { base_url } from "../config";
import "../style/style.css"

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            role: "",
            message: "",
            logged: true
        }

    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }

        let url = base_url + "/auth/login"
        

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged && response.data.data.role === "admin") {
                let user = response.data.data
                let token = response.data.token
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.props.history.push("/page")
            }else if (this.state.logged && response.data.data.role === "kasir"){
                let user = response.data.data
                let token = response.data.token
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.props.history.push("/page2")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="cov1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={require('../image/login.svg').default} height={420} style={{marginLeft: "80px",marginTop: "170px"}}/>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex h-100 justify-content-center align-items-center" style={{marginRight: "90px", marginTop: "75px"}}>
                                <div className="col-md-11">
                                    <div className="card">
                                    <img src={require('../image/logo2.svg').default} height={70} style={{marginTop: "20px"}}/>
                                        {/* <div className="card-header text-center">
                                            <img src={require('../image/logo2.svg').default} height={70}/>
                                        </div> */}
                                        <form onSubmit={ev => this.Login(ev)} className="needs-validation" >
                                        <div className="card-body">
                                            { !this.state.logged ? 
                                            (
                                                <div className="alert alert-danger mt-1">
                                                    { this.state.message }
                                                </div>
                                            ) : null }
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
                                            <a href="/regis" style={{textDecoration:"none",color: "#17a2b7", fontSize: "15px"}}>Registrasi User</a>                       
                                        </div>
                                        <div className="card-footer text-center">
                                            <button className="btn btn-outline-info " type="submit">
                                                Login
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
