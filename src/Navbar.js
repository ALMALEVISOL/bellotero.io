import React from 'react';
import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { notification } from 'antd';
import belloteroLogo from "./img/bellotero.svg";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";
import './App.css';

export default class NavbarB extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [],
            activeClassName: "nav-item-active",
            activeLink: ""
        };
    }

    componentDidMount(){
        let menuItemsUrl = "https://raw.githubusercontent.com/Bernabe-Felix/Bellotero/master/app.json"
        fetch(menuItemsUrl, {
            method: "GET",
          }).then(function (res) {
            return res.json();
          }).then( function (data) {
              if (data && data.menu ) {
                  this.setState({
                      links: data.menu.items
                  })
              }
        }.bind(this)).catch(function (error) {
            notification.error({
                message: "Error",
                description:
                  "¡Ocurrió un error al intentar conectarse con el servidor!",
                duration: 10
              });
            });
    }

    onSelectNavChange = selectedLink => {
        this.setState({
            activeLink: selectedLink.currentTarget.pathname.substring( 1,  selectedLink.currentTarget.pathname.length)
        })
    }

    render() {
        return (
            <Navbar class="navbar">
                <Navbar>
                    <Navbar.Brand href="#home">
                        <img src={belloteroLogo} class="bellotero" />
                    </Navbar.Brand>
                </Navbar>
               
                <Nav  onSelect={ (selectedKey) => this.onSelectNavChange(selectedKey)    }>
                    {this.state.links && this.state.links.map( item => {
                        return <NavLink to={item.route} onClick={ (selectedKey) => this.onSelectNavChange(selectedKey)    } activeClassName={this.state.activeLink === item.route ? this.state.activeClassName : "" }   className={"nav-item"}  >
                        { item.text } 
                      </NavLink>
                    })}
                </Nav>
                
            </Navbar>
        );
    }
}
