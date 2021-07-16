

const Taobao4iPhone = Module.findBaseAddress('Taobao4iPhone');
console.log('Taobao4iPhone base', Taobao4iPhone)
var found_at = -1;

console.log('module', Taobao4iPhone)
var allModule = []

var className = "One";
var funcName = "+ play:";
// className = 'TBSDKSecurity';
// funcName = '- envMapToSecurityGuardEnv';
className = 'TBSDkSignUtility'
funcName = 'getSecurityFactors:withApiName:withApiVersion:withProtocolParam:withBizParam:withHttpHeader:withUseWua:withInstanceId:'
var hook = eval('ObjC.classes.' + className + '["' + funcName + '"].implementation');
var allThreads = Process.enumerateThreadsSync();
var  currentThreadsIndex = 0 ;
var traced = false;

function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i])
        }
    }
    return array;
}
function print_arg(addr) {
    var range = Process.findRangeByAddress(addr);
    if (range != null) {
        return hexdump(addr, {

            length: 1024,

            // ansi: true
        }) + "\r\n";
    } else {
        return ptr(addr) + '\r\n';
    }
}
function hook_native_addr(addr) {
    var prefix = "Taobao4Iphone" + "!" + ptr(addr) + " "

    var module = Process.findModuleByAddress(addr);
    Interceptor.attach(ptr(addr).add(Taobao4iPhone), {
        onEnter: function (args) {
            this.args0 = args[0];
            this.args1 = args[1];
            this.args2 = args[2];
            this.args3 = args[3];
            this.args4 = args[4];
            this.logs = []

            this.logs.push("call " + "Taobao4Iphone" + "!" + ptr(addr) + "\r\n");
            this.logs.push("\t" + prefix + "this.args0 " + this.args0 + ' ' + print_arg(this.args0) + "\r\n");
            this.logs.push("\t" + prefix + "this.args1 " + this.args1 + ' ' + print_arg(this.args1) + "\r\n");
            this.logs.push("\t" + prefix + "this.args2 " + this.args2 + ' ' + print_arg(this.args2) + "\r\n");
            this.logs.push("\t" + prefix + "this.args3 " + this.args3 + ' ' + print_arg(this.args3) + "\r\n");
            this.logs.push("\t" + prefix + "this.args4 " + this.args4 + ' ' + print_arg(this.args4) + "\r\n");
        },
        onLeave: function (retval) {
            this.logs.push("\t" + prefix + "this.args0 onLeave " + this.args0 + ' ' + print_arg(this.args0) + "\r\n");
            this.logs.push("\t" + prefix + "this.args1 onLeave " + this.args1 + ' ' + print_arg(this.args1) + "\r\n");
            this.logs.push("\t" + prefix + "this.args2 onLeave " + this.args2 + ' ' + print_arg(this.args2) + "\r\n");
            this.logs.push("\t" + prefix + "this.args3 onLeave " + this.args3 + ' ' + print_arg(this.args3) + "\r\n");
            this.logs.push("\t" + prefix + "this.args4 onLeave " + this.args4 + ' ' + print_arg(this.args4) + "\r\n");

            this.logs.push("retval onLeave: " + retval + ' ' + print_arg(retval));

            if (traced) {
                console.log(this.logs)
            }
        }
    })
}
function hook_block_sub() {
    //ook_native_addr(0x3ECB9C4);//好像返回arg1，没做改动 13

}

