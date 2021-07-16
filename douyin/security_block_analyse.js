var securityBlockInstance;
function hook_block(){
    var awemeBase = Module.findBaseAddress("Aweme");
    // var securityBlock  = awemeBase.add(0x3878880);
    // Interceptor.attach(securityBlock, {
    //     onEnter: function (args) {
    //         var arg1str = new ObjC.Object(args[0]).toString()
    //         var arg2str = new ObjC.Object(args[1]).toString()
    //         var arg3str = new ObjC.Object(args[2]).toString()
    //         securityBlockInstance = args[0];
    //         // console.log("securityBlock onEnter arguments2:", arg2str);
    //         // console.log("securityBlock onEnter arguments3:", arg3str);

    //     }, onLeave: function (retval) {
            
    //     }
    // });


    var sub_103ECB4F0 = awemeBase.add(0x3ECB4F0)
    console.log(sub_103ECB4F0)
    Interceptor.attach(sub_103ECB4F0, {
        onEnter: function (args) {
            // var arg1str = new ObjC.Object(args[0]).toString()
            // var arg2str = new ObjC.Object(args[1]).toString()
            this.arg1 = args[0];//memory copy到某个空间
            this.arg2 = args[1];
            this.arg3 = args[2];
            var arg1 = new ObjC.Object(args[1]);
            var arg2 = new ObjC.Object(args[2]);
            console.log('a8',sub_103ECB4F0, hexdump(this.arg1.add(32)))
            console.log("arg1", arg1.absoluteString());
            console.log('arg2',arg2.description());
            
            
            // console.log("sub_103ECB4F0 onEnter arguments2:", arg1str);
            // console.log("sub_103ECB4F0 onEnter arguments3:", arg2str);

        }, onLeave: function (retval) {
            // var NSString = ObjC.use("NSString");
            var ret = new ObjC.Object(retval);

            console.log('ret', ret.description())
            // console.log('sub_103ECB4F0 input is', ObjC.cast(this.arg1, NSString).toString(), this.arg3.toString(), '\n');

            // console.log('sub_103ECB4F0 output is', hexdump(this.arg1));
        }
    });

    var sub_103ECB9D4 = awemeBase.add(0x3ECB9D4)
    sub_103ECB9D4 = new NativeFunction(sub_103ECB9D4,'pointer', [])
    sub_103ECB9D4.implementation=function(args){console.log("sub_103ECB9D4")}
    // var sub_103814784 = awemeBase.add(0x3814784)
    // console.log(sub_103814784)
    // Interceptor.attatch(sub_103814784, {
    //     onEnter: function(args){

    //         console.log('sub_103814784 called')
    //         this.arg1 = args[0];
    //     }, onLeave: function (retval) {
    //         console.log('sub_103814784 output is', this.arg1,hexdump(this.arg1),'\n');

    //         // console.log('sub_103ECB9D4 output is',retval, hexdump(retval));
    //     }
    // })

    // var sub_103838DEC = awemeBase.add(0x3838DEC)
    // console.log('sub_103838DEC',sub_103838DEC)
    // Interceptor.attach(sub_103838DEC, {
    //     onEnter: function(args){

    //         this.arg1 = args[0];
    //         this.arg2 = args[0];
    //         this.arg3 = args[0];

    //     }, onLeave: function (retval) {
    //         console.log('sub_103838DEC input is', Memory.readCString(this.arg2),Memory.readCString(this.arg3),'\n');
    //         console.log('sub_103838DEC output is ',this.arg1,hexdump(this.arg1))
    //         // console.log('sub_103ECB9D4 output is',retval, hexdump(retval));
    //     }
    // })

    // var sub_10387E2BC = awemeBase.add(0x387E2BC)
    // console.log('sub_10387E2BC', sub_10387E2BC)
    // Interceptor.attach(sub_10387E2BC, {
    //     onEnter: function(args){
    //         console.log('enter');
    //         this.arg1 = args[0];
    //         this.arg2 = args[1];
    //         this.arg3 = args[2];

    //     }, onLeave: function (retval) {
    //         console.log('sub_10387E2BC input is', this.arg1, this.art2, this.arg3,'\n');

    //         console.log('sub_10387E2BC input is', Memory.readCString(this.arg2),Memory.readCString(this.arg3),'\n');
    //         console.log('sub_10387E2BC output is ',this.arg1,hexdump(this.arg1))
    //         // console.log('sub_103ECB9D4 output is',retval, hexdump(retval));
    //     }
    // })
}
// function bypasssub_103ECB4F0(){
//     //not work
//     var awemeBase = Module.findBaseAddress("Aweme");
//     var securityBlock  = awemeBase.add(0x3877B80);
//     var playSecurityBlock = new NativeFunction(securityBlock, 'void', ['pointer','pointer'])
//     playSecurityBlock.implementation=function(args){
//         console.log('bypasssub_103ECB4F0 work');
//     }
// }
//这一块直接oc做
// function callSecurity(){
//     console.log("begin call ");

//     // var awemeBase = Module.findBaseAddress("Aweme");
//     // var securityBlock  = awemeBase.add(0x3878880);
//     // var playSecurityBlock = new NativeFunction(securityBlock, 'object', ['object','object', 'object'])
//     var TTNetworkManager = ObjC.classes.TTNetworkManager.shareInstance();
//     var SecurityFactorBlock = TTNetworkManager.addSecurityFactorBlock();
//     var arg1  =  ObjC.classes.NSString.stringWithString_('https://www.adadfa');
//     var arg2  =  ObjC.classes.NSMutableDictionary.alloc().init();
//     var ret  =  SecurityFactorBlock.implementation(securityBlockInstance, arg1, arg2);
//     var retStr = new ObjC.Object(ret).toString()

//     console.log("self call security block:", retStr);
// }
//xcode断点直接卡死所有线程
// function suspend(){
//     var threads = Process.enumerateThreads()
//     for (var i =0; i< threads.length; i++){
//         threads[i].sleep(1000000);
//     }
// }
function main() {
    hook_block();
    // bypasssub_103ECB4F0();
    // hook_sign2();
    // callSecurity();
}


setImmediate(main);