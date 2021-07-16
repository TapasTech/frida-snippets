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
    hook_native_addr(0x3eda3c8);
    hook_native_addr(0x3eda028);
    hook_native_addr(0x3ea8d04);
    hook_native_addr(0x3e712e8);
    hook_native_addr(0x3ea7e84);
    hook_native_addr(0x3eac8d8);
    hook_native_addr(0x3e87354);
    hook_native_addr(0x3e7128c);
    hook_native_addr(0x775e39c);
    hook_native_addr(0x3e86de4);
    hook_native_addr(0x3ed9da0);
    hook_native_addr(0x3e71400);
    hook_native_addr(0x775b534);
    hook_native_addr(0x3e70920);
    hook_native_addr(0x3eca4e8);
    hook_native_addr(0x3e713a4);
    hook_native_addr(0x3ed9eb8);
    hook_native_addr(0x3e67b00);
    hook_native_addr(0x3ea12d8);
    hook_native_addr(0x775e7f8);
    hook_native_addr(0x3e71348);
    hook_native_addr(0x3e7111c);
    hook_native_addr(0x3e520c0);
    hook_native_addr(0x3e70d7c);
    hook_native_addr(0x3e93da8);
    hook_native_addr(0x3e70980);
    hook_native_addr(0x3e8a108);
    hook_native_addr(0x3eda5fc);
    hook_native_addr(0x3e70af4);
    hook_native_addr(0x3e4e71c);
    hook_native_addr(0x3ecfd64);
    hook_native_addr(0x3eca9a4);
    hook_native_addr(0x3eca604);
    hook_native_addr(0x3ecb1fc);
    hook_native_addr(0x3e86dec);
    hook_native_addr(0x3e67bc0);
    hook_native_addr(0x3ea8c54);
    hook_native_addr(0x3e87300);
    hook_native_addr(0x3ed6f40);
    hook_native_addr(0x3ea0a88);
    hook_native_addr(0x3ed32b4);
    hook_native_addr(0x3e4e1b0);
    hook_native_addr(0x3e5bd68);
    hook_native_addr(0x3ea1680);
    hook_native_addr(0x3e716f0);
    hook_native_addr(0x3e84b20);
    hook_native_addr(0x3e70c10);
    hook_native_addr(0x3ede85c);
    hook_native_addr(0x775cb00);
    hook_native_addr(0x775e918);
    hook_native_addr(0x3ea1228);
    hook_native_addr(0x3e713b0);
    hook_native_addr(0x3e711e0);
    hook_native_addr(0x3ed325c);
    hook_native_addr(0x775e804);
    hook_native_addr(0x3e71698);
    hook_native_addr(0x3e853d8);
    hook_native_addr(0x3e712f8);
    hook_native_addr(0x3e4e728);
    hook_native_addr(0x3e70c74);
    hook_native_addr(0x3e8a230);
    hook_native_addr(0x3e7019c);
    hook_native_addr(0x3e8a120);
    hook_native_addr(0x3e51710);
    hook_native_addr(0x3ec9510);
    hook_native_addr(0x3e87314);
    hook_native_addr(0x3e4de24);
    hook_native_addr(0x3e708e0);
    hook_native_addr(0x3e8c790);
    hook_native_addr(0x3e70fc4);
    hook_native_addr(0x3e88764);
    hook_native_addr(0x3eca4a8);
    hook_native_addr(0x3e87200);
    hook_native_addr(0x3ea1b4c);
    hook_native_addr(0x3e868f0);
    hook_native_addr(0x3e86fd4);
    hook_native_addr(0x3e52080);
    hook_native_addr(0x3ea197c);
    hook_native_addr(0x3ead4f0);
    hook_native_addr(0x3e71080);
    hook_native_addr(0x3ecaa78);
    hook_native_addr(0x3ea1a94);
    hook_native_addr(0x3e70b10);
    hook_native_addr(0x3ed4bd0);
    hook_native_addr(0x3e86f78);
    hook_native_addr(0x3eda21c);
    hook_native_addr(0x3ed7070);
    hook_native_addr(0x3e71368);
    hook_native_addr(0x3ed9e7c);
    hook_native_addr(0x3e90e48);
    hook_native_addr(0x3eb1c60);
    hook_native_addr(0x3e520e0);
    hook_native_addr(0x3e70bcc);
    hook_native_addr(0x3ecaca8);
    hook_native_addr(0x3ea03c0);
    hook_native_addr(0x3e8a128);
    hook_native_addr(0x3ee7920);
    hook_native_addr(0x3ea1188);
    // hook_native_addr(0x3e8a0cc);
    hook_native_addr(0x3e5d118);
    hook_native_addr(0x3e71028);
    hook_native_addr(0x3ea169c);
    hook_native_addr(0x3e4e6e0);
    hook_native_addr(0x3e926f4);
    hook_native_addr(0x3e67728);
    hook_native_addr(0x3ecb278);
    hook_native_addr(0x3e70f70);
    hook_native_addr(0x3e8a188);
    hook_native_addr(0x3e86fdc);
    hook_native_addr(0x3e71428);
    hook_native_addr(0x3ed6f60);
    hook_native_addr(0x3e90f08);
    hook_native_addr(0x3ed69f0);
    hook_native_addr(0x3e71088);
    hook_native_addr(0x3eca340);
    hook_native_addr(0x3ecb164);
    hook_native_addr(0x3e4e740);
    hook_native_addr(0x3e711fc);
    hook_native_addr(0x3e70fd0);
    hook_native_addr(0x3ecb9bc);
    hook_native_addr(0x3ea8cd4);
    hook_native_addr(0x775e084);
    hook_native_addr(0x3e4dd78);
    hook_native_addr(0x3e71144);
    hook_native_addr(0x3e71488);
    hook_native_addr(0x3e5208c);
    hook_native_addr(0x3e70d48);
    hook_native_addr(0x3ecb1c4);
    hook_native_addr(0x3e57394);
    hook_native_addr(0x3ea03c8);
    hook_native_addr(0x3ea7c28);
    hook_native_addr(0x3eda3f8);
    hook_native_addr(0x3e70550);
    hook_native_addr(0x3e71374);
    hook_native_addr(0x3e8a078);
    hook_native_addr(0x3eb31d0);
    hook_native_addr(0x3e71318);
    // hook_native_addr(0x3e520ec);
    hook_native_addr(0x3e70da8);
    hook_native_addr(0x3e70bd8);
    hook_native_addr(0x3e5c1e8);
    hook_native_addr(0x3ea8c7c);
    hook_native_addr(0x3e7ce8c);
    hook_native_addr(0x3e71430);
    hook_native_addr(0x3e84a30);
    hook_native_addr(0x3e86a18);
    hook_native_addr(0x3ee5718);
    hook_native_addr(0x775e828);
    hook_native_addr(0x3ecb9c4);
    hook_native_addr(0x3ea0828);
    hook_native_addr(0x3ea164c);
    hook_native_addr(0x3e9a300);
    hook_native_addr(0x3e7114c);
    hook_native_addr(0x3e70f7c);
    hook_native_addr(0x3e86ad4);
    hook_native_addr(0x3e51d50);
    hook_native_addr(0x3e71490);
    hook_native_addr(0x3ed9dd4);
    hook_native_addr(0x3ecc730);
    hook_native_addr(0x3ea1764);
    hook_native_addr(0x3ead334);
    hook_native_addr(0x3e68100);
    hook_native_addr(0x3ecf140);
    hook_native_addr(0x3ed67d0);
    hook_native_addr(0x3ea04e8);
    hook_native_addr(0x3ed30b4);
    hook_native_addr(0x3ed9e90);
    hook_native_addr(0x3e711ac);
    hook_native_addr(0x3e87274);
    hook_native_addr(0x3e87048);
    hook_native_addr(0x775e090);
    hook_native_addr(0x3eca7a8);
    hook_native_addr(0x3e51f24);
    hook_native_addr(0x3e70100);
    hook_native_addr(0x3e93d80);
    hook_native_addr(0x3ede65c);
    hook_native_addr(0x3ee4b84);
    hook_native_addr(0x3e71268);
    hook_native_addr(0x3ea8c28);
    hook_native_addr(0x3e8a13c);
    hook_native_addr(0x3e70b28);
    hook_native_addr(0x775d328);
    hook_native_addr(0x3e70db0);
    hook_native_addr(0x3e523dc);
    hook_native_addr(0x3ecb118);
    hook_native_addr(0x3ee5894);
    hook_native_addr(0x3e4e698);
    hook_native_addr(0x3e86adc);
    hook_native_addr(0x3ea1998);
    hook_native_addr(0x3ed9ddc);
    hook_native_addr(0x3ed4a78);
    hook_native_addr(0x3e58964);
    hook_native_addr(0x3e71498);
    hook_native_addr(0x3eda2f0);
    hook_native_addr(0x3eda120);
    hook_native_addr(0x3e87334);
    hook_native_addr(0x3e67854);
    hook_native_addr(0x3ed3344);
    hook_native_addr(0x3e90ec0);
    hook_native_addr(0x3eda408);
    hook_native_addr(0x3ed328c);
    hook_native_addr(0x775e834);
    hook_native_addr(0x3edacbc);
    hook_native_addr(0x3e516d4);
    hook_native_addr(0x3e89ce8);
    hook_native_addr(0x3eda3ac);
    hook_native_addr(0x3e71328);
    hook_native_addr(0x3edb174);
    hook_native_addr(0x3e86ff4);
    hook_native_addr(0x3e67688);
    hook_native_addr(0x775e720);
    hook_native_addr(0x3e71270);
    hook_native_addr(0x3e52044);
    hook_native_addr(0x3ee4790);
    hook_native_addr(0x3e71440);
    hook_native_addr(0x3e51734);
    hook_native_addr(0x3e872dc);
    hook_native_addr(0x3e70ca4);
    hook_native_addr(0x3ed7260);
    hook_native_addr(0x3ecb9d4);
    hook_native_addr(0x775c7f4);
    hook_native_addr(0x3e70dbc);
    hook_native_addr(0x3e86ae4);
    hook_native_addr(0x3e714a0);
    hook_native_addr(0x3ecaaf8);
    hook_native_addr(0x3e709c0);
    hook_native_addr(0x3e523e8);
    hook_native_addr(0x3e84c14);
    hook_native_addr(0x3ecb180);
    hook_native_addr(0x3e71218);
    hook_native_addr(0x3e86ba0);
    hook_native_addr(0x3ea6110);
    hook_native_addr(0x3ed9ea0);
    hook_native_addr(0x3e70e1c);
    hook_native_addr(0x3ed3238);
    hook_native_addr(0x775e7e0);
    hook_native_addr(0x3e70f90);
    hook_native_addr(0x3ea1b74);
    hook_native_addr(0x3ee5674);
    hook_native_addr(0x3e51ed8);
    hook_native_addr(0x3eac354);
    hook_native_addr(0x3e71448);
    hook_native_addr(0x3e87340);
    hook_native_addr(0x3ecb1e0);
    hook_native_addr(0x3e70d08);
    hook_native_addr(0x3eaea20);
    hook_native_addr(0x3ed32f4);
    hook_native_addr(0x3e56530);
    hook_native_addr(0x3e4e1f0);
    hook_native_addr(0x3ecb9dc);
    hook_native_addr(0x3e885c0);
    hook_native_addr(0x3e8a208);
    hook_native_addr(0x3e71108);
    hook_native_addr(0x3eca930);
    hook_native_addr(0x3e67c04);
    hook_native_addr(0x3e7cea8);
    hook_native_addr(0x3e67a34);
    hook_native_addr(0x3e523f0);
    hook_native_addr(0x3ea3c78);
    hook_native_addr(0x3ecb188);
    hook_native_addr(0x3ecafb8);
    hook_native_addr(0x3ead464);
    hook_native_addr(0x3ed30cc);
    hook_native_addr(0x3ed9ea8);
    hook_native_addr(0x3e711c4);
    hook_native_addr(0x3ed3240);
    hook_native_addr(0x3ed7210);
    hook_native_addr(0x3e7cf08);
    hook_native_addr(0x3e86920);
    hook_native_addr(0x3ed9fc0);
    hook_native_addr(0x3e712dc);
    hook_native_addr(0x3ed3358);
    hook_native_addr(0x3ed9f64);
    hook_native_addr(0x775e390);
    hook_native_addr(0x3ede618);
    hook_native_addr(0x3e713f4);
    hook_native_addr(0x3edded8);
    hook_native_addr(0x3e90ed4);
    hook_native_addr(0x3ecabc0);
    hook_native_addr(0x3ecb9e4);
    hook_native_addr(0x3eca820);
    hook_native_addr(0x775e7ec);
    hook_native_addr(0x3e8a210);
    hook_native_addr(0x3ea1d50);
    hook_native_addr(0x3e51f40);
    hook_native_addr(0x3e71110);
    hook_native_addr(0x3e868c8);
    hook_native_addr(0x3e71284);
    hook_native_addr(0x3e4f5ec);
    hook_native_addr(0x3ea1ac8);
    hook_native_addr(0x3e70b44);
    hook_native_addr(0x3e714b0);
    hook_native_addr(0x3e51918);
    hook_native_addr(0x3eac818);
    hook_native_addr(0x3ecb134);
    hook_native_addr(0x3ecaf64);
    hook_native_addr(0x3e8a0a0);
    hook_native_addr(0x3ecfd58);
    hook_native_addr(0x3ed9fc4);
    hook_native_addr(0x3eda368);
    hook_native_addr(0x3ed6fec);
    hook_native_addr(0x3e710b8);
    hook_native_addr(0x3e5205c);
    hook_native_addr(0x3e7ce58);
    hook_native_addr(0x3ecf504);
    hook_native_addr(0x3ed3304);
    hook_native_addr(0x3ed7104);
    hook_native_addr(0x3ea6180);
    hook_native_addr(0x3e87124);
    hook_native_addr(0x3e872f4);
    hook_native_addr(0x3e869e4);
    hook_native_addr(0x3ed32a8);
    hook_native_addr(0x3e4e714);
    hook_native_addr(0x3ea0f90);
    hook_native_addr(0x3e51fa4);
    hook_native_addr(0x3e870c8);
    hook_native_addr(0x3e70c60);
}

