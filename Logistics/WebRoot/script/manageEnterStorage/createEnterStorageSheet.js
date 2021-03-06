
var _win_create_MESS = null;
var _price_create_MESS = { amountQuote:0.0,weightQuote:0.0,volumeQuote:0.0 };
var _count_create_MESS = { amount:0,weight:0,volume:0};
function onCreateEnterStorageSheet()
{
	if(null == _win_create_MESS)
	{
	    createWindow_create_MESS();
	    STORE_CUSTOMER_ALL_LOAD();
		STORE_GOODS_LOAD();
	}else
	{
		resetPage_create_MESS();
	}
	_win_create_MESS.setPagePosition(GET_WIN_X(_win_create_MESS.width),GET_WIN_Y_M(600));
    _win_create_MESS.show();
}

function createWindow_create_MESS()
{
	_win_create_MESS = new Ext.Window({
        title: '新建入库单',
        iconCls: 'commonCreateSheet',
        width: 800,
        autoHeight: true,
        closeAction: 'hide',
        maximizable: false,
        resizable: false,
        items: _formPanel_createSheet_MESS,
        listeners: LISTENER_WIN_MOVE
    });
}
var _record_MESS = Ext.data.Record.create([
    {name: 'itemID'},
    {name: 'itemName'},
    {name: 'itemNumber'},
    {name: 'batch'},
    {name: 'unitWeight'},
    {name: 'unitVolume'},
    {name: 'unit'},
    {name: 'remarks'},
    {name: 'label'},
    {name: 'isSN'},
    {name: 'expectedAmount'},
    {name: 'amount'}
]);
var _ds_createSheet_MESS = new Ext.data.Store({
	reader : new Ext.data.JsonReader({
				root : 'resultMapList'
			}, 
			_record_MESS
		)
});

	var _sm_createSheet_MESS = new Ext.grid.CheckboxSelectionModel();
	var _cm_createSheet_MESS = new Ext.grid.ColumnModel({
			columns:[
				new Ext.grid.RowNumberer(),
				_sm_createSheet_MESS,
			{
				width:60,
				dataIndex : 'itemID',
				header : '物料编号'	
			},{
				width:160,
				dataIndex : 'itemName',
				header : '物料名称'
			},{
				width:80,
				dataIndex : 'itemNumber',
				header : '物料代码'
			},{
				width:60,
				dataIndex : 'batch',
				header : '批次'
			},{
				width:90,
				dataIndex : 'expectedAmount',
				header : '应收数量(编辑)',
				editor : {
					xtype: 'numberfield',
					allowNegative: false,
					value: 1,
					allowDecimals : false,
					maxValue: MAX_DOUBLE,
					minValue: 1,
					allowBlank: false,
					selectOnFocus: true
				}
			},{
				width:90,
				dataIndex : 'amount',
				header : '实收数量(编辑)',
				editor : {
					xtype: 'numberfield',
					allowNegative: false,
					value: 1,
					allowDecimals : false,
					maxValue: MAX_DOUBLE,
					minValue: 1,
					allowBlank: false,
					selectOnFocus: true
				}
			},{
				width:60,
				dataIndex : 'unit',
				header : '计量单位'	
			},{
				width:60,
				dataIndex : 'unitWeight',
				header : '单位重量'	
			},{
				width:60,
				dataIndex : 'unitVolume',
				header : '单位体积'
			},{
				dataIndex : 'label',
				header : '商品检验标志是否OK(编辑)',
				width: 155,
				editor : 
				{
			       xtype : 'combo',
			       store : STORE_YN,
			       valueField : 'value',
			       displayField : 'value',
			       mode : 'local',
			       forceSelection : true,
			       selectOnFocus:true,
			       typeAhead: false,
			       editable : false,
			       triggerAction : 'all',
			       allowBlank : false
				}
			},{
				dataIndex : 'isSN',
				header : '是否扫描SN(编辑)',
				width: 110,
				editor : 
				{
			       xtype : 'combo',
			       store : STORE_YN,
			       valueField : 'value',
			       displayField : 'value',
			       mode : 'local',
			       forceSelection : true,
			       selectOnFocus:true,
			       typeAhead: false,
			       editable : false,
			       triggerAction : 'all',
			       allowBlank : false
				}
			},{
				dataIndex : 'remarks',
				header : '备注(编辑)',
				editor : {
					xtype: 'textfield',
					value: '',
					regex: REGEX_COMMON_S,
					regexText: REGEX_COMMON_S_TEXT,
					allowBlank: true,
					selectOnFocus: true
				}
			}],
			defaults: {
				sortable: true,
				menuDisabled: true
			}
	});
	
	var _grid_createSheet_MESS = new Ext.grid.EditorGridPanel({
				sm : _sm_createSheet_MESS,
				cm : _cm_createSheet_MESS,
				ds : _ds_createSheet_MESS,
				style: 'margin:0px 0px 2px 0px',
				stripeRows : true,
				loadMask : true,
				border : true,
				frame: false,
				height : 200,
				clicksToEdit : 1,
				autoScroll: true,
				width: 641,
				draggable : false,
				fieldLabel: '物料列表',
				viewConfig : {
					forceFit:false
				},
				tbar : new Ext.Toolbar({
					border: true,
					items : [
					{
						text : "移除",
						iconCls: 'commonDelete',
						handler: function(){
							GRID_LIST_DELETE(_grid_createSheet_MESS);
						}
					},'-',
					{
						xtype: 'tbspacer',
						width: 5
					},
					{
						xtype: 'tbfill'
					},
					{
						xtype: 'label',
						id:'title_price_create_MESS',
						text: '数量报价：'
					},
					{
						xtype: 'tbspacer',
						width: 5
					},
					{
						xtype: 'numberfield',
						allowNegative: false,
						value: 0,
						name: 'XXX',
						id: 'price_create_MESS',
						maxValue: MAX_DOUBLE,
						allowBlank: false,
						selectOnFocus: true,
						width: 60
					},'-',
					{
						xtype: 'tbspacer',
						width: 5
					},
					{
						xtype: 'label',
						text: '物料选择：'
					},
					{
						xtype: 'tbspacer',
						width: 5
					},
					new Ext.form.ComboBox({
				       xtype : 'combo',
				       store : STORE_GOODS,
				       id: 'goods_select_create_MESS',
				       valueField : 'itemID',
				       displayField : 'jointName',
				       mode : 'local',
				       forceSelection : true,
				       hiddenName : 'XXX',
				       editable : false,
				       selectOnFocus:true,
				       typeAhead: false,
				       editable : true,
				       triggerAction : 'all',
				       allowBlank : true,
				       fieldLabel : '物料选择',
				       width:　200,
				       listeners: {
				       		beforequery: LISTENER_COMBOBOX_BEFOREQUERY,
				       		select: function(combo, record, index){
				       			
				       		}
				       }
					}),
					{
						xtype: 'tbspacer',
						width: 5
					},
					{
						xtype: 'tbspacer'
					},
					{
						text : "添加",
						iconCls: 'commonAdd',
						id :'btn_add_goods_create_MESS',
						handler:function(){
							var goodSelect = _grid_createSheet_MESS.getTopToolbar().findById('goods_select_create_MESS');
							var btnAdd = _grid_createSheet_MESS.getTopToolbar().findById('btn_add_goods_create_MESS');
							if(_grid_createSheet_MESS.getStore().getCount()>= MAX_STORAGE_GOODS_COUNT)
							{
								Ext.Msg.show({
									title : '操作提示',
									msg : '物料种类不能超过['+MAX_STORAGE_GOODS_COUNT.toString()+']种！',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.WARNING
								});
								return;
							}
							var field = ['itemID'];
							var value = [goodSelect.getValue()];
							if(goodSelect.getValue()=='') return;
							if(ISINLIST(_grid_createSheet_MESS,field,value))
							{//判断列表中是否有相同的值
								Ext.Msg.show({
									title : '操作提示',
									msg : '列表中已经存在编号为['+goodSelect.getValue()+']的物料！',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.WARNING
								});
								goodSelect.reset();
								return;
							}
							btnAdd.disable();
							Ext.Ajax.request({
									url: 'Item.queryOne.action',
									method: 'POST',
									success : function(response,options){
										var result = Ext.util.JSON.decode(response.responseText);
										if(!result.success){
											AJAX_FAILURE_CALLBACK(result,'物料信息获取失败！');	
											btnAdd.enable();
										}else{
											var record = new _record_MESS({
											    itemID: result.data['itemDTO.itemID'],
											    itemName:result.data['itemDTO.name'],
											    itemNumber:result.data['itemDTO.number'],
											    batch:result.data['itemDTO.batch'],
											    unitWeight: result.data['itemDTO.unitWeight'],
											    unitVolume: result.data['itemDTO.unitVolume'],
											    unit: result.data['itemDTO.unit'],
											    remarks: result.data['itemDTO.remarks'],
											    expectedAmount: 1,
											    label:'是',
											    isSN:'否',
											    amount: 1
											});
											_grid_createSheet_MESS.getStore().add(record);
											goodSelect.reset();
											btnAdd.enable();
										}
									},
									failure: function(response,options){
										AJAX_SERVER_FAILURE_CALLBACK(response,options,'物料信息获取错误!');
										btnAdd.enable();
									},
									params:{ 'itemDTO.itemID': goodSelect.getValue() }
							});//Ajax
						}
					}]
				}),
				bbar: new Ext.Toolbar({
					border: true,
					frame: true,
					items : [
					{
						xtype: 'tbspacer',
						width: 10
					},
					{
						xtype: 'label',
						text: '数量合计：'
					},{
						xtype: 'tbspacer'
					},
					{
						xtype: 'tbtext',
						text: '0',
						id: 'allCount_create_MESS',
						width: 50
					},
					{
						xtype: 'tbspacer',
						width: 5
					},
					{
						xtype: 'label',
						text: '重量合计：'
					},{
						xtype: 'tbspacer'
					},
					{
						xtype: 'tbtext',
						text: '0',
						id: 'allWeight_create_MESS',
						width: 50
					},
					{
						xtype: 'tbspacer',
						width: 5
					},
					{
						xtype: 'label',
						text: '体积合计：'
					},{
						xtype: 'tbspacer'
					},
					{
						xtype: 'tbtext',
						text: '0',
						id: 'allVolume_create_MESS',
						width: 50
					},
					{
						xtype: 'tbspacer',
						width: 5
					},
					{
						xtype: 'tbfill'
					},'-',
					{
						xtype: 'tbspacer',
						width: 5
					},
					{
						xtype: 'label',
						text: '计费方式：'
					},
					{
						xtype: 'tbspacer',
						width: 5
					},
					new Ext.form.ComboBox({
					       store : STORE_TRANS_CHARGE_MODE,
					       valueField : 'value',
					       displayField : 'value',
					       mode : 'local',
					       id: 'mode_create_MESS',
					       hiddenName:'simdto.chargeMode',
					       forceSelection : true,
					       editable : false,
					       triggerAction : 'all',
					       allowBlank : false,
					       fieldLabel : '计费方式',
					       value: '数量',
					       width:　100,
					       listeners: {
					       		select: function(combo, record, index){
					       			var title = _grid_createSheet_MESS.getTopToolbar().findById('title_price_create_MESS');
					       			var price = _grid_createSheet_MESS.getTopToolbar().findById('price_create_MESS');
					       			if(record.get('value')=='数量')
					       			{
					       				title.setText('数量报价：');
					       				price.setValue(_price_create_MESS.amountQuote);
					       			}
					       			else if(record.get('value')=='重量(KG)')
					       			{
					       				title.setText('重量报价：');
					       				price.setValue(_price_create_MESS.weightQuote);
					       			}
					       			else
					       			{
					       				title.setText('体积报价：');
					       				price.setValue(_price_create_MESS.volumeQuote);
					       			}
					       		}
					       }
					}),
					{
						xtype: 'tbspacer',
						width: 5
					},
					{
						text : "&nbsp;&nbsp;计算入库费",
						iconCls: 'calculator',
						handler: function(){
							getInStorageFee_create_MESS();
						}
					},
					{
						xtype: 'tbspacer',
						width: 5
					}]
				})
			});


