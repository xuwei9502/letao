$(function(){

  var currentPage = 1;
  var pageSize = 5;
  render()
  function render(){ 
      // 1发送ajax获取数据
    $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    data:{
      page:currentPage,
      pageSize:pageSize
      },
    dataType:"json",
    success:function(info){
      console.log(info);
      
      // 2.利用模板引擎渲染到页面
      var htmlStr = template("firsttemplate",info);
      $('tbody').html(htmlStr);

      // 3.动态渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render()
          }
        })
      }
    })}

    // 4.给添加按钮注册点击事件，显示模态框
    $('#addBtn').click(function(){
      $("#addModal").modal("show");
    })


    // 5.调用表单校验插件，完成校验
    $("#form").bootstrapValidator({

    // 配置图标
    feedbackIcons:{
      valid:"glyphicon glyphicon-ok",
      invalid:"glyphicon glyphicon-remove",
      validating:"glyphicon glyphicon-refresh"
    },

    // 校验字段  先给input 设置name
    fields:{
      categoryName:{
        // 校验规则
        validators:{
          // 非空
          notEmpty:{
            // 提示信息
            message:"请输入内容"
          }
        }
      }
    }
    })

    // 6.阻止默认的提交，通过ajax提交
    $("#form").on('success.form.bv',function(e){
      // 阻止默认的提交
      e.preventDefault();
      // 发送ajax
      $.ajax({
        type:"post",
        url:"/category/addTopCategory",
        data:$("#form").serialize(),
        dataType:"json",
        success:function(info){
            if(info.success){
              // 关闭模态框
              $("#addModal").modal("hide");
              // 刷新到第一页
              currentPage = 1;
              render();
              // 重置表单内容
              $("#form").data("bootstrapValidator").resetForm(true);
            }
        }

      })
    })






})


