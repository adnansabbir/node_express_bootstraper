import request from "supertest";
import {app} from "../../../app";
import {getCookieByRegistering} from "../../../test/helpers/auth.helper";

describe('Test IAM Auth currentUser Route', () => {
    it('should respond details about the current user', async () => {
        const cookie = await getCookieByRegistering('test@test.com', 'password');

        const response = await request(app)
            .get('/iam/auth/currentUser')
            .set("Cookie", cookie)
            .send()
            .expect(200);

        expect(response.body.currentUser.email).toEqual('test@test.com');
    });

    it('should respond null if not authenticated', async () => {
        const response = await request(app)
            .get('/iam/auth/currentUser')
            .send()
            .expect(201);

        expect(response.body.currentUser).toBeNull();
    });
});
