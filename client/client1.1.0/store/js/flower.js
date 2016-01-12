
$(document).on('click','.js-flw-allot',function(){
	$.lightBox({
        width: 680,
        boxID: 'flw_allot',
        title: '店员分配',
        html: $('.flwAllot').html(),
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
    var setting = {
		edit: {
			enable: false,
			showRemoveBtn: false,
			showRenameBtn: false
		},
		data: {
			simpleData: {
				enable: true
			}
		}
	};

	var zNodes =[
		{ id:1, pId:0, name:"美乐乐总部", open:true},
		{ id:11, pId:1, name:"成都地区体验店"},
		{ id:12, pId:1, name:"成都地区体验店", open:true},
		{ id:121, pId:12, name:"成都地区体验店1"},
		{ id:1211, pId:121, name:"成都地区体验店1-1"},
		{ id:122, pId:12, name:"成都地区体验店1"},
		{ id:123, pId:12, name:"成都地区体验店1"},
		{ id:13, pId:1, name:"成都地区体验店", open:true},
		{ id:131, pId:13, name:"成都地区体验店1"},
		{ id:132, pId:13, name:"成都地区体验店1"},
		{ id:133, pId:13, name:"成都地区体验店1"},
		{ id:2, pId:0, name:"美乐乐总部", open:true},
		{ id:21, pId:2, name:"成都地区体验店"},
	];
	
	$.fn.zTree.init($("#flw_allotDia #store-list"), setting, zNodes);
});
	
	
/***请选择粉丝提示****/
function showTips()
{
	$.lightBox({
		width: 350,
		boxID: 'flw_tips',
		title: '提示信息',
		html: $('.flowTips').html(),
		buttons: [{
		    value: '确  认',
		    className: 'bright-button',
		    callbackFun: function(){
		        //TODO
		        //添加规则方法
		    }
		}]
	})
};

//showTips();

var allot = {
	init: function(){
		selectAll('checkAll','fl-ids');
		function selectAll(runButton , selectClass){
			selectClass = selectClass || 'se-ids';
			var targetCheckbox = $('.'+selectClass);
			$('#'+runButton).on('click',function(e){
			    var btnStatus = this.checked;
			    targetCheckbox.prop({checked : btnStatus});
			});
		}
	},
	add: function(){
		var selectIds = [];
		$(document).on('click','.fl-ids',function(){
			var status = $(this).prop('checked');
			var value = $(this).val();
			if(status)
			{
				selectIds.push(value);
			}else {
				var searchKey = selectIds.indexOf(value);
				if(searchKey != -1)
				{
					selectIds.splice(searchKey,1);
				}
			}
			console.log(selectIds);
		}).on('click','#checkAll',function(){
			var status  = $(this).prop('checked');
			$('.fl-ids').each(function(key , val){
                var value = $(this).val();
                if(status){
                    var selKey = selectIds.indexOf(value);
                    if(selKey == -1)
                    {
                        selectIds.push(value);
                    }
                } else {
                    selectIds.splice(selectIds.indexOf(value), 1);
                }
            });
            console.log(selectIds);
		});
		
		/***翻页 渲染当前页已选中checkbox***/
		function currPageChecked(){
			for(var i = 0 ; i < $('.fl-ids').length ; i++)
			{
				var currIds = $($('.fl-ids')[i]).val();
				console.log(selectIds.indexOf(currIds))
				if(selectIds.indexOf(currIds) != -1)
				{
					$('#'+currIds).prop({checked:'checked'});
				}
			}
		};
	}
}

allot.init();
allot.add();





