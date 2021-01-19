<template>
  <div class="playlist">
    <app-header
      :placeholder="false"
      :title="'说唱榜'"
      :backgroundColor="backgroundColor"
    ></app-header>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="sheet_head safe-area-inset-top">
        <div
          class="blurbg"
          :style="{
            'background-image': `url(${cover})`
          }"
        ></div>
        <div class="placeholder"></div>
        <div class="head_info flex-lra">
          <div class="head_l">
            <van-image width="100%" height="100%" :src="cover" fit="cover">
            </van-image>
          </div>
          <div class="head_r flex-ajd">
            <div class="info flex-a">
              <span>精品歌单</span>
            </div>
            <div class="msg text-over flex-a">
              <div class="logo">
                <van-image
                  width="100%"
                  height="100%"
                  fit="cover"
                  radius="50%"
                  src="http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg"
                ></van-image>
              </div>
              <span>网易云音乐</span>
              <van-icon name="arrow" size="12" color="#eeeeee"></van-icon>
            </div>
          </div>
        </div>
        <div class="head_tab flex-aj">
          <div class="tab_li flex-ajd">
            <div class="li_icon flex-aj">
              <img src="@/assets/fav.png" alt="" />
            </div>
            <div class="li_tit">235689</div>
          </div>
          <div class="tab_li flex-ajd">
            <div class="li_icon flex-aj">
              <img src="@/assets/pinglun.png" alt="" />
            </div>
            <div class="li_tit">235689</div>
          </div>
          <div class="tab_li flex-ajd">
            <div class="li_icon flex-aj">
              <img src="@/assets/share.png" alt="" />
            </div>
            <div class="li_tit">235689</div>
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
import { toRefs, reactive, computed, onMounted } from 'vue'
import { List, Cell, Image, Icon } from 'vant'
import AppHeader from '@/components/app-header.vue'
import { useStore } from 'vuex'
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
    const store = useStore()
    const state = reactive({
      loading: false,
      finished: false,
      list: [],
      clientHeight: 0, // 头部的高度
      cover:
        'http://p4.music.126.net/EJyXfGYsiHxxxoCiTAz6Kg==/109951165611553137.jpg'
    })
    const backgroundColor = computed(() => {
      let scrollTop = store.state.scrollTop
      let clientHeight = state.clientHeight
      let opc = 0
      if (clientHeight) {
        if (scrollTop / clientHeight < 1) {
          opc = (scrollTop / clientHeight).toFixed(2)
        } else {
          opc = 1
        }
      } else {
        opc = 1
      }
      return `rgba(187, 44, 8,${opc})`
    })
    onMounted(() => {
      state.clientHeight = document.getElementsByClassName(
        'sheet_head'
      )[0].clientHeight
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
      backgroundColor,
      onLoad
    }
  }
}
</script>
<style lang="scss" scoped>
.sheet {
  width: 100%;
}
.head_tab {
  width: 100%;
  padding: 20px 10px 0;
  box-sizing: border-box;
  .tab_li {
    width: 33.33%;
    height: 100%;
    .li_icon {
      width: 70px;
      height: 70px;
      overflow: hidden;
      img {
        width: 110px;
        height: 110px;
      }
    }
    .li_tit {
      line-height: 40px;
      height: 40px;
      font-size: 28px;
      color: #e8e8e8;
    }
  }
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
  .placeholder {
    width: 100%;
    height: 100px;
  }
  .head_info {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
  }
  .head_l {
    width: 260px;
    height: 260px;
  }
  .head_r {
    width: 400px;
    height: 260px;
    .info {
      width: 100%;
      font-size: 32px;
      line-height: 60px;
      height: 60px;
      color: #ffffff;
      margin-bottom: 30px;
    }
    .msg {
      width: 100%;
      line-height: 40px;
      margin-bottom: 4px;
      font-size: 26px;
      color: #ffffff;
      .logo {
        width: 50px;
        height: 50px;
      }
      span {
        padding: 0 10px;
      }
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
  background-color: #eeeeee;
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
