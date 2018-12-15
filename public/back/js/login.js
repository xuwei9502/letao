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
          }
        }
      }


     }


     












  })












})