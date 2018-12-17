$(function(){
  var currentPage = 1 ;
  var pageSize = 5;
  var currentId ;//当前修改的用户的id
  var isDelete;  //当前修改的状态


    render();

    function render(){
        $.ajax({      
    type:"get",
    url:"/user/queryUser",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    dataType:"json",
    success:function(info){
        // 1.模板引擎渲染
      var htmlStr = template( 'usertemplate', info );
      $('tbody').html( htmlStr );

        // 2.分页
       // 根据返回的数据，实现动态渲染分页插件
      $("#paginator").bootstrapPaginator({
        // 版本号
        bootstrapMajorVersion:3,
        // 当前页
        currentPage: info.page,
        // 总页数
        totalPages: Math.ceil( info.total / info.size ),
        // 添加页码点击事件
        onPageClicked:function(a,b,c,page){
          // 更新当前页
          currentPage = page;
          // 重新渲染
          render();
        }

      })
    
     }

                })
    }



    // 给所有的按钮，添加点击事件（通过事件委托注册）
    $('tbody').on("click",".btn",function(){
      // 点击显示模态框
      $('#userModel').modal("show");

      // 获取存储的id --存在模板引擎的td里面的自定义属性
      currentId = $(this).parent().data("id");

      // 1.启用状态， 0 禁用状态，给后台传几，就是将后台用户改成对应状态
      // 禁用按钮 ？ 0 ： 1
      isDelete = $(this).hasClass('btn-danger')? 0 : 1 ;

      // 点击模态框确认按钮，发送请求，完成启用禁用功能
      $("#submitBtn").click(function(){
        $.ajax({
          type:"post",
          url:"/user/updateUser",
          data:{
            id:currentId,
            isDelete:isDelete
          },
          dataType:"json",
          success:function(info){
            if(info.success){
              // 修改成功
              // 关闭模态框
              $('#userModel').modal("hide");
              render();
            }
          }
        })
      })








    })















})