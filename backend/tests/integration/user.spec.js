const request = require('supertest');
const app = require('../../src/app');
const connection =require('../../src/database/connection');

describe('User', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to create a new User', async () => {
        const response = await request(app)
        .post('/users')
        //.set('Authorization','')
        .send({
            name: "Dynho Master",
            email: "mastersdyn@gmail.com",
            whatsapp: "12345678901",
            city: "Midgard",
            uf: "TK"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});