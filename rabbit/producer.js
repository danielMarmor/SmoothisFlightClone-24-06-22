const amqp = require('amqplib');
const host = 'amqp://localhost:5672';

const queueReadOnly= 'READONLY';
const queueWrite ='WRITE';
//THIS
const producer = ()=>{
    this.channel ={}
};

producer.connect = async()=>{
    try{
        const connection =await amqp.connect(host);
        this.channel = await connection.createChannel();
        //await this.channel.deleteQueue(queueReadOnly);
        //await this.channel.deleteQueue(queueWrite);
        await this.channel.assertQueue(queueReadOnly, {durable :false});
        await this.channel.assertQueue(queueWrite, {durable :false});
    }
    catch(ex){
        console.error(ex);
    }
};

producer.publish= async(reqQueueName, message)=>{
    try{
        const msgBuffer=  Buffer.from(JSON.stringify(message))
        this.channel.sendToQueue(reqQueueName, msgBuffer);
        console.log(`Message Sent : ${message}`)
    }
    catch(ex){
        console.error(ex);
    }
};


module.exports = producer;

