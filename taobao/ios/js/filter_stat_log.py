
with open('./stat.log', 'r') as f:
    rlines = f.readlines()
lines = []
def check_line(line):
    for i in ['/var/containers/Bundle/Application/', '/var/mobile/Containers/Data/Application/', '.framework']:
        if i in line:
            return False
    return True


for line in rlines:
    if check_line(line):
        lines.append(line)

with open('./filter_stat.log', 'w') as f:
    f.writelines(lines)