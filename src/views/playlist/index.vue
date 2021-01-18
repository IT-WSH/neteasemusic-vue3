<template>
  <div class="playlist">
    <app-header :placeholder="false" backgroundColor="transparent"></app-header>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="sheet_head flex-lra safe-area-inset-top">
        <div
          class="blurbg"
          :style="{
            'background-image': `url(${cover})`
          }"
        ></div>
        <div class="head_l">
          <van-image
            width="100%"
            height="100%"
            src="http://p4.music.126.net/fEfmDukmQ-n6uEUYSRSecQ==/109951162930643290.jpg?param=200y200"
            fit="cover"
            radius="8"
          >
          </van-image>
        </div>
        <div class="head_r flex-ajd">
          <div class="info flex-a">
            <van-icon name="good-job-o" color="#FFC125" size="24" />
            <span>精品歌单</span>
          </div>
          <div class="msg text-over">欧美｜让Acappella净化你的耳朵吧</div>
          <div class="dsc text-over">
            用不一样的方式，演绎最打动人心的好音乐用不一样的方式，演绎最打动人心的好音乐
          </div>
        </div>
      </div>
      <div class="list_con flex-lra">
        <div class="con_li" v-for="(item, index) in list" :key="index">
          <div class="con_li_image">
            <van-image
              width="100%"
              height="100%"
              src="http://p4.music.126.net/4e5EIM4zmAvGNtrLxrcqGg==/109951165612373303.jpg?param=300y300"
              fit="cover"
            >
            </van-image>
            <div class="user_num flex-a">
              <van-icon name="service-o" size="16" />
              <span>100w</span>
            </div>
            <div class="user_name flex-a">
              <van-icon name="user-o" size="16" />
              <span>青丝天鹅{{ index }}</span>
            </div>
          </div>
          <div class="con_li_text">
            [一周日语上新]TXT日语原创新曲 唱响《境界触发者》第二季
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { toRefs, reactive } from 'vue'
import { List, Cell, Image, Icon } from 'vant'
import AppHeader from '@/components/app-header.vue'
export default {
  name: 'HomeSheet',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Icon.name]: Icon,
    AppHeader
  },
  setup() {
    const state = reactive({
      loading: false,
      finished: false,
      list: [],
      cover:
        'http://p4.music.126.net/EJyXfGYsiHxxxoCiTAz6Kg==/109951165611553137.jpg'
    })
    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          state.list.push(state.list.length + 1)
        }
        // 加载状态结束
        state.loading = false
        // 数据全部加载完成
        if (state.list.length >= 10) {
          state.finished = true
        }
      }, 500)
    }
    return {
      ...toRefs(state),
      onLoad
    }
  }
}
</script>
<style lang="scss" scoped>
.sheet {
  width: 100%;
}
.headerblur {
  position: fixed;
  top: 0;
  left: 0;
  height: 90px;
  width: 100%;
  overflow: hidden;
  z-index: 10;
}
.sheet_head {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  .head_l {
    width: 224px;
    height: 224px;
  }
  .head_r {
    width: 440px;
    height: 224px;
    .info {
      width: 100%;
      font-size: 32px;
      line-height: 60px;
      height: 60px;
      color: #ffffff;
      font-weight: bold;
      margin-bottom: 20px;
      span {
        padding-left: 10px;
      }
    }
    .msg {
      width: 100%;
      line-height: 40px;
      height: 40px;
      margin-bottom: 4px;
      font-size: 26px;
      color: #ffffff;
    }
    .dsc {
      width: 100%;
      line-height: 40px;
      height: 40px;
      font-size: 24px;
      color: #ffffff;
    }
  }
}
.blurbg {
  filter: blur(60px) brightness(0.8);
  background-size: 100% auto;
  background-position: 0 0;
  background-repeat: no-repeat;
  position: absolute;
  width: 100%;
  height: 0;
  padding-top: 100%;
  z-index: -1;
  left: 0;
  top: 0;
  transform: scale(1.2);
  background-color: transparent;
}
.list_con {
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
  .con_li {
    width: 370px;
    padding-bottom: 16px;
    .con_li_image {
      width: 100%;
      height: 370px;
      position: relative;
      .user_name,
      .user_num {
        position: absolute;
        right: 0;
        color: #fff;
        z-index: 2;
        width: 100%;
        padding: 8px;
        font-size: 20px;
        box-sizing: border-box;
        background-image: linear-gradient(
          rgba(255, 255, 255, 0),
          rgba(0, 0, 0, 0.2)
        );
        span {
          padding-left: 10px;
          display: inline-block;
          width: 320px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .user_name {
        bottom: 0;
      }
      .user_num {
        top: 0;
        text-align: right;
        justify-content: flex-end;
        background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
        span {
          width: auto;
        }
      }
    }
    .con_li_text {
      width: 94%;
      margin: 16px auto 0;
      height: 80px;
      line-height: 40px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 24px;
      color: #232323;
    }
  }
}
</style>
