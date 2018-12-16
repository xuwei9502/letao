$(function(){
  // 绘制柱状图
  // 基于准备好的dom，初始化echarts实例
     var echarts_left = echarts.init(document.querySelector('.container-fluid .echarts_box .echarts_left'));
     var echarts_right = echarts.init(document.querySelector('.container-fluid .echarts_box .echarts_right'));

     // 指定图表的配置项和数据
     var option1 = {
      //  标题
         title: {
          //  标题文本
             text: '2018年注册人数'
         },
        //  提示框组件
         tooltip: {},
         legend: {
             data:['人数', '销量']
         },
         xAxis: {
             data: ["1月","2月","3月","4月","5月","6月"]
         },
         yAxis: {},
         series: [{
             name: '销量',
             type: 'bar',
             data: [1500, 700, 400, 550, 400, 700]
         }]
     };

    var option2= {
      title : {
          // 主标题文本
        text: '热门品牌销售',
      // 副标题文本
        subtext: '2018年12月',
      // 控制标题水平方向位置
        x:'center',

      // 标题文本样式
        textStyle: {
        color: "red",
        fontSize: 30
        }
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          // 设置对齐方式  horizontal 水平
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','阿迪王','老北京','老奶奶']
      },
      series : [
          {
            name: '热门品牌',
            type: 'pie',   // 饼图
            radius : '55%', // 圆的大小
            center: ['50%', '60%'],  // 圆心位置
            data:[
              {value:335, name:'耐克'},
              {value:310, name:'阿迪'},
              {value:234, name:'阿迪王'},
              {value:135, name:'老北京'},
              {value:1548, name:'老奶奶'}
              ],
              itemStyle: {
                  emphasis: {
                    shadowBlur: 100,
                    shadowOffsetX: 0,
                    shadowColor: 'yellow'
                  }
              }
          }
      ]
  };
  
     // 使用刚指定的配置项和数据显示图表。
     echarts_left .setOption(option1);
     echarts_right.setOption(option2);














})