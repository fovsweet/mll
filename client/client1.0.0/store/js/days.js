/*******页面时间控件******/
function setDays(targetN,startD,endD){
     targetN = {
        start:$('#'+startD),
        end:$('#'+endD),
        today:(new Date()),
        init:function(){
            targetN.inputVal();
            targetN.endFun();
            targetN.startFun();
        },
        startFun:function(){
            targetN.start.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -360,
                maxDate:360,
              	onSelect:function(dateText,inst){
                    targetN.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days', 1)));
                    targetN.end.datepicker('option', 'maxDate', new Date(moment(dateText).add('days', 360)));
                  	var strDay =  targetN.compare($(this));
                    /*targetN.start.datepicker('option', 'appendText', strDay);
                    if((new Date(targetN.end.val()) - new Date(dateText)) <= (24*60*60*1000)){
                        targetN.end.datepicker('option', 'appendText', targetN.compare(targetN.end));
                    }*/
                }

            });
        },
        endFun:function(){
            targetN.end.datepicker('refresh');
            targetN.end.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : 1,
                maxDate:360,               
               	/*onSelect:function(){
                    targetN.end.datepicker('option', 'appendText', targetN.compare($(this)));
                }*/
            });
        },
        transformStr:function(day,strDay){
            switch (day){
                    case 1:
                        strDay  = '星期一';
                        break;
                    case 2:
                        strDay  = '星期二';
                        break;
                    case 3:
                        strDay  = '星期三';
                        break;
                    case 4:
                        strDay  = '星期四';
                        break;
                    case 5:
                        strDay  = '星期五';
                        break;
                    case 6:
                        strDay  = '星期六';
                        break;
                    case 0:
                        strDay  = '星期日';
                        break;
                }
            return strDay;
        },
        compare:function(obj){
            var strDay = '今天';
            var myDate = new Date(targetN.today.getFullYear(),targetN.today.getMonth(),targetN.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = targetN.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            targetN.inputTimes(targetN.start,0);
            targetN.inputTimes(targetN.end,1);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(targetN.today).add('days', day));
            obj.val(m.getFullYear() + "-" + targetN.addZero((m.getMonth()+1)) + "-" + targetN.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    }
    targetN.init();
}
