<template>
  <div class="edit-userinfo">
    <header>
      <img src="../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <span @click.stop="confirm()">确定</span>
      <p>编辑</p>
    </header>
    <section>
      <div class="head-portrait">
        <img src="./head-portrait-icon.png" @click.stop="clickPortrait()">
        <p>(点击可快速获取孩子信息)</p>
      </div>
      <ul class="kids-info">
        <li>
          <span>姓名</span>
          <input type="text" placeholder="请输入孩子姓名" v-model="name"/>
        </li>
        <li>
          <span>性别</span>
          <div class="gender">
            <img v-if="gender===1" src="./check-icon.png" @click.stop="checkGirl()"/>
            <img v-if="gender===2" src="./checked-icon.png"/>
            <p>
              <img src="./girl-icon.png">
              <span>女</span>
            </p>
          </div>
          <div class="gender">
            <img v-if="gender===2" src="./check-icon.png" @click.stop="checkBoy()"/>
            <img v-if="gender===1" src="./checked-icon.png"/>
            <p>
              <img src="./boy-icon.png">
              <span>男</span>
            </p>
          </div>
        </li>
        <li>
          <span>家长</span>
          <input type="text" placeholder="请输入家长姓名" v-model="parentName"/>
        </li>
        <li>
          <span>电话</span>
          <input type="text" placeholder="请输入孩子家长联系电话" v-model="parentPhone"/>
        </li>
        <li>
          <span>关系</span>
          <img src="./link-icon.png"/>
          <input type="text" placeholder="请输入家长与孩子关系" v-model="relationship"/>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import edit from '@/store/edit/edit'
export default {
  name: '',
  components: {},
  data () {
      return {
        name: '',
        gender: 1,
        parentName: '',
        parentPhone: '',
        relationship: ''
      }
  },
  created () {
  },
  mounted () {
    this.getKidsList()
  },
  computed: {},
  methods: {
    getKidsList () {
      this.name = edit.list[this.$route.query.i].kids[this.$route.query.j - 1].kidName
      this.gender = edit.list[this.$route.query.i].kids[this.$route.query.j - 1].kidSex
      this.parentName = edit.list[this.$route.query.i].kids[this.$route.query.j - 1].parentsName
      this.parentPhone = edit.list[this.$route.query.i].kids[this.$route.query.j - 1].parentsPhone
      this.relationship = edit.list[this.$route.query.i].kids[this.$route.query.j - 1].relation
    },
    goBack () {
      this.$router.goBack()
    },
    clickPortrait () {
      console.log('点击头像')
    },
    checkBoy () {
      this.gender = 1
    },
    checkGirl () {
      this.gender = 2
    },
    confirm () {
      edit.list[this.$route.query.i].kids[this.$route.query.j - 1] = {
        kidName: this.name,
        kidSex: parseInt(this.gender),
        parentsName: this.parentName,
        parentsPhone: this.parentPhone,
        relation: this.relationship
      }
      this.$router.goBack()
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './editUserinfo.styl'
</style>
