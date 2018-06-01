<template>
	<div class="address">
		<div class="title">
			添加收货地址
			<div class="reminder">
				请仔细填写如下表单!
			</div>
		</div>
		<ul class="form-list">
			<li class="list-item">
				<label class="alias">收货人:</label>
				<input type="text" name="name" placeholder="请输入收货人">
			</li>
			<li class="list-item">
				<label class="alias">手机号码:</label>
				<input type="text" name="tel" placeholder="请输入手机号码">
			</li>
			<li class="list-item">
				<label class="alias">所在地区:</label>
				<input type="hidden" name="area" id="value1" readonly="readonly">
				<input id="demo1" v-model="area" type="text" readonly="readonly" name="input_area" placeholder="请选择地区"/>
			</li>
			<li class="list-item">
				<label class="alias">详细地址:</label>
				<input type="text" name="address" placeholder="请输入详细地址">
			</li>
		</ul>
		<div class="submit">
			<a href="#">提交信息</a>
		</div>
	</div>
</template>

<script>
	var LAreaData1 = [{
		'id': '2',
		'name': '一级',
		'child': [{
			'id': '21',
			'name': '二级1',
			'child': [{
				'id': '211',
				'name': '三级1'
			}, {
				'id': '212',
				'name': '三级2'
			}, {
				'id': '213',
				'name': '三级3'
			}]
		}, {
			'id': '22',
			'name': '二级2'
		}, {
			'id': '23',
			'name': '二级3'
		}, {
			'id': '21',
			'name': '二级1',
			'child': [{
				'id': '211',
				'name': '三级1'
			}, {
				'id': '212',
				'name': '三级2'
			}, {
				'id': '213',
				'name': '三级3'
			}]
		}, {
			'id': '22',
			'name': '二级2'
		}, {
			'id': '23',
			'name': '二级3'
		}, {
			'id': '21',
			'name': '二级1',
			'child': [{
				'id': '211',
				'name': '三级1'
			}, {
				'id': '212',
				'name': '三级2'
			}, {
				'id': '213',
				'name': '三级3'
			}, {
				'id': '211',
				'name': '三级1'
			}, {
				'id': '212',
				'name': '三级2'
			}, {
				'id': '213',
				'name': '三级3'
			}, {
				'id': '211',
				'name': '三级1'
			}, {
				'id': '212',
				'name': '三级2'
			}, {
				'id': '213',
				'name': '三级3'
			}, {
				'id': '211',
				'name': '三级1'
			}, {
				'id': '212',
				'name': '三级2'
			}, {
				'id': '213',
				'name': '三级3'
			}]
		}, {
			'id': '22',
			'name': '二级2'
		}, {
			'id': '23',
			'name': '二级3'
		}, {
			'id': '21',
			'name': '二级1',
			'child': [{
				'id': '211',
				'name': '三级1'
			}, {
				'id': '212',
				'name': '三级2'
			}, {
				'id': '213',
				'name': '三级3'
			}]
		}, {
			'id': '22',
			'name': '二级2'
		}, {
			'id': '23',
			'name': '二级3'
		}, {
			'id': '21',
			'name': '二级1',
			'child': [{
				'id': '211',
				'name': '三级1'
			}, {
				'id': '212',
				'name': '三级2'
			}, {
				'id': '213',
				'name': '三级3'
			}]
		}, {
			'id': '22',
			'name': '二级2'
		}, {
			'id': '23',
			'name': '二级3'
		}]
	}]
	// var LAreaData1 = [{
	// 	'id': '2',
	// 	'name': '一级'
	// }, {
	// 	'id': '2',
	// 	'name': '一级'
	// }]
	export default {
		name: 'address',
		data () {
			return {
				area: ''
			}
		},
		watch: {
			area (newVal, oldVal) {
				console.log(newVal)
			}
		},
		mounted () {
			let area = new window.LArea()
			area.init({
				'trigger': '#demo1', // 触发选择控件的文本框，同时选择完毕后name属性输出到该位置
				'valueTo': '#value1', // 选择完毕后id属性输出到该位置
				'keys': { id: 'id', name: 'name' }, // 绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
				// 'type': 1, // 数据源类型
				'level': 3,
				'data': LAreaData1 // 数据源
			})
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './address.styl'
</style>