seajs.config({
	alias: {
		"jquery": 'lib/jquery/1.10.2/jquery',
		"underscore": 'lib/underscore/1.5.2/underscore',
		"Backbone": 'lib/backbone/1.2.1/backbone',
		"modernizr": 'lib/modernizr/2.8.3/modernizr',
		"handlebars": 'lib/handlebars/handlebars-v3.0.1',
		"editor": 'lib/editor/kindeditor',
		"editor.zh_CN": 'lib/editor/zh_CN',
		"artTemplate": 'lib/artTemplate/artTemplate',
		"colorpicker":"/thsft/js/lib/jqwidgets/jqx.color.picker.js",

		"WdatePicker": 'ui/My97DatePicker/WdatePicker',
		"ztree": 'ui/jquery.ztree/jquery.ztree.all-3.5.js',
		"echarts": 'ui/echarts/echarts-all.js',
		'artDialog': 'ui/artDialog/dialog',
		'jquery.validate': 'ui/jquery.validate/jquery.validate',
		'jquery.ui.widget': 'ui/fileUpload/jquery_ui-widget',
		'jquery.frame.transport': 'ui/fileUpload/jquery_iframe-transport',
		'jquery.fileupload': 'ui/fileUpload/jquery_fileupload',
		'thsPage': 'ui/thsPage/thsPage',
		'autoComplete': 'ui/autoComplete/autoComplete',
		'autocompelete':'app/autocompelete',
		"pagination-with-styles":"app/pagination-with-styles",
		"laypage":"app/laypage",

		'jquery.ui.slider': 'ui/slider/jquery-ui.slider.min',
		'jquery.autocomplete': 'ui/jquery.autocomplete/jquery.autocomplete',
		'jquery.timeago': 'ui/jquery.timeago/jquery.timeago',
		'jquery.qrcode': 'ui/qrcode/jquery.qrcode',
		'owlCarousel': 'ui/owl.carousel/owl.carousel',
		'cropper': 'ui/cropper/cropper',
		'ifind.dialog': 'ui/ifind/src/ifind.dialog',
		'ifind.validate': 'ui/ifind/src/ifind.validate',
		'ifind.select': 'ui/ifind/src/ifind.select',
		'ifind.tab': 'ui/ifind/src/ifind.tab',
		'ifind.upload.preview': 'ui/ifind/src/ifind.upload.preview',
		'ifind.word.count': 'ui/ifind/src/ifind.word.count',
		'ifind.datatable': 'ui/ifind/src/ifind.datatable',
        
        'perTool':'app/perTool',
        'fundTool':'app/fundTool',
        'jquery-ui': 'ui/jquery-ui/jquery-ui',
        'home-dict':'app/home-dict',
        'jqMask':"app/jqMask"
	},
	preload:['jquery','echarts'],
	base: '/thsft/js/IStrategy/',
	map:[
		[/^(.*\/app\/.*\.(?:css|js))(?:.*)$/i,'$1?2016032301']
	]
})
