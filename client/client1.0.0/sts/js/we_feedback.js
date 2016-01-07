/* ======================================
* copyRight: meilele
* fileName: we_feedback.js
* createTime: 2015/12/15
* author: dengyun@meilele
* version: 1.0
* modify: {}
* description: 系统-微回复页面涉及js
======================================== */
var MCHID = '111';
!function(){
    var pageQuery = window.location.search.substr(1).split('&');
    var pageParam = ( /page=/.test(pageQuery[0]) ) ? ( pageQuery[0].replace('page=','') ) : '1-1-0';
    window._pageConf ={
        '1-0-0': {
            pageIndex: '1-0-0',
            defaultFunc: function() {
                goPage(window._pageConf['1-1-0']);
            }
        },
        '1-1-0': {
            pageIndex: '1-1-0',
            defaultFunc: function() {
                goPage(window._pageConf['1-1-2']);
            }
        },
        '1-1-1': {
            pageIndex: '1-1-1',
            display: [{curIndex:0,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {curIndex:0,dataUrl:['1-1-0','1-2-0','1-3-0']},
                {curIndex:0,dataUrl:['1-1-1','1-1-2']}],
            pageLoad: 'page/msg_imgtext_kinds.html',
            callFunc: function() {
                // $("#js-page1-1-1").addSettingModual(MCHID);
                // $("#js-page1-1-1").bindNavEvent();
                $.msgDemo($("#js-page1-1-1"),MCHID,{index:0,picMessages:[]});
                $("#js-page1-1-1").addFooterOper(null);
            }

        },
        '1-1-2': {
            pageIndex: '1-1-2',
            display: [{curIndex:0,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {curIndex:0,dataUrl:['1-1-0','1-2-0','1-3-0']},
                {curIndex:1,dataUrl:['1-1-1','1-1-2']}],
            pageLoad: 'page/msg_text.html',
            callFunc: function(){
                $("#js-page1-1-2").addFooterOper(null);
                $('#js-page1-1-2').bindwordValid();
            }
        },
        '1-2-0': {
            pageIndex: '1-2-0',
            display: [{curIndex:0,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {curIndex:1,dataUrl:['1-1-0','1-2-0','1-3-0']},
                {}],
            pageLoad: 'page/param_feedback.html',
            callFunc: function(){
                $('#js-page1-2-0').find('.js-add-rule').on('click',addQrRule);
            }
        },
        '1-3-0': {
            pageIndex: '1-3-0',
            display: [{curIndex:0,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {curIndex:2,dataUrl:['1-1-0','1-2-0','1-3-0']},
                {}],
            pageLoad: 'page/param_feedback.html',
            callFunc: function(){
                $('#js-page1-3-0').find('.js-add-rule').on('click',function(){
                    addQrRule('mllConcern');
                });
            }
        },
        '2-0-0': {
            pageIndex: '2-0-0',
            defaultFunc: function(){
                goPage(window._pageConf['2-0-2'],[{selector:'#js-page2-0-2 .js-editorArea',value: '这是一个初始化实例aaaa',domType: 'text'}]);
            }
        },
        '2-0-1': {
            pageIndex: '2-0-1',
            display: [{curIndex:1,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {},
                {curIndex:0,dataUrl:['2-0-1','2-0-2']}],
            pageLoad: 'page/msg_imgtext_kinds.html',
            callFunc: function() {
                // $("#js-page2-0-1").addSettingModual(MCHID);
                // $("#js-page2-0-1").bindNavEvent();
                $.msgDemo($("#js-page2-0-1"),MCHID);
                $("#js-page2-0-1").addFooterOper(null);
            }
        },
        '2-0-2': {
            pageIndex: '2-0-2',
            display: [{curIndex:1,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {},
                {curIndex:1,dataUrl:['2-0-1','2-0-2']}],
            pageLoad: 'page/msg_text.html',
            callFunc: function(){
                //添加操作按钮
                $("#js-page2-0-2").addFooterOper([{
                        value: '删除回复',className: 'cancel-button',cbFun: delFeed
                    },{
                        value: '确  认',className: 'bright-button',cbFun: confirmTextFeed }]);

                //绑定验证事件
                $('#js-page2-0-2').bindwordValid();
            },
            initFunc: function(){
                return [{selector:'#js-page2-0-2 .js-editorArea',value: '这是另一个实例',domType: 'text'}]
            }
        },
        '3-0-0': {
            pageIndex: '3-0-0',
            display: [{curIndex:2,dataUrl:['1-0-0','2-0-0','3-0-0']},{},{}],
            pageLoad: 'page/keyword_feedback.html',
            callFunc: function(){
                $('#js-page3-0-0').find('.js-add-rule').on('click',addRule);
            }
        }
    };
    var curConf = window._pageConf[pageParam];
    goPage(curConf);

    $('.sec-header li').on('click',function(){
        var pageParam = $(this).attr('data-role');
        goPage(window._pageConf[pageParam]);
    });

    //添加规则弹框填充图文公共模块
    $('.js-main1').load('page/msg_imgtext_kinds.html');
    $('.js-main2').load('page/msg_text.html',function(){
        $(this).bindwordValid();
    });
    $('.addTextMsg').load('page/msg_text.html');
    $('.addMsgItem').load('page/msg_imgtext_kinds.html');
}();
/**
 * [goPage 微回复导航页面跳转]
 * @param  {object} curPage : {pageIndex:{string}当前导航位置；display：对象数组表示当前页面各级导航信息；pageLoad: 加载的html路径；callFunc: 加载完成后调用方法；}
 * @param  {array}  initValue [初始化值的方法]
 * initValue参数格式：[{selector:'#js-page2-2-2 .js-editorArea',value: '这是一个初始化实例',domType: 'text'},{}...]
 */
function goPage(curPage,initValue){
    //当page配置中存在默认执行函数时则执行该方法
    //用于获取参数跳转到其他页面
    if( curPage.defaultFunc ) {
        curPage.defaultFunc();
        return;
    }
    //无初始值且page配置中存在initFunc时调用方法设置初始值
    if ( !initValue && curPage.initFunc ) {
        initValue = curPage.initFunc();
    }

    var display = curPage.display;
    for ( var k in display ) {
        if ( display[k].dataUrl ) {
            $('.tab-menu-' + k).show();
            $('.tab-menu-' + k).find('li').removeClass('current')
            $('.tab-menu-' + k).find('li').eq(display[k].curIndex).addClass('current');
            $('.tab-menu-' + k).find('li').each(function(i){
                $(this).attr('data-role',display[k].dataUrl[i]);  
            });
        } else {
            $('.tab-menu-' + k).hide();
        }
    }
    
    if ( !$('#js-page'+curPage.pageIndex).text() ) {
        if ( initValue && initValue.length ) {
            if ( curPage.callFunc ) {
                $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad,function() {
                    initVals(initValue);
                    curPage.callFunc();
                });
            } else {
                $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad,function() {
                    initVals(initValue);
                });
            }
        } else {
            if ( curPage.callFunc ) {
                $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad,curPage.callFunc);
            } else {
                $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad);
            }
        }
    } else {
        if ( initValue && initValue.length ) {
            initVals(initValue);
        }
    }

    $('.sec-main .page-content').hide();
    $('#js-page'+curPage.pageIndex).show();
}
/**
 * [initVals 初始化元素值]
 * @param  {array} initValue [初始化值对象数组。对象的项分别是dom的选择表达式，dom的值，dom类型若为text则dom.text()修改值，为input则dom.val()修改值]
 * initValue参数格式：[{selector:'#js-page2-2-2 .js-editorArea',value: '这是一个初始化实例',domType: 'text'},{}...]
 */
function initVals(initValue) {
    for ( var kk in initValue ) {
        if ( $(initValue[kk].selector)[0] ) {
            if ( initValue[kk].domType == 'input' ) {
                $(initValue[kk].selector).val(initValue[kk].value);
            } else {
                $(initValue[kk].selector).text(initValue[kk].value);
            }
        }
    }
}
//TODO默认存储当前已选择的二维码信息
window.__chosedQR = {id:[2],desc:['2015美丽金秋...']};

/**
 * [addQrRule 添加二维码规则弹窗展示]
 * 步骤：
 * 1、清除编辑二维码过的数据
 * 2、展示添加规则框
 * 3、点击二维码选择按钮事件
 * 4、图文模块加载切换事件
 */
function addQrRule(editType){
    //初始化选定规则
    window.__chosedQR = { id: [],desc: [] };

    $.lightBox({
        width: 975,
        boxID: 'addQrRule',
        title: '添加规则',
        html: $('.addQrRule').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //添加规则方法
            }
        }]
    });

    //选择二维码事件
    if ( editType && editType == 'mllConcern' ) {
        screenQREvent();
    } else {
        choQREvent();
    }
    
    //图文模块添加事件
    // $('#addQrRuleDia').addSettingModual(MCHID);
    // $('#addQrRuleDia').bindNavEvent();
    $.msgDemo($('#addQrRuleDia'),MCHID,{index:0,picMessages:[]});

    $('.data-dia .radio-wefeed').on('click',function(){
        $('.data-dia .radio-wefeed').removeClass('radio-current');
        var index = $(this).attr('data-role');
        $('.data-dia .rule-main').children().hide().eq(index).show();
        $(this).addClass('radio-current');
    });
}
/**
 * [editQrRule 编辑规则弹框展示]
 * @param  {[string]} ruleInfo [表示当前规则信息，各数据项以'|'分隔，依次是规则ID|规则名|配置qrid..]
 * @return {[type]}          [description]
 */
