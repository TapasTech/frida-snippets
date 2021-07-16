var soAddr = Module.findBaseAddress("Aweme");
var sub_103877B80 = soAddr.add(0x3877B80); //函数地址计算 thumb+1 ARM不加
// console.log('hook sub_103877B80');
//
// Interceptor.attach(sub_103877B80,{
//     onEnter: function(args){
//         console.log('\nsub_103877B80 Enter')
//
//         this.arg0 = args[0];
//         this.arg1 = args[1];
//         console.log(Memory.readCString(this.arg0));
//         console.log(Memory.readUtf8String(this.arg1));
//         // console.log(args[2]);
//     },
//     onLeave: function(retval){
//         console.log('END\n')
//         // console.log(Memory.readUtf8String(retval.toString()));
//         var str=new ObjC(ptr(this.arg0)).toString();
//         console.log(str)
//         console.log(Memory.readUtf8String(this.arg1));
//     }
// });



// var sub_10381CA30 = soAddr.add(0x381CA30); //函数地址计算 thumb+1 ARM不加
// console.log('hook sub_10381CA30');
//
// Interceptor.attach(sub_10381CA30,{
//     onEnter: function(args){
//         console.log('\nsub_10381CA30 Enter');
//
//         this.arg0 = args[0];
//         this.arg1 = args[1];
//         console.log("sub_10381CA30 onEnter:", hexdump(args[0]), "\r这他妈是个换行\n\n", hexdump(args[1]));
//
//         // console.log(Memory.readCString(this.arg0));
//         // console.log(Memory.readCString(this.arg1));
//         // console.log(args[2]);
//     },
//     onLeave: function(retval){
//         console.log("sub_10381CA30 onLeave:", hexdump(retval));
//         // console.log(Memory.readCString(this.arg0));
//         // console.log(Memory.readCString(this.arg1));
//         // console.log('END\n')
//
//         // console.log(Memory.readUtf8String(this.arg1));
//     }
// });



var sub_103838DEC = soAddr.add(0x3838DEC); //函数地址计算 thumb+1 ARM不加
console.log('hook sub_103838DEC');

Interceptor.attach(sub_103838DEC,{
    onEnter: function(args){
        console.log('\nsub_103838DEC Enter');

        this.arg0 = args[0];
        this.arg1 = args[1];
        console.log("sub_103838DEC args[0]:", hexdump(args[0],{
            offset: 0,
            length: 200,
            header: true,
            ansi: true
        }));
        console.log("sub_103838DEC args[1]:", hexdump(args[1],{
            offset: 0,
            length: 200,
            header: true,
            ansi: true
        }));
        console.log("sub_103838DEC args[2]:", hexdump(args[2],{
            offset: 0,
            length: 200,
            header: true,
            ansi: true
        }));

        // console.log(Memory.readCString(this.arg0));
        // console.log(Memory.readCString(this.arg1));
        // console.log(args[2]);
    },
    onLeave: function(retval){
        console.log("sub_103838DEC onLeave:", hexdump(retval,{
            offset: 0,
            length: 200,
            header: true,
            ansi: true
        }));
        // console.log(Memory.readCString(this.arg0));
        // console.log(Memory.readCString(this.arg1));
        // console.log('END\n')

        // console.log(Memory.readUtf8String(this.arg1));
    }
});
