var Color = {
    RESET: "\x1b[39;49;00m", Black: "0;01", Blue: "4;01", Cyan: "6;01", Gray: "7;11", Green: "2;01", Purple: "5;01", Red: "1;01", Yellow: "3;01",
    Light: {
        Black: "0;11", Blue: "4;11", Cyan: "6;11", Gray: "7;01", Green: "2;11", Purple: "5;11", Red: "1;11", Yellow: "3;11"
    }
};

/**
 *
 * @param input.
 *      If an object is passed it will print as json
 * @param kwargs  options map {
 *     -l level: string;   log/warn/error
 *     -i indent: boolean;     print JSON prettify
 *     -c color: @see ColorMap
 * }
 */
var LOG = function (input, kwargs) {
    kwargs = kwargs || {};
    var logLevel = kwargs['l'] || 'log', colorPrefix = '\x1b[3', colorSuffix = 'm';
    if (typeof input === 'object')
        input = JSON.stringify(input, null, kwargs['i'] ? 2 : null);
    if (kwargs['c'])
        input = colorPrefix + kwargs['c'] + colorSuffix + input + Color.RESET;
    console[logLevel](input);
};

var printBacktrace = function () {
    Java.perform(function() {
        var android_util_Log = Java.use('android.util.Log'), java_lang_Exception = Java.use('java.lang.Exception');
        // getting stacktrace by throwing an exception
        LOG(android_util_Log.getStackTraceString(java_lang_Exception.$new()), { c: Color.Gray });
    });
};

function traceClass(targetClass) {
    var hook;
    try {
        hook = Java.use(targetClass);
    } catch (e) {
        console.error("trace class failed", e);
        return;
    }

    var methods = hook.class.getDeclaredMethods();
    hook.$dispose();

    var parsedMethods = [];
    methods.forEach(function (method) {
        var methodStr = method.toString();
        var methodReplace = methodStr.replace(targetClass + ".", "TOKEN").match(/\sTOKEN(.*)\(/)[1];
         parsedMethods.push(methodReplace);
    });

    uniqBy(parsedMethods, JSON.stringify).forEach(function (targetMethod) {
        traceMethod(targetClass + '.' + targetMethod);
    });
}

function traceMethod(targetClassMethod) {
    var delim = targetClassMethod.lastIndexOf('.');
    if (delim === -1)
        return;

    var targetClass = targetClassMethod.slice(0, delim);
    var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length);

    var hook = Java.use(targetClass);
    var overloadCount = hook[targetMethod].overloads.length;

    LOG({ tracing: targetClassMethod, overloaded: overloadCount }, { c: Color.Green });

    for (var i = 0; i < overloadCount; i++) {
        hook[targetMethod].overloads[i].implementation = function () {
            var log = { '#': targetClassMethod, args: [] };

            for (var j = 0; j < arguments.length; j++) {
                var arg = arguments[j];
                // quick&dirty fix for java.io.StringWriter char[].toString() impl because frida prints [object Object]
                if (j === 0 && arguments[j]) {
                    if (arguments[j].toString() === '[object Object]') {
                        var s = [];
                        for (var k = 0, l = arguments[j].length; k < l; k++) {
                            s.push(arguments[j][k]);
                        }
                        arg = s.join('');
                    }
                }
                log.args.push({ i: j, o: arg, s: arg ? arg.toString(): 'null'});
            }

            var retval;
            try {
                retval = this[targetMethod].apply(this, arguments); // might crash (Frida bug?)
                log.returns = { val: retval, str: retval ? retval.toString() : null };
            } catch (e) {
                console.error(e);
            }
            LOG(log, { c: Color.Blue });
            return retval;
        }
    }
}

