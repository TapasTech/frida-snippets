import urllib
from retry import retry
import json
import re
import math
from urllib.parse import urlencode, quote_plus
from hashlib import md5
import time
import random
import subprocess
from multiprocessing import Value
import requests

IP = 'localhost:8090'

s = requests.session()
out_ip = set()


def generate_random_gps(base_log=None, base_lat=None, radius=None):
    radius_in_degrees = radius / 111300
    u = float(random.uniform(0.0, 1.0))
    v = float(random.uniform(0.0, 1.0))
    w = radius_in_degrees * math.sqrt(u)
    t = 2 * math.pi * v
    x = w * math.cos(t)
    y = w * math.sin(t)
    longitude = y + base_log
    latitude = x + base_lat
    # 这里是想保留14位小数
    loga = '%.14f' % longitude
    lata = '%.14f' % latitude
    return loga, lata


def get_proxy_aby():
    url = 'http://proxy.cbndata.org/proxy/abuyun/132'
    return requests.get(url).json()['proxy']


def get_sign(api_name, api_version, headers, data, is_wua='false'):
    if (isinstance(data, str)):
        data_str = data
    else:
        data_str = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
    ttid = urllib.parse.unquote_to_bytes(headers['x-ttid']).decode()
    try:
        uid = urllib.parse.unquote_to_bytes(headers['x-uid']).decode()
        sid = urllib.parse.unquote_to_bytes(headers['x-sid']).decode()
    except:
        uid = ''
        sid = ''
    features = headers['x-features']
    t = headers['x-t']
    arg2 = 'utdid' + '&' + uid + '&&21380790&' + md5(
        data_str.encode()).hexdigest() + '&' + t + '&' + api_name + '&' + api_version + '&' + sid + '&' + ttid + '&' + 'devid' + '&&&&' + features + '&&&&&&&'
    arg3 = {"pageId": headers['x-page-url']}
    arg4 = is_wua
    arg5 = api_name
    sign_ = requests.post('http://' + IP + '/gorgon', data={
        'arg1': '21380790',
        'arg2': arg2,
        'arg3': json.dumps(arg3),
        'arg4': arg4,
        'arg5': arg5,
    }, headers={'Content-Type': 'application/x-www-form-urlencoded'}).json()  #
    for key in sign_:
        if key == 'c-launch-info' or key == 'Cookie' or key == 'cookie':
            continue

        sign_[key] = urllib.parse.quote_plus(sign_[key])
    if not sign_['cookie']:
        sign_['cookie'] = 'hng=CN%7Czh-CN%7CCNY%7C156;'

    return sign_


def update_success(s, f):
    s.value += 1
    f.value = 0

@retry()
def get_ip():
    ip = requests.get('http://ip.3322.net/', timeout=2).text
    return ip

def check_wifi():
    print("check_wifi")
    try:
        ip = requests.get('https://www.baidu.com/', timeout=2).text
    except Exception as e:
        print(e)
        subprocess.call("wifiutil associate tp03 -p tapas2020", shell=True)
        time.sleep(5)

def airplane():
    subprocess.call("airplanecli 1", shell=True)
    time.sleep(5)
    subprocess.call("airplanecli", shell=True)

@retry()
def update_ip():
    p = subprocess.run(""" ifconfig $1 | grep "inet" | awk '$1 == "inet" {gsub(/\/.$/, "", $2); print $2}'|grep 192""",
                       shell=True, stdout=subprocess.PIPE)
    internal_ip = p.stdout.decode()

    internal_ip = internal_ip.split('.')

    ip =get_ip()



    for i in range(10):
        subprocess.call(f'curl -m 5 http://{internal_ip[0]}.{internal_ip[1]}.{internal_ip[2]}.254:5000/', shell=True)
        now_ip = get_ip()
        print('change vpn 现在的IP', now_ip, '上一次', ip)
        if now_ip != ip:
            break
        time.sleep(3)


