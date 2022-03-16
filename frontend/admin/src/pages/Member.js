import React from "react"
import Navbar from "../components/navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from "jquery"


export default class Member extends React.Component{
    constructor(){
        super()
        this.state = {
            member: [],
            token: "",
            action: "",
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: ""
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

    getMember = () => {
        let url = base_url + "/member"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({member: response.data})
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
        this.getMember()
    }

    Add = () => {
        $("#modal_member").modal("show")
        this.setState({
            action: "insert",
            id_member: 0,
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_member").modal("show")
        this.setState({
            action: "update",
            id_member: selectedItem.id_member,
            nama: selectedItem.nama,
            alamat: selectedItem.alamat,
            jenis_kelamin: selectedItem.jenis_kelamin,
            tlp: selectedItem.tlp
        })
    }

    saveMember = event => {
        event.preventDefault()
        let form = {
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
      

        let url = base_url + "/member"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        }
        $("#modal_member").modal("hide")
    }

    dropMember = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/member/" + selectedItem.id_member
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
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
                    <h3 className="text-bold text-dark mt-2 text-center">Daftar Data Member</h3>
                    <br></br>
                    <div className="row">
                    <div className="table-responsive">
                    <table className="table table-bordered table-hover text-center">
                    <caption className="font-italic">List Member Laundry Moklet.</caption>
                        <thead className="thead-dark">
                            <tr>
                                <th>ID Member</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Jenis Kelamin</th>
                                <th>No Telfon</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        { this.state.member.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.id_member}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.jenis_kelamin}</td>
                                    <td>{item.tlp}</td>
                                    <td>
                                        <div class="btn-group btn-group-toggle">
                                            <label class="btn btn-outline-primary" onClick={() => this.Edit(item)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </label>
                                            <label class="btn btn-outline-danger" onClick={() => this.dropMember(item)}>
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
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        Member Baru
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal member */}
                <div className="modal fade" id="modal_member">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form Member</h4>
                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                             </div>
                             <form onSubmit={ev => this.saveMember(ev)}>
                             <div className="modal-body">
                                 
                                    <label>Nama Member</label>
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama}
                                     onChange={ev => this.setState({nama: ev.target.value})}
                                     required
                                     />
                                     <label>Alamat</label>
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.alamat}
                                     onChange={ev => this.setState({alamat: ev.target.value})}
                                     required
                                     />
                                     <label>Jenis Kelamin</label>
                                    <div className="form-group was-validated">
                                        <select class="form-control mb-1" value={this.state.jenis_kelamin} 
                                        onChange={ev => this.setState({jenis_kelamin: ev.target.value})} required>
                                            <option value="">
                                                Pilih Jenis Kelamin
                                            </option>
                                            <option value="L">
                                                Laki Laki
                                            </option>
                                            <option value="P">
                                                Perempuan
                                            </option>
                                        </select>
                                    </div>
                                    <label>Nomer Telfon</label>
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.tlp}
                                     onChange={ev => this.setState({tlp: ev.target.value})}
                                     required
                                     />
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
