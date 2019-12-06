<template>
  <div>
    <van-nav-bar title="联系我们" left-arrow @click-left="onClickLeft" />
    <div class="card marginT">
      <img src="../assets/ic_phone.png" alt="phone" class="img" />
      <div class="font">电&nbsp;&nbsp;话</div>
      <div class="number"><a href="tel:400-820-8820">400-820-8820</a></div>
    </div>
    <div class="card marginT">
      <img src="../assets/ic_wechat.png" alt="微信" class="img" />
      <div class="font">微&nbsp;&nbsp;信</div>
      <div class="number">365278941</div>
    </div>
    <div class="card marginT">
      <img src="../assets/ic_email.png" alt="邮箱" class="img" />
      <div class="font">邮&nbsp;&nbsp;箱</div>
      <div class="number">adminstrator@163.com</div>
    </div>
    <div class="card marginT">
      <img src="../assets/ic_site.png" alt="地址" class="img" />
      <div class="font">地&nbsp;&nbsp;址</div>
      <div class="number">湖南省长沙市岳麓街道办事处</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      id: this.$route.query.id
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/',
        query: { id: this.id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #000;
  .van-icon {
    color: #fff;
  }
}
.marginT {
  margin-top: 40px;
}
.van-nav-bar__title {
  color: #fff;
}
.card {
  text-align: center;
  margin-bottom: 30px;
  .img {
    width: 17px;
    height: 17px;
    margin-bottom: 2px;
  }
  .font {
    font-size: 15px;
    color: #333;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .number {
    font-size: 14px;
    color: #333;
  }
}
</style>
