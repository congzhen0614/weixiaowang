<template>
	<ul class="circle-community-list">
		<li v-for="item in listData" class="list-item">
			<div class="left-part">
				<img v-lazy="item.logo">
			</div>
			<div class="right-part">
				<p class="title">{{ item.title }}</p>
				<p class="content">{{ item.content }}</p>
				<div class="info">
					<img src="./nick_name.png">
					<span class="nick-name">{{ item.nick_name }}</span>
					<img src="./topic_count.png">
					<span class="topic-count">{{ item.topic_count }}</span>
					<img src="./numbers.png">
					<span class="numbers">{{ item.numbers }}</span>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'circle-community-list',
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {}
		},
		watch: {
		},
		methods: {
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>