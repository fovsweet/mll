$.fn.extend({
    check_first:function(){
            $('.demo_list>div').attr('class','deme_title_info');
            $('.demo_list>div').eq(0).attr('class','demo_st');
    },
    del_list:function(type){
        $.fn.check_first();
        $(this).on(type,function(){
            var n = $(this).parent(),
                l = n.data('list');
            $('.demo_info li').each(function(i){
                if($(this).data('list')==l){
                    $(this).children('span').attr('class','');
                }
            })
            n.remove();
            $.fn.check_first();
        });
    },
    check_list:function(type){
        $(this).on(type,function(){
            if($(this).hasClass('img_check')==true){
                var t = $(this).nextAll('p').text();
                var i = $(this).next('img').attr('src');
                var d = $(this).parent().data('list');
                if($('.img_check').length==1){
                    $('.demo_list').append("<div class='demo_st' data-list='"+d+"'>"+
                    "<a class='close_demo' href='javascript:;'></a>"+
                    "<p>"+t+"</p>"+
                    "<img src="+i+" alt=''/>"+
                    "</div>");
                }else{
                    $('.demo_list').append("<div class='deme_title_info' data-list='"+d+"'>"+
                    "<a class='close_demo' href='javascript:;'></a>"+
                    "<p>"+t+"</p>"+
                    "<img src="+i+" alt=''/>"+
                    "</div>");
                }
            }else{
                var s = $(this).parent().data('list');
                $('.demo_list>div').each(function(i){
                    if($(this).data('list')==s){
                        $(this).remove();
                    }
                })
            };
            $('.close_demo').del_list('click');
        })
        $.fn.check_first();
    },
});
/*图文消息使用*/
 $('.demo_info span').on('click',function(){
    $(this).toggleClass('img_check');
});

$('.demo_info span').check_list('click');

$('.tab_menu li a').on('click',function(){
	$(this).parent().siblings().find('a').removeClass('active');
	$(this).addClass('active');
})

/*图文链接使用*/
/* $('.demo_info span').on('click',function(){
	$('.img_check').removeClass('img_check');
    $(this).addClass('img_check');
});*/