import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavbarB from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Testimonial from './Components/Testimonial';
import Configurator from './Components/Configurator';

function App() {
  return (


    <React.Fragment>
      <Router>
          <NavbarB /> 
          <Switch>
            <Route path="/page-1">
              <Testimonial />
            </Route>
            <Route path="/page-2">
              <Configurator />
            </Route>
          </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
