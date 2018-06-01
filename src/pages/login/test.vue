<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
	name: 'test',
	data () {
		return {}
	},
	mounted () {
		alert(location.href)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
	@import './login.styl'
</style>
