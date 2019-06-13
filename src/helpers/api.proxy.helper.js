
import { Observable } from 'rxjs/Rx';
import APIService from '../service/api.service';

export class apiProxyHelper {

    // serverUrl = 'http://172.16.10.253:6060';

    // apiProxy(args) {

    //     const requestInit = {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         ...args.headers
    //       },
    //       method:  args.method || 'GET',
    //       body: JSON.stringify(args.body)
    //     };

    //     // console.log('apiProxyHelper AppConsole ' + CGIService.serverUrl);

    //     const proxy$ = Observable.fromPromise(fetch(`${this.serverUrl}/${args.url}`, requestInit));
    //     return proxy$;
    //   }

    apiProxy(args) {

      const requestInit = {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        method: args.method ? args.method : 'POST',
        body: JSON.stringify(args.body)
      };

      // console.log('App Console : ',this.serverUrl + `/${args.url}`);
      const proxy$ = fetch(`${args.hostname}/${args.url}`, requestInit);
      
      return proxy$;
    }
}

export default new apiProxyHelper();