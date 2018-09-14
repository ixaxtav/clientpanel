import React from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddClient extends React.Component{
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            balance: ''
        };
    }
    
    onSubmit(e){
        e.preventDefault();
        
        const newClient = this.state;
        
        const {firestore} = this.props;
        
        // if no  balance is 0
        if(newClient.balance === ''){
            newClient.balance = 0;
        }
        
        firestore.add({collection: 'clients'}, newClient).then(() => this.props.history.push('/'));
    }
    
    onChange(e){
        this.setState ({ [e.target.name]: e.target.value });
    }
    
    render(){
        
        const { disableBalanceOnAdd } = this.props.settings;
        
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
                    <div className ="card-header">Add Client</div>
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
                                    onChange = {(e) => {this.onChange(e);}}
                                    value = {this.state.firstName}
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
                                    onChange = {(e) => {this.onChange(e);}}
                                    value = {this.state.lastName}
                                />
                            </div>
                            
                            <div className = "form-group">
                                <label htmlFor ="email">Email</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    name = "email"
                                    onChange = {(e) => {this.onChange(e);}}
                                    value = {this.state.email}
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
                                    onChange = {(e) => {this.onChange(e);}}
                                    value = {this.state.phone}
                                />
                            </div>

                            <div className = "form-group">
                                <label htmlFor ="balance">Balance</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name = "balance"
                                    
                                    onChange = {(e) => {this.onChange(e);}}
                                    value = {this.state.balance}
                                    disabled = {disableBalanceOnAdd}
                                />
                            </div>    
                            
                            <input type="submit" value="Submit" className ="btn btn-primary btn-block"/>
                        
                            
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object,
    history,
    settings: PropTypes.object
};

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
    )(AddClient);