function editQrRule(ruleInfo,editType){
    var info = ruleInfo.split('|');
    if ( info.length < 3 ) {
        $.lightBox({
            html: '信息不全，不能编辑呢！',
            buttons: []
        })
        return;//信息不全不能编辑
    }
    var qrIds = info[2];
    //TODO
    //根据已配置id获取qr信息
    //以下模拟请求复制给window.__chosedQR
    window.__chosedQR = {
        id: [2,5],
        desc: ['2003宇宙大爆炸','2099去可可西里看看海']
    };

    var editBox = $.lightBox({
        width: 975,
        boxID: 'addQrRule',
        title: '编辑规则',
        html: $('.addQrRule').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                console.log('do some');
            }
        }]
    });
    //编辑框内容跟新
    $(editBox).find('.js-rulename').val(info[1]);
    $('#addQrRuleDia .radio-wefeed').each(function(){
        if ( $(this).data('role') == 1 ) {
            $(this).siblings().removeClass('radio-current');
            $(this).addClass('radio-current');
            $('#addQrRuleDia .rule-main').children().hide().eq(1).show();
        }
    });
    //选择二维码事件
    if ( editType && editType == 'mllConcern' ) {
        screenQREvent();
    } else {
        choQREvent();
    }
    //图文模块添加事件
    // $('#addQrRuleDia').addSettingModual(MCHID);
    // $('#addQrRuleDia').bindNavEvent();
    // $.msgDemo($('#addQrRuleDia'),'111',{index:0,picMessages:***});

    $('.data-dia .radio-wefeed').on('click',function(){
        $('.data-dia .radio-wefeed').removeClass('radio-current');
        var index = $(this).attr('data-role');
        $('.data-dia .rule-main').children().hide().eq(index).show();
        $(this).addClass('radio-current');
    });
}
/**
 * [delKeywordFeedback 确认删除规则]
 * @param  {number} qrRuleId [规则id]
 */
function delKeywordFeedback(keywordFeedbackId){
    $.lightBox({
        width: 390,
        title: '删除确认',
        boxID: 'delKeyWordFB',
        html: '<p style="text-align:center;">是否确认删除？</p>',
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //待完善删除二维码规则
                // window.location.reload();
                var thisBtn = this;
                $.post("sys/reply/ntpl/deleteKwdRp?id=" + keywordFeedbackId , function (response) {
                    if (response.msg == "SUCCESS") {
                        var pageNum=$("input[name='page1']").val();
                        $("#js-page3-0-0").load("sys/reply/ntpl/searchKwdRp?page="+pageNum,function(){
                            $('#js-page3-0-0').find('.js-add-rule1').on('click',addRule);
                        });
                        /*$("#keyWordFeedbackForm").attr("action", "${action}");
                         $("#keyWordFeedbackForm").submit();*/
                        var thisLightBox = $(thisBtn)[0].lightBox,
                            thisLBdom = thisLightBox.dom;
                        $.lightBox.closeBox(thisLightBox);
                    } else {
                        alert("操作失败！");
                    }
                });
            }
        }]
    });
}

/**
 * [delKeywordFeedback 确认删除规则]
 * @param  {number} qrRuleId [规则id]
 */
function delParamAtt(paramAttId){
    $.lightBox({
        width: 390,
        title: '删除确认',
        boxID: 'delParamAtt',
        html: '<p style="text-align:center;">是否确认删除？</p>',
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                var that = this;
                $.lightBox.closeBox($(that)[0].lightBox);
                //TODO
                //待完善删除二维码规则
                $.post("sys/reply/ntpl/deleteParamAtt?id=" + paramAttId , function (response) {
                    if (response.msg == "SUCCESS") {
                        var pageNum=$("input[name='page']").val();
                        $("#js-page1-2-0").load("sys/reply/ntpl/searchParamAtt?page="+pageNum,function(){
                            $('#js-page1-2-0').find('.js-add-rule').on('click',addQrRule);
                        });
                        $.lightBox.closeBox($(that)[0].lightBox);
                    } else {
                        alert("操作失败！");
                    }
                });

            }
        }]
    });
}
/**
 * [delQrRule 确认删除规则]
 * @param  {number} qrRuleId [规则id]
 */
