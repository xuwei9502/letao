$(function(){
  var currentPage = 1 ;
  var pageSize = 5;
  render();
  function render(){ 
  // 1.发送ajax,动态渲染页面，动态分页功能
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        // console.log(info);
        // 1.动态渲染模板引擎
        var htmlStr=template("addTemplate",info);
        $("tbody").html(htmlStr);
          // 2.动态分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })
      }
    })
  }

  // 2.点击添加分类按钮，显示模态框
  $("#addBtn").click(function(){
    // 2.1显示模态框
      $("#addModal").modal("show");
    
    // 2.2.显示模态框的同时，发送ajax,请求一级分类的全部数据，渲染下拉列表 
    // 通过 page: 1, pageSize: 100, 获取数据, 模拟获取全部数据的接口
      $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
          page:1,
          pageSize:100,
        },
        dataType:"json",
        success:function(info){
          var htmlStr=template("ulTemplate",info)
          $(".dropdown-menu").html(htmlStr)
        }
      })
  })
    // 3.给下拉列表的a注册点击事件，让下拉列表可选（通过事件委托注册）
      $(".dropdown").on('click',"a",function(){
          // 获取a的文本
          var txt = $(this).text();
          
          // 设置给按钮
          $("#dropdownText").text(txt);
          // 获取a存的id 一级分类id
          var id = $(this).data("id");
          // 赋值给隐藏域（input:hidden）
          $('[name="categoryId"]').val(id);
          // 更新隐藏域的校验状态成校验成功
          $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID")
      })

      //4.调用fileupload方法完成文件上传初始化
      $("#fileupload").fileupload({
        dataType:"json",
        // e 事件对象, data 数据
        // 文件上传完成时，响应回来时调用（类似于success）
        done:function(e,data){
            var result = data.result; //后台返回的对象
            var picUrl = result.picAddr;//图片路径

            // 设置 给 img src
            $("#imgBox img").attr("src",picUrl);
            // 设置图片地址给隐藏域，用于提交
          $('[name="brandLogo"]').val(picUrl);
          // 更新隐藏域的校验状态，为成功
          $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID")
        }
      })

      // 5.表单校验插件初始化
      $("#form").bootstrapValidator({
        
        // 配置排除项，对隐藏域也进行校验
        excluded:[],

        // 配置图标
        feedbackIcons:{
          valid:"glyphicon glyphicon-ok",
          invalid:"glyphicon glyphicon-remove",
          validating:"glyphicon glyphicon-refresh"
        },
        // 校验字段  先给input 设置name
        fields:{
          categoryId:{
            validators:{
              notEmpty:{
                message:"请选择一级分类"
              }
            }
          },
          brandName:{
            validators:{
              notEmpty:{
                message:"请选择二级分类名称"
              }
            }
          },
          brandLogo:{
            validators: {
              notEmpty: {
                message: "请选择图片"
              }
            }
          }
        }
      })

      // 6.阻止默认的提交，通过ajax提交（zhuc）
      $("#form").on("success.form.bv",function(e){
          e.preventDefault();

          $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
              if(info.success){
                  // 1.关闭模态框
                  $("#addModal").modal("hide");
                  // 2.重新渲染第一页
                  currentPage=1;
                  render()
                  // 3.重置数据
                  $("#form").data("bootstrapValidator").resetForm(true);
                  $("#dropdownText").text("请输入一级分类");
                  $("#imgBox img").attr("src","./images/none.png");



              }
            }
          })








      })






































})