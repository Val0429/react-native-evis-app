package com.evis.isapsolution.notification;

import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.drawee.controller.AbstractDraweeControllerBuilder;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * Created by ASUS on 2018/6/15.
 */

public class MessageViewManager  extends SimpleViewManager<MessageView> {

    // 名字要跟 View 中的一樣
    public static final String REACT_CLASS = "MessageView";

    private static ThemedReactContext reactContext;

    private @Nullable
    AbstractDraweeControllerBuilder mDraweeControllerBuilder;
    private final @Nullable Object mCallerContext;

    // JS 中的 Commands.what , 這個會讓他去識別
    @Override
    public @Nullable
    Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "what", 1
        );
    }

    // important
    public void receiveCommand(MessageView cv, int commandId, @Nullable ReadableArray args) {
        if (args.size() >= 1) {
            String funcName = args.getString(0);
            try {
                Method method = this.getClass().getDeclaredMethod(funcName, new Class[]{MessageView.class, ReadableArray.class});
                method.invoke(this, new Object[]{cv, args});
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    public Object getCallerContext() {
        return mCallerContext;
    }

    // 名字
    @Override
    public String getName(){
        return REACT_CLASS;
    }

    // 建立實體
    @Override
    public MessageView createViewInstance(ThemedReactContext context){

        Log.e("RS","createViewInstance");
        MessageViewManager.reactContext = context;
        MessageView cv = new MessageView(reactContext);
        return cv;
    }

    public void hello(MessageView view, ReadableArray args) {
        Log.e("RS","hello world");
    }


    // 建立建構子
    public MessageViewManager() {
        Log.e("RS","ReactImageViewManager");
        mDraweeControllerBuilder = null;
        mCallerContext = null;
    }

    // 建立建構子
    public MessageViewManager(
            AbstractDraweeControllerBuilder draweeControllerBuilder,
            Object callerContext) {

        Log.e("RS","ReactImageViewManager");
        mDraweeControllerBuilder = draweeControllerBuilder;
        mCallerContext = callerContext;
    }

    // 建立 Call back function
    @Override
    public @Nullable
    Map getExportedCustomDirectEventTypeConstants(){
        Log.e("RS","getExportedCustomDirectEventTypeConstants");
        return MapBuilder.of(
                "onNativeCallback",
                MapBuilder.of("registrationName", "onNativeCallback")
        );
    }
}
