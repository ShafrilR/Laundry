import React from "react";
import { Switch, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home";
import Member from "./pages/Member";
import User from "./pages/User";
import Paket from "./pages/Paket";
import Transaksi from "./pages/Transaksi";
import Kasir from "./kasir/pages/Home"
import MemberK from "./kasir/pages/Member"
import TransaksiK from "./kasir/pages/Transaksi"
import Page from "./pages/First"
import Page2 from "./kasir/pages/Page"

export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route path="/page2" component={Page2}/>
        <Route path="/page" component={Page}/>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/member" component={Member}/>
        <Route path="/user" component={User}/>
        <Route path="/paket" component={Paket}/>
        <Route path="/transaksi" component={Transaksi}/>
        <Route path="/kasir" component={Kasir}/>
        <Route path="/MemberK" component={MemberK}/>
        <Route path="/TransaksiK" component={TransaksiK}/>
      </Switch>
    )
  }
}