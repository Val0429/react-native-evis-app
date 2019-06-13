package com.evis.isapsolution.notification;

import android.util.Log;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by ASUS on 2018/6/15.
 */

public class MessagePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        Log.e("RS","createNativeModules");
//        modules.add(new xxx(reactContext));

        return modules;
    }
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {

        Log.e("RS","createViewManagers");
        return Arrays.<ViewManager>asList(
                new MessageViewManager(null, reactContext)
        );
    }
}
