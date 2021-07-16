#!/bin/bash
NEW_UUID=$(date +%s)
ip=$1
port=$2


rm /Users/dd/.ssh/known_hosts ||true 
sshpass -p "alpine" ssh-copy-id -o StrictHostKeyChecking=no  -i  ~/.ssh/id_rsa root@${ip} -p${port} ||true
ssh -p${port} root@${ip} ``ps -ef | grep frpc | awk '{ print $2}' | head -1`` > process.pidfile ||true
scp -P ${port}  ./process.pidfile root@${ip}:/var/root ||true
ssh -p${port} root@${ip} 'ERPMPROC=`cat process.pidfile`;  kill $ERPMPROC' ||true


ssh -p${port} root@${ip} ``ps -ef | grep loop.sh | awk '{ print $2}' | head -1`` > process.pidfile ||true
scp -P ${port}  ./process.pidfile root@${ip}:/var/root ||true
ssh -p${port} root@${ip} 'ERPMPROC=`cat process.pidfile`;  kill $ERPMPROC' ||true
if [ $# -eq 3 ] 
then
    echo " nohup run loop"
    ssh -p${port} root@${ip} "nohup ./loop.sh  >/dev/null 2>&1  &"
    ssh -p${port} root@${ip} cd / &&  ldid -S ./frpc ||true
fi