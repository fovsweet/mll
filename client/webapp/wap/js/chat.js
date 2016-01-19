//页面基本功能js
function changeHeight(dom,cd){
	var h = $(dom).height();
	var dh = $(cd).height();
	$(dom).css('bottom',dh);
	$(dom).height(h-dh);
}
$('.fixed').click(function(){
	console.log(111)
	changeHeight('#container','.fixed')
});
/****QQface start***/
$(function(){
	loaded();
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

	$('.btn-send').click(function(){
		var str = $("#saytext").val(); 
        $("#scroll").html(replace_em(str)); 
	});

	// 高度变化
	$(document).click(function(){
		var fh = $('footer.fixed').height();
		console.log(fh);
	})
});


//查看结果
function replace_em(str){
	str = str.replace(/\</g,'&lt;');
	str = str.replace(/\>/g,'&gt;');
	str = str.replace(/\n/g,'<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="../images/face/$1.gif" border="0" />');
	return str;
}
/****QQ face end****/
// $('.js-dialog').dialog();
$('.failed-icon').dialog();

$(document).on('click','.js-chat-fun,.emotion',function(){
	$('.chat-func').toggle();
	changeHeight('#container','.fixed')
});

var myScroll,maxHei;
function loaded(){
    myScroll = new IScroll('#container', 
    	{ 
    		mouseWheel: true, 
    		tap: true,
    		preventDefault:false,
    		checkDOMChanges:true,
            onScrollMove:function(){
                maxHei = this.y;
				console.log(maxHei)
            }
    	}
	);
}

///var BOSH_SERVICE = 'http://luojh-pc:7070/http-bind/';

var BOSH_SERVICE = 'ws://chata.meilele.com:7070/ws/';

var connection = null;
//wss://your.openfire.host:7443/ws/

function log(msg)
{
    $('#container').append(
    	"<div class='chat-list chat-list-left fl'>"+
		"<div class='chat-img'>"+
		"<img src='../images/head.jpg' alt='' />"+
		"</div>"+
		"<div class='chat-info'>"+document.createTextNode(msg)+"</div>"+
		"</div>"
		);
}
function onConnect(status)
{
    /*
	console.log('Strophe.Status.CONNECTING: ' + Strophe.Status.CONNECTING);
	console.log('Strophe.Status.CONNFAIL: ' + Strophe.Status.CONNFAIL);
	console.log('Strophe.Status.DISCONNECTING: ' + Strophe.Status.DISCONNECTING);
	console.log('Strophe.Status.DISCONNECTED: ' + Strophe.Status.DISCONNECTED);
	console.log('Strophe.Status.CONNECTED: ' + Strophe.Status.CONNECTED);
	console.log('Strophe.Status.AUTHENTICATING: ' + Strophe.Status.AUTHENTICATING);
	console.log('Strophe.Status.AUTHFAIL: ' + Strophe.Status.AUTHFAIL);
	console.log('=============================');

	console.log(11211);
	console.log(connection);
	console.log(status);
	*/

    if (status == Strophe.Status.CONNECTING) {
		log('正在连接...');
        console.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
		log('Strophe failed to connect.');
		$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
		log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
		log('Strophe is disconnected.');
		$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
		log('连接成功！');
        console.log('Strophe is connected.');
//		log('ECHOBOT: Send a message to ' + connection.jid + ' to talk to me.');

		$.cookie('jid', connection.jid);
		$.cookie('sid', connection.sid);
		$.cookie('rid', connection.rid);
        
        // set jid to hidden field
        $('#fromjid').val(connection.jid);
        
        // get friends
        var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
        connection.sendIQ(iq, getFriends); // getFriends是回调函数
        
        connection.addHandler(onMessage, null, 'message', null, null,  null); 
        connection.send($pres().tree());
    }
}

function onMessage(msg) {
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {
        var body = elems[0];
        log(new Date().toLocaleTimeString() + ' ' + from + ': ' + Strophe.getText(body));
//        var reply = $msg({to: from, from: to, type: 'chat'}).cnode(Strophe.copyElement(body));
//        connection.send(reply.tree());
//        log('ECHOBOT: I sent ' + from + ': ' + Strophe.getText(body));
    }
    // we must return true to keep the handler alive.  
    // returning false would remove it after it finishes.
    return true;
}

function getFriends(iq){	
    $(iq).find('item').each(function () {
        var jid = $(this).attr('jid');
        var name = $(this).attr('name') || jid;
        
        $('#friendlist').html('');
        $('#friendlist').append('<li><span>'+ jid +'</span> <a href="#'+ jid +'">talk</a></li>');
        console.log(jid + ' - ' + name);
    });
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
            connection.connect($('#jid').get(0).value, $('#pass').get(0).value, onConnect);

        } else {
            button.value = 'connect';
            connection.disconnect();
        }
    });
    
    $('.btn-send').bind('click', function () {
   		var str = $("#saytext").val(); 
        $("#scroll").html(replace_em(str)); 
        
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
