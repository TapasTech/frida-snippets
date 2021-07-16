

const AwemeModuleBase = Module.findBaseAddress('Aweme');
const startAddress = Module.findBaseAddress('Aweme').add(ptr('0x3ECB4F0'));
const endAddress = Module.findBaseAddress('Aweme').add(ptr('0x3ECB8A4'));
var found_at = -1;


var sub_103ECB4F0 = AwemeModuleBase.add(0x3ECB4F0)
console.log('AwemeModuleBase:' + sub_103ECB4F0)
var traced = false;


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
  var prefix = "Aweme" + "!" + ptr(addr) + " "

  var module = Process.findModuleByAddress(addr);
  Interceptor.attach(ptr(addr).add(AwemeModuleBase), {
    onEnter: function (args) {
      this.args0 = args[0];
      this.args1 = args[1];
      this.args2 = args[2];
      this.args3 = args[3];
      this.args4 = args[4];
      this.logs = []

      this.logs.push("call " + "Aweme" + "!" + ptr(addr) + "\r\n");
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
  hook_native_addr(0x3ECB9C4);//好像返回arg1，没做改动 13
  hook_native_addr(0x3ECB9BC);//好像返回arg0，没做改动 12
  hook_native_addr(0x3E5BD68);//13
  hook_native_addr(0x3E86BA0);//3
  hook_native_addr(0x3ECA340);//4
  hook_native_addr(0x3E86ADC);//返回arg0//1
  hook_native_addr(0x3ECB4F0);//None
  hook_native_addr(0x3EC92DC);//可能是检查签名函数 传入了securityblock//1
  hook_native_addr(0x3ECA930);//29
  hook_native_addr(0x3ECB9DC);//25
  hook_native_addr(0x3E86AE4);//1 unkown but  return 0
  hook_native_addr(0x3ECB9E4);//25
  hook_native_addr(0x3ECA59C);//None
  hook_native_addr(0x3E86920);//12
  hook_native_addr(0x3ED67D0);//7 copy arg1 to arg0
  hook_native_addr(0x3ECA540);//4 copy arg1 to arg0
  hook_native_addr(0x3E4E1B0);//2 ret arg0
  hook_native_addr(0x3ECB9D4);//1 dont known
  hook_native_addr(0x3E708E0);//1 return arg0

  hook_native_addr(0x3e5d118)//好像真正的签名函数
}

function main() {
  Interceptor.attach(sub_103ECB4F0, {
    onEnter: function (args) {
      // var arg1str = new ObjC.Object(args[0]).toString()
      // var arg2str = new ObjC.Object(args[1]).toString()
      this.arg1 = args[0];//memory copy到某个空间
      this.arg2 = args[1];
      this.arg3 = args[2];
      var tid = Process.getCurrentThreadId();
      this.tid = tid;
      var arg1 = new ObjC.Object(args[1]);
      var arg2 = new ObjC.Object(args[2]);
      // console.log('a8', sub_103ECB4F0, hexdump(this.arg1.add(32)))

      if (arg1.absoluteString().toString() != 'https://search3-search-lf.amemv.com/aweme/v1/search/item/?video_cover_shrink=372_496&enter_from=homepage_hot&sort_type=0&iid=2955926580500413&js_sdk_version=1.99.0.3&mcc_mnc=&openudid=a4cb7b4ade7c5e8e6c90cf8f892aafe6c64c73d1&os_api=18&os_version=13.3.1&screen_width=750&version_code=14.8.0&vid=25AD3C98-7CA5-4B2E-9B39-9BAEFC31BBD2') {
        return;
      }

      hook_block_sub();
      console.log("arg1", arg1.absoluteString());
      console.log('arg2', arg2.description());
      traced = true;
      Stalker.follow(this.tid, {
        events: { call: true, ret: true, exec: false, block: false, compile: false },

        onCallSummary: function (summary) {
          for (const target in summary) {
            const number = summary[target];
            var module = Process.findModuleByAddress(target);
            if (module != null && module.name == 'Aweme') {
              console.log(module.name + "!" + ptr(target).sub(module.base), number)
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
                var jmptoModule = Process.getModuleByAddress(target);
                var jmpSymbol = DebugSymbol.fromAddress(target)
                var jmpSymbolName = '';
                if (jmpSymbol) {
                  jmpSymbolName = jmpSymbol.name;
                }
                console.log("call:", module.name + "!" + addr.sub(module.base), jmptoModule.name + "!" + target.sub(jmptoModule.base) + "@" + jmpSymbolName)
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
        }

      })

      // console.log("sub_103ECB4F0 onEnter arguments2:", arg1str);
      // console.log("sub_103ECB4F0 onEnter arguments3:", arg2str);

    }, onLeave: function (retval) {
      if (traced) {
        console.log(ObjC.Object(retval).description())
        Stalker.unfollow(this.tid);
        Stalker.garbageCollect();
        // Interceptor.detachAll();

      }
      traced = false;


    }
  });

}



// hook_native_addr(0x3EC92DC);//不是检查签名函数 传入了securityblock//1

setImmediate(main)