var _formPanel_createSheet_MESS = new Ext.FormPanel({
	
	layout: 'form',
	style: 'margin:0px',
	frame: true,
	labelAlign: 'right',
	bodyStyle: PADDING,
	autoHeight: true,
	autoScoll: true,
	labelWidth: 70,
	border: false,
	buttonAlign: 'center',
	
	buttons:[
	{
		text: '保存',
		iconCls: 'commonSave',
		handler: function()
		{
			if(_formPanel_createSheet_MESS.getForm().isValid())
			{
				var params = getGridParams_create_MESS();
				_formPanel_createSheet_MESS.getForm().submit({
					url: 'StockinManifest.insert.action',
					waitTitle:"保存数据",
					waitMsg: '正在保存...',
					success:function(form,action){
						_grid_MESS.getStore().reload();
					},
					failure: function(form,action){
						FORM_FAILURE_CALLBACK(form,action,"数据保存失败");
					},
					params: params
				});
			}
		}
	},{
		text: '重置',
		iconCls: 'commonReset',
		handler: function(){
			resetPage_create_MESS();
		}
	},{
		text: '取消',
		iconCls: 'commonCancel',
		handler: function(){ _win_create_MESS.hide(); }
	}],
	
	items:[
		{//Row 1
			layout: 'column',
			border: false,
			items: [
			{//Column 1
				columnWidth: '0.4',
				layout: 'form',
				border: false,
				items: [new Ext.form.ComboBox({
					       xtype : 'combo',
					       store : STORE_STORAGE,
					       valueField : 'warehouseID',
					       displayField : 'name',
					       mode : 'local',
					       forceSelection : true,
					       hiddenName : 'simdto.warehouseID',
					       editable : true,
					       typeAhead : false,
					       triggerAction : 'all',
					       allowBlank : false,
					       selectOnFocus:true,
					       fieldLabel : '库存地',
					       width:　200,
					       listeners: {
					       		beforequery: LISTENER_COMBOBOX_BEFOREQUERY
					       }
					})]
			},
			{//Column 2
				columnWidth: '0.3',
				layout: 'form',
				border: false,
				items:[
				{
					xtype: 'datefield',
					fieldLabel: '入库日期',
					format: 'Y-m-d',
					name: 'simdto.dateStockin',
					value: new Date().dateFormat('Y-m-d'),
					allowBlank: false,
					editable: false,
					width: TEXTFIELDWIDTH
				}]
			},
			{//Column 3
				columnWidth: '0.3',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'textfield',
					fieldLabel: '客户单号',
					width: TEXTFIELDWIDTH,
					name: 'simdto.customerNumber',
					regex: REGEX_COMMON_S,
					regexText: REGEX_COMMON_S_TEXT
				}]
			}]
		},
		{//Row 2
			layout: 'column',
			border: false,
			items: [
			{//Column 0
				columnWidth: '0.4',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'label',
					fieldLabel: ' ',
					labelSeparator: ' ',
					width: TEXTFIELDWIDTH
				}]
			},
			{//Column 1
				columnWidth: '0.3',
				layout: 'form',
				border: false,
				items: [new Ext.form.ComboBox({
					       xtype : 'combo',
					       store : STORE_COSTCENTER,
					       valueField : 'costCenterID',
					       displayField : 'costCenterID',
					       mode : 'local',
					       selectOnFocus:true,
						   typeAhead: false,
					       forceSelection : true,
					       hiddenName : 'simdto.sellCenter',
					       editable : true,
					       triggerAction : 'all',
					       allowBlank : false,
					       fieldLabel : '销售中心',
					       width:　TEXTFIELDWIDTH,
					       listeners: {
					       		beforequery: LISTENER_COMBOBOX_BEFOREQUERY
					       }
					})]
			},
			{//Column 2
				columnWidth: '0.3',
				layout: 'form',
				border: false,
				items: [new Ext.form.ComboBox({
					       xtype : 'combo',
					       store : STORE_COSTCENTER,
					       valueField : 'costCenterID',
					       displayField : 'costCenterID',
					       mode : 'local',
					       selectOnFocus:true,
						   typeAhead: false,
					       forceSelection : true,
					       hiddenName : 'simdto.costCenter',
					       editable : true,
					       triggerAction : 'all',
					       allowBlank : false,
					       fieldLabel : '成本中心',
					       width:　TEXTFIELDWIDTH,
					       listeners: {
					       		beforequery: LISTENER_COMBOBOX_BEFOREQUERY
					       }
					})]
			}]
		},
		{//Row 3
			layout: 'column',
			border: false,
			items: [
			{//Column 1
				columnWidth: '0.4',
				layout: 'form',
				border: false,
				items: new Ext.form.ComboBox({
				       xtype : 'combo',
				       store : STORE_CUSTOMER_ALL,
				       valueField : 'customerID',
				       displayField : 'jointName',
				       mode : 'local',
				       forceSelection : true,
				       hiddenName : 'simdto.customerID',
				       selectOnFocus:true,
				       typeAhead: false,
				       editable : true,
				       triggerAction : 'all',
				       allowBlank : false,
				       fieldLabel : '客户名称',
				       width:　200,
				       listeners: {
				       		beforequery: LISTENER_COMBOBOX_BEFOREQUERY,
				       		select: function(combo, record, index){
				       			Ext.Ajax.request({
									url: 'StockinManifest.queryCustomerQuote.action',
									method: 'POST',
									success : function(response,options){
										var result = Ext.util.JSON.decode(response.responseText);
										if(!result.success){
											AJAX_FAILURE_CALLBACK(result,'物料报价获取失败！');	
										}else{
											_price_create_MESS.amountQuote = result.data.amountQuote;
											_price_create_MESS.weightQuote = result.data.weightQuote;
											_price_create_MESS.volumeQuote = result.data.volumeQuote;
											var title = _grid_createSheet_MESS.getTopToolbar().findById('title_price_create_MESS');
							       			var price = _grid_createSheet_MESS.getTopToolbar().findById('price_create_MESS');
							       			var mode = _grid_createSheet_MESS.getBottomToolbar().findById('mode_create_MESS').getValue();
							       			if(mode=='数量')
							       			{
							       				title.setText('数量报价：');
							       				price.setValue(_price_create_MESS.amountQuote);
							       			}
							       			else if(mode=='重量(KG)')
							       			{
							       				title.setText('重量报价：');
							       				price.setValue(_price_create_MESS.weightQuote);
							       			}
							       			else
							       			{
							       				title.setText('体积报价：');
							       				price.setValue(_price_create_MESS.volumeQuote);
							       			}
										}
									},
									failure: function(response,options){
										AJAX_SERVER_FAILURE_CALLBACK(response,options,'物料报价获取错误！');
									},
									params:{ 'cusdto.customerID':record.get('customerID') }
								});//Ajax
				       		}
				       }
				})
			},
			{//Column 2
				columnWidth: '0.3',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'textfield',
					fieldLabel: '送货人',
					width: TEXTFIELDWIDTH,
					name: 'simdto.deliveryPerson',
					regex: REGEX_COMMON_S,
					regexText: REGEX_COMMON_S_TEXT
				}]
			},
			{//Column 3
				columnWidth: '0.3',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'textfield',
					fieldLabel: '送货人电话',
					width: TEXTFIELDWIDTH,
					name: 'simdto.deliveryPhone',
					regex: REGEX_COMMON_S,
					regexText: REGEX_COMMON_S_TEXT
				}]
			}]
		},
		{//Row +
			layout: 'column',
			border: false,
			items: [{//Column 1
				columnWidth: '1.0',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'textfield',
					fieldLabel: '提货地址',
					regex: REGEX_COMMON_M,
					regexText: REGEX_COMMON_M_TEXT,
					name: 'simdto.takingAddress',
					width: 641
				}]
			}]
		},
		{//Row 3
			layout: 'column',
			border: false,
			items: [
			{//Column 1
				columnWidth: '0.4',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'textfield',
					fieldLabel: '启运单位',
					width: 200,
					name: 'simdto.originAgent',
					regex: REGEX_COMMON_S,
					regexText: REGEX_COMMON_S_TEXT
				}]
			},
			{//Column 2
				columnWidth: '0.3',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'textfield',
					fieldLabel: '启运人',
					width: TEXTFIELDWIDTH,
					name: 'simdto.originPerson',
					regex: REGEX_COMMON_S,
					regexText: REGEX_COMMON_S_TEXT
				}]
			},
			{//Column 3
				columnWidth: '0.3',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'textfield',
					fieldLabel: '启运人电话',
					width: TEXTFIELDWIDTH,
					name: 'simdto.originPhone',
					regex: REGEX_COMMON_S,
					regexText: REGEX_COMMON_S_TEXT
				}]
			}]
		},
		{//Row +
			layout: 'column',
			border: false,
			items: [{//Column 1
				columnWidth: '1.0',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'textfield',
					fieldLabel: '启运地址',
					regex: REGEX_COMMON_M,
					regexText: REGEX_COMMON_M_TEXT,
					name: 'simdto.originAddress',
					width: 641
				}]
			}]
		},
		{//Row 3-Grid
			layout: 'column',
			border: false,
			items: [{//Column 1
				columnWidth: '1.0',
				layout: 'form',
				border: false,
				items: _grid_createSheet_MESS
			}]
		},
		{//Row 3+
			layout: 'column',
			border: false,
			items: [
			{//Column 1
				columnWidth: '0.25',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'numberfield',
					allowNegative: false,
					value: 0,
					maxValue: MAX_DOUBLE,
					allowBlank: false,
					id: 'stockinFee_create_MESS',
					selectOnFocus: true,
					name: 'simdto.stockinFee',
					fieldLabel: '入库费',
					width: 80
				}]
			},
			{//Column 2
				columnWidth: '0.75',
				layout: 'form',
				border: false,
				items:[
				{
					xtype: 'numberfield',
					allowNegative: false,
					value: 0,
					maxValue: MAX_DOUBLE,
					allowBlank: false,
					selectOnFocus: true,
					name: 'simdto.loadUnloadCost',
					fieldLabel: '装卸费',
					width: 80
				}]
			}]
		},
		{//Row 4
			layout: 'column',
			border: false,
			items: [{//Column 1
				columnWidth: '1.0',
				layout: 'form',
				border: false,
				items: [
				{
					xtype: 'textfield',
					fieldLabel: '备注信息',
					regex: REGEX_COMMON_M,
					regexText: REGEX_COMMON_M_TEXT,
					name: 'simdto.remarks',
					width: 641
				}]
			}]
		}]
});

