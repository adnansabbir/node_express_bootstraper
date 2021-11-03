export const checkEnvData = (): void => {
    const {JWT_SIGN_KEY, JWT_EXPIRATION_TIME_SEC, PORT, MONGO_CONNECTION_STRING, SENDGRID_API_KEY} = process.env;

    if (JWT_SIGN_KEY === undefined) throw new Error('Env JWT_SIGN_KEY missing');
    if (JWT_EXPIRATION_TIME_SEC === undefined) throw new Error('Env JWT_EXPIRATION_TIME_SEC missing');
    if (PORT === undefined) throw new Error('Env PORT missing');
    if (MONGO_CONNECTION_STRING === undefined) throw new Error('Env MONGO_CONNECTION_STRING missing');
    if (SENDGRID_API_KEY === undefined) throw new Error('Env SENDGRID_API_KEY missing');
}
