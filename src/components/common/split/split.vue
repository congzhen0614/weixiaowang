<template>
  <div class="split" :style="{ height: height + 'px' }"></div>
</template>

<script type="text/ecmascript-6">
  export default {
  	props: {
  		height: {
  			type: String
  		}
  	}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .split {
    width: 100%
    height: 0.2rem
    background: #f0f0f0
  }
</style>
