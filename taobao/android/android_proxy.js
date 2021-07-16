// open proxy (not working)
 
function hook_spdy(){
    var SwitchConfig = Java.use('mtopsdk.mtop.global.SwitchConfig');
    SwitchConfig.isGlobalSpdySwitchOpen.overload().implementation = function(){
        var ret = this.isGlobalSpdySwitchOpen.apply(this, arguments);
        console.log("\nSwitchConfig.isGlobalSpdySwitchOpen()="+ret);
        return false;
    }
    //所有请求
    var RequestBuilder = Java.use('mtopsdk.network.domain.Request');
    RequestBuilder.build.overload().implementation = function(){
        //PrintStack()
        var ret = this.build.apply(this, arguments);
        //all request
        console.log("\nRequestBuilder "+ret.toString())
        return ret
    }

}
Java.perform(function() {
    hook_spdy();
    Java.use('android.net.Proxy').setHttpProxySystemProperty(Java.use('android.net.ProxyInfo').buildDirectProxy('1.0.0.1', 8081));
});

