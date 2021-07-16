

var securityBlockInstance;
function hook_block(){
    var awemeBase = Module.findBaseAddress("Aweme");
 


    var sub_1023914E4 = awemeBase.add(0x23914E4) //security block 
    console.log(sub_1023914E4)
    Interceptor.attach(sub_1023914E4, {
        onEnter: function (args) {
            // var arg1str = new ObjC.Object(args[0]).toString()
            // var arg2str = new ObjC.Object(args[1]).toString()
            this.arg1 = args[0];//memory copy到某个空间
            this.arg2 = args[1];
            this.arg3 = args[2];
            this.arg4 = args[3];

       
            // console.log("sub_1023914E4 onEnter arguments2:", arg1str);
            // console.log("sub_1023914E4 onEnter arguments3:", arg2str);

        }, onLeave: function (retval) {
            // var NSString = ObjC.use("NSString");
            // var arg1 = new ObjC.Object(this.arg1);
            // var arg2 = new ObjC.Object(this.arg2);
            // var arg3 = new ObjC.Object(this.arg3);
            // var arg4 = new ObjC.Object(this.arg4);

            // console.log("arg1", arg1.description());
            // console.log('arg2',arg2.description());
            // console.log('arg3',arg3.description());
            // console.log('arg4',arg4.description());

            var ret = new ObjC.Object(retval);

            // console.log('ret', ret.description())
            // console.log('sub_1023914E4 input is', ObjC.cast(this.arg1, NSString).toString(), this.arg3.toString(), '\n');

            // console.log('sub_1023914E4 output is', hexdump(this.arg1));
        }
    });

}

function main() {
    hook_block();
    // bypasssub_1023914E4();
    // hook_sign2();
    // callSecurity();
}


setImmediate(main);