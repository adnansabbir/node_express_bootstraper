import request from 'supertest';
import {app} from "../../../app";


describe("Test IAM Auth Register Route", () => {
    it("responds with 201 if valid params", async () => {
        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);
    });

    it("responds with 400 if invalid email", async () => {
        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test.com',
                password: 'password'
            })
            .expect(400);
    });

    it("responds with 400 if password not between 6 to 50 char", async () => {
        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com',
                password: 'pass'
            })
            .expect(400);

        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com',
                password: '012345678901234567890123456789012345678901234567890'
            })
            .expect(400);
    });

    it("responds with 400 if email or password missing", async () => {
        await request(app)
            .post('/iam/auth/register')
            .send({
                password: 'pass'
            })
            .expect(400);

        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com'
            })
            .expect(400);
    });

    it("responds with 400 if email exists", async () => {
        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(400);
    });

    it('should sets a cookie after successful register', async () => {
        const response = await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
});
