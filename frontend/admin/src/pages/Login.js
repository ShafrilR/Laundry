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
                this.props.history.push("/")
            }else if (this.state.logged && response.data.data.role === "kasir"){
                let user = response.data.data
                let token = response.data.token
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.props.history.push("/kasir")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="marginlogin">
                <div className="container d-flex h-100 justify-content-center align-items-center">
                    <div className="col-sm-4 card my-5">
                        <div className="card-header text-center">
                            <h4>Laundry Moklet</h4>
                            <strong className="text-dark">Welcome User</strong>
                        </div>
                        <form onSubmit={ev => this.Login(ev)}>
                            <div className="card-body">
                                { !this.state.logged ? 
                                (
                                    <div className="alert alert-danger mt-1">
                                        { this.state.message }
                                    </div>
                                ) : null }
                            Username
                            <input type="text" className="form-control mb-1" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})}/>
                            Password
                            <input type="password" className="form-control mb-1" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false"/>
                            Role
                            <select class="form-control mb-1" value={this.state.role} 
                            onChange={ev => this.setState({role: ev.target.value})} required>
                                <option selected>Pilih Role</option>
                                <option value="admin">
                                    Admin
                                </option>
                                <option value="kasir">
                                    Kasir
                                </option>
                            </select>
                            </div>
                            
                            <div className="card-footer text-center">
                            <button className="btn btn-dark " type="submit">
                                Login
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
