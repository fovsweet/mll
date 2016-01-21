/****QQface start***/
$(function(){
	loaded();
    myScroll.refresh();
    $('#scroll').css('top',myScroll.maxScrollY);
	$('.emotion').qqFace({
		id: 'chat-face', //表情盒子的ID
		assign: 'saytext',//给那个控件赋值
		path:'../images/face/'	//表情存放的路径
	});

	$(".emotion").click(function(){
		var swiper = new Swiper('.swiper-container',{
			pagination:'.swiper-pagination'
		});
	});

	// 高度变化
	$(document).click(function(){
		var fh = $('footer.fixed').height();
		console.log(fh);
	})
});

/****QQ face end****/
// $('.js-dialog').dialog();


var myScroll,maxHei;
function loaded(){
    myScroll = new iScroll('container', {
        mouseWheel: true,
        tap: true ,
        onScrollMove:function(){
            maxHei = this.y;
        },
        checkDOMChanges:true
    })
}


$(document).ready(function () {
    connection = new Strophe.Connection(BOSH_SERVICE);

    // Uncomment the following lines to spy on the wire traffic.
    // connection.rawInput = function (data) { log('RECV: ' + data); };
    // connection.rawOutput = function (data) { log('SEND: ' + data); };

    // Uncomment the following line to see all the debug output.
    // Strophe.log = function (level, msg) { log('LOG: ' + msg); };


    $('#connect').bind('click', function () {
        var button = $('#connect').get(0);
        if (button.value == 'connect') {
            button.value = 'disconnect';
			//用户名，密码连接。
            connection.connect($('#jid').val(), $('#pass').val(), onConnect);

        } else {
            button.value = 'connect';
            connection.disconnect();
        }
    });

    $('.btn-send').bind('click', function () {
   		var str = $("#saytext").html();
        $('#saytext').html('');
        log(str,2);
        myScroll.refresh();
        $('#scroll').css('top',myScroll.maxScrollY);

        var msg=$('#msg').val();
        toId = $('#tojid').val();
        fromId = $('#fromjid').val();

        console.log(msg);
        console.log(toId);

	    var reply = $msg({to: toId, from: fromId , type: 'chat'}).cnode(Strophe.xmlElement('body', '' ,msg));
	    connection.send(reply.tree());
        // log(new Date().toLocaleTimeString() + "  "+ fromId +":  "  + msg);
	    $('#msg').val('');
    });

    $('#friendlist li').live('click', function () {
        var jid = $(this).find('span').text();
        $('#tojid').val(jid);
    });
});

$('.failed-icon').dialog();

$('.js-chat-fun').click(function(){
    $('.smile-face').hide();
    $('.chat-func').toggle();
});

$('.smile-icon').click(function(){
    $('.chat-func').hide();
    $('.smile-face').toggle();
});

$('.chat-list-left .chat-img').click(function(){
    $('.container').load('guide_info.html')
})