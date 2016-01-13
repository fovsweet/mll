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
	         end.start = datas //将结束日的初始值设定为开始日
	         $('#js-end-date').val(datas);
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

//绑定编辑，删除事件
$('.setting .js-add-prize,.js-eidt-preize').on('click',function(){
	dialogs(this,function(){
		var html = '<div class="item prize-item">'
			+ '<span>美乐乐代金券100</span>'
			+ '<p>'
			+ '<a href="javascript:;" class="js-eidt-preize" data-role="prize-setting">编辑</a>'
			+ '<a href="javascript:;" class="js-del-prize">删除</a>'
			+ '</p>'
		+ '</div>';
		$('.list-prize').append(html);
		 $('.js-del-prize').on('click',function(){
			$(this).parents('.prize-item').remove();
		})
	});
})


//弹窗
function dialogs(obj,callback) {
    var r = $(obj).data('role');
    var d = $("#" + r + "");
    d.prepend("<div class='fix'></div>");
    d.fadeIn();
    d.css('display', 'flex');
    $('#'+r+' .fix, #'+r+' .close_log,#'+r+' .confirm-btn').on('click', function () {
        d.fadeOut();
        setTimeout(function () {
            $('#'+r+' .fix').detach();
        }, 500)
    });
    
    $('#'+r+' .confirm-btn').on('click',function(){
    	callback();
    })
 	
}