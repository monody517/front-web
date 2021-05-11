const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const $time = $('.time')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

t = setTimeout(time,1000)
function time() {
    clearTimeout(t)
    const myDate = new Date()
    let hour = extra(myDate.getHours())
    let minute = extra(myDate.getMinutes())
    $time.text(hour + ':' + minute)
    t = setTimeout(time,3000)
}
function extra(x) {
    return x < 10 ?  "0" + x : x;
}


const hashMap = xObject || [
    {logo:'S',logoType:'text',url:'https://segmentfault.com/'},
    {logo:'J',logoType:'image',url:'https://juejin.cn/'},
]

const simplifyUrl = (url) => {
    return url.
    replace('https://','').
    replace('http://','').
    replace('www.','').replace(/\/.*/,'')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li class="siteLi">  
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-cha"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click',() => {
            window.open(node.url)
        })
        $li.on('click','.close',(e) => {
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
        $li.find('.logo').css('color',`${"#"+Math.floor(Math.random()*16777215).toString(16)}`)
    })
}

render()

$siteList.on('mouseenter','.siteLi',function(){
    $(this).css("box-shadow","5px 5px 10px gray");
})
$siteList.on('mouseleave','.siteLi',function(){
    $(this).css("box-shadow","none");
})
$lastLi.on('mouseenter',function(){
    $(this).css("box-shadow","5px 5px 10px gray");
})
$lastLi.on('mouseleave',function(){
    $(this).css("box-shadow","none ");
})


$('.addButton').on('click',() =>{
    let url = window.prompt('请问你要添加的网址是？')
    if(url.indexOf('http') !== 0){
        url = 'https://' + url
    }
hashMap.push({
    logo:simplifyUrl(url)[0],
    logoType:'text',
    url:url
})
render()
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}


const $headerList = $('.headerList')
const $headerLi = $headerList.find('.sIcon')
$headerLi.on('click',function(e){
    $(this).addClass("active").siblings().removeClass("active");
        if($headerLi[0].classList.contains('active')){          
            $('#searchBaidu').css({"position":"absolute","left":"-99999px",
            "top":"-90999px"})
            $('#searchSougou').css({"position":"absolute","left":"-99999px",
            "top":"-90999px"})
            $('#searchGoogle').css({"position":"static"})
        }else if($headerLi[1].classList.contains('active')){
            $('#searchGoogle').css({"position":"absolute","left":"-99999px",
            "top":"-90999px"})
            $('#searchSougou').css({"position":"absolute","left":"-99999px",
            "top":"-90999px"})
            $('#searchBaidu').css({"position":"static"})
        }else if($headerLi[2].classList.contains('active')){
            $('#searchGoogle').css({"position":"absolute","left":"-99999px",
            "top":"-90999px"})
            $('#searchBaidu').css({"position":"absolute","left":"-99999px",
            "top":"-90999px"})
            $('#searchSougou').css({"position":"static"})
        }
})

$(document).on('keypress',(e) => {
    let {key} = e
    for(let i = 0;i < hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})
const $searchForm = $('.searchForm')
const $input = $('.input')
let isClick = false
$input.hover(
    function(){
        $input.css({'width':'500px'})
    },
    function(){
        if(!isClick){
            $input.css({'width':'200px'})
        }  
    }
)
$input.on('click',function(){
    isClick=!isClick
    $input.addClass("active")
})
const $cover = $('.cover')
const $bgbox = $('.bgbox')
const $globalMain = $('.globalMain')
$searchForm.on('click',function(e){
    $time.css({'visibility':'hidden'})
    $bgbox.addClass('focus')
    $headerList.css({"opacity":"1"})
})
$cover.on('click',function(e){
    isClick=!isClick
    $input.removeClass("active")
    $input.css({'width':'200px'})
    $time.css({'visibility':'visible'})
    $bgbox.removeClass('focus')
    $headerList.css({"opacity":"0"})
})







