const producer = require('./producer');
const responseConsumer = require('./reponseConsumer');
const AsyncLock = require('async-lock');
const correlPool = require('./correlationPool');

const readOnlyQueueName = 'READONLY';
const writeQueueName = 'WRITE';

const correl_id_lock = new AsyncLock();
let correlIdIterator = 0;

const initReuqests =async()=>{
    //PRODUCER
    await producer.connect();
    //CONSUME
    await responseConsumer.connect();
    responseConsumer.consume(correlPool);
}

const sendRequest = async(payload, isWrite) =>{
    let queueName = isWrite ? writeQueueName : readOnlyQueueName;
    let correlation_id = null;
    await correl_id_lock.acquire('key', ()=>{
        correlIdIterator++;
        correlation_id = correlIdIterator;
    });   
    const requestBody = {'correlation_id': correlation_id, 'payload': payload};
    const jsonRequest = JSON.stringify(requestBody);    
    producer.publish(queueName, jsonRequest);  
    return correlation_id;
};

const getResponse = (correlation_id)=>{
    const promise = new Promise((resolve, reject)=>{
        const corrrlation = {};
        corrrlation.correl_id = correlation_id;
        corrrlation.onResponseRecieved =(data)=>{                
            resolve(data);  
        };
        correlPool.add(correlation_id, corrrlation);
    });
    return promise;  
}

const deleteResponse =(correlation_id)=>{
    correlPool.remove(correlation_id);
} 



module.exports = {initReuqests, sendRequest, getResponse, deleteResponse};


