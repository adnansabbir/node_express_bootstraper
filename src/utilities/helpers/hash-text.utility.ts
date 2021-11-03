import {scrypt, randomBytes} from "crypto";
import {promisify} from "util";

const scryptAsync = promisify(scrypt);

export class HashText {
    static async toHash(text: string): Promise<string> {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(text, salt, 64)) as Buffer;
        return `${buf.toString('hex')}.${salt}`
    }

    static async compare(hashedText: string, textToCompare: string): Promise<boolean> {
        const [hashedData, salt] = hashedText.split('.');
        const buf = (await scryptAsync(textToCompare, salt, 64)) as Buffer;

        return buf.toString('hex') === hashedData;
    }
}