def check_failed(failed_count):
    failed_count.value += 1
    print("failed count", failed_count)
    if failed_count.value % 40 == 0 and failed_count.value > 0:
        print('begin clear failed coutn')
        airplane()
        # subprocess.call("kill $(ps aux | grep 'new_taobao.sh' | awk '{print $2}')", shell=True)
        time.sleep(20)
    if failed_count.value % 40 == 0 and failed_count.value > 0:
        subprocess.call("cd ~/ && ./new_taobao.sh &", shell=True)
        failed_count.value = 0

        time.sleep(20)
    

        # 重启需要耗时
    


def tb_shop_goods(shop_id='298330680',seller_id ="", page='1', sort='first_new'):
    # sort='_sale'

    api_name = 'mtop.relationrecommend.mtoprecommend.recommend'
    api_version = '1.0'
    sys_time = f'{math.floor(time.time())}'
    header = {
        'x-cmd-v': '0%7C0',
        'x-page-url': 'https%3A%2F%2Fh5.m.taobao.com%2Fawp%2Fcore%2Fdetail.htm%3Fid%3D634015105233%26prefetchImg%3Dhttps%253A%252F%252Fgw.alicdn.com%252Fimgextra%252FO1CN014cMp7z1GjreQ4lOek_%2521%25212179100659.jpg%26prefetchImgRatio%3D1%253A1%26prefetchImgType%3D1%26scm%3D1007.29364.207722.0%26spm%3Da218fy.minidetail%26utparam%3D%2525',
        'User-Agent': 'MTOPSDK%2F1.9.3.48%20%28iOS%3B13.3.1%3BApple%3BiPhone9%2C1%29',
        'x-features': '11',
        'Cookie': 'hng=CN%7Czh-CN%7CCNY%7C156; enc=7meU9fa2DLbXQRrtMEuNVpWpOhfh%2FdzIUoWPT7cch8WWjgiOwIWYr6hV5fmKUj4%2BAdzRkB0j2JDBxN6i%2Bf6duzDi0XoUU7Xd8hKVJ1IQfU7GFp8V4qhRd4csMypx8Ylv',
        'x-app-ver': '8.6.0',
        'x-pv': '6.3',
        'f-refer': 'mtop',
        'x-c-traceid': 'X9mFs%2BR2kusDAM063EG2Gp23' + sys_time + '3511017',
        'x-region-channel': 'CN',
        'x-app-conf-v': '0',
        'Accept-Language': 'zh-cn',
        'c-launch-info': '0,0,' + sys_time + '495.524,0,2',
        'x-appkey': '21380790',
        'x-ttid': '201200%40taobao_iphone_8.6.0',
        'x-t': sys_time,
        'x-utdid': 'X%2BQIIY0uBXcDANcJ0d2YO71%2F',
        'x-bx-version': '6.5.23',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'x-page-name': 'TBWeexViewController',
        'x-devid': 'AuqrldUcpqUyfU6xqdQmTTLuILX25TEfaujpVG5Fpt-F',
        'A-SLIDER-Q': 'appKey%3D21380790%26ver%3D1608085640069',
        'a-orange-q': 'appKey%3D21380790%26appVersion%3D8.6.0%26clientAppIndexVersion%3D1120201216114903741%26clientVersionIndexVersion%3D1220201216114903741',
    }
    data = {"shopFrameRenderTimestamp": sys_time, "areaCode": "CN", "pvFeature": "", "schemaType": "auction",
            "jarvis_model_version": "mainse_rerank.alinn:20200711", "search_wap_mall": "false",
            "sellerId": seller_id, "weexShopTransparentBG": "true",
            "rainbow": "12892,10289368,14391,8304662,14021,14262,8084106,8234620,14367", "locType": "1", "LBS": "{}",
            "network": "wifi", "end_price": "", "inWeexShop": "true", "onFilter": "", "loc": "", "editionCode": "CN",
            "tab": "", "enableXSearchScroll": "true", "page": page, "brand": "iPhone",
            "ttid": "201200@taobao_iphone_8.6.0", "wh_weex": "true", "weexShopTabId": "1.0", "canP4pVideoPlay": "true",
            "weexShopToken": sys_time, "sort": sort, "useIframeInWeb": "false", "isWeexShop": "true",
            "weexShopTabIndex": "0", "appId": "18601", "first_rn": "a04827b9b8b51288628361a728bd7d51",
            "disablePromotionTips": "true", "spm-cnt": "a2141.7631671.0.0", "device": "iPhone9,1",
            "_inNestedEmbed": "true", "shopId": shop_id, "dynamicCard": "true", "info": "WIFI",
            "utd_id": "X9mFs+R2kusDAM063EG2Gp23", "m": "shopitemsearch", "gpsEnabled": "false", "n": "10",
            "countryNum": "156", "ppath": "", "_page_home_isweex_": "true", "ignoreShopHeadEvent": "false",
            "isEnterSrpSearch": "true", "q": "", "catmap": "", "crowdRights": "true", "hasPreposeFilter": "false",
            "apptimestamp": sys_time, "imsi": "00000", "start_price": "", "homePageVersion": "v5",
            "isBeta": "false", "_page_inside_embed_": "true", "newSimilarAndSame": "true", "vm": "nw", "service": "",
            "sversion": "10.9", "frame-url": "a2141.7631564__"}
    try:
        unb = re.search('unb=(.*?);', header['cookie']).group(1)
        cookie2 = re.search('cookie2=(.*?);', header['cookie']).group(1)
    except:
        unb = ''
        cookie2 = ''
    header['x-uid'] = unb
    header['x-sid'] = cookie2
    sign_ = get_sign(api_name=api_name, api_version=api_version, headers=header, data=data, is_wua='false')
    headers = {**header, **sign_}
    for key, v in sign_.items():
        headers[key] = v

    # proxies = global_proxy.find_2808ip_by_utdid(headers['x-utdid'])
    global success_count

    res = s.post(
        'https://guide-acs.m.taobao.com/gw/' + api_name + '/' + api_version + '?rnd=A7693F21C574BD383897B0FEA32DC7CC',
        headers=headers,
        data={'data': json.dumps(data, separators=(',', ':'), ensure_ascii=False)},
        verify=False, timeout=2)
    # print('店铺列表代理耗时', end_time - begin_time)

    return res.json()


