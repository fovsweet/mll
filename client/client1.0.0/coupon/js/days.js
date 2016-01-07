/*******页面时间控件******/
(function($){
    stayindex = {
        start:$('#startDate'),
        end:$('#endDate'),
        today:(new Date()),
        init:function(){
            stayindex.inputVal();
            stayindex.endFun();
            stayindex.startFun();
        },
        startFun:function(){
            stayindex.start.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : 0,
                maxDate:360,
              	onSelect:function(dateText,inst){
                    stayindex.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days', 1)));
                    stayindex.end.datepicker('option', 'maxDate', new Date(moment(dateText).add('days', 360)));
                  	var strDay =  stayindex.compare($(this));
                  	var s = new Date(moment(dateText).add('days', 0));
                  	/*设置手预览界面的开始时间同步*/
                  	$('#pre_startDate').html(s.getFullYear() + "." + stayindex.addZero((s.getMonth()+1)) + "." + stayindex.addZero(s.getDate()));
                    stayindex.start.datepicker('option', 'appendText', strDay);
                    /*if((new Date(stayindex.end.val()) - new Date(dateText)) <= (24*60*60*1000)){
                        stayindex.end.datepicker('option', 'appendText', stayindex.compare(stayindex.end));
                    }*/
                }

            });
        },
        endFun:function(){
            stayindex.end.datepicker('refresh');
            stayindex.end.datepicker({
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
				onSelect:function(){
                    //stayindex.end.datepicker('option', 'appendText', stayindex.compare($(this)));
                    
                }
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
            var myDate = new Date(stayindex.today.getFullYear(),stayindex.today.getMonth(),stayindex.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = stayindex.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            stayindex.inputTimes(stayindex.start,1);
            stayindex.inputTimes(stayindex.end,2);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(stayindex.today).add('days', day));
            obj.val(m.getFullYear() + "-" + stayindex.addZero((m.getMonth()+1)) + "-" + stayindex.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    }
    stayindex.init();
})(jQuery);
(function($){
    stayList = {
        start:$('#startDateDialog'),
        end:$('#endDateDialog'),
        today:(new Date()),
        init:function(){
            stayList.endFun();
            stayList.startFun();
        },
        startFun:function(){
            stayList.start.datepicker({
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
                    stayList.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days', 0)));
                    stayList.end.datepicker('option', 'maxDate', new Date(moment(dateText).add('days', 360)));
                   /* var strDay =  stayList.compare($(this));
                    stayList.start.datepicker('option', 'appendText', strDay);
                    if((new Date(stayList.end.val()) - new Date(dateText)) <= (24*60*60*1000)){
                        stayList.end.datepicker('option', 'appendText', stayList.compare(stayList.end));
                    }*/
                }

            });
        },
        endFun:function(){
            stayList.end.datepicker('refresh');
            stayList.end.datepicker({
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
                /*onSelect:function(){
                    stayList.end.datepicker('option', 'appendText', stayList.compare($(this)));
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
            var myDate = new Date(stayList.today.getFullYear(),stayList.today.getMonth(),stayList.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = stayList.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            stayList.inputTimes(stayList.start,1);
            stayList.inputTimes(stayList.end,2);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(stayList.today).add('days', day));
            obj.val(m.getFullYear() + "-" + stayList.addZero((m.getMonth()+1)) + "-" + stayList.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    }
    stayList.init();
})(jQuery);
/*******页面时间控件******/
/*******页面时间控件******/
(function($){
    stay = {
        start:$(''),
        end:$('#startDateD'),
        today:(new Date()),
        init:function(){
        	stay.today = (new Date('2015-12-20'));
            stay.inputVal();
            stay.endFun();
            stay.startFun();
            stay.end.datepicker('option', 'minDate', new Date(moment(stay.today).add('days', 1)));
        },
        startFun:function(){
            stay.start.datepicker({
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
                onSelect:function(dateText,inst){
                    stay.end.datepicker('option', 'minDate', new Date(moment('dateText').add('days', 0)));
                    stay.end.datepicker('option', 'maxDate', new Date(moment(dateText).add('days', 360)));
                   /* var strDay =  stay.compare($(this));
                    stay.start.datepicker('option', 'appendText', strDay);
                    if((new Date(stay.end.val()) - new Date(dateText)) <= (24*60*60*1000)){
                        stay.end.datepicker('option', 'appendText', stay.compare(stay.end));
                    }*/
                }

            });
        },
        endFun:function(){
            stay.end.datepicker('refresh');
            stay.end.datepicker({
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
                /*onSelect:function(){
                    stay.end.datepicker('option', 'appendText', stay.compare($(this)));
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
            var myDate = new Date(stay.today.getFullYear(),stay.today.getMonth(),stay.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = stay.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            stay.inputTimes(stay.start,1);
            stay.inputTimes(stay.end,1);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(stay.today).add('days', day));
            obj.val(m.getFullYear() + "-" + stay.addZero((m.getMonth()+1)) + "-" + stay.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    }
    stay.init();
})(jQuery);