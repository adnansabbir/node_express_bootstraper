import request from 'supertest';
import {app} from "../../../app";

describe("Test IAM Auth Token Route", () => {

    it("fails when an email that does not exist is given on password grant", async () => {
        await request(app)
            .post('/iam/auth/token')
            .send({
                email: 'test@test.com',
                password: 'test123456'
            })
            .expect(400);
    });

    it("fails when incorrect password is given on password grant", async () => {
        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com',
                password: 'test123456'
            })
            .expect(201);

        await request(app)
            .post('/iam/auth/token')
            .send({
                grant_type: 'password',
                email: 'test@test.com',
                password: 'test1234567'
            })
            .expect(400);
    });

    it("responds with a cookie when given valid credentials on password grant", async () => {
        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com',
                password: 'test123456'
            })
            .expect(201);

        const response = await request(app)
            .post('/iam/auth/token')
            .send({
                grant_type: 'password',
                email: 'test@test.com',
                password: 'test123456'
            })
            .expect(200)

        expect(response.get('Set-Cookie')).toBeDefined();
    });
});
