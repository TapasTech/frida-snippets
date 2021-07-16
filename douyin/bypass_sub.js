var awemeBase = Module.findBaseAddress("Aweme");

// var sub_4225ed0 = awemeBase.add(0x4225ed0)
// console.log(sub_4225ed0)
// sub_4225ed0 = new NativeFunction(sub_4225ed0,'pointer', ['pointer'])

// Interceptor.replace(sub_4225ed0, new NativeCallback((a) => {
//     console.log('sub104225ED0', a.toString()) //异常a为0
//   return sub_4225ed0;
// }, 'pointer', ['pointer']));

// var sub_4222984 = awemeBase.add(0x4222984)
// sub_4222984 = new NativeFunction(sub_4222984, 'pointer', ['pointer'])


// Interceptor.replace(sub_4222984, new NativeCallback((a,b) => {
//     console.log('sub_4222984', a.toString(), b.toString())
//   return 0;
// }, 'int', ['pointer', 'pointer']));



// var sub_1040B8BBC = awemeBase.add(0x40B8BBC)
// sub_1040B8BBC = new NativeFunction(sub_1040B8BBC, 'void', ['pointer'])
// Interceptor.replace(sub_1040B8BBC, new NativeCallback((a) => {
//     console.log('sub_1040B8BBC', a.toString())
// }, 'void', ['pointer']));


var sub_103ED4A78 =  awemeBase.add(0x3ED4A78)
sub_103ED4A78 = new NativeFunction(sub_103ED4A78, 'pointer', ['pointer'])
Interceptor.replace(sub_103ED4A78, new NativeCallback((a) => {
    console.log('sub_103ED4A78', a.toString())
    return new NativePointer('0x0')
}, 'pointer', ['pointer']));

var sub_10422477C = awemeBase.add(0x422477C) //security block 
console.log(sub_10422477C)
Interceptor.attach(sub_10422477C, {
    onEnter: function (args) {
        // var arg1str = new ObjC.Object(args[0]).toString()
        // var arg2str = new ObjC.Object(args[1]).toString()
        this.arg1 = args[0];//memory copy到某个空间
        this.arg2 = args[1];
        this.arg3 = args[2];
        // this.arg4 = args[3];

    
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

        // var ret = new ObjC.Object(retval);

        // console.log('ret', ret.description())
        // console.log('sub_1023914E4 input is', ObjC.cast(this.arg1, NSString).toString(), this.arg3.toString(), '\n');


        // console.log('sub_10422477C arg1 is', hexdump(this.arg1));
        // console.log('sub_10422477C arg2 is', hexdump(this.arg2));
        console.log('sub_10422477C ret is', hexdump(retval));

    }
});