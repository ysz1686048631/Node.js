//爬虫案列
/***
 * 1.获取目标网站
 * 2.分析网站内容
 * 3.获取有效信息，下载或者其他操作 
 */
// 数据流先缓存后的存储 
// 数据流好比一个2G的盘的存放的4G的电影，一下肯定存不进去，那么计算机会将4G的电影分成1000份进行储存                                                                                                                                                                                                                                                                                                                                                                               
// 数据量大的时候会分段传输，如果数据量小的话就一次性传输
const express = require('express');
const server = express();
const router = express.Router();
const cheerio = require('cheerio');
const superagent = require('superagent');
router.get('/getdata',async (req,res)=>{
    //superagent请求目标页面，获取整个新闻首页信息
    let hotArr=[];
     superagent.get('http://www.scjjrb.com/hynews/articles-h30361.html').end((err,res)=>{
         if(err){
               console.log('error');
         }else{
            // 抓取热点新闻数据
            hotArr = getHotNews(res);
            
         }

    })
    // 这里必须给一个异步 因为爬取内容需要大量时间
   setTimeout(()=>{
       res.json(hotArr)
   },1000)   
    
})
let getHotNews = (res)=>{
     let hotNews = [];
     //使用cheerio模块的cherrio。load（）方法将HTMLdocument作为参数传入到函数以后就可以使用类似
     //Jquery的$(selector)的方式来获取页面元素，在同过的属性来获取数据
     
     
     let $ = cheerio.load(res.text);

     $('.g-wrapper .g-main div .g-right ul li a').each((index,ele)=>{
        //这里就是jquery里的后代选择器将所有匹配的a进行遍历
        //这里的ele就是a元素
        //news获取a元素的内容
        let news = {
            //这里使用jquery语句即可
             title:$(ele).children('.u-date').children('p').text(),
             href:$(ele).attr('href'),
             txt:$(ele).children('.u-news').children('.u-newsTitle').text(),
             text:$(ele).children('.u-news').children('p').text()
         }
         
         hotNews.push(news);
     })   
   return hotNews;
}




server.use(router);
server.listen(6011,()=>{
     console.log('success!');
})



 