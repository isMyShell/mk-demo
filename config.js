import { Toast, Notification, Modal } from 'mk-component'
import { fetch } from 'mk-utils'
import './mock.js' //脱离后台测试，启用mock，否则这行注释

import apiDoc from './apiDoc'

var _options = {}


//配置fetch
fetch.config({
	mock: true, //脱离后台测试，启用mock，否则这行注释

	//fetch支持切面扩展（before,after），对restful api统一做返回值或者异常处理
	after: (response, url) => {
		if (response.result) {
			if (response.token) {
				fetch.config({ token: response.token })
			}
			return response.value
		}
		else {
			Toast.error(response.error.message)
			throw { url, response }
		}
	}
})

function config(options) {
	Object.assign(_options, options)

	//对应用进行配置，key会被转换为'^<key>$'跟app名称正则匹配
	_options.apps && _options.apps.config({
		//'*': { webapi } //正式网站应该有一个完整webapi对象，提供所有web请求函数
		'mk-app-root': {
			startAppName: 'mk-app-login'
		},
		'mk-app-login': {
			goAfterLogin: {
				appName: 'mk-app-portal'
			}
		},
		'mk-app-portal': {
			menu: [{
				key: '1',
				name: '首页',
				appName: 'mk-app-home',
				isDefault: true
			}, {
				key: '2',
				name: 'apps',
				isExpand: true,
				children: [{
					key: '201',
					name: '表格',
					children: [{
						key: '20101',
						name: '列表',
						appName: 'mk-app-person-list'
					}, {
						key: '20102',
						name: '复杂表格',
						appName: 'mk-app-complex-table'
					}, {
						key: '20103',
						name: '可编辑表格',
						appName: 'mk-app-editable-table'
					}, {
						key: '20104',
						name: '树表',
						appName: 'mk-app-tree-table'
					}, {
						key: '20105',
						name: '存货列表',
						appName: 'mk-app-stock-list'
					},{
						key: '20106',
						name: '报表',
						appName: 'mk-app-report'
					}]

				}, {
					key: '202',
					name: '卡片',
					children: [{
						key: '20201',
						name: '卡片',
						appName: 'mk-app-person-card'
					}, {
						key: '20202',
						name: '单据',
						appName: 'mk-app-voucher'
					},{
						key: '20203',
						name: '存货卡片',
						appName: 'mk-app-stock-card'
					}]

				}, {
					key: '203',
					name: '图形',
					children: [{
						key: '20301',
						name: '柱状图',
						appName: 'mk-app-bar-graph'
					}]
				}, {
					key: '208',
					name: '其他',
					children: [{
						key: '20801',
						name: '版本时间轴',
						appName: 'mk-app-versions'
					}, {
						key: '20802',
						name: '商品列表',
						appName: 'mk-app-product-list'
					}]
				}, {
					key: '209',
					name: '开发工具',
					children: [{
						key: '20901',
						name: '开发工具整体',
						appName: 'mk-app-devtools'
					}, {
						key: '20902',
						name: '元数据设计',
						appName: 'mk-app-meta-design'
					}, {
						key: '20903',
						name: 'webapi文档',
						appName: 'mk-app-apidoc'
					}, {
						key: '20904',
						name: 'action监控',
						appName: 'mk-app-trace-action'
					}, {
						key: '20905',
						name: '元数据、状态修改',
						appName: 'mk-app-hot-modify-app'
					}]

				}]
			}]
		},
		'mk-app-apidoc': {
			apis: apiDoc
		}
	})

	_options.targetDomId = 'app' //react render到目标dom
	_options.startAppName = 'mk-app-root' //启动app名，需要根据实际情况配置

	_options.toast = Toast //轻提示使用组件，mk-meta-engine使用
	_options.notification = Notification //通知组件
	_options.modal = Modal //模式弹窗组件
	return _options
}

config.current = _options

export default config