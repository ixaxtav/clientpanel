import React from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import SpinnerLoading from '../layout/Spinner.js';
import classnames from 'classnames';


class EditClient extends React.Component{
    constructor(props){
        super(props);
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
        
    }
    
    onSubmit(e){
        e.preventDefault();
        
        const {client, firestore, history} = this.props;
        
        const updClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value == ''  ? 0 : this.balanceInput.current.value
        };
        
        //update in firestore
        firestore.update({collection: 'clients', doc: client.id}, updClient)
            .then(history.push('/'));
        
    }
    render(){
        const { client } = this.props;
        const { disableBalanceOnEdit } = this.props.settings;
        if(client){
        return (
            <div>
                <div className ="row">
                    <div className = "col-md-6">
                        <Link to = "/" className= "btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                        </Link>
                    </div>
                </div>
                
                <div className ="card">
                    <div className ="card-header">Edit Client</div>
                    <div className = "card-body">
                        <form onSubmit = {(e) => {this.onSubmit(e);}}>
                            <div className = "form-group">
                                <label htmlFor ="firstName">First Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name = "firstName"
                                    minLength = "2"
                                    required
                                    ref = {this.firstNameInput}
                                    defaultValue = {client.firstName}
                                />
                            </div>
                            
                            <div className = "form-group">
                                <label htmlFor ="lastName">Last Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name = "lastName"
                                    minLength = "2"
                                    required
                                    ref = {this.lastNameInput}
                                    defaultValue = {client.lastName}
                                />
                            </div>
                            
                            <div className = "form-group">
                                <label htmlFor ="email">Email</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    name = "email"
                                    ref = {this.emailInput}
                                    defaultValue = {client.email}
                                />
                            </div>
                            
                            <div className = "form-group">
                                <label htmlFor ="phone">Phone</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name = "phone"
                                    minLength = "10"
                                    required
                                    ref = {this.phoneInput}
                                    defaultValue = {client.phone}
                                />
                            </div>

                            <div className = "form-group">
                                <label htmlFor ="balance">Balance</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name = "balance"
                                    ref = {this.balanceInput}
                                    defaultValue = {client.balance}
                                    disabled = {disableBalanceOnEdit}
                                />
                            </div>    
                            
                            <input type="submit" value="Submit" className ="btn btn-primary btn-block"/>
                        
                            
                        </form>
                    </div>
                </div>
            </div>
            );
            
        } else {
            return <SpinnerLoading />;
        }
        
    }
}
EditClient.propTypes = {
    client: PropTypes.object,
    firestore: PropTypes.object,
    history: PropTypes,
    settings: PropTypes.object
};


export default compose(
    firestoreConnect(props => [
            { collection: 'clients', storeAs: 'client', doc: props.match.params.id} 
        ]), 
    connect(({ firestore: { ordered }, settings }, props) => ({
        client: ordered.client && ordered.client[0],
        settings
    }))
    )(EditClient);


