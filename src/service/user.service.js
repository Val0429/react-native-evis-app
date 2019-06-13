import { Observable } from 'rxjs/Rx';
import apiProxyHelper from '../helpers/api.proxy.helper';
import StorageKeys from '../domain/storage';
import moment from 'moment';
import StorageHelper from '../helpers/storage.helper';
import  APIService  from './api.service';

export class UserService {

    sessionId = '';

    username = '';

    password = '';

    expired = 0;

    login(args) {

        const query = Observable.fromPromise(apiProxyHelper.apiProxy({
            hostname: APIService.serverUrl,
            url: 'login',
            method: 'POST',
            body: {
                username: args.account,
                password: args.password
            }
        }))
            .switchMap(res => res.json())
            .map(text => {

                const data = JSON.parse(text);
                console.log('Login Api AppConsole : ' + JSON.stringify(data));

                if (!data.sessionId) {
                    console.log('Login AppConsole : Login Failed');
                    return false;
                }

                this.sessionId = data.sessionId;

                // default 3 minute Expired.
                this.expired = +moment(Date()).add(3, 'minute');

                // 紀錄過期時間
                if (data.expire) {
                    this.expired = data.expire;
                }

                return true;
            })
            .do(flag => {
                return flag;
            });

        return query;
    }
}

export default new UserService();