// remove duplicates from array
function uniqBy(array, key) {
    var seen = {};
    return array.filter(function (item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
}
function describeJavaClass(className) {
    var jClass = Java.use(className);
    console.log(JSON.stringify({
        _name: className,
        _methods: Object.getOwnPropertyNames(jClass.__proto__).filter(m => {
            return !m.startsWith('$') // filter out Frida related special properties
                || m == 'class' || m == 'constructor' // optional
        }),
        _fields: jClass.class.getFields().map(f => {
            return f.toString()
        })
    }, null, 2));
}
function encodeHex(byteArray) {
    const HexClass = Java.use('org.apache.commons.codec.binary.Hex');
    const StringClass = Java.use('java.lang.String');
    const hexChars = HexClass.encodeHex(byteArray);
    return StringClass.$new(hexChars).toString();
}
var Main = function() {
    Java.perform(function () {
        var class_name = 'com.ss.sys.ces.a';
// avoid java.lang.ClassNotFoundException
        [
            // "java.io.File",
            // 'com.ss.sys.ces.gg.tt$1',
            // 'com.ss.sys.ces.gg.tt',
            // 'com.ss.a.b.d',
            // 'com.ss.sys.ces.a'
        ].forEach(traceClass);
        var class_methods = Object.getOwnPropertyNames(Java.use('com.ss.sys.ces.a').__proto__).join('\n\t');
        console.log('getclass',Java.use(class_name));
        // LOG(class_methods, { c: Color.Light.Cyan });
        var cesclass= Java.use(class_name);
        Java.use(class_name).leviathan.overload('int', 'int', '[B').implementation = function (inta, intb, bytec) {
            LOG('com.ss.a.b.a.a.overload', { c: Color.Light.Cyan });

            var ret = cesclass.leviathan(inta, intb, bytec)
            console.log(inta, intb, encodeHex(bytec))
            console.log(encodeHex(ret))
            // printBacktrace();
             return ret;
        }
    });
};
//
Java.perform(Main);
// //hook string 包含调用栈com.ss.sys.ces.gg.tt$1.a
// Java.perform(function() {
//     ['java.lang.StringBuilder', 'java.lang.StringBuffer'].forEach(function(clazz, i) {
//         console.log('[?] ' + i + ' = ' + clazz);
//         var func = 'toString';
//         Java.use(clazz)[func].implementation = function() {
//             var ret = this[func]();
//             Java.perform(function() {
//                 var jAndroidLog = Java.use("android.util.Log"), jException = Java.use("java.lang.Exception");
//                 var callstring =jAndroidLog.getStackTraceString( jException.$new() );
//                 if (callstring.toLocaleString().indexOf('com.ss.sys.ces.gg.tt$1.a')!==-1)
//                     console.log( ret);
//             });
//             // console.log( ret);
//
//             // send('[' + i + '] ' + ret);
//             return ret;
//         }
//     });
// });
//
//拦截md5
// var algorithm = 'MD5';
//
// if(Java.available)
// {
//     Java.perform(function(){
//         var MessageDigest= Java.use('java.security.MessageDigest');
//         var digest1 = MessageDigest.digest.overload("[B","int","int");
//         digest1.implementation=function(buf,offset,len){
//             var ret = digest2.call(this,buf);
//             parseIn(this,buf);
//             parseOut(this,ret);
//             return ret;
//         }
//
//         var digest2 = MessageDigest.digest.overload("[B");
//         digest2.implementation=function(buf){
//             var ret = digest2.call(this,buf);
//             parseIn(this,buf);
//             parseOut(this,ret);
//             return ret;
//         }
//     });
//
// }
//
// function parseIn(digest,input){
//     var Integer= Java.use('java.lang.Integer');
//     var String= Java.use('java.lang.String');
//     if(digest.getAlgorithm() != algorithm){
//         return;
//     }
//     try{
//         console.log("original:"+String.$new(input));
//     }
//     catch(e){
//         console.log(parseHex(input));
//     }
// }
//
// function parseOut(digest,ret){
//     var Integer= Java.use('java.lang.Integer');
//     var String= Java.use('java.lang.String');
//     var result = "";
//     for(var i = 0;i<ret.length;i++){
//         var val = ret[i];
//         if(val < 0){
//             val += 256;
//         }
//         var str = Integer.toHexString(val);
//         if(String.$new(str).length()==1){
//             str = "0" + str;
//         }
//         result += str;
//     }
//
//     if(digest.getAlgorithm()==algorithm){
//         console.log(digest.getAlgorithm() + "(32):" + result);
//         console.log(digest.getAlgorithm() + "(16):" + result.substring(8,24));
//         console.log("");
//     }
// }
//
// function parseHex(input){
//     var Integer= Java.use('java.lang.Integer');
//     var byte_array = "";
//     for(var j = 0;j<input.length;j++){
//         var hex = Integer.toHexString(input[j]);
//         if(hex.length == 1){
//             hex = "0" + hex;
//         }
//         byte_array += hex;
//     }
//
//     console.log("original(hex):");
//     var pair = "";
//     var hex_table = "";
//     for(var k = 0;k<byte_array.length;k++){
//         pair += byte_array.charAt(k);
//         if((k+1)%2 == 0){
//             pair += " "
//             hex_table += pair;
//             pair = ""
//         }
//
//         if((k+1)%32 == 0){
//             hex_table += "\n"
//         }
//     }
//     return hex_table;
// }
//
