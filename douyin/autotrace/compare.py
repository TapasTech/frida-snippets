if __name__ == '__main__':
    with open('/Users/dd/ws/frida-snippets/douyin/log/call_summary.log') as file:
        all_summary = file.readlines()
        # all_summary = [ x.remove("""\n""", '') for x in all_summary]
    with open('/Users/dd/ws/frida-snippets/douyin/log/failed.log') as file:
        failed = file.readlines()
        # failed = [x.remove('\n', '') for x in failed]

    for fail in failed:
        try:
            all_summary.remove(fail)
        except Exception as e:
            continue

    for i in all_summary:
        func =i.replace('\n', '')
        print(f'hook_native_addr({func});')