function getGridParams_create_MESS()
{
	params = {};
	var store = _grid_createSheet_MESS.getStore();
	var count = store.getCount();
	for(var i=0; i<count; i++)
	{
		var record = store.getAt(i);
		params['itemList['+i.toString()+'].itemID']=record.get('itemID');
		params['itemList['+i.toString()+'].amount']=record.get('amount');
		params['itemList['+i.toString()+'].expectedAmount']=record.get('expectedAmount');
		params['itemList['+i.toString()+'].label']=record.get('label');
		params['itemList['+i.toString()+'].isSN']=record.get('isSN');
		params['itemList['+i.toString()+'].remarks']=record.get('remarks');
		params['itemList['+i.toString()+'].unit']=record.get('unit');
	}
	
	params['simdto.sumAmount'] = _count_create_MESS.amount;
	params['simdto.sumWeight'] = _count_create_MESS.weight;
	params['simdto.sumVolume'] = _count_create_MESS.volume;
	
	return params;
}

function getInStorageFee_create_MESS()
{
	var store = _grid_createSheet_MESS.getStore();
	if(store.getCount()<=0) return;
	var allCount = 0; var allWeight = 0; var allVolume = 0;
	for(var i=0; i<store.getCount();i++)
	{
		var record = store.getAt(i);
		allCount += record.get('amount');
		allWeight += record.get('unitWeight') * record.get('amount');
		allVolume += record.get('unitVolume') * record.get('amount');
	}
	allCount=CHANGEDECIMAL(allCount);
	allVolume=CHANGEDECIMAL(allVolume);
	allWeight=CHANGEDECIMAL(allWeight);
	_count_create_MESS.amount = allCount;
	_count_create_MESS.volume = allVolume;
	_count_create_MESS.weight = allWeight;
	_grid_createSheet_MESS.getBottomToolbar().findById('allCount_create_MESS').setText(allCount.toString());
	_grid_createSheet_MESS.getBottomToolbar().findById('allWeight_create_MESS').setText(allWeight.toString());
	_grid_createSheet_MESS.getBottomToolbar().findById('allVolume_create_MESS').setText(allVolume.toString());
	
	var price = _grid_createSheet_MESS.getTopToolbar().findById('price_create_MESS').getValue();
	var money = 0;
	var mode = _grid_createSheet_MESS.getBottomToolbar().findById('mode_create_MESS').getValue();
	if(mode=='数量')
	{
		money = allCount * price;
	}
	else if(mode=='重量(KG)')
	{
		money = allWeight * price;
	}
	else
	{
		money = allVolume * price;
	}
	
	_formPanel_createSheet_MESS.findById('stockinFee_create_MESS').setValue(money);
	
}

function resetPage_create_MESS()
{
	_formPanel_createSheet_MESS.getForm().reset();
	_ds_createSheet_MESS.removeAll();
	_grid_createSheet_MESS.getBottomToolbar().findById('mode_create_MESS').setValue('数量');
	_grid_createSheet_MESS.getTopToolbar().findById('title_price_create_MESS').setText('数量报价：');
	_grid_createSheet_MESS.getTopToolbar().findById('price_create_MESS').setValue(0);
	_grid_createSheet_MESS.getBottomToolbar().findById('allCount_create_MESS').setText('0');
	_grid_createSheet_MESS.getBottomToolbar().findById('allWeight_create_MESS').setText('0');
	_grid_createSheet_MESS.getBottomToolbar().findById('allVolume_create_MESS').setText('0');
	_price_create_MESS.amountQuote = 0;
	_price_create_MESS.weightQuote = 0;
	_price_create_MESS.volumeQuote = 0;
	_count_create_MESS.amount = 0;
	_count_create_MESS.volume = 0;
	_count_create_MESS.weight = 0;
}
