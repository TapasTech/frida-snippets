
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

setTimeout(function () {
    console.log(signBlock.implementation(url, dict));
},0)