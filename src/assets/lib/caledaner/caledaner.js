 $(function(){
                $('#firstSelect').calendarSwitch({
                    selectors : {
                        sections : ".calendar"
                    },
                    index : 7,      //展示的月份个数
                    animateFunction : "toggle",        //动画效果
                    controlDay:false,//知否控制在daysnumber天之内，这个数值的设置前提是总显示天数大于90天
                    daysnumber : "90",     //控制天数
                    comeColor : "#66CCFF",       //入住颜色
                    outColor : "#FF0033",      //离店颜色
                    comeoutColor : "#FFCCCC",        //入住和离店之间的颜色
                    callback :function(){
                        }  ,   //回调函数
                    comfireBtn:'.comfire'//确定按钮的class或者id
                });
                var b=new Date();
                //b.setDate(a.getDate()+1)
                var ye=b.getFullYear();
                var mo=b.getMonth()+1;
                var da=b.getDate();
                  $('#startDate').val(mo+'-'+da);
                b=new Date(b.getTime()+24*3600*1000);
                var ye=b.getFullYear();
                var mo=b.getMonth()+1;
                var da=b.getDate();
                $('#endDate').val(mo+'-'+da);
            });