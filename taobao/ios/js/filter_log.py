with open('one.log', 'r') as f:
    blines  =f.readlines()
    lines = []
    for i in blines:
        if 'summary' not  in i:
            continue
        a = i.split(' ')[0]
        # print(a)
        lines.append(a)
    lines = list(set(lines))
def check_line(line):

    
    for i in  ['dispatch', 
    'libsystem_pthread.dylib',
    'dyld',
    'mach_',
    'CoreMotion', 'AccessibilityUtilities',
    'JavaScriptCore',
    'Releasse',
    'release', 'mem', '_xpc_', 'libsystem_trace.dylib', 'CFString', 'Taobao4iPhone', 'lock_', 'libsystem_malloc', 'libxpc.dylib', 'libdyld.dylib','libobjc.A.dylib']:
        if i in line :
            return False
    return True
res = []
for line in lines :
    if  check_line(line):
        res.append(line +'\n')

with open('./filter.log',  'w') as f:
    f.writelines(res)
