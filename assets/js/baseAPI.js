// 调用$.get()等等会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
   console.log(options.url);
   options.url='http://www.liulongbin.top:3007'+options.url
  



})