  // 初始化表单校验插件
  
  
  
  // 校验规则：

// 1. 用户名不能为空
// 2. 用户密码不能为空
// 3. 用户密码长度为6-12位


$(function(){

  $('#form').bootstrapValidator({

    //1. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

     //2. 指定校验字段
     fields:{
      //校验用户名，对应name表单的name属性
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须是2到6位之间"
          },
          // 专门用来定制回调的提示内容的
          callback:{
              message:"用户名不存在"
          }

        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须是6到12位之间"
          },
          callback:{
            message:"密码不正确"
          }

        }
      }


     }
   })


    //3.注册表单校验成功事件，在校验成功时，会触发
    // 在事件中阻止默认的提交（会跳转），通过ajax进行提交（异步）
   $('#form').on('success.form.bv',function(e){
    //  阻止默认的提交
        e.preventDefault();
        $.ajax({
          type:"post",
          url:"/employee/employeeLogin",
          dataType:"json",
          // data:{
          //   username:username,
          //   password:password
          // },
          data:$('#form').serialize(), //表单序列化
          success:function(info){

        
            if(info.success){
              // 成功跳转到首页
              location.href="index.html";
            }
            if(info.error === 1000){
              $('#form').data('bootstrapValidator').updateStatus('username',"INVALID","callback")
            }
            if(info.error === 1001){
              $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
            }
          }
        })
   })
     

  //  4.表单重置功能
   $('[type="reset"]').click(function(){
  //  重置校验状态
    // 1.创建实例对象
    var $Form =  $('#form').data("bootstrapValidator");
    // 2.调用resetForm()方法重置表单
    // $Form.resetForm(true);
    $Form.resetForm();
    // 如果加参数true说明内容和样式一起重置，这里不用。因为reset本身就是重置按钮
   })









  












})