@retry()
def main(success_count, failed_count):
    shopids = [["105936214",	"1770427429"],
["117888747",	"2458162177"],
["294332668",	"2201300699732"],
["157169331",	"2893230087"],
["416838699",	"2201416087491"],
["69280687",	"775884313"],
["106187713",	"1789007216"],
["110462865",	"2076980704"],
["566109558",	"2201208655158"],
["66879280",	"709034312"],
["249802435",	"3032966209"],
["66832587",	"708148771"],
["102160662",	"1577734060"],
["344585953",	"2202903937658"],
["113246735",	"2197280603"],
["110713440",	"2089135845"],
["108469804",	"1968430433"],
["111192467",	"2075607587"],
["166203934",	"2943306626"],
["167392460",	"2204123092122"],
["60407396",	"368579163"],
["115033554",	"2300016766"],
["104286051",	"1676445842"],
["527291371",	"3625943127"],
["466111335",	"3297604022"],
["145841584",	"2784739501"],
["499205045",	"2206594150343"],
["427284066",	"3470325173"],
["422286383",	"2990957139"],
["116120832",	"2378374678"]]

    for shop_id in shopids:
        shopids.append(shop_id)
        try:
            res = tb_shop_goods(shop_id[0], shop_id[1])
            # print('chenggong item', item_id, s_count, ['ret'])
            if '失效' in res['ret'][0]:
                print(res['ret'][0])
                check_failed(failed_count)
            elif '调用成功' in res['ret'][0]:
                update_success(success_count, failed_count)
                print('调用成功', success_count)
                time.sleep(2)
                pass
        except Exception as e:
            # check_wifi()

            check_failed(failed_count)

            print(e)
        finally:
            time.sleep(1)
            pass
            # 详情必须睡 5到10秒


if __name__ == '__main__':
    from multiprocessing import Pool, Manager

    m = Manager()

    success_count = m.Value('l', 0)
    failed_count = m.Value('l', 0)
    pcount = 1
    # with Pool(processes=pcount) as pool:
    #     args = [(success_count, failed_count) for i in range(pcount)]
    #     pool.starmap(main, args)
    main(success_count,failed_count)
