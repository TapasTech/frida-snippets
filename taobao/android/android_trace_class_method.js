// var Color = {
//     RESET: "\x1b[39;49;00m", Black: "0;01", Blue: "4;01", Cyan: "6;01", Gray: "7;11", Green: "2;01", Purple: "5;01", Red: "1;01", Yellow: "3;01",
//     Light: {
//         Black: "0;11", Blue: "4;11", Cyan: "6;11", Gray: "7;01", Green: "2;11", Purple: "5;11", Red: "1;11", Yellow: "3;11"
//     }
// };
// function javaUse(className, classLoader, ignoreClasses) {
//     ignoreClasses = Array.isArray(ignoreClasses) ? ignoreClasses : [].slice.call(arguments, 2);
//     const classObject = Java.use("java.lang.Object").class;
//     const classOverload = !ignoreClasses.length ? null : (classLoader ? classLoader : Java.use("java.lang.ClassLoader")).loadClass.overload('java.lang.String');
//     const oldImpl = classOverload ? classOverload.implementation : null;
//     const oldLoader = classLoader ? Java.classFactory.loader : null;
//     if (classLoader) Java.classFactory.loader = classLoader || null;
//     if (classOverload) classOverload.implementation = function (name) {
//       try {
//         return classOverload.call(this, name);
//       } catch (error) {
//         if (error.message.indexOf("java.lang.ClassNotFoundException") < 0 || ignoreClasses.indexOf(name) < 0) throw error;
//         return classObject;
//       }
//     };
//     try {
//       return Java.use(className);
//     } catch (error) {
//       throw error;
//     } finally {
//       if (classOverload) classOverload.implementation = oldImpl;
//       if (classLoader) Java.classFactory.loader = oldLoader;
//     }
//   };
// /**
//  *
//  * @param input.
//  *      If an object is passed it will print as json
//  * @param kwargs  options map {
//  *     -l level: string;   log/warn/error
//  *     -i indent: boolean;     print JSON prettify
//  *     -c color: @see ColorMap
//  * }
//  */
// var LOG = function (input, kwargs) {
//     kwargs = kwargs || {};
//     var logLevel = kwargs['l'] || 'log', colorPrefix = '\x1b[3', colorSuffix = 'm';
//     if (typeof input === 'object')
//         input = JSON.stringify(input, null, kwargs['i'] ? 2 : null);
//     if (kwargs['c'])
//         input = colorPrefix + kwargs['c'] + colorSuffix + input + Color.RESET;
//     console[logLevel](input);
// };

// var printBacktrace = function () {
//     Java.perform(function() {
//         var android_util_Log = Java.use('android.util.Log'), java_lang_Exception = Java.use('java.lang.Exception');
//         // getting stacktrace by throwing an exception
//         LOG(android_util_Log.getStackTraceString(java_lang_Exception.$new()), { c: Color.Gray });
//     });
// };

// function traceClass(targetClass) {
//     var hook;
//     try {
//         hook = Java.use(targetClass);
//     } catch (e) {
//         console.error("trace class failed", e);
//         return;
//     }

//     var methods = hook.class.getDeclaredMethods();
//     hook.$dispose();

//     var parsedMethods = [];
//     methods.forEach(function (method) {
//         var methodStr = method.toString();
//         var methodReplace = methodStr.replace(targetClass + ".", "TOKEN").match(/\sTOKEN(.*)\(/)[1];
//          parsedMethods.push(methodReplace);
//     });

//     uniqBy(parsedMethods, JSON.stringify).forEach(function (targetMethod) {
//         traceMethod(targetClass + '.' + targetMethod);
//     });
// }

// function traceMethod(targetClassMethod) {
//     var delim = targetClassMethod.lastIndexOf('.');
//     if (delim === -1)
//         return;

//     var targetClass = targetClassMethod.slice(0, delim);
//     var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length);

//     var hook = Java.use(targetClass);
//     var overloadCount = hook[targetMethod].overloads.length;

//     LOG({ tracing: targetClassMethod, overloaded: overloadCount }, { c: Color.Green });

//     for (var i = 0; i < overloadCount; i++) {
//         hook[targetMethod].overloads[i].implementation = function () {
//             var log = { '#': targetClassMethod, args: [] };

//             for (var j = 0; j < arguments.length; j++) {
//                 var arg = arguments[j];
//                 // quick&dirty fix for java.io.StringWriter char[].toString() impl because frida prints [object Object]
//                 if (j === 0 && arguments[j]) {
//                     if (arguments[j].toString() === '[object Object]') {
//                         var s = [];
//                         for (var k = 0, l = arguments[j].length; k < l; k++) {
//                             s.push(arguments[j][k]);
//                         }
//                         arg = s.join('');
//                     }
//                 }
//                 log.args.push({ i: j, o: arg, s: arg ? arg.toString(): 'null'});
//             }

//             var retval;
//             try {
//                 retval = this[targetMethod].apply(this, arguments); // might crash (Frida bug?)
//                 log.returns = { val: retval, str: retval ? retval.toString() : null };
//             } catch (e) {
//                 console.error(e);
//             }
//             LOG(log, { c: Color.Blue });
//             return retval;
//         }
//     }
// }

