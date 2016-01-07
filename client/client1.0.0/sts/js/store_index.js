$(document).on('click','.js-add-clerk',function(){
	$.lightBox({
        width: 680,
        boxID: 'add-clerk',
        title: '新增店员',
        html: $('.add-clerk').html(),
        buttons: [{
        	value: '取消',
            className: 'dia-close cancel-button',
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //添加规则方法
            }
        }]
    });
}).on('click','.js-check-clerk',function(){
	$.lightBox({
        width: 480,
        boxID: 'check-info-ma',
        title: '店员基本信息',
        html: $('.check-info-ma').html(),
        buttons: [{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //添加规则方法
            }
        }]
    });
}).on('click','.js-batch-clerk',function(){
	$.lightBox({
        width: 450,
        boxID: 'add-batch-clerk',
        title: '批量新增店员',
        html: $('.add-batch-clerk').html(),
        buttons: [{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //添加规则方法
            }
        }]
    });
}).on('click','.js-edit-clerk',function(){
	
	$.lightBox({
        width: 680,
        boxID: 'edit-clerk',
        title: '编辑店员',
        html: $('.edit-clerk').html(),
        buttons: [{
        	value: '取消',
            className: 'dia-close cancel-button',
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //添加规则方法
            }
        }]
    });
}).on('click','.js-clerk-psw',function(){
	$.lightBox({
        width: 400,
        boxID: 'clerk-psw',
        title: '修改密码',
        html: $('.clerk-psw').html(),
        buttons: [{
        	value: '取消',
            className: 'dia-close cancel-button',
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //添加规则方法
            }
        }]
    });
}).on('click','.js-stop-clerk',function(){
	$.lightBox({
        width: 400,
        boxID: 'stop-clerk',
        title: '确认信息',
        html: $('.stop-clerk').html(),
        buttons: [{
        	value: '取消',
            className: 'dia-close cancel-button',
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //添加规则方法
            }
        }]
    });
})
