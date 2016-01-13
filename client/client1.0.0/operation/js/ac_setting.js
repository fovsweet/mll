//配置日期选择
var start = {
        elem: '#js-stare-date',
        format: 'YYYY-MM-DD hh:mm',
	    festival: true,
	    istime: true,
	    istoday: false,
	    skin:'danlan',
	    choose: function(datas){
	         end.min = datas; //开始日选好后，重置结束日的最小日期
	         end.start = datas; //将结束日的初始值设定为开始日
	         var startTime = $('#js-stare-date').val();
	         var endTime = $('#js-end-date').val();
	         var sd = Date.parse(new Date(startTime));
	         var ed = Date.parse(new Date(endTime));
	         if(sd > ed){
	         	$('#js-end-date').val(laydate.now((sd/1000+86400)*1000));
	         }
	    }
    }
var end = {
	    elem: '#js-end-date',
	    format: 'YYYY-MM-DD hh:mm',
	    festival: true,
	    istime: true,
	    istoday: false,
	    skin:'danlan',
	    choose: function(datas){
	    }
	    
   }
laydate(start);
laydate(end);


//新增
$('.js-add-prize').unbind('click').on('click',function(){
	dialogs(this,function(){
		var html ='';
		html = '<div class="item prize-item">'
			+ '<span>美乐乐代金券100</span>'
			+ '<p>'
			+ '<a href="javascript:;" class="js-eidt-preize" data-role="prize-edit">编辑</a>'
			+ '<a href="javascript:;" class="js-del-prize">删除</a>'
			+ '</p>'
		+ '</div>';
		$('.list-prize').append(html);
		$('.js-del-prize').unbind('click').on('click',function(){
			$(this).parents('.prize-item').remove();
		})
		$('.js-eidt-preize').unbind('click').on('click',function(){
			dialogs(this,function(){	
				//编辑TODO
			});
		})
	});
})
//编辑



//弹窗
function dialogs(obj,callback) {
    var r = $(obj).data('role');
    var d = $("#" + r + "");
    d.prepend("<div class='fix'></div>");
    d.fadeIn();
    d.css('display', 'flex');
    $('#'+r+' .fix, #'+r+' .close_log').on('click', function () {
        d.fadeOut();
        setTimeout(function () {
            $('#'+r+' .fix').detach();
        }, 500)
    });
    
    $('#'+r+' .confirm-btn').unbind('click').on('click',function(){
    	callback();
    	d.fadeOut();
        setTimeout(function () {
            $('#'+r+' .fix').detach();
        }, 500)
    })
 	
}