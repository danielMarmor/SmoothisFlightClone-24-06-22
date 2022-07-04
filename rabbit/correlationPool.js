const correlationPool ={
    pool : {}
};

correlationPool.add = (correl_id, corrrlation)=>{
    correlationPool.pool[correl_id] =corrrlation;
};

correlationPool.signal = (correl_id, data)=>{
    let corrrlation = correlationPool.pool[correl_id];
    corrrlation.onResponseRecieved(data);
    correlationPool.remove(correl_id);
};

correlationPool.remove = (correl_id)=>{
    delete correlationPool.pool[correl_id];
};

module.exports = correlationPool;

