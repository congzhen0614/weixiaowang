<template>
	<div class="dead-line">
		<div class="left">
			<slot name="time"></slot>
			<span class="text">离报名截止还有</span>
		</div>
		<div class="right">
			<span class="month num">{{ remainMonth }}</span> 月
			<span class="day num">{{ remainDay }}</span> 日
			<span class="hour num">{{ remainHour }}</span> 时
			<span class="minute num">{{ remainMinute }}</span> 分
			<span class="seconds num">{{ remainSeconds }}</span> 秒
		</div>
	</div>
</template>

<script>
	export default {
		props: ['joinEndTime'],
		data () {
			return {
				// 现在时间
				nowTime: new Date().getTime(),
				interVal: 1
			}
		},
		computed: {
			remainTime () {
				let time = this.joinEndTime
				if (!time) {
					return 0
				}
				time = time.replace(/-/g, '/')
				return new Date(time).getTime() - this.nowTime > 0 ? new Date(time).getTime() - this.nowTime : 0
			},
			// 剩余月份
			remainMonth () {
				let num = Math.floor(this.remainTime / (1000 * 60 * 60 * 24 * 30))
				return num > 9 ? num : '0' + num
			},
			// 剩余天数
			remainDay () {
				let num = Math.floor((this.remainTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
				return num > 9 ? num : '0' + num
			},
			// 剩余小时
			remainHour () {
				let num = Math.floor((this.remainTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				return num > 9 ? num : '0' + num
			},
			// 剩余分钟
			remainMinute () {
				let num = Math.floor((this.remainTime % (1000 * 60 * 60)) / (1000 * 60))
				return num > 9 ? num : '0' + num
			},
			// 剩余秒数
			remainSeconds () {
				let num = Math.floor((this.remainTime % (1000 * 60)) / (1000))
				return num > 9 ? num : '0' + num
			}
		},
		mounted () {
			// console.log(this.joinEndTime)
			this.interVal = setInterval(() => {
				if (this.remainTime > 0) {
					this.nowTime += 1000
				} else {
					clearInterval(this.interVal)
				}
			}, 1000)
		},
		methods: {
		}
	}
</script>