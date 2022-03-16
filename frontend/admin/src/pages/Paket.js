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
                                                Edit
                                            </label>
                                            <label class="btn btn-outline-danger" onClick={() => this.dropPaket(item)}>
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