function delQrRule(qrRuleId){
    $.lightBox({
        width: 390,
        title: '删除确认',
        html: '<p style="text-align:center;">是否确认删除该回复设置？</p>',
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //待完善删除二维码规则
                // window.location.reload();
                var that = this;
                $.lightBox.closeBox($(that)[0].lightBox);
            }
        }]
    });
}

function choQREvent(){
    //更新按钮内容
    initChoedQR();

    $('.data-dia .js-cho-qr').on('click',function(){
        var that = this;
        var choQRbox = $.lightBox({
            width: 670,
            closeOther: false,
            curDom: $(that),
            boxID: 'chooseQr',
            title: '选择二维码',
            html: $('.chooseQRcode').html(),
            buttons: [{
                value: '确  认',
                className: 'bright-button',
                callbackFun: function(){
                    //更新隐藏DOM中选定二维码
                    initChoedQR();

                    $.lightBox.closeBox($(this)[0].lightBox);
                }
            }]
        });
        //添加事件
        
        //搜索规则
        $(choQRbox).find('.js-search-qr').on('click',function(){
            var input = $(this).siblings().val();
            var key = input.replace(/(^\s*)|(\s*$)/g, "");
            if( key.length ){
                searchQR(key);
            }
        });

        //已选择规则悬挂效果
        $(choQRbox).find('.js-qrlist-choed li').hover(function(){
            $(this).addClass('hover-li');
        },function(){
            $(this).removeClass('hover-li');
        });

        //点击删除已选择qr
        $(choQRbox).find('.js-del-choed').on('click',function(){
            delChoed(this);
        });
    });
}
/**
 * [searchQR 规则查询处理]
 * @param  {string} keywords [输入查询关键字]
 */
function searchQR(keywords){
    //TODO 
    //AJAX请求数据
    //根据输入查询数据
    //以下json为模拟数据
    var json = [{id: 25,desc: '2051周年清'},{id: 1,desc: '2051周年清'},{id: 2,desc: '2051周年清'}];

    var html = '';
    var checkids = ',' + window.__chosedQR.id.join(',') + ',';
    for(var k in json) {
        html += '<tr><td><span class="';
        if( checkids.indexOf(',' + json[k].id + ',') != -1 ) {
            html += 'checked ';
        }
        html += 'js-qr-check" data-role="' + json[k].id + '=' + json[k].desc + '"></span></td>'
            + '<td>' + json[k].id + '</td>'
            + '<td>' + json[k].desc + '</td>';
    }
    $('.data-dia .js-qrlist tbody').html(html);

    //check事件
    $('.data-dia .js-qr-check').on('click',function(){
        var className = $(this).attr('class');
        if( className.indexOf('checked') == -1 ){
            $(this).addClass('checked');
            chooseQR($(this).data('role'));
        }
    });
}
/**
 * [initChoedQR 初始跟新已选择二维码规则]
 * 初始dom为chooseQRcode
 */
function initChoedQR(){
    var pDomClass = ".chooseQRcode";
    if ( !window.__chosedQR.id.length ) {
        $(pDomClass).find('.js-qrlist-choed').html('');
    } else {
        var html = '',
            ids = window.__chosedQR.id,
            descs = window.__chosedQR.desc;
        for(var i in ids){
            html += '<li><span>' + ( 1 + Number(i) ) + '.' + descs[i] + '</span>' + '<span class="js-del-choed del-span" data-role="' + ids[i] + '"></span></li>';
        }
        $(pDomClass).find('.js-qrlist-choed').html(html);
    }
    //初始已选择qr按钮显示内容
    changeContent($('.js-cho-qr'),window.__chosedQR.id);
}
/**
 * [chooseQR 左边checkbox选择规则处理]
 * @param  {string} qrString [选择规则信息格式=> id=desc 的字符串]
 */
function chooseQR(qrString){
    var qr = qrString.split('=');
    var index = $('.data-dia .js-qrlist-choed').find('li').length;
    var html = '<li><span>' + ( index + 1 ) + '.' + qr[1] + '</span>'
        + '<span class="js-del-choed del-span" data-role="' + qr[0] + '"></span></li>';
    $('.data-dia .js-qrlist-choed').append(html);

    //添加规则
    //TODO
    //后台数据交互
    var thisDom = $('.data-dia .js-qrlist-choed li').eq(index);
    $(thisDom).hover(function(){
        $(this).addClass('hover-li');
    },function(){
        $(this).removeClass('hover-li');
    });
    $(thisDom).find('.js-del-choed').on('click',function(){
        delChoed(this);
    });
    //全局数据变更
    window.__chosedQR.id.push(Number(qr[0]));
    window.__chosedQR.desc.push(qr[1]);
}
/**
 * [delChoed 右边规则删除处理]
 * @param  {dom} obj [点击删除的dom对象，包括data-role属性记录待删除规则ID]
 */
function delChoed(obj){
    var delID = $(obj).data('role');
    $(obj).parent().remove();

    for(var m in window.__chosedQR.id){
        if ( window.__chosedQR.id[m] == delID) {
            
            //去掉多选框选中样式
            delCheckStyle(window.__chosedQR.id[m],window.__chosedQR.desc[m]);

            //更新全局变量中逸轩二维码的暂存
            window.__chosedQR.id.splice(m,1);
            window.__chosedQR.desc.splice(m,1);
        }
    }
}
/**
 * [delCheckStyle 去掉多选框选中样式]
 * @param  {string} delID   [删除二维码id]
 * @param  {string} delDesc [删除二维码描述]
 */
function delCheckStyle(delID,delDesc){
    var descStr = delID + '=' + delDesc;
    $('.data-dia .js-qr-check').each(function() {
        if ( $(this).data('role') == descStr ) {
            $(this).removeClass('checked');
        }
    })
}
/**
 * [changeContent 设置选择按钮展示值]
 * @param  {array} objs [显示选择二维码的dom]
 * @param  {array} ids  [已选定二维码id数组]
 */
function changeContent(objs,ids){
    var idString = '',chooseQR = '<i class="icon20-gray-add"></i>选择二维码';
    if ( ids && ids.length > 0 ) {
        idString = ids.join(',');
        chooseQR = '<input type="hidden" name="qrCode" value="' + idString +'" />' + idString;
    }
    $(objs).each(function(){
        $(this).html(chooseQR);
    })

}
/**
 * [screenQREvent 美乐乐有参关注选择二维码事件绑定，及选择二维码弹窗初始化]
 * @param  {Array} qrArrayVals [对象数组，存储当前编辑规则对应的已选择二维码，格式如下]
 * [{id: 25,desc: '2051周年清',belongRule:'双十一活动'},{id: 1,desc: '2056周年清',belongRule:'双十一活动'},{id: 2,desc: '2058周年清',belongRule:'双SHIER活动'}];
 * @return {array}             []
 */
