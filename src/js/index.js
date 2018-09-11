//import react into the bundle
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {UserIsAuthenticated, UserIsNotAuthenticated}from './component/helpers/auth.js';
//include bootstrap npm library into the bundle
import 'bootstrap';

//include your index.scss file into the bundle
import '../styles/index.scss';

import {Provider} from 'react-redux';
import store from '../store';

//import your own components
import AppNavBar from './component/layout/AppNavBar.js';
import Dashboard from './component/layout/Dashboard.js';
import AddClient from './component/clients/AddClient.js';
import EditClient from './component/clients/EditClient.js';
import ClientDetails from './component/clients/ClientDetails.js';
import Login from './component/auth/Login.js';


class App extends React.Component{
    
    render(){
        return (
            <Provider store = {store}>    
                <Router>
                    <div>
                        <AppNavBar/>
                        <div className ="container">
                            <Switch>
                                <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
                                <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
                                <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
                                <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
                                <Route exact path="/Login" component={UserIsNotAuthenticated(Login)} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>            
        );
    }
}



//render your react application
ReactDOM.render(
    <App />,
    document.querySelector('#app')
);