package com.evis.isapsolution.notification;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by ASUS on 2018/6/15.
 */

public class MessageView extends FrameLayout {

    private Context mContext;

    private BroadcastReceiver mMessageReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {

            Log.e("Test","123");

            // Extract data included in the Intent
            //            String company = intent.getStringExtra("company");
            //            String location = intent.getStringExtra("location");
            //            String message = intent.getStringExtra("message");
            //
            //            tvReceived.setText(company + " / " + location + " / " + message);
            WritableMap event = Arguments.createMap();
            event.putString("data",Integer.toString(1) );
            sentNativeEvent(event, "Image");
        }
    };

    public MessageView(ThemedReactContext context) {

        super(context);
//        LocalBroadcastManager.getInstance(this.getContext()).registerReceiver(mMessageReceiver,
//                new IntentFilter("iSapFCMMessage"));
        mContext = context;
    }

    public void sentNativeEvent(WritableMap event, String caller)
    {
        Log.e("send","sentNativeEvent");
        event.putString("caller", caller);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "onNativeCallback",
                event);
    }

    // 設定方法
    public void setNumber(int num){
        Log.e("send","setNumber");
        int val = ( num + 1);

        WritableMap event = Arguments.createMap();
        event.putString("data",Integer.toString(val) );
        sentNativeEvent(event, "Image");
    }
}