function screenQREvent(qrArrayVals){
    //假定qrArrayVals值如下
    // qrArrayVals = [{id: 25,desc: '2051周年清',belongRule:'双十一活动'},{id: 1,desc: '2056周年清',belongRule:'双十一活动'},{id: 2,desc: '2058周年清',belongRule:'双SHIER活动'}];
    qrArrayVals = qrArrayVals || [];
    var resArrayVals = [];
    objDeepCopy(resArrayVals,qrArrayVals);
    var screenQrBox,screenQrBoxId;

    // 初始编辑弹框中已选id
    changeScreenedSpan($('.data-dia .js-cho-qr'),qrArrayVals);

    $('.data-dia .js-cho-qr').on('click',function(){
        var that = this;
        screenQrBox = $.lightBox({
            width: 870,
            closeOther: false,
            boxID: 'screenQr',
            title: '选择二维码',
            html: $('.screenQr').html(),
            buttons: [{
                value: '取消',
                className: 'dia-close cancel-button'
            },{
                value: '确认',
                className: 'bright-button js-screened-btn'
            }]
        });
        screenQrBoxId = $(screenQrBox).attr('id');
        //添加事件
        
        //输入框事件
        screenInputEvent();
        //筛选规则
        $(screenQrBox).find('.js-screenqr-btn').on('click',function(){
            //TODO
            //获取数据
            screenQr();
        });
        //筛选结果全选框事件
        screenCheckAllEvent();

        //确认选择规则
        $(screenQrBox).find('.js-screened-btn').on('click',function(){
            $.lightBox({
                boxID: 'qrScreenComfirm',
                title: '提示',
                width: '318',
                html: '<p style="text-align:center;">所选二维码都将使用新规则</p>',
                closeOther: false,
                buttons: [{
                    value: '取消',
                    className: 'dia-close cancel-button'
                },{
                    value: '确认',
                    className: 'bright-button',
                    callbackFun: function(){
                        console.log('dddddddddddddddd');
                        objDeepCopy(qrArrayVals,resArrayVals);
                        //TODO
                        //规则编辑弹窗交互，that为"选择二维码"页面按钮对象
                        changeScreenedSpan(that,resArrayVals);

                        //关闭弹窗
                        $.lightBox.closeBox($(this)[0].lightBox);
                        $(screenQrBox).find('.dia-close').click();
                    }
                }]
            })
            
        });

        //已选择规则的初始化展示
        if ( qrArrayVals || qrArrayVals.length ) {
            initScreenedQr(qrArrayVals);
        }
        
    });
    return qrArrayVals;
    /**
     * [initScreenedQr 内部函数初始选择二维码对话框的已选择内容]
     * @param  {Array} qrArray [已选择的二维码数组]
     */
    function initScreenedQr(qrArray) {
        var html='';
        for ( var k in qrArray ) {
            html += '<tr><td>' + qrArray[k].id + '</td>'
                + '<td>' + qrArray[k].desc + '</td>'
                + '<td>' + qrArray[k].belongRule + '</td>'
                + '<td width="25"><span class="js-del-screened del-span" data-id="' + qrArray[k].id + '"></span></td></tr>';
        }
        $(screenQrBox).find('.screen-show-list tbody').html(html);
        $(screenQrBox).find('.js-screened-num').text('已选中' + qrArray.length + '项');
        
        //已选择规则悬挂效果
        $(screenQrBox).find('.screen-show-list tbody tr').hover(function(){
            $(this).addClass('hover-tr');
        },function(){
            $(this).removeClass('hover-tr');
        });

        //点击删除已选择qr
        $(screenQrBox).find('.js-del-screened').on('click',function(){
            delScreenClick(this);
        });
    }
    /**
     * [delScreenClick 点击删除span删除已选择的二维码]
     * @param  {dom} obj [点击的span对象]
     */
    function delScreenClick(obj){
        var dataId = $(obj).data('id') + '|';
        var ptr = $(obj).parent().parent();
        var index = $(ptr).index('#'+screenQrBoxId + ' .screen-show-list tbody tr');
        $(ptr).remove();
        resArrayVals.splice(index,1);
        $(screenQrBox).find('.js-screened-num').text('已选中' + resArrayVals.length + '项');
        $(screenQrBox).find('.js-screen-check').each(function(){
            var data = $(this).data('role');
            if ( data.indexOf(dataId) == 0 ) {
                $(screenQrBox).find('.js-screen-check-all').removeClass('checked');
                $(this).removeClass('checked');
            }
        });
    }
    /**
     * [screenQr 选择二维码点击搜索，插入搜索内容及绑定check事件]
     */
    function screenQr(){
        //TODO
        //ajax请求数据
        var data = $(screenQrBox).find('.screen-search-box form').serialize();
        //TODO
        //是否添加表单验证
        //以下json模拟筛选返回
        var json = [{id: 1,desc: '45周年清',belongRule:'双十一活动'},{id: 22,desc: '20446周年清',belongRule:'双十一活动'}];
        
        $(screenQrBox).find('.js-screen-check-all').removeClass('checked');

        if ( json && json.length ) {
            $(screenQrBox).find('.js-screen-search-list').html(createScreenQrHtml(json));

            if ( $(screenQrBox).find('.checked').length == json.length ) {
                $(screenQrBox).find('.js-screen-check-all').addClass('checked');
            }
            
            //check事件
            checkScreenClick();
        }

    }
    /**
     * [createScreenQrHtml 根据json格式数据构造dom的html]
     * @param  {json} json [ajax请求筛选数据]
     * @return {string}      [返回构造筛选结果dom的字符串]
     */
    function createScreenQrHtml(json){
        var ids = getSreenIds(resArrayVals);
        var idString = ( ids && ids.length > 0 ) ? (',' + ids.join(',') + ',') : '';
        var html = '';
        for ( var k in json ) {
            if ( idString.indexOf(String(',' + json[k].id + ',')) != -1 ) {
                html += '<tr><td><span class="js-screen-check checked" data-role="' + json[k].id + '|' +json[k].desc + '|' + json[k].belongRule + '"></span></td>';
            } else {
                html += '<tr><td><span class="js-screen-check" data-role="' + json[k].id + '|' +json[k].desc + '|' + json[k].belongRule + '"></span></td>';
            }
            html += '<td>' + json[k].id + '</td>'
                + '<td>' + json[k].desc + '</td>'
                + '<td>' + json[k].belongRule + '</td>';
        }
        return html;
    }
    /**
     * [checkScreenClick 搜索结果的click事件]
     */
    function checkScreenClick(){
        $(screenQrBox).find('.js-screen-check').on('click',function(){
            var className = $(this).attr('class');
            var data = $(this).data('role');
            var datainfo = data.split('|');
            if( className.indexOf('checked') == -1 ){
                $(this).addClass('checked');
                screenCheckQr(datainfo);
            } else {
                var delId = datainfo[0];
                for ( var ind in resArrayVals ) {
                    if ( delId == resArrayVals[ind].id ) {
                        $(screenQrBox).find('.screen-show-list tbody tr').eq(ind).remove();
                        resArrayVals.splice(ind,1);
                        $(screenQrBox).find('.js-screened-num').text('已选中' + resArrayVals.length + '项');
                        break;
                    }
                }
                $(this).removeClass('checked');
            }
        });
    }
    /**
     * [screenCheckQr check选中，右边选择预览展示]
     * @param  {object} datainfo [选中数据的信息]
     */
    function screenCheckQr(datainfo){
        if ( datainfo && datainfo.length >= 3 ) {
            var html = '<tr><td>' + datainfo[0] + '</td>'
                + '<td>' + datainfo[1] + '</td>'
                + '<td>' + datainfo[2] + '</td>'
                + '<td width="25"><span class="js-del-screened del-span" data-id="' + datainfo[0] + '"></span></td></tr>';
            var appendTr = $(html);
            $(screenQrBox).find('.screen-show-list tbody').append(appendTr);
            resArrayVals.push({id: datainfo[0],desc: datainfo[1],belongRule:datainfo[2]});
            $(screenQrBox).find('.js-screened-num').text('已选中' + resArrayVals.length + '项');

            //悬挂样式
            $(appendTr).hover(function(){
                $(this).addClass('hover-tr');
            },function(){
                $(this).removeClass('hover-tr');
            });
            //点击删除已选择qr
            $(appendTr).find('.js-del-screened').on('click',function(){
                delScreenClick(this);
            });
        }
    }
    /**
     * [screenCheckAllEvent 筛选的全选事件操作]
     */
    function screenCheckAllEvent(){
        $(screenQrBox).find('.js-screen-check-all').on('click',function(){
            var className = $(this).attr('class');
            if ( className.indexOf('checked') == -1 ){
                $(this).addClass('checked');
                $(screenQrBox).find('.js-screen-check').each(function(){
                    if ( $(this).attr('class').indexOf('checked') == -1 ) {
                        $(this).click();
                    }
                });
            } else {
                $(this).removeClass('checked');
                $(screenQrBox).find('.js-screen-check').each(function(){
                    if ( $(this).attr('class').indexOf('checked') != -1 ) {
                        $(this).click();
                    }
                });
            }
        });
    }
    /**
     * [changeScreenedSpan 筛选结果和编辑面板的交互]
     * @param  {dom Array} objs     [选择二维码的按钮]
     * @param  {Array} resArray [已选择的二维码结果]
     */
    function changeScreenedSpan(objs,resArray){
        var idString = '',chooseQR = '<i class="icon20-gray-add"></i>选择二维码';
        var ids = getSreenIds(resArray);
        
        if ( ids && ids.length > 0 ) {
            idString = ids.join(',');
            chooseQR = '<input type="hidden" name="qrCode" value="' + idString +'" />' + idString;
        }
        $(objs).each(function(){
            $(this).html(chooseQR);
        })
    }
    /**
     * [getSreenIds 获取对象中的id数组]
     */
    function getSreenIds(resArray){
        var ids = [];
        for ( var kk in resArray ) {
            ids.push(resArray[kk].id);
        }
        return ids;
    }
    function screenInputEvent(){
        $(screenQrBox).find('.select-span input').on('input',function(){
            var input = $(this).val();
            var key = input.replace(/(^\s*)|(\s*$)/g, "");
            if ( key.length > 0 ) {
                //ajax请求
                //
                var json = ['成都','上海','北京','乌鲁木齐铁路局'];
                if ( json && json.length ) {
                    screenInputOnInput(this,json);
                    $(this).parent().addClass('cur-display-select-span');
                }
            }
        });
        $(screenQrBox).find('.select-span input').blur(function(){
            $(this).parent().removeClass('cur-display-select-span');
        });
        $(screenQrBox).find('.select-span .js-screen-search-select').hover(function(){
            $(this).addClass('cur-display-select');
        },function(){
            $(this).removeClass('cur-display-select');
        });
    }
    function screenInputOnInput(obj,json){
        var html = '';
        for ( var k in json ) {
            html += '<li data-role="' + json[k] + '">' + json[k] + '</li>';
        }
        var screenUl = $(obj).parent().find('.js-screen-search-select');
        $(screenUl).html(html);
        $(screenUl).find('li').on('click',function(){
            $(obj).val($(this).data('role'));
        });
    }
}
function addRule(){
    $.lightBox({
        width: 930,
        boxID: 'addRule',
        title: '添加规则',
        html: $('.addRule').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button',
        },{
            value: '确  定',
            className: 'bright-button',
            callbackFun: function() {
                //TODO
                //添加规则。数据交互
                //window.location.reload();
            }
        }]
    });
    // 绑定事件
    $('#addRuleDia .js-rulename').blur(function(){
        alert($(this).val());
        //TODO
    });
    $('#addRuleDia .js-keywords-tr').bindwordValid(30);
}
function editRule(id){
        var lightBD = $.lightBox({
            width: 930,
            boxID: 'addRule',
            title: '编辑规则',
            html: $('.addRule').html(),
            buttons: [{
                value: '取  消',
                className: 'dia-close cancel-button',
            },{
                value: '确  定',
                className: 'bright-button',
                callbackFun: function() {
                    //TODO
                    //编辑规则
                    //window.location.reload();
                }
            }]
        });
        //TODO
        //获取到规则数据
        //{ruleID:***,ruleName:***,textMsg:[{id:,desc:},...],imgMsg:[{id:,desc:,src:,}...]}
        //以下模拟数据
        
        var ruleInfo = {
                ruleID: 2356,
                ruleName: 'this_is_a_rule',
                ruleKeys: '互联网家居,美乐乐,运营',
                textMsg: [{id:235601,desc:'这是一条规则说明',msgType:'textmsg'},{id:235607,desc:'这是另一条规则说明',msgType:'textmsg'}],
                imgMsg: [{picMessages: [{datalist:5578,desc:'这是第三条规则说明',smallPicUrl:'http://www.szmll.com/sts/images/bacimg.png',largePicUrl:'http://www.szmll.com/sts/images/bacimg.png',msgType:'msg'},{datalist:5579,desc:'这是第er条规则说明',smallPicUrl:'http://www.szmll.com/sts/images/bacimg.png',largePicUrl:'http://www.szmll.com/sts/images/bacimg.png',msgType:'msg'}]},
                    {picMessages:[{datalist:5581,desc:'这是第si条规则说明',smallPicUrl:'http://www.szmll.com/sts/images/bacimg.png',largePicUrl:'http://www.szmll.com/sts/images/bacimg.png',msgType:'msg'},{datalist:5582,desc:'这是第w5条规则说明',smallPicUrl:'http://www.szmll.com/sts/images/bacimg.png',largePicUrl:'http://www.szmll.com/sts/images/bacimg.png',msgType:'msg'}]}]
            };

        var msgItemDOM;

        //弹框数据初始化并添加事件
        $('.data-dia .js-rulename').val(ruleInfo.ruleName);
        $('#addRuleDia .js-rulename').on('blur',function(){
                //TODO
        });

        $('.data-dia .js-keywords').text(ruleInfo.ruleKeys);
        $('#addRuleDia .js-keywords-tr').bindwordValid(30);

        for ( var ii in ruleInfo.textMsg ) {
            msgItemDOM = $(createMsgH(ruleInfo.textMsg[ii]));
            $('.data-dia .js-add-content').before(msgItemDOM);
            
            console.log(msgItemDOM);
        }
        for ( ii in ruleInfo.imgMsg ) {
            msgItemDOM = $(createMsgH(ruleInfo.imgMsg[ii].picMessages,'msg'));
            $('.data-dia .js-add-content').before(msgItemDOM);
            (function(index){
                var msgItemParam = {"index": index,picMessages: ruleInfo.imgMsg[index].picMessages};
                $(msgItemDOM).find('.js-editmsg-item').on('click',function(){
                    editMsgItem(this,msgItemParam);
                });
            })(ii);
        }
        // $('.data-dia .js-imgmsg-ids').val(imgMsgIds.join(','));
}
/**
 * [delMsgItem 删除规则配置消息]
 * @param  ruleId [规则ID]
 * @param  msgId  [消息ID]
 */
