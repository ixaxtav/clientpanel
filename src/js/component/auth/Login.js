import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../../actions/notifyActions.js';
import Alert from '../layout/Alert';

class Login extends React.Component{
constructor(){
    super();
    this.state = {
        email: '',
        password: ''
    };
}

onSubmit(e){
    e.preventDefault();
    
    const {firebase, notifyUser} = this.props;
    const {email, password } = this.state;
    
    firebase.login({
        email,
        password
    })
    .catch(err => notifyUser ('Invalid Login Credentials', 'error'));
}

onChange(e){
    this.setState({[e.target.name]: e.target.value});
}

    render(){
        const { message, messageType } = this.props.notify;
        return (
            <div className = "row">
                <div className = "col-md-6 mx-auto">
                    <div className = "card">
                        <div className = "card-body">
                            {message ? (
                                <Alert message={message} messageType={messageType} />
                            ) : null}
                            <h1 className = "text-center pb-4 pt-3">
                                <span className = "text-primary">
                                    <i className = "fas fa-lock"></i>{' '} 
                                    Login
                                </span>
                            </h1>
                            <form onSubmit = {(e) => {this.onSubmit(e);}}>
                                <div className = "form-group">
                                    <label htmlFor = "email">Email</label>
                                    <input type="text" className = "form-control" name="email" required value = {this.state.email} onChange = {(e) => {this.onChange(e);}}/>
                                </div>
                                <div className = "form-group">
                                    <label htmlFor = "password">Password</label>
                                    <input type="password" className = "form-control" name="password" required value = {this.state.password} onChange = {(e) => {this.onChange(e);}}/>
                                </div>
                                <input type= "submit" value= "Login" className= "btn btn-primary btn-block"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    firebase: PropTypes.object,
    notifyUser: PropTypes.func,
    message: PropTypes.string,
    messageType: PropTypes.string,
    notify: PropTypes.object
};

export default compose(
        firebaseConnect(),
        connect((state, props) => ({
            notify: state.notify
        }), { notifyUser})
    )(Login);