package kr.yjc.wdb;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.os.Vibrator;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.util.Log;

public class TTPlug extends CordovaPlugin {
    Vibrator vibrator;
    public static final String TAG = "TTPlug";
    private final String ACTION_ECHO = "echo";
    private final String ACTION_GET_MESSAGE = "getMessage";
    private final String ACTION_RUN_JAVASCRIPT_FUNCTION = "runJavaScriptFunction";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView){
        super.initialize(cordova,webView);
        Log.d(TAG, "TTPlug plugin initialize");
    }

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        return super.execute(action, args, callbackContext);
    }

    @Override
    public boolean execute(String action, String rawArgs, CallbackContext callbackContext) throws JSONException {
        return super.execute(action, rawArgs, callbackContext);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        final String message = args.isNull(0) ? null:args.getString(0);

        if(action.equals(ACTION_ECHO)) {
            this.echo(message, callbackContext);
            return true;
        } else if("beep".equals(action)){
            this.beep(args.getLong(0));
            callbackContext.success();
            return true;
        } else if(action.equals(ACTION_GET_MESSAGE)){
            this.getMessage(callbackContext);
        } else if(action.equals(ACTION_RUN_JAVASCRIPT_FUNCTION)){
            String functionName = args.getString(0);
            this.runJavaScriptFunction(functionName, callbackContext);
        }
        return false;
    }

    private void echo(String message, CallbackContext callbackContext) {
        if(message != null && message.length() > 0){
            AlertDialog.Builder builder = new AlertDialog.Builder(this.cordova.getActivity());
            builder.setMessage(message).setPositiveButton("Push Success",new DialogInterface.OnClickListener() {
                @Override
                    public void onClick(DialogInterface dialogInterface, int i){}
            });
            AlertDialog dialog = builder.create();
            dialog.show();
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK,"return: "+message));
        } else {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,"Excepted one non-empty string arguments."));
            //callbackContext.error("Excepted one non-empty string argument.");
        }
    }
    private void beep(long duration){
        vibrator = (Vibrator) cordova.getActivity().getSystemService(Context.VIBRATOR_SERVICE);
        vibrator.vibrate(duration);
        //(MainActivity)cordova.getActivity().TestMethod("file://android_asset/www/test.html");
    }

    private void getMessage(CallbackContext callbackContext) throws JSONException{
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name","Android에서 만든 메세지");
        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK,jsonObject));
    }

    private void runJavaScriptFunction(String functionName, final CallbackContext callbackContext) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name","Android에서 JavaScript의"+functionName+"함수 호출");

        final String javascriptString = "print_message("+jsonObject.toString()+")";
        this.webView.sendJavascript(javascriptString);

        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
    }
}
