
// 需求：在第一个ajax发送的时候，开启进度条
// 在全部的ajax回来的时候，关闭进度条
 
// ajax全局事件：
// jquery中：
  // .ajaxComplete()  当每个ajax完成时，调用（不管成功还是失败）
  // .ajaxSuccess()   当ajax返回成功时调用
  // .ajaxError()     当ajax返回失败时调用
  // .ajaxSend()      当ajax发送前调用
  // .ajaxStart()     当第一个ajax发送时调用
  // .ajaxStop()      当全部的ajax请求完成时调用

  $(document).ajaxStart(function(){
    NProgress.start()
  })
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done()
    },500)

  })


  // 等待页面dom结构的加载后执行
$(function(){
  // 注册事件完成公共功能
  // 功能1：左侧二级导航切换效果
    $('.lt_aside .nav .category').on('click',function(){
        // 注意层级
    $('.lt_aside .nav .category .child').stop().slideToggle();
    })

    // 功能2: 左侧菜单切换效果
    $('.icon_left').on('click',function(){
      $('.lt_aside').toggleClass("hidemenu");
      $('.lt_topbar').toggleClass("hidemenu");
      $('.lt_main').toggleClass("hidemenu");
    })

    // 功能3：退出功能
    // 给右侧按钮，添加点击事件，让模态框显示
    $('.icon_right').click(function(){
      $("#logoutModel").modal("show");
    })

    // 功能4：退出
    // 退出的两种方式
      // 1.发ajax让后台，销毁当前用户的登录状态，实现退出（推荐）
      // 2.清除浏览器缓存，将cookie清空，本地存储
      $('#logoutBtn').click(function(){
        
        $.ajax({
          type:"get",
          url:"/employee/employeeLogout",
          dataType:"json",
          success:function(info){
            if(info.success){
              // 销毁登录状态成功
              location.href="login.html";
            }
          }
        })
      })





})

