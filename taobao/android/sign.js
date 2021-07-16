
Java.perform(function () {
    // Function to hook is defined here
    const lll = Java.use('tb.lll');
    const llm = Java.use('tb.llm');
    const MtopBuilder = Java.use('mtopsdk.mtop.intf.MtopBuilder');
    const lcn = Java.use('tb.lcn');
    const req = Java.use('com.taobao.cun.bundle.station.bind.mtop.MtopStationSearchByLngAndLatRequest');
    const imp = Java.use('mtopsdk.mtop.protocol.builder.impl.InnerProtocolParamBuilderImpl');

    setImmediate(function () {
        Java.perform(function () {
            const generatorSig = lll.a.overload('java.util.HashMap', 'java.lang.String', 'java.lang.String');
            generatorSig.implementation = function (str1, str2, str3) {
                console.log(str2, str3);
                //return res;
            };
            const llmA = llm.a.overload('java.util.HashMap', 'java.lang.String', 'java.lang.String');
            llmA.implementation = function (str1, str2, str3) {
                console.log(str2, str3);
                //return res;
            };
    
    
            const llmA_1 = llm.a.overload('java.util.Map', 'java.lang.String');
            llmA_1.implementation = function (str1, str2, str3) {
                console.log(str2, str3);
                //return res;
            };
    
    
            const headers = MtopBuilder.headers.overload('java.util.Map');
            headers.implementation = function (str1, str2, str3) {
                console.log(str1, str2, str3);
                //return res;
            };
    
            const lcna = lcn.a.overload('java.lang.String');
            lcna.implementation = function (str1, str2, str3) {
                console.log(str1, str2, str3);
                //return res;
            };
    
            const v = req.getVERSION.overload();
            v.implementation = function (str1, str2, str3) {
                console.log(str1, str2, str3);
                //return res;
            };
            lll.a('java.util.HashMap', 'java.util.HashMap', 'java.lang.String', 'java.lang.String', 'java.lang.Boolean').implementation = function (str1, str2, str3) {
                console.log(str1, str2, str3);
                //return res;
            };
            lll.a('java.util.Map', 'java.lang.String', 'java.lang.Boolean').implementation = function (str1, str2, str3) {
                console.log(str1, str2, str3);
                //return res;
            };
    
            // imp.buildParams.overload("mtopsdk.framework.domain.a").implementation = function (str1, str2, str3) {
            //     console.log(str1, str2, str3);
            //     //return res;
            // };
            //
            // imp.buildParams.overload("mtopsdk.framework.domain.a", "java.util.Map").implementation = function (str1, str2, str3) {
            //     console.log(str1, str2, str3);
            // };
        });
    
    });

});
