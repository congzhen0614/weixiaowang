<template>
  <div class="split-title">
  	{{ title }}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  	name: 'title',
  	props: ['title'],
  	data () {
  		return {}
  	}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .split-title {
    width: 100%
    padding: 0.18rem 0.2rem
    line-height: 0.24rem
    font-size: 0.24rem
    color: #999999
    background: #f0f0f0
  }
</style>
