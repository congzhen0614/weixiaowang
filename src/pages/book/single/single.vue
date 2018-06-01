<template>
	<div class="book-single-page">
		<v-top :scrollTop="scrollTop" :title="title"></v-top>
		<!-- scroll 外层容器 -->
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<!-- 内容 -->
			<section ref="content" class="content">
				<v-list :bookList="bookList" :type="type" :id="id"></v-list>
        <!-- 猜你喜欢 -->
        <v-recommend v-if="recommendList && recommendList.length" :recommendList="recommendList"></v-recommend>
			</section>
		</div>
	</div>
</template>

<script>
	import top from './top/top'
	import list from '../list/list'
	import recommend from '../recommend/recommend'
  import BScroll from 'better-scroll'
	export default {
		name: 'book-single-page',
		data () {
			return {
				// 屏幕高度
				winHeight: window.innerHeight - 50 + 'px',
				scroller: '',
				scrollTop: 0,
				// 标题
				title: this.$route.query.title,
				// 请求参数
				id: this.$route.query.id,
				// 类型
				type: this.$route.query.type,
				// 图书数据
				bookList: [],
				// 推荐数据
				recommendList: [],
        refresh: true
			}
		},
		computed: {
			// 服务器请求路径
			ajaxUrl () {
				let id = this.id
				return this.type === '1' ? `/book/fixedColumn/${id}/open` : `/book/dynamicColumn/${id}/open`
			}
		},
		components: {
			'v-top': top,
			'v-list': list,
			'v-recommend': recommend
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {
		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.getAjax(this.ajaxUrl).then(res => {
					this.bookList = this.bookList.concat(res.data.pageInfo.list)
					this.recommendList = res.data.recommendList
          // 更新scroll
          this.$nextTick(() => {
            setTimeout(()=> {
              this.initBetterScroll()
            },500)
          })
				}, err => {
					console.log(err)
				})
			},
      // 刷新 scroll
      initBetterScroll () {
        if (!this.scroller) {
          this.scroller = new BScroll(this.$refs.wrapper, {
            probeType: 3,
            click: true
          })
          // 监听滚动条
          this.listenScroll()
        } else {
          this.scroller.refresh()
        }
        // 可以加载更多
        this.loadMore = true
      },
      // 监听滚动条
      listenScroll () {
        this.scroller.on('scroll', (pos) => {
          this.scrollTop = -pos.y
          if (this.scrollTop > this.$refs.content.offsetHeight - window.innerHeight && this.refresh) {
            this.refresh = false
            this.initBetterScroll()
          }
        })
      },
      // 滑动到上次位置
      backToLastTop () {
        if (this.scroller) {
          this.scroller.scrollTo(0, 300, 300)
        }
      },
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './single.styl'
</style>
