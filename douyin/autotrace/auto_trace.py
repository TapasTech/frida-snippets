import frida, sys
import time
import subprocess

cur_func = None
file_name = None


def get_func_addrs():
    with open('/Users/dd/ws/frida-snippets/douyin/log/call_summary.log') as f:
        res = f.readlines()
    return res


def shell(command):
    try:
        output = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT)
    except Exception as e:
        output = str(e.output)
    finished = output.split('\n')
    for line in finished:
        print(line)
    return


def open_app():
    subprocess.call(
        'ssh -p2222 root@localhost rm -r /var/mobile/Containers/Data/Application/B3E61A3F-C985-400E-B4F4-96530909B1D2/* ||true',
        shell=True)
    subprocess.call('ssh -p2222 root@localhost open com.ss.iphone.ugc.Aweme', shell=True)
    time.sleep(10)


def kill_mac_frida():
    subprocess.call('kill - 9 $(ps aux | grep frida | grep -v grep | awk \'{print $2}\')', shell=True)


def kill_app():
    subprocess.call('ssh -p2222 root@localhost killall -9 Aweme', shell=True)


def reopen_ios_frida():
    subprocess.call("ssh -p2222 root@localhost 'killall -9 frida-server-14.2.13-ios-arm64||true'", shell=True)
    subprocess.call("ssh -p2222 root@localhost 'cd ~ && ./frida-server-14.2.13-ios-arm64 &'", shell=True)
    print('frida rerun')


def run_frida(jscode):
    with open('run.js', 'w') as f:
        f.write(jscode)
    kill_app()
    # reopen_ios_frida()
    open_app()

    subprocess.call(f"frida -l run.js -U Aweme -o {file_name} &", shell=True)

    if not check_analyse_finish():
        with open('../log/failed.log', 'a+') as f:
            f.write(cur_func + '\n')
        print(f"current function {cur_func} failed")
    kill_mac_frida()
    kill_app()


def check_analyse_finish():
    count = 0
    while True:
        with open(file_name, 'r') as f:
            if "[end signal]" in f.read():
                return True
        count += 1
        time.sleep(2)
        if count > 15:
            return False


def read_js_template():
    with open('template.js', 'r') as f:
        return f.read()


def recreate_file(name):
    f = open(name, 'w')
    f.close()


if __name__ == "__main__":
    # recreate_file('../log/failed.log')
    for i, func in enumerate(get_func_addrs()):
        if i <=81:
            continue
        cur_func = func.replace('\n', '')
        file_name = f'/Users/dd/ws/frida-snippets/douyin/log/auto_trace/{cur_func}.log'
        recreate_file(file_name)
        print('begin', i, cur_func)
        jscode = read_js_template()
        newjscode = jscode.replace('need_replace', cur_func)
        run_frida(newjscode)
