// QQQQ表情插件
(function($){  
    $.fn.qqFace = function(options){
        var defaults = {
            id : 'facebox',
            path : 'face/',
            assign : 'content',
            tip : 'em_'
        };
        var option = $.extend(defaults, options);
        var assign = $('#'+option.assign);
        var id = option.id;
        var path = option.path;
        var tip = option.tip;
        
        if(assign.length<=0){
            alert('缺少表情赋值对象。');
            return false;
        }
        
        $(this).click(function(e){
            var strFace, labFace;
            $('.chat-func').hide();
            if($('#'+id).length<=0){
                strFace = '<div id="'+id+'"  class="qqFace swiper-container"><div class="swiper-wrapper">';
                for(var j = 0; j< 3; j++)
                {
                    strFace +='<div class="swiper-slide"><table border="0" cellspacing="0" cellpadding="0"><tr>';
                    for(var i = j*21 ; i < (j+1)*21 ;i++)
                    {
                        labFace = '['+tip+i+']';
                        strFace += '<td><img src="'+path+(i+1)+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
                        if( (i+1) % 7 == 0)
                        {
                            strFace += '</tr><tr>';
                        }
                    }
                    strFace += '</tr><tr></tr></table></div>';
                }
                strFace += '</div><div class="swiper-pagination"></div></div>';
            }
            $('.smile-face').append(strFace);
            var offset = $(this).position();
            var top = offset.top + $(this).outerHeight();
            $('#'+id).css('top',top);
            $('#'+id).css('left',offset.left);
            $('#'+id).show();
            e.stopPropagation();
        });

        $('#saytext').click(function(){
            $('#'+id).hide();
            $('#'+id).remove();
            $('.chat-func').hide();
        });

        $('.js-chat-fun').click(function(){
        	$('#'+id).hide();
            $('#'+id).remove();
        });

        $('.btn-send').click(function(){
        	$('#'+id).hide();
            $('#'+id).remove();
            $('.chat-func').hide();
        });
    };
})(jQuery);

$('.guide-list').dialog();
$('.guider_for').click(function(){
    $('.container').load('chat.html');
});