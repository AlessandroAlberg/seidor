import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
process.setMaxListeners(0);

const server = express();

server.listen(3000);

chai.should();
chai.use(chaiHttp); 

module.exports = {
    chai, 
    server
}