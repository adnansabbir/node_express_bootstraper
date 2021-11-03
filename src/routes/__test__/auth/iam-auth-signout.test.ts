import request from 'supertest';
import {app} from "../../../app";

describe("Test IAM Auth logout Route", () => {

    it("should clears the cookie after logging out", async () => {
        await request(app)
            .post('/iam/auth/register')
            .send({
                email: 'test@test.com',
                password: 'test123456'
            })
            .expect(201);

        const response = await request(app)
            .post('/iam/auth/logout')
            .send({})
            .expect(200);

        expect(response.get("Set-Cookie")[0]).toEqual(
            'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
        )
    });
});
