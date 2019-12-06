<template>
  <div>
    <div class="home">
      <van-image round class="headpic" :src="info.headpic" />
      <div class="name">{{ info.name }}</div>
      <div class="time">{{ info.birthday }} ~ {{ info.festa }}</div>
      <div class="about" @click="about">
        <!-- <img src="../assets/ic_more.png" alt="" /> -->
        帮助
      </div>
      <div class="view">浏览量：{{ info.viewCount }}</div>
    </div>
    <van-tabs
      v-model="active"
      swipeable
      color="#999"
      itle-active-color="#333"
      line-width="26px"
      :border="false"
    >
      <van-tab title="简介">
        <div class="description">
          <div class="top">
            <img src="../assets/pic_quotation_marks_left.png" alt="" />
          </div>
          <div class="info">{{ info.description }}</div>
          <div class="bottom">
            <img src="../assets/pic_quotation_marks_right.png" alt="" />
          </div>
        </div>
      </van-tab>
      <van-tab title="照片">
        <div class="tabs2">
          <div
            class="imgList van-hairline--surround"
            id="imgList"
            v-for="(video, index) in videos"
            :key="index + 'a'"
          >
            <video
              :src="video"
              class="swipe-video"
              :id="`video${index}`"
              controls
              x5-playsinline
              playsinline
              autoplay
              webkit-playsinline
              preload="auto"
              height="100%"
              width="100%"
            ></video>
          </div>
          <div
            class="imgList van-hairline--surround"
            v-for="(img, index) in photos"
            :key="index + 'b'"
          >
            <van-image
              fit="contain"
              class="photos"
              :src="img"
              v-lazy="img"
              @click="preview(index)"
            />
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import API from '@/utils/api'
import { getUrl } from '@/utils/request'
import { ImagePreview } from 'vant'
export default {
  name: 'home',
  data() {
    return {
      info: {},
      photos: [],
      videos: [],
      active: 0
    }
  },
  beforeCreate() {
    const id = getUrl().id
    this.id = id
    this.$post(API.viewAdd, { id: id }).then(() => {
      this.$post(API.selectInfo, { id: id }).then(res => {
        res.birthday = res.birthday.substring(0, 10)
        res.festa = res.festa.substring(0, 10)
        this.photos = res.photos.split(',')
        this.videos = res.videos.split(',')
        this.info = res
      })
    })
  },
  updated() {
    // 获取视频数组
    for (let i = 0; i < this.videos.length; i++) {
      let video = document.getElementById(`video${i}`)
      if (video) {
        const height = document.getElementById('imgList').clientHeight
        const width = document.getElementById('imgList').clientWidth
        video.setAttribute('crossorigin', 'anonymous')
        let canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        video.addEventListener(
          'loadeddata',
          function() {
            canvas
              .getContext('2d')
              .drawImage(video, 0, 0, canvas.width, canvas.height)
            let dataUrl = canvas.toDataURL('image/png')
            video.setAttribute('poster', dataUrl)
            video.pause()
          },
          false
        )
      }
    }
  },
  methods: {
    about() {
      this.$router.push({ path: './about', query: { id: this.id } })
    },
    // 预览图片
    preview(index) {
      ImagePreview({ images: this.photos, startPosition: index })
    }
  }
}
</script>

<style lang="less">
.home {
  position: relative;
  width: 375px;
  height: 236px;
  background: url('../assets/pic_bg.png') center center;
  background-size: cover;
  text-align: center;
  padding-top: 30px;
  box-sizing: border-box;
  color: #fff;
  .headpic {
    width: 100px;
    height: 100px;
  }
  .name {
    margin-top: 20px;
    font-size: 18px;
    line-height: 25px;
  }
  .time {
    font-size: 12px;
    line-height: 26px;
  }
  .about {
    position: absolute;
    top: 12px;
    left: 15px;
    height: 22px;
    font-size: 12px;
    width: 50px;
    text-align: left;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .view {
    position: absolute;
    top: 12px;
    height: 22px;
    font-size: 12px;
    width: 70px;
    text-align: right;
    border-radius: 50%;
    right: 15px;
  }
}
.description {
  box-sizing: border-box;
  padding: 10px 20px;
  .info {
    font-size: 13px;
    color: #666;
    line-height: 22px;
  }
  .top {
    margin-bottom: 10px;
    img {
      width: 21px;
      height: 18px;
    }
  }
  .bottom {
    text-align: right;
    margin-top: 10px;
    img {
      width: 21px;
      height: 18px;
    }
  }
}
.tabs2 {
  box-sizing: border-box;
  padding: 10px 16px;
  .imgList {
    width: 100%;
    height: 198px;
    text-align: center;
    margin-bottom: 15px;
    .photos {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