function hook_sendmsg() {
    Interceptor.attach(Module.findExportByName('/usr/lib/libobjc.A.dylib', 'objc_msgSend'), {
        onEnter: function (args) {
            var m = Memory.readCString(args[1]);
            if (m && m != 'length' && !m.startsWith('_fastC')) {
                send(m);

            }


            // var m = Memory.readCString(args[1]);
            // var receiver = new ObjC.Object(args[0]);


            // var obj = ObjC.Object(args[2]);


            // var receiver = args[0];


            // var sel = ObjC.selectorAsString(args[1]);

            // console.log('objc_msgSend:' + '@' + receiver + ':' + m);

            // if (m != 'length' && !m.startsWith('_fastC')) {
            //     var backtrace = ObjC.classes.NSThread.callStackSymbols();
            //     if (backtrace && backtrace.toString().indexOf(className) != -1) {
            //         console.log('objc_msgSend:' + '@' + receiver + ':' + m + ' param:' + obj);
            //     }
            // }
        }
    });
}
function hook_tolower() {
    Interceptor.attach(Module.findExportByName('libsystem_c.dylib', 'tolower'), {
        onEnter: function (args) {
            if (args[0]) {
                console.log('tolower', String.fromCharCode(args[0]))

            }
        }
    });
}
function hook_sel_getUid() {

    var sel_getUid = Module.findExportByName('/usr/lib/libobjc.A.dylib', 'sel_getUid');
    Interceptor.attach(sel_getUid, {
        onEnter: function (args) {
            if (args.length > 0) {
                this.arg0 = args[0];
            }
        },

        onLeave: function (retval) {
            // console.log('getUid', Memory.readCString(this.arg0), retval,ObjC.classes.NSThread.callStackSymbols())
            console.log('getUid', Memory.readCString(this.arg0), retval)

            // retval= new NativePointer(0);
        }
    });
}
function hook_SCDynamicStoreCopyProxies() {
    var SCDynamicStoreCopyProxies = Module.findExportByName('SystemConfiguration', 'SCDynamicStoreCopyProxies');
    Interceptor.attach(SCDynamicStoreCopyProxies, {
        onEnter: function (args) {
            this.arg0 = args[0];
        },

        onLeave: function (retval) {
            // console.log('getUid', Memory.readCString(this.arg0), retval,ObjC.classes.NSThread.callStackSymbols())
            console.log('SCDynamicStoreCopyProxies', this.arg0, retval)

            // retval= new NativePointer(0);
        }
    });
}
function hook_SCPreferencesGetValue(){
    var SCDynamicStoreCopyValue = Module.findExportByName('SystemConfiguration', 'SCDynamicStoreCopyValue');
    Interceptor.attach(SCDynamicStoreCopyValue, {
        onEnter: function (args) {
            this.arg0 = args[0];
            this.arg1 = args[1];
        },

        onLeave: function (retval) {
            // console.log('getUid', Memory.readCString(this.arg0), retval,ObjC.classes.NSThread.callStackSymbols())
            console.log('SCDynamicStoreCopyValue', this.arg0,this.arg1, retval)

            // retval= new NativePointer(0);
        }
    });
}
function callSuspendThread(){
    var suspendThreads = Module.findExportByName('libtaobaoDylib.dylib', 'suspend_all_thread')
    suspendThreads.implement()
}
function hook_hook() {
    Interceptor.attach(hook, {
        onEnter: function (args) {
            // var arg1str = new ObjC.Object(args[0]).toString()
            // var arg2str = new ObjC.Object(args[1]).toString()
            this.arg1 = args[0];//memory copy到某个空间
            this.arg2 = args[1];
            this.arg3 = args[2];
            var tid = Process.getCurrentThreadId();
            this.tid = tid;
            //   var arg1 = new ObjC.Object(args[1]);
            //   var arg2 = new ObjC.Object(args[2]);
            // console.log('a8', sub_103ECB4F0, hexdump(this.arg1.add(32)))



            //   hook_block_sub();
            //   console.log("arg1", arg1);
            traced = true;
            // hook_sel_getUid();
            // var backtrace = ObjC.classes.NSThread.callStackSymbols();
            // console.log(backtrace);
            //判断objc msg send 调用栈
            // hook_sendmsg();
            // callSuspendThread();
            
            var threads = [{'id':allThreads[currentThreadsIndex]}];
            currentThreadsIndex+=1;
            if (currentThreadsIndex == allThreads.length){
                Interceptor.detachAll();
            }
            for (var i=0; i<threads.length; i++) {
                var thread = threads[i]
                this.tid = thread.id

                console.log('tid is',thread.id)
                Stalker.follow(thread.id, {
                    events: { call: true, ret: true, exec: false, block: false, compile: false },

                    onCallSummary: function (summary) {
                        for (const target in summary) {
                            const number = summary[target];
                            // try {

                            // } catch (error) {
                            //     console.log(error)
                            //     cont
                            // }
                            var module = Process.findModuleByAddress(target);

                            if (module != null) {
                                var jmpSymbol = DebugSymbol.fromAddress(ptr(target))
                                var jmpSymbolName = '';
                                if (jmpSymbol) {
                                    jmpSymbolName = jmpSymbol.name;
                                }
                                console.log("summary:" + module.name + "!" + jmpSymbolName + "!" + ptr(target).sub(module.base), number)
                            }
                        }

                    },

                    onReceive: function (events) {
                        if (found_at != -1) return;
                        events = Stalker.parse(events);
                        console.log("On receive ", events.length)
                        for (var i = 0; i < events.length; i++) {
                            const ev = events[i];
                            // console.log(events[i]);
                            const type = ev[0];
                            const addr = ev[1];
                            const target = ev[2];
                            if (type == 'call') {
                                try {
                                    var module = Process.getModuleByAddress(addr);
                                    var srcSymbol = DebugSymbol.fromAddress(addr);
                                    var jmptoModule = Process.getModuleByAddress(target);
                                    var jmpSymbol = DebugSymbol.fromAddress(target)
                                    var jmpSymbolName = '';
                                    var srcSymbolName = ''
                                    if (jmpSymbol) {
                                        jmpSymbolName = jmpSymbol.name;
                                    }
                                    if (srcSymbol) {
                                        srcSymbolName = srcSymbol.name;
                                    }
                                    if (module != null && module.name == 'Taobao4iPhone') {
                                    // if ((module != null && module.name == 'Taobao4iPhone') || (module != null && jmptoModule.name == 'Taobao4iPhone')) {
                                        allModule.push(jmptoModule.name)

                                        console.log("call:", module.name + "!" + addr.sub(module.base) + "@" + srcSymbolName, jmptoModule.name + "!" + target.sub(jmptoModule.base) + "@" + jmpSymbolName)

                                    }

                                } catch (error) {
                                    console.log("Error happen" + error);
                                }
                            }

                            /* This code will highlight the fileExists call in the stack */
                            // if (!!symbol &&  !!symbol.name && (symbol.name.indexOf('fileExists') >= 0)) {
                            //     console.warn('fileExists');
                            //     found_at = i;
                            //     break;
                            // }

                            // /* This code will display a frame that belongs to our module */
                            // if (!!symbol && !!symbol.moduleName && !!symbol.name &&
                            //     (symbol.moduleName.indexOf('blog-1-storyboard') >= 0) &&
                            //     (symbol.name.indexOf('DYLD-STUB') < 0)) {
                            //     console.log(symbol);
                            // }
                        }

                        console.log(unique(allModule))


                    }

                })
            }


            // console.log("sub_103ECB4F0 onEnter arguments2:", arg1str);
            // console.log("sub_103ECB4F0 onEnter arguments3:", arg2str);

        }, onLeave: function (retval) {

                var tid = Process.getCurrentThreadId();
                Stalker.unfollow(this.tid);

                // Stalker.garbageCollect();

                // Interceptor.detachAll();

        }
    });

}

function main() {
    hook_SCDynamicStoreCopyProxies()
    hook_SCPreferencesGetValue()

    hook_hook();
}



// hook_native_addr(0x3EC92DC);//不是检查签名函数 传入了securityblock//1

setImmediate(main)