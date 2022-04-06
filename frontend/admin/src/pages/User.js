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
                <div className="container" style={{width: 1050}}>
                    <br></br>
                    <h3 className="my-2 text-center">
                        <a>Data </a> <a style={{color: "#17a2b7"}}>User</a>
                    </h3>
                    <br></br>
                    <div className="row">
                    <div className="table-responsive">
                    <table className="table table-bordered table-hover text-center">
                    <caption className="font-italic">List User Laundry Moklet.</caption>
                        <thead className="text-white" style={{backgroundColor: "black"}}>
                            <tr>
                                <th>No.</th>
                                <th>ID User</th>
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        { this.state.user.map( (item, index)=> (
                            <tbody>
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.id_user}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <div class="btn-group btn-group-toggle">
                                            <label class="btn btn-outline-info" onClick={() => this.Edit(item)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </label>
                                            <label class="btn btn-outline-danger" onClick={() => this.dropUser(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )) }
                    </table>
                    </div>
                    </div>
                    <br></br>
                    <button className="btn btn-info" onClick={() => this.Add()}>
                        User Baru
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal user */}
                <div className="modal fade" id="modal_user">
                     <div className="modal-dialog modal-dialog-centered">
                         <div className="modal-content">
                             <div className="modal-header">
                             <img src={require('../image/logo2.svg').default} height={60}/>
                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                             </div>
                             <form onSubmit={ev => this.saveUser(ev)}>
                             <div className="modal-body">
                                    <label>Nama User</label>
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama}
                                     onChange={ev => this.setState({nama: ev.target.value})}
                                     required
                                     />
                                     <label>Username</label>
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.username}
                                     onChange={ev => this.setState({username: ev.target.value})}
                                     required
                                     />
                                     <label>Password</label>
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.password}
                                     onChange={ev => this.setState({password: ev.target.value})}
                                     required
                                     />
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
                                    <div class="invalid-feedback">Silahkan Pilih Role!</div>
                                </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-info">
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
