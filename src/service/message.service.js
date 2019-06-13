import {
    AppState,
    PushNotificationIOS,
    Platform
} from 'react-native';

import PushNotification from 'react-native-push-notification';
import APIService from '../service/api.service';
import DeviceInfo from 'react-native-device-info';
import UserService from '../service/user.service';
import StorageHelper from '../helpers/storage.helper';
import {
    StorageKeys
} from '../domain/storage';
import AlertHelper from '../helpers/alert.helper';

export class MessageService {



    initPushNotification() {
        // const PushNotification = require('react-native-push-notification');
        console.log('initPushNotification AppConsole');

        PushNotification.configure({
            onRegister: (device) => {
                console.log('_onRegister');
                this._onRegister(device);
            },
            onNotification: (notification) => {
                this._onNotification(notification)
            },
            // senderID: "323565235233",
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true,
        });

    }

    // 註冊推播事件
    _onRegister(pushToken) {

        var hasRegist = true;

        StorageHelper.setStorage(StorageKeys.deviceInfo, {
            push_device_type: Platform.OS === 'android' ? 'android':'ios',
            push_device_name: DeviceInfo.getDeviceName(),
            push_device_token: pushToken.token,
            push_device_uuid: DeviceInfo.getUniqueID(),
            resgist_notification: hasRegist
        })

       

        // console.log('TOKEN:', pushToken);

        // var hasRegist = false;

        // APIService.registerpushdevice({
        //         session_id: UserService.sessionId,
        //         push_device_type: Platform.OS === 'android' ? 'android':'ios',
        //         push_device_name: DeviceInfo.getDeviceName(),
        //         push_device_token: pushToken.token,
        //         push_device_uuid: DeviceInfo.getUniqueID()
        //     }).do((res) => {
        //         console.log('Add Device Result' + res);

                // console.log('hasRegistA',hasRegist);
                // if (res.toLowerCase().includes('exist')) {
                //     hasRegist = true;
                //     console.log('hasRegistB',hasRegist);
                //     return;
                // }

                // // console.log('hasRegist : ',res.toLowerCase().includes('ok'));
                // if (res.toLowerCase().includes('ok')) {
                //     console.log('Add device token successfully');
                //     AlertHelper.displayToast('推播注册成功');
                //     hasRegist = true;
                //     console.log('hasRegistS',hasRegist);
                //     return;
            //     }

               
            //     AlertHelper.displayToast(res);

            // })
            // .do( () => {
            //     StorageHelper.setStorage(StorageKeys.deviceInfo, {
            //         push_device_type: Platform.OS === 'android' ? 'android':'ios',
            //         push_device_name: DeviceInfo.getDeviceName(),
            //         push_device_token: pushToken.token,
            //         push_device_uuid: DeviceInfo.getUniqueID(),
            //         resgist_notification: hasRegist
            //     })
            //     .catch((error) => {
            //         console.log('Set Device Information Failed.');
            //         return;
            //     });
            // })
            // .toPromise();

    }


    // Event Handler
    _onNotification(notification) {

        // console.log('NOTIFICATION AppConsole IdPrint:', JSON.stringify(notification.message));

        if (notification.foreground) {
            console.log('NOTIFICATION AppConsole Is Not Foreground');
            return;
        }

        if (!notification.message.info) {
            console.log('NOTIFICATION AppConsole No Message.');
            return;
        }

    }
}

export default new MessageService();