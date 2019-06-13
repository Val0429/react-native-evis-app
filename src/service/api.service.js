import { Observable } from 'rxjs/Rx';
import apiProxyHelper from '../helpers/api.proxy.helper';


export class APIService {

    FRSHost = 'http://fis.isapsolution.com:8088/frs/cgi';

    host = '172.16.10.253';

    port = 6060;

    isHttps = false;


    get httpType() {
        return this.isHttps == 'true' ? 'https' : 'http';
    }

    get serverUrl() {
        return `${this.httpType}://${this.host}:${this.port}`;
    }

    constructor() {

    }

    /** args : { host , port } */
    init(args){
        this.host = args.host;
        this.port = args.port;
    }

    /** 註冊推播裝置 */
    addpuchdevice(args){

        console.log('Add Device AppConsole' + JSON.stringify(args));

        const query = Observable.fromPromise(apiProxyHelper.apiProxy({
            hostname: this.FRSHost,
            url: 'addpushdevice',
            method: 'POST',
            body: {
                session_id: args.session_id,
                push_device_type: args.push_device_type,
                push_device_name: args.push_device_name,
                push_device_token: args.push_device_token
            }
        }))
        .switchMap(res => res.text())
        .map(text => {
            const data = JSON.parse(text);
            
            console.log('Add Device AppConsole' + text);

            if(!data.message){
                return 'Send DeviceID Faild';
            }

            return data.message;

        });

        return query;
    }

    /** 註冊推播裝置 (會判斷是否重複新增) */
    registerpushdevice(args){

        console.log('Add Device AppConsole' + JSON.stringify(args));

        const query = Observable.fromPromise(apiProxyHelper.apiProxy({
            hostname:this.FRSHost,
            url: 'registerpushdevice',
            method: 'POST',
            body: {
                session_id: args.session_id,
                push_device_type: args.push_device_type,
                push_device_name: args.push_device_name,
                push_device_token: args.push_device_token,
                push_device_uuid: args.push_device_uuid
            }
        }))
        .switchMap(res => res.text())
        .map(text => {

            const data = JSON.parse(text);
            
            console.log('Add Device AppConsole' + text);

            if(!data.message){
                return 'Send DeviceID Faild';
            }

            return data.message;

        });

        return query;
    }

    getEventList(args) {
        // return DUMMY_geteventlistData;
        console.log('App Console :',args);
        const $result = Observable.fromPromise(apiProxyHelper.apiProxy(
            {
                hostname:this.serverUrl,
                url: `geteventlist?startDate=${args.startDate}&endDate=${args.endDate}&page=${args.page}&pageSize=${args.pageSize}&eventtype=${args.eventtype}`,
                method: 'GET'
            }
        ));
        return $result;
    }

    getEventCount(args) {
        // return DUMMY_geteventlistData;
        console.log('App Console :',args);
        const $result = Observable.fromPromise(apiProxyHelper.apiProxy(
            {
                hostname:this.serverUrl,
                url: `geteventcount?startDate=${args.startDate}&endDate=${args.endDate}&eventtype=${args.eventtype}`,
                method: 'GET'
            }
        ));
        return $result;
    }

}

export default new APIService();