function delMsgItem(ruleId,msgId){
    $.lightBox({
        width: 390,
        title: '删除确认',
        boxID: 'delMsgItem',
        closeOther: false,
        html: '<p style="text-align:center;">是否确认删除该回复消息设置？</p>',
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //删除消息
                $.lightBox.closeBox($(this)[0].lightBox);
            }
        }]
    });
}
/**
 * [addTextMsg 添加文字消息]
 * @param {[dom节点]} obj [点击触发添加文字消息弹框的dom节点]
 */
function addTextMsg(obj){
    //验证是否多于5条
    var valid = validMsgItemNum();
    if ( !valid ) {
        return false;
    }

    $.lightBox({
        width: 585,
        closeOther: false,
        boxID: 'addTextMsg',
        title: '添加文字消息',
        html: $('.addTextMsg').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  定',
            className: 'bright-button',
            callbackFun: function(){
                var thisLightBox = $(this)[0].lightBox,
                    thisLBdom = thisLightBox.dom;
                var text = $(thisLBdom).find('.js-editorArea').text();
                if ( text.length > 0 ) {
                    var msginfo = {id:null,desc:text,msgType:'textmsg'};
                    var addMsgH = createMsgH(msginfo);
                    var pDiv = $.lightBox.getCurDia($(obj));
                    var len = $(pDiv).find('.js-showtextmsg-tr').length;
                    if ( len ) {
                        $(pDiv).find('.js-showtextmsg-tr').eq(len-1).after(addMsgH);
                    } else {
                        $(pDiv).find('.js-keywords-tr').after(addMsgH);
                    }
                    
                    $.lightBox.closeBox(thisLightBox);
                } else {
                    alert('输入内容非空！')
                }
            }
        }]
    });
    //添加字数验证
    $('#addTextMsgDia').bindwordValid();
}
function editTextMsg(obj,desc){
    var ptr = $(obj).parent().parent().parent().parent().parent();
    $.lightBox({
        width: 585,
        closeOther: false,
        boxID: 'addTextMsg',
        title: '编辑文字消息',
        html: $('.addTextMsg').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                var thisLightBox = $(this)[0].lightBox;
                var thisLBdom = thisLightBox.dom;
                var text = $(thisLBdom).find('.js-editorArea').text();
                if ( text.length ) {
                    $(ptr).find('.js-textmsg').text(text);
                    //更新全局
                    //index为当前文本消息于所有文本消息数组
                    var index = $(ptr).index('#addRuleDia .js-showmsg-tr');

                    $.lightBox.closeBox(thisLightBox);
                } else {
                    alert("输入内容非空！");
                }
                
            }
        }]
    });
    //TODO
    //是否关闭时提交
    $('#addTextMsgDia .js-editorArea').text($(ptr).find('.js-textmsg').text());
    //添加字数验证
    $('#addTextMsgDia').bindwordValid();
}
function addMsgItem(obj){
    //验证是否多于5条
    var valid = validMsgItemNum();
    if ( !valid ) {
        return false;
    }

    $.lightBox({
        width: 980,
        closeOther: false,
        boxID: 'addMsgItem',
        title: '添加图文消息',
        html: $('.addMsgItem').html(),
        buttons:[{
            value: '重  置',
            className: 'cancel-button',
            callbackFun: function(){
                $.msgDemo.clearAll($(this)[0].lightBox.dom);
            }
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function() {
                var thisLightBox = $(this)[0].lightBox;
                var checkeds = checkedMsg.picMessages || [];
                //图文添加后弹窗交互
                if ( checkeds.length ) {
                    var msgItemDOM = $(createMsgH(checkeds,'msg'));
                    $('.data-dia .js-add-content').before(msgItemDOM);
                    $(msgItemDOM).find('.js-editmsg-item').on('click',function(){
                        editMsgItem(this,checkedMsg);
                    });
                }
                //global变更
                
                $.lightBox.closeBox(thisLightBox);
            }
        }]
    });
    //绑定图文选择事件
    var checkedMsg = $.msgDemo($('#addMsgItemDia'),'111',{index:$('#addRuleDia .js-showmsg-tr').length,picMessages:[]});
}
function editMsgItem(obj,picMessages){
    $.lightBox({
        width: 980,
        closeOther: false,
        boxID: 'addMsgItem',
        title: '编辑图文消息',
        html: $('.addMsgItem').html(),
        buttons:[{
            value: '重  置',
            className: 'cancel-button',
            callbackFun: function(){
                $.msgDemo.clearAll($(this)[0].lightBox.dom);
            }
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function() {
                var thisLightBox = $(this)[0].lightBox;
                var checkeds = checkedMsg.picMessages || [];
                var pDia = $.lightBox.getCurDia($(obj));
                if ( checkeds && checkeds.length ){
                     var tr = $(pDia).find('.js-showmsg-tr').eq(checkedMsg.index);
                     $(tr).find('.msg-span img').attr('src',checkeds[0].smallPicUrl);
                     $(tr).find('.msg-span-intext').text(checkeds[0].msg);
                     $(tr).find('.js-editmsg-item').unbind('click').on('click',function(){
                        editMsgItem(this,checkedMsg);
                     });
                } else {
                    $(pDia).find('.js-showmsg-tr').eq(checkedMsg.index).remove();
                }
                // global更新
                $.lightBox.closeBox(thisLightBox);
            }
        }]

    });
    //绑定图文选择事件
    var checkedMsg = $.msgDemo($('#addMsgItemDia'),'111',picMessages);
}
/**
 * [validMsgItemNum 验证当前回复是否多余5条]
 * @return {boolean} [false：大于等于5]
 */
