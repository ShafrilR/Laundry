import React from "react"
import Navbar from "../components/navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from "jquery"

export default class Paket extends React.Component{
    constructor(){
        super()
        this.state = {
            paket: [],
            token: "",
            action: "",
            id_paket: "",
            jenis: "",
            harga: ""
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

    getPaket = () => {
        let url = base_url + "/paket"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({paket: response.data})
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
        this.getPaket()
    }

    Add = () => {
        $("#modal_paket").modal("show")
        this.setState({
            action: "insert",
            id_paket: 0,
            jenis: "",
            harga: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_paket").modal("show")
        this.setState({
            action: "update",
            id_paket: selectedItem.id_paket,
            jenis: selectedItem.jenis,
            harga: selectedItem.harga
        })
    }

    savepaket = event => {
        event.preventDefault()
        let form = {
            id_paket: this.state.id_paket,
            jenis: this.state.jenis,
            harga: this.state.harga
        }
      

        let url = base_url + "/paket"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPaket()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPaket()
            })
            .catch(error => console.log(error))
        }
        $("#modal_paket").modal("hide")
    }

    dropPaket = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/paket/" + selectedItem.id_paket
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPaket()
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
                    <h3 className="text-bold text-dark mt-2 text-center">Daftar Data Paket</h3>
                    <br></br>
                    <div className="row">
                    <div className="table-responsive">
                    <table className="table table-bordered table-hover text-center">
                    <caption className="font-italic">List Paket Laundry Moklet.</caption>
                        <thead className="thead-dark">
                            <tr>
                                <th>ID Paket</th>
                                <th>Jenis Paket</th>
                                <th>Harga</th>
                                <th>Option</th>
                            </tr>
                        </thead >
                        { this.state.paket.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.id_paket}</td>
                                    <td>{item.jenis}</td>
                                    <td>{item.harga}</td>
                                    <td>
                                        <div class="btn-group btn-group-toggle">
                                            <label class="btn btn-outline-primary" onClick={() => this.Edit(item)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </label>
                                            <label class="btn btn-outline-danger" onClick={() => this.dropPaket(item)}>
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
                        Tambah Paket Baru
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal paket */}
                <div className="modal fade" id="modal_paket">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form Paket</h4>
                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                             </div>
                             <form onSubmit={ev => this.savepaket(ev)}>
                             <div className="modal-body">
                                 
                                    <label>Jenis Paket</label>
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.jenis}
                                     onChange={ev => this.setState({jenis: ev.target.value})}
                                     required
                                     />
                                     <label>Harga</label>
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.harga}
                                     onChange={ev => this.setState({harga: ev.target.value})}
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
