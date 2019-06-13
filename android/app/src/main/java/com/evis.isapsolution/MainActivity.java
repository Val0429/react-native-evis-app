package com.evis.isapsolution;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "app";
    }

//    private BroadcastReceiver mMessageReceiver = new BroadcastReceiver() {
//        @Override
//        public void onReceive(Context context, Intent intent) {
//
//            Log.e("Test","123");
//
//            // Extract data included in the Intent
//            //            String company = intent.getStringExtra("company");
//            //            String location = intent.getStringExtra("location");
//            //            String message = intent.getStringExtra("message");
//            //
//            //            tvReceived.setText(company + " / " + location + " / " + message);
//        }
//    };
//
//    @Override
//    public void onResume() {
//        super.onResume();
//        LocalBroadcastManager.getInstance(this.getApplication()).registerReceiver(mMessageReceiver,
//                new IntentFilter("iSapFCMMessage"));
//    }
//
//    @Override
//    public void onPause() {
//        super.onPause();
//        LocalBroadcastManager.getInstance(this).unregisterReceiver(mMessageReceiver);
//    }
}
