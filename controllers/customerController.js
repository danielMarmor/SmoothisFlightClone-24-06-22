const User = require('../models/User');
const {sendRequest, getResponse, deleteResponse}  = require('../rabbit/handleRequests');
const {Actions} = require('../enums');
const user = require('../models/User');

module.exports.import_cust_users = async(req, res) =>{
    const request = {
        'facade_name': 'anonym',
        'action_id': Actions.GET_ALL_USERS,
        'data': null
    };
    const correl_id = await sendRequest(request, false);
    const response = await getResponse(correl_id);
    const {exception, payload} = response;
    if (exception != null){
        res.status(200).send(exception);
        return;
    }
    if (payload != null){
        const mongoUsers = payload.map(usr =>{
            const {email, password} = usr;
            const retval = {email :email, password: password};
            return retval;
        })
        user.insertMany(mongoUsers);
        res.status(201).send('Customers Users Imported Succecfuly!');
        return;
    }
    res.status(400).send('No Response!');   
}

module.exports.get_user_tickets = async(req, res) =>{
    let userEmail = req.params.email;
    const request = {
    'facade_name': 'anonym',
    'action_id': Actions.GET_TICKETS_BY_USER, 
    'data': {'email':userEmail} 
    };
    const correl_id = await sendRequest(request, false);
    const response = await getResponse(correl_id);
    const {exception, payload} = response;
    if (exception != null){
        res.status(200).send(exception);
        return;
    }
    if (payload != null){    
        res.status(200).send(payload);
        return;
    }
    res.status(400).send('No Response!'); 
}

module.exports.get_all_flights = async(req, res) =>{
    const request = {'facade_name': 'anonym', 'action_id': Actions.GET_ALL_FLIGHTS, 'data': null};
    const correl_id = await sendRequest(request, false);
    const response = await getResponse(correl_id);
    const {exception, payload} = response;
    if (exception != null){
        res.status(200).send(exception);
        return;
    }
    if (payload != null){
        res.status(200).json(payload);
        return;
    }
    res.status(400).send('No Response!'); 
}

module.exports.get_all_airlines = async(req, res) =>{
    const request = {'facade_name': 'anonym', 'action_id': Actions.GET_ALL_AIRLINES, 'data': null}
    const correl_id = await sendRequest(request, false);
    const response = await getResponse(correl_id);
    const {exception, payload} = response;
    if (exception != null){
        res.status(200).send(exception);
        return;
    }
    if (payload != null){
        res.status(200).json(payload);
        return;
    }
    res.status(400).send('No Response!'); 
}