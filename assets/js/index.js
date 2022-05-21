$(function(){
// 调用getUserInfo获取用户的基本信息
getUserInfo()
})

var layer=layui.layer
//点击按钮,实现退出功能
$('#btnLogout').on('click',function(){
    // 提示用户是否退出
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
  //do something
    //清空本地存储的token
    localStorage.removeItem('token')
    // 重新跳转到登录的页面
    location.href='/login.html'
  layer.close(index);
});
})

// 获取用户的基本信息
function getUserInfo(){
        $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers 就是请求头配对对象，因为需要一定的权限，所以要设置headers
        //因此data被换为了headers
        // headers:{
        //  Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
           if(res.status!==0){
               return layui.layer.msg('获取用户信息失败！')
           }
        //   调用renderAvatar() 渲染用户头像
            renderAvatar(res.data)
        },
        //无论成功还是失败,最终都会调用complete回调函数
        // complete:function(res){
        //     // 在complete回调函数中,使用res.response.JSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败!'){
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         // 强制跳回登录的页面
        //         location.href='./login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user){
    //获取用户名字
    var name=user.nickname||user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 按需渲染用户头像
    if(user.user_pic!==null){
        //渲染图片头像
        //因为自己设定的头像会变化,所以这里用的attr自定义属性来设置src
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        //渲染头像文本
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}