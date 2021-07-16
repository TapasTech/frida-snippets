#!/bin/bash
while true
do
    killall -9 frpc ||true
    killall -9 Taobao4iPhone || true
    open com.apple.Preferences || true
    sleep 10
    rm -r /var/mobile/Containers/Data/Application/* ||true
    rm -r /private/var/mobile/Library/Logs/CrashReporter/* ||true
    rm -r /private/var/logs/* ||true
    rm -r /private/var/db/* ||true
#     rm -r /private/var/containers/Shared/SystemGroup ||true #好像没用
    rm -r  /private/var/mobile/Containers/Data/PluginKitPlugin/* ||true
    rm -r  /private/var/mobile/Containers/Temp/* || true
    rm -r /private/var/mobile/Containers/Shared/AppGroup/*|| true
#    # rm -r /privsate/var/mobile/Library/CoreAS/*||true
    rm -r /private/var/containers/Temp/*||true
#     rm -r /var/containers/Data/*||true 会坏系统
    rm -r /private/var/tmp/*||true
#     rm -r  /private/var/mobile/Library/Keyboard/CoreDataUbiquitySupport/* ||true
    rm -r /private/var/mobile/Library/Caches/* ||true
    rm -r /private/var/mobile/Library/com.apple.nsurlsessiond/* ||true

    fuckkeychain -da
    nohup /frpc -c  /frpc.ini >/dev/null 2>&1 & echo 1 || true
    for((i=1;i<100;i++));  
    do   
    open com.taobao.taobao4iphone || true
    sleep 2
    done 
done



