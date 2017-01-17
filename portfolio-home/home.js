/*
*@description: 组合速览工具函数集
*author:kelichao
*update:20160323
*/

define(function(require,exports,module){
    require("jquery");  
    require("WdatePicker");
    require("echarts");
    require("jquery-ui");
    require("home-dict");
    //引入工具集的依赖
    var util=require("perTool");

    
    //全局变量
    peIndex=1;
    peIndex_2=1;
    a=null;
    name=null;
    myState=true;   
    perUrl="/thsft/iFindService/IStrategy/portfolio-home";

    $("document").ready(function(){
        util.ajaxShowGyfx('gg');                               //显示首页 ajax 归因分析数据个券
        util.jumpCode_2(1);                                    //打开页面画出曲线图以及饼图   
        util.changeColor();                                    //颜色变化函数
        setInterval(util.reFreshWorth,10000);                  //定时请求净值数据
        util.isShow();                                         //判断更多弹窗按钮是否显示
        //console.log($("#worth").serialize());
        //刷请求函数
        $(".bt_1 a").click(function(){
         util.jumpCode_2(3,true);
         });  
        //跳转接口
        $("#asset,#analyse,#fx-income").click(function(){
            var m_code=$(this).attr("value");
            util.jumpCode(m_code);
        });
        //弹窗点击事件
        $('#name_history_dlg .close').click(function(){
             $('#name_history_dlg').fadeOut()}
        );
        ////创建者名称跳转
        $(".user table td").click(function(){
             util.creatorJump($("#iFindUserId").val());
        })
        //前五，后五选项卡
      	$(".my_tab input").change(function(){		   
            peIndex_2=$(".my_tab input:checked").attr("index");
    	          //如果选择前五
    	          if(peIndex_2==1){
    	           	  if(peIndex==1){
    	         		 	    $(".my_tab table").hide();
    	                  $(".my_tab table").eq(0).show();
    	         	    }
    	            	else{
    	         	      	$(".my_tab table").hide();
    	                  $(".my_tab table").eq(1).show();
    	         	    }
    	         	}
  	        //如果选择后五
  		      else{
  		        	if(peIndex==1){
  		      		  	$(".my_tab table").hide();
  		              $(".my_tab table").eq(2).show();
  		        	}
  		        	else{
  		      	    	$(".my_tab table").hide();
  		              $(".my_tab table").eq(3).show();
  		         	}
  		      }
    	});
  	  //行业，个券选项卡
      $(".my_tab select ").change(function(){
        if(myState){
          util.jumpCode_2("hyTab");
         myState=false;
        }
        peIndex=$(".my_tab select option:checked").attr("index");
        if(peIndex_2==1){
        $(".my_tab table").hide();
        $(".my_tab table").eq(peIndex-1).show();   
        }
        if(peIndex_2==2){
        $(".my_tab table").hide();
        $(".my_tab table").eq(peIndex-(-1)).show();
        }
      });
      //遮罩层
      $(".shade").dialog({
          draggable:false,
          autoOpen:false,
          width:200,
          height:200,
          resizable:false,
          modal:true,
      });
      //字典的请求
      $("#search_val").autocomplete({
          source:homeTeam,
          delay:0,
          autoFocus:true,//自动选定
          minLength: 0,

      });
      $(".home_edit").click(function(){
              $("#edit_area").dialog({
                title:"编辑组合说明",
                width:490,
                resizable:false,
                show:true,
                height:252,
                buttons:{
                  "保存":function(){     
                      finash=true   
                      var value=$("#edit_area").val();
                      postVal=util.getByteLen(value);
                      if(postVal<=400){
                          if(finash)  util.editAjax(value);  
                      }else{
                        alert("长度超出长度200个字");
                      }
                      
                  }
                }
              });
      })
       //点击关闭叉事件。
      $(".sel_label i").click(function(){
         $(this).parent().hide();
         //拿到所有的标签名
         value=util.findValue();
         util.seleteAjax(value);
      })
      //回车事件
      $("#search_val").keydown(function(event){ 
          var e = event;
          if (e && e.keyCode == 13 ) {
              setTimeout(function(){
                   util.addJizhun();
              },300);
          }
      })
      //基准添加按钮。
      $(".add_select button").click(function(){
           util.addJizhun();
      })
      //测试按钮
      $("#test").click(function(){
        alert($("#test").attr("name"));
      })
    })//document结束

})   //define结束
