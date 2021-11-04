import {ConfigCollection, IConfig} from "../models/config.model";

export class ServerConfig {
    private static _config: IConfig;

    static get Config(): IConfig {
        return this._config;
    }

    static SetConfig = async () => {
        try {
            const configs = await ConfigCollection.find({}).limit(1);
            if (!configs[0]) {
                this._config = this.getSeedConfig();
                await ConfigCollection.build(this._config).save();
                return;
            }

            this._config = configs[0] as IConfig;
        } catch (e) {
            console.log('Error setting config');
        }
    }

    private static getSeedConfig(): IConfig {
        return {
            jwtExpirationTimeInSec: 60 * 60,
            userPasswordResetExpirationTime: 60 * 60
        }
    }
}