function getNSString(str) {
    var arg1 = ObjC.classes.NSString.stringWithString_(str);
    return arg1;
}

function getNSDictionary(obj) {
    var mutable_dict = ObjC.classes.NSMutableDictionary.alloc().init();
    for (var key in obj) {
        var keyns = getNSString(key)
        var valns = getNSString(obj[key])
        mutable_dict.setObject_forKey_(valns, keyns)
    }
    return mutable_dict
}

var signBlock = ObjC.classes.TTNetworkManager.shareInstance().addSecurityFactorBlock();
var urlstr = getNSString("https://search3-search-lf.amemv.com/aweme/v1/search/item/?caid1=0803bffc8815b9f02c08f48f95c1008c&tma_jssdk_version=2.1.0.2&minor_status=0&ac=WIFI&appTheme=dark&is_vcd=1&keyword=%E7%8E%8B%E4%B8%80%E5%8D%9A&video_cover_shrink=372_496&enter_from=homepage_hot&sort_type=0&backtrace=M7U2PfbCPC7qlX46ow2D73foIbuD7zG%2BTODCT48wHI74oC1dlQVm4omXMt%2BkHUSKjMf5EJvWyjt3jVKDb%2FBylQ%3D%3D&count=12&is_filter_search=0&user_avatar_shrink=64_64&source=video_search&query_correct_type=1&rs_word_count=5&offset=0&search_source=normal_search&publish_time=0&hot_search=0&aid=1128&app_name=aweme&app_version=14.8.0&build_number=148013&cdid=FEDA96DE-E849-4E15-99C9-66CD61F50ADD&channel=App%20Store&device_id=4169787388733342&device_platform=iphone&device_type=iPhone9,1&idfa=322127EF-8E4E-48E9-98E0-99ACBDC85525&iid=2955926580500413&js_sdk_version=1.99.0.3&mcc_mnc=&openudid=a4cb7b4ade7c5e8e6c90cf8f892aafe6c64c73d1&os_api=18&os_version=13.3.1&screen_width=750&version_code=14.8.0&vid=25AD3C98-7CA5-4B2E-9B39-9BAEFC31BBD2");
var url = ObjC.classes.NSURL.URLWithString_(urlstr);
var dict = getNSDictionary({
    'x-tt-token': '003c4774314c4f83d0177a0ae886f5a6f50056cb8fc53fa60c3b0bf88596c762fc922f46798e27276d911e99fde0203a46a8df6837c3279998eaaccf63df5e59c34fb9458bd8d9b17fd1ecf392c2a6fc08649f8411f4295761fc95f3fe46affde27ce-1.0.1',
    'User-Agent': 'Aweme 14.8.0 rv:148013 (iPhone; iOS 13.3.1; zh_CN) Cronet',
    'x-common-params-v2':
        'aid=1128&app_name=aweme&app_version=14.8.0&build_number=148013&cdid=FEDA96DE-E849-4E15-99C9-66CD61F50ADD&channel=App%20Store&device_id=4169787388733342&device_platform=iphone&device_type=iPhone9,1&idfa=322127EF-8E4E-48E9-98E0-99ACBDC85525&iid=2955926580500413&js_sdk_version=1.99.0.3&mcc_mnc=&openudid=a4cb7b4ade7c5e8e6c90cf8f892aafe6c64c73d1&os_api=18&os_version=13.3.1&screen_width=750&version_code=14.8.0&vid=25AD3C98-7CA5-4B2E-9B39-9BAEFC31BBD2',
})

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

            if (arg1.absoluteString().toString() != 'https://search3-search-lf.amemv.com/aweme/v1/search/item/?caid1=0803bffc8815b9f02c08f48f95c1008c&tma_jssdk_version=2.1.0.2&minor_status=0&ac=WIFI&appTheme=dark&is_vcd=1&keyword=%E7%8E%8B%E4%B8%80%E5%8D%9A&video_cover_shrink=372_496&enter_from=homepage_hot&sort_type=0&backtrace=M7U2PfbCPC7qlX46ow2D73foIbuD7zG%2BTODCT48wHI74oC1dlQVm4omXMt%2BkHUSKjMf5EJvWyjt3jVKDb%2FBylQ%3D%3D&count=12&is_filter_search=0&user_avatar_shrink=64_64&source=video_search&query_correct_type=1&rs_word_count=5&offset=0&search_source=normal_search&publish_time=0&hot_search=0&aid=1128&app_name=aweme&app_version=14.8.0&build_number=148013&cdid=FEDA96DE-E849-4E15-99C9-66CD61F50ADD&channel=App%20Store&device_id=4169787388733342&device_platform=iphone&device_type=iPhone9,1&idfa=322127EF-8E4E-48E9-98E0-99ACBDC85525&iid=2955926580500413&js_sdk_version=1.99.0.3&mcc_mnc=&openudid=a4cb7b4ade7c5e8e6c90cf8f892aafe6c64c73d1&os_api=18&os_version=13.3.1&screen_width=750&version_code=14.8.0&vid=25AD3C98-7CA5-4B2E-9B39-9BAEFC31BBD2') {
                return;
            }

            hook_block_sub();
            console.log("arg1", arg1.absoluteString());
            console.log('arg2', arg2.description());
            traced = true;
            Stalker.follow(this.tid, {
                events: {call: true, ret: true, exec: false, block: false, compile: false},

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
                console.log('[end signal]' + ObjC.Object(retval).description())
                Stalker.unfollow(this.tid);
                Stalker.garbageCollect();
                // Interceptor.detachAll();

            }
            traced = false;


        }
    });
    signBlock.implementation(url, dict)

}


// hook_native_addr(0x3EC92DC);//不是检查签名函数 传入了securityblock//1

setImmediate(main)

setTimeout(function () {
}, 1000)
