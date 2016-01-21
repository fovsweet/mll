///var BOSH_SERVICE = 'http://luojh-pc:7070/http-bind/';

var BOSH_SERVICE = 'ws://chata.meilele.com:7070/ws/';

var connection = null;
//wss://your.openfire.host:7443/ws/
function log(msg,type,status){
    /*  TODE
    **type:1 ----客服
    **type:2 ----客户
    **type:3 ----系统
    **status:1 ----推送成功
    **status:2 ----推送过程中
    **status:3 ----推送失败
    */
    if(type == 1){
        tc = ' chat-list-left fl';
        msgmode(tc,1);
    }else if(type ==2){
        tc = ' chat-list-right fr';
        msgmode(tc,2);
    }else if(type == 3){
        sysmsg(msg);
    };
    function msgmode(cl,t){
        var chatimg = "<div class='chat-img'><img src='../images/head.jpg' alt=''/></div>";
        var chatinfo = "<div class='chat-info'>"+msg+"</div>"
        if(t == 1){
            $('#scroll').append(
            "<div class='clearfix'>"+
            "<div class='chat-list"+cl+"'>"+chatimg+chatinfo+
            "</div>"+
            "</div>"
        )}else{
            $('#scroll').append(
            "<div class='clearfix'>"+
            "<div class='chat-list"+cl+"'>"+chatinfo+chatimg+
            "</div>"+
            "</div>"
        )}
    };
    function sysmsg(ss){
        $('#scroll').append("<div class='clearfix'><div class='chat-tips'>"+ss+"</div></div>")
    }
}

function onConnect(status)
{
    
/*    console.log('Strophe.Status.CONNECTING: ' + Strophe.Status.CONNECTING);
    console.log('Strophe.Status.CONNFAIL: ' + Strophe.Status.CONNFAIL);
    console.log('Strophe.Status.DISCONNECTING: ' + Strophe.Status.DISCONNECTING);
    console.log('Strophe.Status.DISCONNECTED: ' + Strophe.Status.DISCONNECTED);
    console.log('Strophe.Status.CONNECTED: ' + Strophe.Status.CONNECTED);
    console.log('Strophe.Status.AUTHENTICATING: ' + Strophe.Status.AUTHENTICATING);
    console.log('Strophe.Status.AUTHFAIL: ' + Strophe.Status.AUTHFAIL);
    console.log('=============================');

    console.log(connection);
    console.log(status);*/
    
    if (status == Strophe.Status.CONNECTING) {
        log('正在连接...',3);
        console.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
        log('Strophe failed to connect.',3);
        $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
        log('Strophe is disconnecting.',3);
    } else if (status == Strophe.Status.DISCONNECTED) {
        log('Strophe is disconnected.',3);
        $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
        log('连接成功！',3);
        console.log('Strophe is connected.');
//      log('ECHOBOT: Send a message to ' + connection.jid + ' to talk to me.');

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
        var assign = '#'+option.assign;
        var id = option.id;
        var path = option.path;
        var tip = option.tip;
        
        if(assign.length<=0){
            alert('缺少表情赋值对象。');
            return false;
        }
        
        $(this).click(function(e){
            var strFace, labFace;
            if($('#'+id).length<=0){
                strFace = '<div id="'+id+'"  class="qqFace swiper-container"><div class="swiper-wrapper">';
                for(var j = 0; j< 3; j++)
                {
                    strFace +='<div class="swiper-slide"><table border="0" cellspacing="0" cellpadding="0"><tr>';
                    for(var i = j*21 ; i < (j+1)*21 ;i++)
                    {
                        var t = i+1;
                        labFace = '['+tip+t+']';
                        strFace += '<td><img src="'+path+(i+1)+'.gif" onclick="boxindex(this);"/></td>';
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

        // $('.js-chat-fun').click(function(){
        // 	$('#'+id).hide();
        //     $('#'+id).remove();
        // });

        // $('.btn-send,.container').click(function(){
        // 	// $('#'+id).hide();
        //  //    $('#'+id).remove();
        //     $('.chat-func').hide();
        // });
    };
})(jQuery);

function boxindex(obj){
    var imgurl = $(obj).attr('src');
    $('#saytext').append("<img src='"+imgurl+"'>")
}

$('.guide-list').dialog();
$('.guider_for').click(function(){
    $('.container').load('chat.html');
});