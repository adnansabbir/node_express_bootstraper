import request from "supertest";
import {app} from "../../app";

export const getCookieByRegistering = async (email: string, password: string): Promise<string[]> => {
    const response = await request(app)
        .post('/iam/auth/register')
        .send({email, password})
        .expect(201);

    return response.get("Set-Cookie");
}
