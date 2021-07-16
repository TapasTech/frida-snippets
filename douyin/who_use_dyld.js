var soAddr = Module.findBaseAddress("Aweme");
//dyld 上层调用地址
var sub_103E7DB2C = soAddr.add(0x3E7DB2C)
console.log('_dyld_get_image_header',Module.findExportByName("/usr/lib/libobjc.A.dylib", "_dyld_get_image_header"))
Interceptor.attach(sub_103E7DB2C, {
    onEnter: function(args) {
        // console.log(args[0].toString(), args[1].toString());

      console.log("sub_103E7DB2C",args[0]);
    },
    onLeave: function(retval){
      console.log("sub_103E7DB2C onLeave:", hexdump(retval,{
          offset: 0,
          length: 200,
          header: true,
          ansi: true
        }));
    }
  });
