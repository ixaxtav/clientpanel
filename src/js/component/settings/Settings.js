import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit} from '../../../actions/settingsAction.js';

class Settings extends React.Component{

    disableBalanceOnAddChange(e){
        const {setDisableBalanceOnAdd} = this.props;
        setDisableBalanceOnAdd();
    }
    disableBalanceOnEditChange(e){
        const {setDisableBalanceOnEdit} = this.props;
        setDisableBalanceOnEdit();
    }
    allowRegistrationChange(e){
        const {setAllowRegistration} = this.props;
        setAllowRegistration();
    }

    render(){
    const { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration } = this.props.settings;
        
        return (
            <div>
                <div className = "row">
                    <div className = "col-md-6">
                        <Link to="/" className = "btn btn-link">
                            <i className = "fas fa-arrow-circle-left"/> Back to Dashboard
                        </Link>
                    </div>
                </div>
                <div className = "card">
                    <div className = "card-header"> Edit Settings
                        <div className = "card-body">
                            <form>
                                <div className ="form-group">
                                    <label> Allow Registration </label>{' '}
                                    <input type = "checkbox" name = "allowRegistration" checked={!!allowRegistration} onChange = {(e) => {this.allowRegistrationChange(e);}}/>
                                </div>
                                <div className ="form-group">
                                    <label> Disable Balance On Add </label>{' '}
                                    <input type = "checkbox" name = "disableBalanceOnAdd" checked={!!disableBalanceOnAdd} onChange = {(e) => {this.disableBalanceOnAddChange(e);}}/>
                                </div>
                                <div className ="form-group">
                                    <label> Disable Balance On Edit</label>{' '}
                                    <input type = "checkbox" name = "disableBalanceOnEdit" checked={!!disableBalanceOnEdit} onChange = {(e) => {this.disableBalanceOnEditChange(e);}}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            
                
            </div>
        );
    }
}

Settings.propTypes = {
    settings: PropTypes.object,
    setAllowRegistration: PropTypes.func,
    setDisableBalanceOnAdd: PropTypes.func, 
    setDisableBalanceOnEdit: PropTypes.func
};

export default connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
}), {setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit})(Settings);