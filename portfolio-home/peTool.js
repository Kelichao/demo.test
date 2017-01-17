/*
*@description: 组合速览工具函数集
*author:kelichao
*update:20160323
*/

define(function(require,exports,module){
      //关于模块的命名
      var util = util||{};
      //拼接画图函数的线条个数。
      util.makeLine=function (name,data){
          var mySeries=new Array;
          for(i=0;i<name.length;i++){
          mySeries.push({"name":name[i],"type":'line',"smooth":true,"symbol":"none","data":data[i]});
          console.log(mySeries);
          };
      return  mySeries;
     }
      //计算字符串长度
      util.getByteLen=function (val) {
             var len = 0;
             for (var i = 0; i < val.length; i++) {
               var a = val.charAt(i);
               if (a.match(/[^\x00-\xff]/ig) != null) {
                 len += 2;
               }
               else {
                 len += 1;
               }
             }
             return len;
           }
        //截取地址串函数
        util.address=function(str,state){               
            var arr = str;
            var getarr =  arr.split("&");
            var cid = '';
            for(var i=0;i<getarr.length;i++){
                $alld = getarr[i].split('=');
                if($alld[0] == 'indexname'){
                    indexname = $alld[1];
                };
                if($alld[0] == 'index'){
                    index = $alld[1];
                };
            };
            if(state){
                return indexname+" "+index;
            }else{
                return indexname;
              }
        }
        //判断更多弹窗按钮是否显示
        util.isShow=function(){
            var leng=$(".news").html().length;
            if(leng>140){
                $(".m_p").show();
            } 
             if($("#isCreateUserid").val()==1){
                $(".home_edit").show();
             }
        }
        //筛选时的请求函数
          util.seleteAjax=function (value){
           var data_hs=null;  
           var data_zh=null;
           var data_in=null;
           var myresp=null;
           var str3=$("#start").val().replace(/\//g,'');
           var str4=$("#end").val().replace(/\//g,'');
           var cid = $("#cid").val();
           var hy=$("#hy").val();
           var index=$("#index").val();
           $.ajax({
               type:"GET",
                   url:perUrl+"/data-page-one?cid="+cid+"&start="+str3+"&end="+str4+value+"&number="+Math.random(),
                   beforeSend: function(){
                    // $(".shade").dialog("open")
                   },
                   success:function(respon){
                        //在此运行代码
                         res=JSON.parse(respon);
                         if(res[cid].errno==0){
                             var myDate=res[cid].date;
                             var myData=res[cid].data;
                             var name=util.getName();
                             var serie=util.makeLine(name,myData);  //取得线条的个数。
                             util.homeSelete(name,myDate,myData,serie);   
                         }  
                         $(".shade").dialog("close")
                 },
                 error:function(xhr,errorText,errortype){
                     console.log("请求错误："+"status="+xhr.status+" text="+xhr.statusText+" type= "+errortype);  

                 }
                  });       

         }
        //添加基准函数
        util.addJizhun=function (){
              var peVal=$("#search_val").val()||{};
              var $vis=$(".sel_label:visible");
              var $hid=$(".sel_label:hidden");
              var state=true;
              if(peVal.length>=2){
                  if($vis.length<3){
                    if(homeName[peVal]){
                      $.each($vis,function(){
                          if($(this).find("span").html()== peVal){
                            state=false;
                            alert("基准重复，请重新选择");
                          }
                      });
                      if(state){
                          var $ht=$hid.eq(0);
                          $ht.find("span").html(peVal);
                          $ht.eq(0).show(); 
                          //拿到所有的标签名
                          setValue=util.findValue();
                          util.seleteAjax(setValue);
                          $("#search_val").val("");
                      }
                    }else{
                      alert("该基准不存在");
                    }

                  }else{
                      alert("最多能添加三个基准");
                  }
             }else if(peVal.length<=2){
                   alert("输入字符数过少（至少两位）");
              }
        }
        //编辑框函数
         util.editAjax=function(value){
             var cid=$("#cid").val();
             finash=false;
             $.ajax({
               type: 'post',
               url: perUrl+'/ajax-update-description?cid='+cid+"&description="+value,
               beforeSend:function(){
               },
               success:function(respon){
                  alert("保存成功");
                  $("#edit_area").dialog("close");
                  $(".news").html(value);
                  $(".dlg_content p").html(value);
                  util.isShow();
                  finash=true;
               },
               error:function(xhr,errorText,errortype){
                   console.log("请求错误："+"status="+xhr.status+" text="+xhr.statusText+" type= "+errortype);  
               }
             });
        }
        //加载 首页饼图
         util.index_bt=function(clientValue,state){     
             if(state==1){
                 var cid = $('#cid').val();
                 $.ajax({
                   type: 'get',
                   url: perUrl+'/data-page-two?cid='+cid+'&type=bt'+"&"+clientValue,
                   success: function( res ){
                     try{  
                        res = JSON.parse(res);
                     }
                     catch(err){
                        window.alert("行业分布饼图数据格式不对");
                     }
                     if(res.errno ==0){
                       var bt=res.data.hybt.data;
                       var binftname_1=res.data.hybt.name;  
                       util.draw_2(bt,binftname_1);
                         }else{
                       util.draw_2("","");      
                     }
                   },
                   error:function(xhr,errorText,errortype){
                       console.log("请求错误："+"status="+xhr.status+" text="+xhr.statusText+" type= "+errortype);  
                   }
                 });
             }           
        }  //index_bt结束
        //创建者名称跳转函数
        util.creatorJump=function(code){
            try{
                var value="main=ProPertyTrade&sub=StrategyHome"
                cmd=value+"&ifindid="+code+"&source=StrategyManage";
                var apiSupport=window.app&&window.app.sendMessage!==undefined;
                if(apiSupport){
                    app.sendMessage("OnClientCmd",[cmd]);
                }else if(window.external&&typeof(window.external.OnClientCmd) != "undefined") {
                     window.external.OnClientCmd(cmd);
                 }
            }catch(e){
                 alert("客户端接口异常");
            }
        }
        //组合速览净值的请求
        util.reFreshWorth=function(){
          $.ajax({
             url:"/thsft/iFindService/IStrategy/portfolio-home/ajax-jz?number="+Math.random(),
             data:$("#worth").serialize(),
             dataType:"json",
             success:function(res){
                 if(res){
                      //console.log(res);
                      util.worthColor(res);
                     }
             },
             error:function(xhr,errorText,errorType){
                 console.log("请求错误："+xhr.status+" "+errorText+" "+errorType);
             }
          });
        }
        //净值变色函数
        util.worthColor=function(res){
           console.log(res);
            var _i=["zhjz","zhjz1","zhjz2"];
            var arr=new Array();
            for(x in _i){
               var perData=_i[x];
               val = res[perData];
               arr.push(val);
            }
            //console.log(arr);
            var worth=arr[0];
            var worth1=(arr[1]).toString();
            var worth2=(arr[2]).toString();
            //console.log(worth1+" "+worth2);
            //第一个数
            if(worth<1){
             $(".top_important").html(worth).attr("style","color:#32cd5e");
            }else{
              $(".top_important").html(worth).attr("style","color:#fa3232");
            }
            //第二个数
            if(worth1.substring(0,1)=="-"){
             $(".span_1").html(worth1).attr("style","color:#32cd5e");
            }else{
              $(".span_1").html(worth1).attr("style","color:#fa3232");
            }
            //第三个数
            if(worth2.substring(0,1)=="-"){
             $(".span_2").html(worth2).attr("style","color:#32cd5e");
            }else{
              $(".span_2").html(worth2).attr("style","color:#fa3232");
            }
        };
        //增加一个本身在的基准标签
         util.onloadLab=function(ifRefresh){
          console.log(ifRefresh);
          if(ifRefresh){
              console.log("点击了确定跳转");
          }else{
              try{
                  var apiSupport=window.app&&window.app.sendMessage!==undefined;
                  if(apiSupport){
                      var perClient=$("#client").val();
                      var clientVal=util.address(perClient,true);
                      console.log(clientVal);
                      var $hid=$(".sel_label:hidden");
                      var $ht=$hid.eq(0);
                      $ht.find("span").html(clientVal);
                      $ht.eq(0).show(); 
                  }
              }catch(e){
                  alert("客户端接口异常:"+e);
              }
          }
        }
        //全局函数通过客户端接口拿到index与hy     
        util.jumpCode_2=function(code,ifRefresh){
                //var apiSupport=window.app&&window.app.sendMessage!==undefined;
                var cmd=code;
                var args=new Array();
                // if(apiSupport){
                //     app.removeMessageCallback("GetParams");
                //     app.setMessageCallback("GetParams",function(name,args){
                if($("#hy").val()&&$("#index").val()&&$("#indexname").val()){
                    var val="&hy="+$("#hy").val()+"&index="+$("#index").val()+"&indexname="+$("#indexname").val();
                    args[0]=val;
                    var a=args[0]; 
                    var perName= args[0];
                    $("#client").val(perName);
                    $("#test").attr("name",perName);
                    util.index_bt(a,code);
                    console.log("jumpCode_2中a的串值为"+a);
                    y_name2=util.address(a);
                    y_name=["组合",y_name2];
                    util.peTopDraw(false,code,a);
                    console.log(code);
                    util.onloadLab(ifRefresh);        //添加标签
                    util.reFresh(code,a);
                    util.ajaxShowGyfx('hy',code,a);
                }     
              // });
              // app.sendMessage("GetParams");
              // }else if(window.external&&typeof(window.external.OnClientCmd) != "undefined") {
              //      window.external.OnClientCmd(cmd);
              // }else if(!apiSupport){
              //     window.alert("客户端接口不存在");
              // }
        }
        //打开页面时的《曲线图》函数
         util.peTopDraw=function(state,num,val){ 
             $("#main_3").find("span").html("正在加载数据.");  
             var data_hs=null;  
             var data_zh=null;
             var data_in=null;
             var myresp=null;
             var str3=$("#start").val().replace(/\//g,'');
             var str4=$("#end").val().replace(/\//g,'');
             var cid = $("#cid").val();
             var hy=$("#hy").val();
             var index=$("#index").val();
              $("#main_3").find("span").html("正在加载数据..");  
               //若取不到则按页面显示   a="&hy="+hy+"&index="+index;  取到了则通过函数将其值改变
               if(num==1){ 
                          $("#main_3").find("span").html("正在加载数据...");                   
                          $.ajax({
                          type:"GET",
                          url:perUrl+"/data-page-one?cid="+cid+"&start="+str3+"&end="+str4+"&"+val+"&number="+Math.random(),
                          beforeSend:function(){
                              $("#main_3").find("span").html("正在加载数据....");  
                          },
                          success:function(respon){
                              //在此运行代码
                              try{
                                  res=JSON.parse(respon);
                                  if(res[cid].errno==0){
                                      myDate=res[cid].date;
                                      myData=res[cid].data;
                                      util.draw(state,myData[0],myData[1],myDate,y_name);
                                  } 
                              }catch(e){
                                  alert("数据格式出错");
                              }
                          },
                          error:function(xhr,errorText,errortype){
                              console.log("请求错误："+"status="+xhr.status+" text="+xhr.statusText+" type= "+errortype);  
                             // $("#main_3").find("span").html("错误："+"status="+xhr.status);
                          }
                      });
               }
          };
        //跳转刷新函数
        util.reFresh=function(num,val){
            if(num==3){
                var index=$("#index").val();
                var periodic = $("#periodic").val();  
                var str3=$("#start").val().replace(/\//g,'');
                var str4=$("#end").val().replace(/\//g,'');
                var hy=$("#hy").val();
                var cid = $("#cid").val();
                url = perUrl+"?cid="+cid+"&start="+str3+"&end="+str4+"&periodic="+1+"&"+val;   
                window.location.href= url;
            }
        }
        //与客户端接口1：更多的接口
        util.jumpCode=function (code){  
            try{
                var apiSupport=window.app&&window.app.sendMessage!==undefined;
                var cmd=code;
                if(apiSupport){
                    app.sendMessage("JumpNode",[cmd]);
                }else if(window.external&&typeof(window.external.OnClientCmd) != "undefined") {
                     window.external.OnClientCmd(cmd);
                 }
            }catch(e){
                 console.log("客户端接口异常");
            }
        }
        //增加了红绿颜色的区分
        util.changeColor=function() {        
          // var m_data=$(".span_1").html().replace(/\%/gi,'');
          // var m_data_2=$(".span_2").html().replace(/\%/gi,'');   //顶部净值3个数据变色 
          // if($(".top_important").html()>=1) $(".top_important").addClass("up");
          // else $(".top_important").addClass("down");
          // if(m_data>=0) $(".span_1").addClass("up");
          // else $(".span_1").addClass("down");
          // if(m_data_2>=0) $(".span_2").addClass("up");
          // else $(".span_2").addClass("down");
          // $.each($(".tb_o tbody tr"),function(){          //重仓证券数据变色
          //     var zhongcang=null;
          //     var zhanbi=null;
          //     try{
          //         var con=$(this).find("td").eq(4).html().replace(/\./gi,'');
          //         var zhongcang=con.replace(/\,|\%/gi,'');
          //         var zhanbi=$(this).find("td").eq(5).html().replace(/\.|\%/gi,'');
          //     }
          //     catch(e){
          //         console.log("无表格数据");
          //     }
          //     if(zhongcang>=0) $(this).find("td").eq(4).addClass("up");
          //     else if(zhongcang<0) $(this).find("td").eq(4).addClass("down");
          //     if(zhanbi>=0) $(this).find("td").eq(5).addClass("up");
          //     else if(zhanbi<0) $(this).find("td").eq(5).addClass("down");
          // });
          //累计回报收益变色
          var chaoe=$(".leiji strong:eq(0)").html().replace(/\%/gi,'');
          var zuhe=$(".leiji strong:eq(1)").html().replace(/\%/gi,'');
          var jizhun=$(".leiji strong:eq(2)").html().replace(/\%/gi,'');
          var ljhuibao_b= $(".huibao_1 span").html().replace(/[\u4e00-\u9fa5]/gi,'');
          var ljhuibao=ljhuibao_b.replace(/\,/gi,'');
          var month_hb=$(".huibao_2 span:eq(0)").html().replace(/\%/gi,'');
          var year_hb=$(".huibao_2 span:eq(1)").html().replace(/\%/gi,'');
          var nianhua_sy=$(".huibao_2 span:eq(2)").html().replace(/\%/gi,'');
          if(chaoe>=0) $(".leiji strong:eq(0)").addClass("up");
          else $(".leiji strong:eq(0)").addClass("down");      
          if(zuhe>=0) $(".leiji strong:eq(1)").addClass("up");
          else $(".leiji strong:eq(1)").addClass("down");
          if(jizhun>=0) $(".leiji strong:eq(2)").addClass("up");
          else $(".leiji strong:eq(2)").addClass("down");
          //累积回报变色
          if(ljhuibao>=0) $(".huibao_1 span:eq(0)").addClass("up")
          else $(".huibao_1 span:eq(0)").addClass("down")
          if(month_hb>=0)$(".huibao_2 span:eq(0)").addClass("up");
          else $(".huibao_2 span:eq(0)").addClass("down");
          if(year_hb>=0) $(".huibao_2 span:eq(1)").addClass("up");
          else $(".huibao_2 span:eq(1)").addClass("down");
          if(nianhua_sy>=0) $(".huibao_2 span:eq(2)").addClass("up");
          else $(".huibao_2 span:eq(2)").addClass("down");
      }
        // Ethan 20160120 ajax 处理首页归因分析数据
        util.ajaxShowGyfx=function (opty,peAdd,myA){
          if(peAdd=="hyTab"||!peAdd){
              var cid = $('#cid').val();
              $.ajax({
                  type: 'get',
                  url: perUrl+'/data-page-two?cid='+cid+'&type='+opty+"&"+myA,
                  beforeSend: function (){
                  var shtml ='<tr class="tb_content"><td style="text-align:center;" colspan=7>数据加载中</td></tr>';
                    $('#'+opty+'qw').html(shtml);
                    $('#'+opty+'qw').html(shtml);
                },
                  success: function ( res ){
                  res = JSON.parse(res);
                      if(res.errno == -1){
                    //做好无数据时的表格
                    var shtml ='<tr class="tb_content"><td style="text-align:center;" colspan=7>暂无数据</td></tr>';
                    $('#'+opty+'qw').html(shtml);
                  }else{
                    var shtml = '';
                    if(opty=="gg"){              //个券图表前五的数据展示
                     var myValue=res.data.ggqw; 
                     for(var item in myValue){
                      shtml += '<tr class="tb_content">';
                      shtml += '<td >'+myValue[item]['gxd']+'</td>';
                      shtml += '<td style="text-align:center;padding:0;">'+myValue[item]['thscode']+'</td>';
                      shtml += '<td style="text-align:center;padding:0;">'+myValue[item]['name']+'</td>';
                      shtml += '<td>'+myValue[item]['qmccsz']+'</td>';
                      shtml += '<td>'+myValue[item]['zczb']+'</td>';
                      shtml += '<td >'+myValue[item]['zhsy']+'</td>';
                      shtml += '<td class="change_item">'+myValue[item]['zhsyl']+'</td>';
                      shtml +='</tr>';
                      $('#'+opty+'qw').html(shtml);
                     }
                    }else if(opty=="hy"){              //行业图表展示前五
                     var myValue=res.data.hyqw;
                     for(var item in myValue){
                      shtml += '<tr class="tb_content">';              //拼接td
                      shtml += '<td style="display:none;">'+"--"+'</td>';
                      shtml += '<td >'+myValue[item]['gxd']+'</td>';
                      shtml += '<td style="text-align:center;padding:0;">'+myValue[item]['gname']+'</td>';
                      shtml += '<td >'+myValue[item]['qmccsz']+'</td>';
                      shtml += '<td>'+myValue[item]['zczb']+'</td>';
                      shtml += '<td class="change_item">'+myValue[item]['zhsy']+'</td>';
                      shtml += '<td class="change_item">'+myValue[item]['zhsyl']+'</td>';
                      shtml +='</tr>';
                      $('#'+opty+'qw').html(shtml);
                     }
                    }
                    var shtml = '';            //个券图表展示后五的数据
                    if(opty=="gg"){
                     var  myValue_2=res.data.gghw;
                     for(var item in myValue_2){
                      shtml += '<tr class="tb_content">';
                      shtml += '<td >'+myValue_2[item]['gxd']+'</td>';
                      shtml += '<td style="text-align:center;padding:0;">'+myValue_2[item]['thscode']+'</td>';
                      shtml += '<td style="text-align:center;padding:0;">'+myValue_2[item]['name']+'</td>';
                      shtml += '<td>'+myValue_2[item]['qmccsz']+'</td>';
                      shtml += '<td>'+myValue_2[item]['zczb']+'</td>';
                      shtml += '<td >'+myValue_2[item]['zhsy']+'</td>';
                      shtml += '<td class="change_item">'+myValue_2[item]['zhsyl']+'</td>';
                      shtml +='</tr>';
                     }
                    }else if(opty=="hy"){              //行业图表展示后五的数据
                      var  myValue_2=res.data.hyhw;
                      for(var item in myValue_2){
                      shtml += '<tr class="tb_content">';
                      shtml += '<td style="display:none;">'+"--"+'</td>';
                      shtml += '<td >'+myValue_2[item]['gxd']+'</td>';
                      shtml += '<td style="text-align:center;padding:0;">'+myValue_2[item]['gname']+'</td>';
                      shtml += '<td >'+myValue_2[item]['qmccsz']+'</td>';
                      shtml += '<td>'+myValue_2[item]['zczb']+'</td>';
                      shtml += '<td class="change_item">'+myValue_2[item]['zhsy']+'</td>';
                      shtml += '<td class="change_item">'+myValue_2[item]['zhsyl']+'</td>';
                      shtml +='</tr>';
                     }
                    }  
                  }
                    $('#'+opty+'hw').html(shtml);
                    $.each($(".tb_1 tbody tr"),function(){  //归因分析4个表格变色2
                      try{
                        var zhsy=$(this).find("td").eq(5).html().replace(/\,|\%/gi,'');
                      }catch(e){
                        console.log("归因分析无表格");
                      }
                       if(zhsy>=0){
                         $(this).find("td").eq(5).addClass("up");
                         $(this).find("td").eq(6).addClass("up");
                       }else if(zhsy<0){
                         $(this).find("td").eq(5).addClass("down");
                         $(this).find("td").eq(6).addClass("down");
                     };
                    });
                    }
                });
            }
          }
          util.findValue=function(){
              var value='&index_arr=';
              var $vis=$(".sel_label:visible");
              $.each($vis,function(){
                 var finValue=($(this).find("span").html()).split(" ");
                 value+= finValue[1]+","
              });
              var fina=value.substring(0,value.length-1);
              return fina;
          }
          util.getName=function(){
              var myName=new Array();
              myName.push("组合");
              var $vis=$(".sel_label:visible");
              $.each($vis,function(){
                 var finValue=($(this).find("span").html()).split(" ");
                 myName.push(finValue[0]);
              });
              return myName;
          }
        //资产配置图的饼图函数
        util.draw_2=function (bt_d,name){ 
          var option = {
          tooltip : {
                trigger: 'item',
                formatter: "{b} : <br/>{c} <br/>({d}%)",
                transitionDuration:0,
                textStyle:{
                  fontSize:12,
                }
            },
          legend:{
            orient:'vertical',                                                                                        
            x:'right',
            y:'center',
            textStyle:{
               color:'#777777',
            },
            formatter: function(val){
                      for(i in val){
                             if(val.length>7){
                                   return val.substring(0,7)+"...";
                             }else{
                                   return val;
                              }             
                      }
            },
            data:name,
          },
          animation:false,
            series : [
                {
                    name:'资产配置',
                    type:'pie',
                    radius : '65%',
                    center: ['30%', '50%'],          
                     itemStyle: {
                        normal: { 
                             color: function(params) {
                                 // build a color map as your need.
                                 var colorList =[];
                                 return colorList[params.dataIndex]
                             },
                            labelLine:{
                              show:false,
                            },                 
                            label: {
                                show: false,
                                
                                position: 'top',
                                formatter: '{b}\n{d}%',                       
                            }
                        }
                      },
                    data:bt_d
                }
            ],
                 noDataLoadingOption:{
                    text:"暂无数据",
                    effect:"bubble",
                    effectOption:{
                        effect:{
                            n:0
                        }
                    },
                    textStyle:{
                        fontSize:20,
                        fontWeight:''
                    }
                }
        };
             var myChart = echarts.init(document.getElementById('main_4'));  
             myChart.setOption(option,true);   //为echarts对象加载数据  
        }
        //组合速览画图函数
        util.draw=function (anim,a0,a1,data,name){             
                var option = {
            tooltip : {
                trigger: 'axis',
                formatter: "{b} <br/>  {a}:{c}%  <br/>{a1}: {c1} %" , 
                textStyle:{
                  fontSize:12,
                }     
            },
            grid:{
                y:11,
                x:80,
               x2:40,
            },
            legend: {
                data:name,
                x:'center',
                y:'bottom', 
                selectedMode:false       
            },     
            xAxis : [
                {   
                    type : 'category',
                    axisLine:{
                     show:false,
                    },
                    onZero:false,
                    boundaryGap : false,
                    splitNumber:15,
                    data : data
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    onZero:false,
                    axisLine:{
                     show:false,
                    },
                    axisLabel : {
                        formatter: '{value} %'
                    },
                    splitNumber:12,
                }
            ],   
           animation:false,
            noDataLoadingOption:{
                    text:"暂无数据",
                    effect:"bubble",
                    effectOption:{
                        effect:{
                            n:0
                        }
                    },
                    textStyle:{
                        fontSize:20,
                        fontWeight:''
                    }
                },
            series : [
                {
                    name:name[0],
                    type:'line',
                    color:'#32cd32',
                      smooth:true,
                      symbol:"none",
                    data:a0,
                     itemStyle : { 
                        normal: {
                        color: '#548ee8',          
                         lineStyle: {      
                        width:2,
                    },    
                    },   
                },            
                },
                {
                    name:name[1],
                    type:'line',
                    data:a1,
                    smooth:true,
                    symbol:"none",
                     itemStyle : { normal: {
                        color: '#fc2e30',
                        lineStyle: {       // 属性lineStyle控制线条样式
                        width:2
                    },    
                    }},
                },
            ]
        };
             var myChart = echarts.init(document.getElementById('main_3'));  
             myChart.setOption(option, true);   //为echarts对象加载数据 
        }
        //组合速览筛选后画图函数
        util.homeSelete=function(name,date,data,serie){             
                var option = {
            tooltip : {
                trigger: 'axis',
                textStyle:{
                  fontSize:12,
                },
                formatter: function (params,ticket,callback) {
                    //console.log(params)
                    var res = '资产占比趋势 : <br/>' + params[0].name;
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '<br/>' + params[i].seriesName + ' : ' + params[i].value+'%';
                    }
                   // res+="</br>"+x[params[0].dataIndex]
                    setTimeout(function (){
                        // 仅为了模拟异步回调
                        callback(ticket, res);
                    }, 0)
                    return '';
                }    
            },
            grid:{
                y:11,
                x:80,
               x2:40,
            },
            legend: {
                data:name||[],
                x:'center',
                y:'bottom', 
                selectedMode:false       
            },     
            xAxis : [
                {   
                    type : 'category',
                    axisLine:{
                     show:false,
                    },
                    onZero:false,
                    boundaryGap : false,
                    splitNumber:15,
                    data : date||[]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    onZero:false,
                    axisLine:{
                     show:false,
                    },
                    axisLabel : {
                        formatter: '{value} %'
                    },
                    splitNumber:12,
                }
            ],   
           animation:false,
            noDataLoadingOption:{
                    text:"暂无数据",
                    effect:"bubble",
                    effectOption:{
                        effect:{
                            n:0
                        }
                    },
                    textStyle:{
                        fontSize:20,
                        fontWeight:''
                    }
                },
            series :serie,
        };
             var myChart = echarts.init(document.getElementById('main_3'));  
             myChart.setOption(option, true);   //为echarts对象加载数据 
        }
  //excel导出功能,全局函数。
  peExcel=function(){                        
    window.alert("抱歉，此页面暂不支持导出");
  }
  //点击更多
  util.showRecordInfo=function (e) {
      $('#name_history_dlg').fadeIn();
      $("#recordInfo .dlg_content").html($(e).attr("alt"));
      var wW=document.documentElement.clientWidth-$("#name_history_dlg").width(),
          wH=document.documentElement.clientHeight-$("#name_history_dlg").height();
      $("#name_history_dlg").css({top:wH/2,left:wW/2,position:"fixed"});
  }
  module.exports=util;
});    //define结束
