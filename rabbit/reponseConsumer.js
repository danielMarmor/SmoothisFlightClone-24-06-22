const amqp = require('amqplib');

const host ='amqp://localhost:5672';
const queueName  ='RESPONSE';

const responseConsumer = ()=> {
    this.channel ={};  
};
responseConsumer.connect = async()=>{
    try{
        const connection =await amqp.connect(host);
        this.channel = await connection.createChannel();
        await this.channel.assertQueue(queueName,{durable :false});
    }
    catch(ex){
        console.error(ex);
    }
};

responseConsumer.consume =(correlationPool)=>{
    this.channel.consume(queueName, (message)=>{
        if (message){
            responseConsumer.onMessageRecieved(message, correlationPool);
        }       
    });
};

responseConsumer.onMessageRecieved =(message, correlationPool)=>{
    const input =JSON.parse(message.content.toString());
    const {correlation_id, payload, exception} = input;
    const data = {payload, exception};
    correlationPool.signal(correlation_id, data);
    this.channel.ack(message);
};


  
module.exports = responseConsumer;