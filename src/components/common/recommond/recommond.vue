<template>
	<div class="recommond">
		<div class="title">
      <div class="line"></div>
      <div class="text">猜您喜欢</div>
      <div class="line"></div>
    </div>
    <ul class="book-list">
    	<li v-for="(item, index) in imgList" class="item">
    		<div class="left book">
	    		<div class="img">
	    			<img :src="item.left">
	    		</div>
	    		<div class="desc">
	    			<p class="name">
		    			图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称111
		    		</p>
		    		<div class="price">
		    			<span class="new">￥180.00</span>
		    			<span class="old">￥280.00</span>
		    		</div>
	    		</div>
    		</div>
    		<div class="split"></div>
    		<div :class="{noBg: !item.right}" class="right book">
	    		<div v-if="item.right" class="img">
	    			<img :src="item.right">
	    		</div>
	    		<div v-if="item.right" class="desc">
	    			<p class="name">
		    			图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称图书名称
		    		</p>
		    		<div class="price">
		    			<span class="new">￥180.00</span>
		    			<span class="old">￥280.00</span>
		    		</div>
	    		</div>
    		</div>
    	</li>
    </ul>
	</div>
</template>

<script>
	let bookImg = 'book.jpg'

	export default {
		name: 'recommond',
		data () {
			return {
				imgOrigin: [{
					url: bookImg
				}, {
					url: bookImg
				}, {
					url: bookImg
				}, {
					url: bookImg
				}, {
					url: bookImg
				}]
			}
		},
		computed: {
			imgList () {
				let list = []
				let obj = {}
				for (let i = 0; i < this.imgOrigin.length - 2; i += 2) {
					obj.left = this.imgOrigin[i].url
					if (this.imgOrigin[i + 1]) {
						obj.right = this.imgOrigin[i + 1].url
					}
					list.push(obj)
				}
				if (this.imgOrigin.length % 2 !== 0) {
					list.push({
						left: this.imgOrigin[this.imgOrigin.length - 1].url
					})
				}
				return list
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import 'recommond.styl'
</style>