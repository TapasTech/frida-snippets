#!/bin/bash
NEW_UUID=$(date +%s)
ip=$1
port=$2
if [ $# -lt 2 ] 
then
    echo "Usage: ./install.sh  ip port"
    exit
fi

rm /Users/dd/.ssh/known_hosts ||true 
sshpass -p "alpine" ssh-copy-id -o StrictHostKeyChecking=no  -i  ~/.ssh/id_rsa root@${ip} -p${port} ||true
ssh -p${port} root@${ip} rm /var/root/com.fack.TweakServer_0.2-1_iphoneos-arm.deb||true
ssh -p${port} root@${ip} rm /var/root/com.jiangjia.cydiatweak_0.1-1_iphoneos-arm.deb||true
ssh -p${port} root@${ip} rm /var/root/com.ss.iphone.ugc.fuckkeychain_0.1-1_iphoneos-arm.deb||true
ssh -p${port} root@${ip} rm /var/root/fuckair.airplanecli_0.1-1_iphoneos-arm.deb||true

ssh -p${port} root@${ip} rm /var/root/new_taobao.sh||true
ssh -p${port} root@${ip} rm /var/root/tb.py||true

scp -P ${port} ./new_taobao.sh root@${ip}:/var/root/new_taobao.sh||true
scp -P ${port} ./tb.py root@${ip}:/var/root/tb.py||true
scp -P ${port} ./com.ss.iphone.ugc.fuckkeychain_0.1-1_iphoneos-arm.deb root@${ip}:/var/root/||true
scp -P ${port} ./com.jiangjia.cydiatweak_0.1-1_iphoneos-arm.deb root@${ip}:/var/root/||true
scp -P ${port} ./com.fack.TweakServer_0.2-1_iphoneos-arm.deb root@${ip}:/var/root/||true
scp -P ${port} ./fuckair.airplanecli_0.1-1_iphoneos-arm.deb root@${ip}:/var/root/||true
scp -P ${port} ./frpc root@${ip}:/||true
scp -P ${port} ./frpc.ini root@${ip}:/frpc.ini||true

iphonename=$(ssh -p${port} root@${ip} uname -n)
echo "连接的iphone是 ${iphonename}"
#安装tweak
ssh -p${port} root@${ip} sed  -i "s/taobao/taobao${iphonename}/g" /frpc.ini || true
ssh -p${port} root@${ip} dpkg -r com.jiangjia.cydiatweak || true
ssh -p${port} root@${ip} dpkg -r com.fack.TweakServer || true
ssh -p${port} root@${ip} dpkg -r com.ss.iphone.ugc.fuckkeychain|| true
ssh -p${port} root@${ip} dpkg -r fuckair.airplanecli|| true

#添加权限
ssh -p${port} root@${ip} chmod a+x /frpc||true
ssh -p${port} root@${ip} chmod a+x /var/root/new_taobao.sh||true
ssh -p${port} root@${ip} dpkg --install /var/root/com.fack.TweakServer_0.2-1_iphoneos-arm.deb||true
ssh -p${port} root@${ip} dpkg --install /var/root/com.jiangjia.cydiatweak_0.1-1_iphoneos-arm.deb||true
ssh -p${port} root@${ip} dpkg --install /var/root/com.ss.iphone.ugc.fuckkeychain_0.1-1_iphoneos-arm.deb||true
ssh -p${port} root@${ip} dpkg --install /var/root/fuckair.airplanecli_0.1-1_iphoneos-arm.deb||true

ssh -p${port} root@${ip}  echo "deb http://apt.abcydia.com ./" >> /etc/apt/sources.list.d/cydia.list
# ssh -p${port} root@${ip} apt-get update
ssh -p${port} root@${ip} apt-get install -y com.conradkramer.open||true
# ssh -p${port} root@${ip} apt-get install -y vim||true
ssh -p${port} root@${ip} 'killall python3' ||true
ssh -p${port} root@${ip} 'killall frpc' ||true

if [ $# -eq 3 ] 
then
    ssh -p${port} root@${ip} cd / &&  ldid -S ./frpc ||true
    nohup /frpc -c  /frpc.ini >/dev/null 2>&1 & echo 1 || true
    ssh -p${port} root@${ip} "cd /var/root/ && ./new_taobao.sh"
    echo " nohup run tb.py"
    python3=$(ssh -p${port} root@${ip} which python3)
    ssh -p${port} root@${ip} "nohup ${python3} -u /var/root/tb.py > /var/root/tb.log 2>&1  &"
    echo "手动检查下python 启动没 nohup python3 -u /var/root/tb.py > /var/root/tb.log 2>&1  &"
fi
#apt-get install -y curl
#awk
#python3 -m ensurepip
#pip3 install requests retry