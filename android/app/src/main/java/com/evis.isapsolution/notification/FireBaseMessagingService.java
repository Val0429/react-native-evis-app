package com.evis.isapsolution.notification;

        import android.app.AlertDialog;
        import android.app.Notification;
        import android.app.NotificationManager;
        import android.app.PendingIntent;
        import android.content.Context;
        import android.content.DialogInterface;
        import android.content.Intent;
        import android.graphics.Bitmap;
        import android.graphics.BitmapFactory;
        import android.os.Build;
        import android.os.Handler;
        import android.os.Looper;
        import android.support.v4.content.LocalBroadcastManager;
        import android.util.Log;
        import android.widget.Toast;

        import com.google.firebase.messaging.FirebaseMessagingService;
        import com.google.firebase.messaging.RemoteMessage;

        import java.util.Map;

/**
 * Created by ASUS on 2018/5/28.
 */

public class FireBaseMessagingService extends FirebaseMessagingService {

    /** 收到訊息 */
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {

        Log.e("RS","get push message");

        Intent intent = new Intent("iSapFCMMessage");
//        if (remoteMessage.getData().size() > 0) {
//            Map<String, String> data = remoteMessage.getData();
//            String company = data.get("company");
//            String location = data.get("location");
//            intent.putExtra("company", company);
//            intent.putExtra("location", location);
//        }
//
//        if (remoteMessage.getNotification() != null) {
//            String mMessage = remoteMessage.getNotification().getBody();
//            intent.putExtra("message", mMessage);
//        }
//

        LocalBroadcastManager.getInstance(this.getApplication()).sendBroadcast(intent);
    }
}
