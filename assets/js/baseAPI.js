// 调用$.get()等等会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
   console.log(options.url);
   options.url='http://www.liulongbin.top:3007'+options.url
  
// ajaxPrefilter

   // 统一为有权限的接口,设置headers请求头
   //indexOf如果包含了/my则需要加上headers
   if(options.url.indexOf('/my/')!==-1){
      options.headers={
         Authorization:localStorage.getItem('token')||''
      }
   }

   //全局挂载complete回调函数
   options.complete=function(res){
      // 在complete回调函数中,使用res.response.JSON拿到服务器响应回来的数据
      // console.log(res);身份认证失败这里需要注意一下
      if(res.responseJSON.status===1&&res.responseJSON.message=== '身份认证失败！'){
         // 强制清空token
         localStorage.removeItem('token')
         // 强制跳转到登录页面
         location.href='/login.html'
      }
   }


})

