function describeJavaClass(className) {
    var jClass = Java.use(className);
    console.log(JSON.stringify({
      _name: className,
      _methods: Object.getOwnPropertyNames(jClass.__proto__).filter(m => {
          return m
        // return !m.startsWith('$') // filter out Frida related special properties
        //    || m == 'class' || m == 'constructor' // optional
      }), 
    //   _fields: jClass.class.getFields().map(f => {
    //     return f.toString()
    //   })  
    }, null, 2));
}

Java.perform(function() {
    Java.enumerateLoadedClasses({
        onMatch: function(className) {
            console.log(className);
            // try {
            //     if (className.indexOf('tb.') == 0 && className){
            //         console.log(className);
            //         describeJavaClass(className);
            //     }
            // } catch (error) {
            //     // console.log(error)
            // }
        },
        onComplete: function() {
        }
    });
});