function validMsgItemNum(){
    var MAX_NUM = 5;
    //李敏TODO
    var now_msg_num = $('#addRuleDia .js-showmsg-tr').length+ $('#addRuleDia .js-showtextmsg-tr').length;// 图文+文字 最多不超过5条
    if ( MAX_NUM <= now_msg_num ) {
        $.lightBox({
            width: 320,
            boxID: 'warnInfo',
            closeOther: false,
            html: '<p style="text-align:center;font-size:16px;">最多上传5条</p>',
            buttons:[]
        });
        return false;
    } else {
        return true;
    }
}
function createMsgH(msgInfo,msgType){
    //TODO  接口获取图文消息数据
    //msgType 消息类型约定图文消息为msg，文字消息为textmsg
    // var msgInfo = {id:1,imgSrc:'http://www.szmll.com/sts/images/bacimg.png',desc:'2050国庆大欢乐'};

    var html = '';
    if ( msgType == 'msg' ) {
        if ( msgInfo[0] ) {
            msgInfo = msgInfo[0];
            html = '<tr class="js-showmsg-tr"><td></td><td>'
                + '<span class="msg-contain js-textmsg-contain">'
                    + '<span class="msg-span">'
                        + '<img src="' + msgInfo.imgSrc + '" width="100" height="100" />'
                        + '<span class="msg-span-intext">' + msgInfo.desc + '</span>'
                    + '</span>'
                    + '<dl><dt>图文消息</dt>'
                        + '<dd><a href="javascript:;" class="green-link js-editmsg-item">编辑</a></dd>'
                        + '<dd><a href="javascript:;" class="gray-link"  onclick="delMsgItem();">删除</a></dd>'
                    + '</dl>'
                + '</span></td></tr>';
        }
    } else {
        html = '<tr class="js-showtextmsg-tr"><td></td><td>'
            + '<span class="msg-contain js-textmsg-contain">'
                + '<span class="msg-span js-textmsg">' + msgInfo.desc + '</span>'
                + '<dl>'
                    + '<dt>文字消息</dt>'
                    + '<dd><a href="javascript:;" class="green-link" onclick="editTextMsg(this,\'' + msgInfo.desc + '\');">编辑</a></dd>'
                    + '<dd><a href="javascript:;" class="gray-link" onclick="delMsgItem();">删除</a></dd>'
                + '</dl>'
            + '</span></td></tr>';
    }
    return html;
}
/**
 * [delFeed 删除回复]
 */
