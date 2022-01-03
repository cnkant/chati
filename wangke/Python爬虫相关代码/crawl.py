import requests
from bs4 import BeautifulSoup
# from concurrent.futures import ThreadPoolExecutor
import time
from into_mysql import Answers,sess_db

amount=0    # 题目数量

headers={
    'Connection': 'keep-alive',
    'Cookie': '',
    'Host': 'www.ppkao.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'Referer':''
}

session=requests.session()
session.headers=headers

def getPages(url,i):
    cookie='UM_distinctid=17811f12b40215-0456bf65fcf7cc-930346c-100200-17811f12b4123b; CNZZDATA100190=cnzz_eid%3D1395928409-1615205867-https%253A%252F%252Flink.csdn.net%252F%26ntime%3D1615205867; CNZZDATA5559272=cnzz_eid%3D1785185170-1615204434-https%253A%252F%252Flink.csdn.net%252F%26ntime%3D1615204434; __session=0.9081100501454833; Hm_lvt_926e1286b5444fd91af0349b950598bf=1615208721,1615208731,1615208875; Tid=0; CNZZDATA5665166=cnzz_eid%3D2141544758-1615203589-https%253A%252F%252Flink.csdn.net%252F%26ntime%3D1615204384; Hm_lpvt_926e1286b5444fd91af0349b950598bf='+str(int(time.time()))
    referer='https://www.ppkao.com/wangke/'+str(i)
    headers['Cookie'] = cookie
    headers['Referer'] = referer
    try:
        res=session.get(url,timeout=7)
        res.encoding=res.apparent_encoding
        if not res.text:
            print("空值重试")
            getPages(url,i)
        return res.text
    except:
        print("出错重试")
        getPages(url,i)

def getLink(html,i):
    soup=BeautifulSoup(html,'lxml')
    links=soup.select('.single-siti.clearfix strong a')
    for item in links:
        link=item['href']
        html=getPages(link,i)
        if html:
            parsePages(html)
        else:
            print("暂停2s")
            time.sleep(2)
            html = getPages(link, i)
            parsePages(html)
        # hrefs.append(link)

def parsePages(html):
    global amount
    soup=BeautifulSoup(html,'lxml')
    problem=soup.select('.single-siti.clearfix strong')[0].text.strip()
    answer=soup.select('.tm-bottom .result')[0].text.strip()
    # print(problem,answer)
    try:
        IntoTkdb(problem,answer)
        print("存入数据库成功")
        amount+=1
    except Exception as e:
        print(e)
        sess_db.rollback()
        print("回滚")

def IntoTkdb(problem,answer):
    answer_data=Answers(
        problem=problem,
        answer=answer
    )
    sess_db.add(answer_data)
    sess_db.commit()

if __name__ == '__main__':
    # hrefs=[]
    start_time=time.time()
    print("正在获取题目...")
    for i in range(50,100):
        url=f'https://www.ppkao.com/wangke/{i+1}'
        html1=getPages(url,i+1)
        getLink(html1,i+1)
        print("第{}页获取成功".format(i+1))
    # print("完毕，共获取到{}条题目链接，开始获取题目和答案...".format(len(hrefs)))
    # with ThreadPoolExecutor(max_workers=10) as th:
    #     for link in hrefs:
    #         th.submit(parsePages,link)
    print("共存入{}条题目，耗时{}".format(amount,start_time-time.time()))
