import React from "react"
import Navbar from "../components/navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from "jquery"

export default class User extends React.Component{
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

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)

    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getUser = () => {
        let url = base_url + "/user"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({user: response.data})
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
    }

    Add = () => {
        $("#modal_user").modal("show")
        this.setState({
            action: "insert",
            id_user: 0,
            nama: "",
            username: "",
            password: "",
            role: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_user").modal("show")
        this.setState({
            action: "update",
            id_user: selectedItem.id_user,
            nama: selectedItem.nama,
            username: selectedItem.username,
            password: selectedItem.password,
            role: selectedItem.role
        })
    }

    saveUser = event => {
        event.preventDefault()
        let form = {
            id_user: this.state.id_user,
            nama: this.state.nama,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }
      

        let url = base_url + "/user"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
        }
        $("#modal_user").modal("hide")
    }

    dropUser = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/user/" + selectedItem.id_user
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <br></br>
                    <h3 className="text-bold text-dark mt-2 text-center">Daftar Data User</h3>
                    <br></br>
                    <div className="row">
                    <table className="table table-bordered table-hover text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        { this.state.user.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.nama}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <div class="btn-group btn-group-toggle">
                                            <label class="btn btn-outline-primary" onClick={() => this.Edit(item)} >
                                                Edit
                                            </label>
                                            <label class="btn btn-outline-danger" onClick={() => this.dropUser(item)}>
                                                Delete
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )) }
                    </table>
                    </div>
                    <br></br>
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        User Baru
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal user */}
                <div className="modal fade" id="modal_user">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form User</h4>
                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                             </div>
                             <form onSubmit={ev => this.saveUser(ev)}>
                             <div className="modal-body">
                                     Nama User
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama}
                                     onChange={ev => this.setState({nama: ev.target.value})}
                                     required
                                     />
                                     Username
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.username}
                                     onChange={ev => this.setState({username: ev.target.value})}
                                     required
                                     />
                                     Passoword
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.password}
                                     onChange={ev => this.setState({password: ev.target.value})}
                                     required
                                     />
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
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-dark">
                                        Simpan
                                    </button>
                                </div>
                             </form>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }
}
