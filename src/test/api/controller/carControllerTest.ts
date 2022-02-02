'use strict';
const commonCar = require('./commonControllerTest');
const idCar = 1;

describe('/GET car', () => {
    it ('It should GET several car', async () => {
        const res = await commonCar.chai.request(commonCar.server)
        .get(`/car`);
        res.should.have.status(200);
    });
});

describe('/GET car/:id', () => {
    it ('It should GET one car', async () => {
        const res = await commonCar.chai.request(commonCar.server)
        .get(`/car/${idCar}`);
        res.should.have.status(200);
    });
});

describe('/POST car/', () => {
    it('It should returns 201 - Create the car data in the table', async () => {
        let car = { 
            board: 'AAA-2222', 
            color: 'azul', 
            brand: 'ford'
        }
        const res = await commonCar.chai.request(commonCar.server)
            .post(`/car`)
            .send(car);
        res.should.have.status(201);
    });
});

describe('/PUT car/', () => {
    it ('It should returns 200 - Updates car data', async () => {
        let car = {
            brand: 'ford'
        }
        const res = await commonCar.chai.request(commonCar.server)        
            .put(`/car/${1}`)
            .send(car);
        res.should.have.status(200);
    });
});

describe('/DELETE car/', () => {
    it('It should returns 200 - Delete car', async () => {
        const idDelete = 1;
        const res = await commonCar.chai.request(commonCar.server)
            .delete(`/car/${idDelete}`)
        res.should.have.status(200);
    });
});