// // remove duplicates from array
// function uniqBy(array, key) {
//     var seen = {};
//     return array.filter(function (item) {
//         var k = key(item);
//         return seen.hasOwnProperty(k) ? false : (seen[k] = true);
//     });
// }
// function describeJavaClass(className) {
//     var jClass = Java.use(className);
//     console.log(JSON.stringify({
//         _name: className,
//         _methods: Object.getOwnPropertyNames(jClass.__proto__).filter(m => {
//             return !m.startsWith('$') // filter out Frida related special properties
//                 || m == 'class' || m == 'constructor' // optional
//         }),
//         _fields: jClass.class.getFields().map(f => {
//             return f.toString()
//         })
//     }, null, 2));
// }
// function encodeHex(byteArray) {
//     const HexClass = Java.use('org.apache.commons.codec.binary.Hex');
//     const StringClass = Java.use('java.lang.String');
//     const hexChars = HexClass.encodeHex(byteArray);
//     return StringClass.$new(hexChars).toString();
// }

// var Main = function() {
//     Java.perform(function () {
//         var class_name = 'com.ss.sys.ces.a';
// // avoid java.lang.ClassNotFoundException
//         [
//             'tb.odn'
//         ].forEach(traceClass);
//     });
// };
// Java.perform(Main);

// Java.perform(function() {
//     ['java.lang.StringBuilder', 'java.lang.StringBuffer'].forEach(function(clazz, i) {
//       console.log('[?] ' + i + ' = ' + clazz);
//       var func = 'toString';
//       Java.use(clazz)[func].implementation = function() {
//         var ret = this[func]();
//         if (ret.indexOf('HHnB') == 0 ) {
//           // print stacktrace if return value contains specific string
//           console.log(ret)
//           Java.perform(function() {
//             var jAndroidLog = Java.use("android.util.Log"), jException = Java.use("java.lang.Exception");
//             console.log( jAndroidLog.getStackTraceString( jException.$new() ) );
//           }); 
//         }   
//         // send('[' + i + '] ' + ret);
//         return ret;
//       }   
//     }); 
//   });

//定位xsign 函数
Java.perform(function(){
    var hashmap = Java.use('java.util.HashMap');
    hashmap.put.implementation = function(arg1,arg2){
        var ret = this.put(arg1,arg2);
        if (arg1.toString().indexOf('x-mini-wua')==0 && arg2.toString().indexOf('HHnB') ==0){
            Java.perform(function() {
                var jAndroidLog = Java.use("android.util.Log"), jException = Java.use("java.lang.Exception");
                console.log( jAndroidLog.getStackTraceString( jException.$new() ) );
            }); 
        }
        return ret;
    }
})

// var RevealNativeMethods = function() {
//     var pSize = Process.pointerSize;
//     var env = Java.vm.getEnv();
//     var RegisterNatives = 215, FindClassIndex = 6; // search "215" @ https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html
//     var jclassAddress2NameMap = {};
//     function getNativeAddress(idx) {
//       return env.handle.readPointer().add(idx * pSize).readPointer();
//     }
//     // intercepting FindClass to populate Map<address, jclass>
//     Interceptor.attach(getNativeAddress(FindClassIndex), {
//       onEnter: function(args) {
//         jclassAddress2NameMap[args[0]] = args[1].readCString();
//       }
//     });
//     // RegisterNative(jClass*, .., JNINativeMethod *methods[nMethods], uint nMethods) // https://android.googlesource.com/platform/libnativehelper/+/master/include_jni/jni.h#977
//     Interceptor.attach(getNativeAddress(RegisterNatives), {
//       onEnter: function(args) {
//         for (var i = 0, nMethods = parseInt(args[3]); i < nMethods; i++) {
//           /*
//             https://android.googlesource.com/platform/libnativehelper/+/master/include_jni/jni.h#129
//             typedef struct {
//                const char* name;
//                const char* signature;
//                void* fnPtr;
//             } JNINativeMethod;
//           */
//           var structSize = pSize * 3; // = sizeof(JNINativeMethod)
//           var methodsPtr = ptr(args[2]);
//           var signature = methodsPtr.add(i * structSize + pSize).readPointer();
//           var fnPtr = methodsPtr.add(i * structSize + (pSize * 2)).readPointer(); // void* fnPtr
//           var jClass = jclassAddress2NameMap[args[0]].split('/');
//       var methodName = methodsPtr.add(i * structSize).readPointer().readCString();
//           console.log('\x1b[3' + '6;01' + 'm', JSON.stringify({
//             module: DebugSymbol.fromAddress(fnPtr)['moduleName'], // https://www.frida.re/docs/javascript-api/#debugsymbol
//             package: jClass.slice(0, -1).join('.'),
//             class: jClass[jClass.length - 1],
//             method: methodName, // methodsPtr.readPointer().readCString(), // char* name
//             signature: signature.readCString(), // char* signature TODO Java bytecode signature parser { Z: 'boolean', B: 'byte', C: 'char', S: 'short', I: 'int', J: 'long', F: 'float', D: 'double', L: 'fully-qualified-class;', '[': 'array' } https://github.com/skylot/jadx/blob/master/jadx-core/src/main/java/jadx/core/dex/nodes/parser/SignatureParser.java
//             address: fnPtr
//           }), '\x1b[39;49;00m');
//         }
//       }
//     });
//   }
  
//   Java.perform(RevealNativeMethods);