function delFeed(){
    //TODO
    //待完善删除回复
}
/**
 * [confirmFeed 回复确认]
 */
function confirmFeed(){
    //TODO
}
/**
 * [delMessRpTextFeed 消息自动回复确认]
 */
function delMessRpTextFeed(){
    //TODO  根据商户ID删除
    var message = '您确认删除回复？';
    var editorArea=$('#js-page2-0-2').find('.js-editorArea').text();
    if(editorArea!="") {
    if (confirm(message)) {
        $.ajax({
            url:"sys/reply/ntpl/deleteMessage",
            async:false,
            dataType:"json",
            data:{"mchId":'111'},
            type:"POST",
            success:function(data){
                if(data.code==0){
                    alert('删除回复成功');
                    goPage(window._pageConf['2-0-2'],[{selector:'#js-page2-0-2 .js-editorArea',value:"",domType: 'text'},{selector:'#js-page2-0-2 .js-left-word',value:"600",domType: 'text'}]);

                }else{
                    alert('删除回复失败');
                }
            }
        });

    }
    } else{
        alert('无记录删除');
    }
}
/**
 * [confirmMessRpTextFeed 消息自动回复确认]
 */
function confirmMessRpTextFeed(){
    var pageId = $(this).data('page');
    if ( pageId ) {
        var editorArea=$('#js-page2-0-2').find('.js-editorArea').text();
        var text={};
        text.msg=editorArea;
        var picMessages=null;
        //TODO
        //提交回复内容
        var jsonStr={};
        jsonStr.replyType='2';
        jsonStr.morp='1';
        //商户Id暂时没有
        jsonStr.mchId='111';
        jsonStr.message=text;
        jsonStr.picMessages=picMessages;
        console.log(JSON.stringify(jsonStr));
        var message = '您确认保存文字消息？';
        if (confirm(message)) {
            $.ajax({
                url:"sys/reply/ntpl/insertMessage",
                async:false,
                dataType:"json",
                data:{"jsonStr":JSON.stringify(jsonStr)},
                type:"POST",
                success:function(data){
                    if(data.code==0){
                        alert('保存成功');
                    }else{
                        alert('保存失败')
                    }
                }
            });
        }
        /*//提交成功后提示
         $.lightBox({
         width: 290,
         title: '提示',
         html: '<p style="text-align:center;">'+mes+'</p>'
         });*/
    }
}

/**
 * [delMessRpTextFeed 关注自动回复-无参-文字消息删除回复]
 */
function delNoParamTextFeed(){
    //TODO  根据商户ID删除
    var message = '您确认删除回复？';
    var editorArea=$('#js-page1-1-2').find('.js-editorArea').text();
    if(editorArea!="") {
        if (confirm(message)) {
            $.ajax({
                url: "sys/reply/ntpl/deleteNoParamAtt",
                async: false,
                dataType: "json",
                data: {"mchId": '111'},
                type: "POST",
                success: function (data) {
                    //console.log(data);
                    if (data.code == 0) {
                        alert('删除回复成功');
                        location.reload();
                        goPage(window._pageConf['1-1-2'], [{
                            selector: '#js-page1-1-2 .js-left-word',
                            value: "",
                            domType: 'text'
                        }])
                    } else {
                        alert('删除回复失败')
                    }
                }
            });

        }
    }else{
        alert('无记录删除');
    }
}

/**
 * [delNoParamImgTextFeed 关注自动回复-无参-图文消息删除回复]
 */
