'use strict';
const common = require('./commonControllerTest');
const id = 1;

describe('/GET use-car', () => {
    it ('It should GET several use-car', async () => {
        const res = await common.chai.request(common.server)
        .get(`/use-car`);
        res.should.have.status(200);
    });
});

describe('/GET use-car/:id', () => {
    it ('It should GET one use-car', async () => {
        const res = await common.chai.request(common.server)
        .get(`/use-car/${id}`);
        res.should.have.status(200);
    });
});

describe('/POST use-car/', () => {
    it('It should returns 201 - Create the use-car data in the table', async () => {
        let useCar = {
            'driver_id': '1',
            'car_id': '1',
            'reason': 'testando carro 5 teste',
            'start_date': '30/01/2022'
        }
        const res = await common.chai.request(common.server)
            .post(`/use-car`)
            .send(useCar);
        res.should.have.status(201);
    });
});

describe('/PUT use-car/end-use', () => {
    it ('It should returns 200 - Updates use-car data', async () => {
        let useCar = {
            'end_date': "30/01/2022"
        }
        const res = await common.chai.request(common.server)        
            .put(`/use-car/end-use/${id}`)
            .send(useCar);
        res.should.have.status(200);
    });
});
