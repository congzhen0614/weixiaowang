<template>
	<div class="content-body">
		<div class="swiper">
			<div v-if="info.imgs && info.imgs.length" @click="viewPictures()" class="img-logo">
				<img src="./img_logo.png">
				<span>{{ info.imgs ? info.imgs.length : 0 }}</span>
			</div>
			<img :src="info.logo">
			<!-- <v-banner :listImg="listImg"></v-banner> -->
		<!-- 商品名称 -->
	</div>
		<div class="detail">
			<div class="name">
				{{ info.title }}
			</div>
			<slot name="desc"></slot>
		</div>
		<dead-line :activity="true" :joinEndTime="info.join_end_time">
			<img slot="time" src="./time.png">
		</dead-line>
		<!-- 其他信息 -->
		<div class="other" v-if="!activity">
			<div class="freight">
				<label class="desc">运费:</label>
				<span class="price">免运费</span>
			</div>
			<div v-if="sales" class="sales">
				<label class="desc">全网销量:</label>
				<span class="num">{{ sales }}</span>
			</div>
		</div>
		<split></split>
		<!-- 销量 -->
		<div v-if="sales" class="links">
			<div class="underline list-item-arrow" @click="showInfo(0)">
				<a>目录</a>
			</div>
			<div class="output-info list-item-arrow" @click="showInfo(1)">
				<a>出版信息</a>
			</div>
		</div>
		<!-- 活动 -->
		<div v-if="activity" class="links activity">
			<div class="underline time item">
				<div class="img">
					<img src="./time.png">
				</div>
				<slot name="timeText"></slot>
				<span class="text">{{ info.begin_time }}至{{ info.end_time }}</span>
			</div>
			<div class="underline item list-item-arrow">
				<div class="img">
					<img src="./price.png">
				</div>
				<span class="text">票价￥{{ info.min_fee }}~{{ info.max_fee }}</span>
			</div>
			<div class="underline item list-item-arrow">
				<div class="img">
					<img src="./persons.png">
				</div>
				<span class="text has-apply">已报名{{ info.applyed_quantity }}人</span>
				<span class="text">/限{{ info.apply_limit_quantity }}人报名</span>
			</div>
			<div class="location item">
				<div class="img">
					<img src="./location.png">
				</div>
				<div class="text">{{ info.province_id }}{{ info.city_id }}{{ info.region_id }}{{ info.address }}</div>
				<div class="img map">
					<img src="./map.png">
				</div>
			</div>
		</div>
		<split v-if="activity && info.business_list && info.business_list.length"></split>
		<!-- 主办方等公司列表 -->
		<ul v-if="info.business_list && info.business_list.length" class="company-list">
			<li v-for="(item ,index) in info.business_list" class="list-item underline">
				<div class="img">
					<img :src="item.logo">
				</div>
				<div class="content">
					<div class="title">
						<span class="name">{{ item.name }}</span>
						<label class="desc">{{ getbusinessDesc(item.role) }}</label>
						<!-- <span class="button" :class="{ active: item.attention }"><span v-show="item.attention">已</span>关注</span> -->
					</div>
					<div class="text">
						{{ item.note }}
					</div>
				</div>
			</li>
		</ul>
		<div v-if="activity" class="activity-detail">
			<v-title :title="productDetailTitle"></v-title>
			<div v-html="info.webhtml || info.html" class="content"></div>
			<v-title :title="attentionTitle"></v-title>
			<div class="content">
				{{ info.attention }}
			</div>
		</div>
		<split v-if="sales"></split>
	</div>
</template>

<script>
	import split from '../../common/split/split.vue'
	import title from '../../common/split/title.vue'
	import deadline from './deadline'
	import banner from './banner'
	export default {
		name: 'content',
		props: ['sales', 'activity', 'info', 'type'],
		data () {
			return {
				// 活动详情
				productDetailTitle: this.type + '详情',
				// 注意事项
				attentionTitle: '注意事项'
			}
		},
		computed: {
			
		},
		mounted () {
		},
		components: {
			split,
			// 'v-banner': banner,
			'v-title': title,
			'dead-line': deadline,
		},
		methods: {
			showInfo (index) {
				this.$router.push({
					path: '/info',
					query: {
						index: index
					}
				})
			},
			// 获取主办方信息
			getbusinessDesc (role) {
				// console.log(this.info.join_end_time)
				return role === 1 ? '主办方' : role === 2 ? '协助方' : role === 3 ? '参与方' : role === 4 ? '赞助方' : '未知'
			},
			// 查看图片
			viewPictures () {
				this.$router.push({
					path: '/view',
					query: {
						imgs: JSON.stringify(this.info.imgs)
					}
				})
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import 'content.styl'
</style>