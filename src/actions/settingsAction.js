import {DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION} from '../actions/types';

export const setDisableBalanceOnAdd = () => {
    // get setting from localstorage
    const settings = JSON.parse(localStorage.getItem('settings'));
    // toggle
    settings.disableBalanceOnAdd = ! settings.disableBalanceOnAdd;
    
    localStorage.setItem('settings', JSON.stringify(settings));
    
    return{
        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd
    };
};

export const setDisableBalanceOnEdit = () => {
        // get setting from localstorage
    const settings = JSON.parse(localStorage.getItem('settings'));
    // toggle
    settings.disableBalanceOnEdit = ! settings.disableBalanceOnEdit;
    
    localStorage.setItem('settings', JSON.stringify(settings));
    
    return{
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
    };
};

export const setAllowRegistration = () => {
        // get setting from localstorage
    const settings = JSON.parse(localStorage.getItem('settings'));
    // toggle
    settings.allowRegistration = ! settings.allowRegistration;
    
    localStorage.setItem('settings', JSON.stringify(settings));
    
    return{
        type: ALLOW_REGISTRATION,
        payload: settings.allowRegistration
    };
};