<template>
	<div class="book-detail-detail">
		<section class="detail-tab-box">
			<ul class="detail-tab">
				<li v-for="(showText, index) in detailShowItems" class="tab-item" @click="changeDetailTabIndex(index)">
					<p class="text" :class="{ active: detailTabIndex === index }">{{ showText }}</p>
				</li>
			</ul>
		</section>
		<!-- scroll 外层容器 -->
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<!-- 内容 -->
			<section ref="content" class="content">
				<section v-show="detailTabIndex === 0" class="detail-content">
					<div class="content" ref="detailContent" v-html="item.html"></div>
				</section>
				<section v-show="detailTabIndex === 1" class="detail-chapter">
					<div class="content" ref="chapterContent" v-html="item.chapter"></div>
				</section>
				<section v-show="detailTabIndex === 2" class="detail-publish">
					<div class="content" ref="publishContent">
						<div class="publish">
							<ul class="info-list">
								<li class="list-item">
									<div class="name">
										{{ item.name }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										ISBN
									</div>
									<div class="value">
										{{ item.issn }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										作者
									</div>
									<div class="value">
										{{ item.author }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										出版社
									</div>
									<div class="value">
										{{ item.press }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										出版时间
									</div>
									<div class="value">
										{{ item.pubdate }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										版次
									</div>
									<div class="value">
										{{ item.banci }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										印次
									</div>
									<div class="value">
										{{ item.yinci }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										页数
									</div>
									<div class="value">
										{{ item.pages }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										字数
									</div>
									<div class="value">
										{{ item.words }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										开本
									</div>
									<div class="value">
										{{ item.kaiben }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										纸张
									</div>
									<div class="value">
										{{ item.zhizhang }}
									</div>
								</li>
								<li class="list-item">
									<div class="name">
										包装
									</div>
									<div v-if="item.hardcover === '0'" class="value">
										平装
									</div>
									<div v-if="item.hardcover === '1'" class="value">
										精装
									</div>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</section>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'book-detail-page',
		props: {
			item: {
				type: Object
			}
		},
		data () {
			return {
				detailTabIndex: 0,
				// 屏幕高度
				// winHeight: window.innerHeight - 50 - 55 + 'px',
				winHeight: window.innerHeight - 50 - 55 - 35 + 'px',
				// 视图数组
				detailShowContentList: ['v-product', 'v-detail', 'v-comment'],
				// 标题
				detailShowItems: ['商品详情', '内容目录', '出版信息']
			}
		},
		computed: {
		},
		components: {
		},
		created () {
		},
		mounted () {
		},
		methods: {
			// 切换
			changeDetailTabIndex (index) {
				this.detailTabIndex = index
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './detail.styl'
</style>
