'use strict';
const commonDriver = require('./commonControllerTest');
const idDriver = 1;

describe('/GET driver', () => {
    it ('It should GET several driver', async () => {
        const res = await commonDriver.chai.request(commonDriver.server)
        .get(`/driver`);
        res.should.have.status(200);
    });
});

describe('/GET driver/:id', () => {
    it ('It should GET one driver', async () => {
        const res = await commonDriver.chai.request(commonDriver.server)
        .get(`/driver/${idDriver}`);
        res.should.have.status(200);
    });
});

describe('/POST driver/', () => {
    it('It should returns 201 - Create the driver data in the table', async () => {
        let driver = {
            name: 'teste'
        }
        const res = await commonDriver.chai.request(commonDriver.server)
            .post(`/driver`)
            .send(driver);
        res.should.have.status(201);
    });
});

describe('/PUT driver/', () => {
    it ('It should returns 200 - Updates driver data', async () => {
        let driver = {
            name: "test 2"
        }
        const res = await commonDriver.chai.request(commonDriver.server)        
            .put(`/driver/${idDriver}`)
            .send(driver);
        res.should.have.status(200);
    });
});

describe('/DELETE driver/', () => {
    it('It should returns 200 - Delete configuration', async () => {
        const idDelete = 1;
        const res = await commonDriver.chai.request(commonDriver.server)
            .delete(`/driver/${idDelete}`)
        res.should.have.status(200);
    });
});