function delNoParamImgTextFeed(){
    //TODO  根据商户ID删除
    var message = '您确认删除回复？';
    var msgA = $.msgDemo.getDemoChecked('#js-page1-1-1'),
        msgLen = msgA.length;
    if(msgLen!=0) {
        if (confirm(message)) {
            $.ajax({
                url: "sys/reply/ntpl/deleteNoParamAtt",
                async: false,
                dataType: "json",
                data: {"mchId": '111'},
                type: "POST",
                success: function (data) {
                    if (data.code == 0) {
                        alert('删除回复成功');
                        location.reload();
                        goPage(window._pageConf['1-1-1']);
                        //goPage(window._pageConf['1-1-2'],[{selector:'#js-page1-1-1 .js-left-word',value:"",domType: 'text'}])
                    } else {
                        alert('删除回复失败')
                    }
                }
            });

        }
    }else{
        alert('无记录删除');
    }
}

/**
 * [confirmNoParamImgTextFeed 关注自动回复 无参 图文确认]
 */
function confirmNoParamImgTextFeed(){
    var pageId = $(this).data('page');
    if ( pageId ) {
        var editorArea=$('#js-page1-1-2').find('.js-editorArea').text();
        //TODO
        //图文消息赋值  提交回复内容
        var jsonStr={};
        var picMessage = $('#js-page1-1-1 .demo_list > div');
        var menuPicM =[];
        for(var i=0,ii=picMessage.length;i<ii;i++){
            var picObj = {};
            var oPicMessage = $(picMessage[i]);
            picObj.largePicUrl = $(picMessage[i]).find('p').parent().data('largeurl');
            picObj.smallPicUrl = oPicMessage.data('smallurl');
            //alert($(picMessage[i]).find('p').parent().data('smallurl'));
            picObj.msg = oPicMessage.data('msg');
            picObj.datalist=oPicMessage.data('list');
            picObj.url = oPicMessage.data('srcul');
            picObj.title = $(picMessage[i]).find('p').html();
            menuPicM.push(picObj);
        }
        if(menuPicM.length!=0) {
            jsonStr.replyType = '1';
            jsonStr.morp = '0';
            //商户Id暂时没有
            jsonStr.mchId = '111';
            jsonStr.message = null;
            jsonStr.picMessage = menuPicM;
            /*
             console.log(JSON.stringify(jsonStr));
             console.log(jsonStr.picMessage);*/
            var message = '您确认保存文字消息？';
            if (confirm(message)) {
                $.ajax({
                    url: "sys/reply/ntpl/insertNoParamAtt",
                    async: false,
                    dataType: "json",
                    data: {"jsonStr": JSON.stringify(jsonStr)},
                    type: "POST",
                    success: function (data) {
                        if (data.code == 0) {
                            location.reload();
                            alert('保存成功');
                        } else {
                            alert('保存失败')
                        }
                    }
                });
            }
        }else{
            alert('请选择图文消息后点击保存');
        }
    }
}


/**
 * [delMessageImgTextFeed 消息自动回复-图文消息删除回复]
 */
function delMessageImgTextFeed(){
    //TODO  根据商户ID删除
    var message = '您确认删除回复？';
    var msgA = $.msgDemo.getDemoChecked('#js-page2-0-1'),
        msgLen = msgA.length;
    if(msgLen!=0) {
        if (confirm(message)) {
            $.ajax({
                url: "sys/reply/ntpl/deleteMessage",
                async: false,
                dataType: "json",
                data: {"mchId": '111'},
                type: "POST",
                success: function (data) {
                    if (data.code == 0) {
                        alert('删除回复成功');
                        location.reload();
                        goPage(window._pageConf['2-0-0']);
                        //goPage(window._pageConf['1-1-2'],[{selector:'#js-page1-1-1 .js-left-word',value:"",domType: 'text'}])
                    } else {
                        alert('删除回复失败')
                    }
                }
            });

        }
    }else{
        alert('无记录删除');
    }
}

/**
 * [confirmMessageImgTextFeed 消息自动回复 图文确认]
 */
function confirmMessageImgTextFeed(){
    var pageId = $(this).data('page');
    if ( pageId ) {
       // var editorArea=$('#js-page1-1-2').find('.js-editorArea').text();
        //TODO
        //图文消息赋值  提交回复内容
        var jsonStr={};
        var picMessage = $('#js-page2-0-1 .demo_list > div');
        var menuPicM =[];
        for(var i=0,ii=picMessage.length;i<ii;i++){
            var picObj = {};
            var oPicMessage = $(picMessage[i]);
            picObj.largePicUrl = $(picMessage[i]).find('p').parent().data('largeurl');
            picObj.smallPicUrl = oPicMessage.data('smallurl');
            picObj.msg = oPicMessage.data('msg');
            picObj.url = oPicMessage.data('srcul');
            picObj.datalist=oPicMessage.data('list');
            picObj.title = $(picMessage[i]).find('p').html();
            menuPicM.push(picObj);
        }
        if(menuPicM.length!=0) {
            jsonStr.replyType = '2';
            //0图文 1文字
            jsonStr.morp = '0';
            //商户Id暂时没有
            jsonStr.mchId = '111';
            jsonStr.message = null;
            jsonStr.picMessages = menuPicM;
            var message = '您确认保存图文消息？';
            if (confirm(message)) {
                $.ajax({
                    url: "sys/reply/ntpl/insertMessage",
                    async: false,
                    dataType: "json",
                    data: {"jsonStr": JSON.stringify(jsonStr)},
                    type: "POST",
                    success: function (data) {
                        if (data.code == 0) {
                            alert('保存成功');
                        } else {
                            alert('保存失败')
                        }
                    }
                });
            }
        }else{
            alert('请选择图文消息后点击保存');
        }
    }
}
/**
 * [confirmMessRpTextFeed 消息自动回复 文字确认]
 */
function confirmNoParamTextFeed(){
    var pageId = $(this).data('page');
    if ( pageId ) {
        var editorArea=$('#js-page1-1-2').find('.js-editorArea').text();
        var text={};
        text.msg=editorArea;
        var picMessage=null;
        //TODO
        //提交回复内容
        var jsonStr={};
        jsonStr.replyType='2';
        jsonStr.morp='1';
        //商户Id暂时没有
        jsonStr.mchId='111';
        jsonStr.message=text;
        jsonStr.picMessage=picMessage;
        //console.log(JSON.stringify(jsonStr));
        var message = '您确认保存文字消息？';
        if (confirm(message)) {
            $.ajax({
                url:"sys/reply/ntpl/insertNoParamAtt",
                async:false,
                dataType:"json",
                data:{"jsonStr":JSON.stringify(jsonStr)},
                type:"POST",
                success:function(data){
                    if(data.code==0){
                        alert('保存成功');
                    }else{
                        alert('保存失败')
                    }
                }
            });
        }
        /*//提交成功后提示
         $.lightBox({
         width: 290,
         title: '提示',
         html: '<p style="text-align:center;">'+mes+'</p>'
         });*/
    }
}