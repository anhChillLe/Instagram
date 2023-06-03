package com.bap.instagram;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import android.os.Bundle;

import com.zoontek.rnbootsplash.RNBootSplash;

import java.util.Objects;

public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "Instagram";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
                this,
                Objects.requireNonNull(getMainComponentName()),
                DefaultNewArchitectureEntryPoint.getFabricEnabled(),
                DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled()
        );
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RNBootSplash.init(this);
        super.onCreate(null);
    }
}
