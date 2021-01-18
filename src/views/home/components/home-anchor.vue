<template>
  <div class="sheet">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe
        class="my-swipe"
        :autoplay="5000"
        indicator-color="white"
        :loop="true"
        lazy-render
        @change="onChange"
      >
        <van-swipe-item v-for="(item, index) in swiperList" :key="index">
          <div class="swiper_con flex-a">
            <div
              class="con_li flex-ajd"
              v-for="(items, indexs) in item"
              :key="indexs"
            >
              <van-image
                class="con_li_logo"
                :src="items.pic56x56Url"
                fit="cover"
              >
              </van-image>
              <div class="con_li_msg">{{ items.name }}</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="list_tit flex-a">
        <div class="line"></div>
        <div class="tit">精彩节目推荐</div>
      </div>
      <div class="tv_recommend">
        <div class="tv_li flex-lra" v-for="(item, index) in 3" :key="index">
          <div class="tv_li_logo">
            <van-image
              width="100%"
              height="100%"
              src="https://p2.music.126.net/4OoD4LZF6f7H25r7vTLMDg==/109951165628313743.jpg?param=100y100"
              fit="cover"
            >
            </van-image>
          </div>
          <div class="tv_li_con">
            <div class="con_tit text-over">
              E50 治愈 2020：一个药物的诞生——与三位女博士的对谈
            </div>
            <div class="con_desc text-over">沙龙型闲谈播客</div>
          </div>
        </div>
      </div>
      <div class="dt_list">
        <div class="list_tit flex-a">
          <div class="line"></div>
          <div class="tit">精选电台-谈情说爱</div>
        </div>
        <div class="list_con flex-lra">
          <div class="con_li" v-for="(item, index) in dtList" :key="index">
            <div class="con_li_image">
              <van-image
                width="100%"
                height="100%"
                src="https://p2.music.126.net/uu8MLsNsWqHl3tpSgngLag==/109951165491200181.jpg?param=200y200"
                fit="cover"
              >
              </van-image>
            </div>
            <div class="con_li_text">
              [一周日语上新]TXT日语原创新曲 唱响《境界触发者》第二季
            </div>
          </div>
          <div
            class="con_li"
            v-show="dtList % 3 > 0"
            v-for="(item, index) in 3 - (dtList % 3)"
            :key="index"
          ></div>
        </div>
      </div>
      <div class="hot_list">
        <div class="list_tit flex-a">
          <div class="line"></div>
          <div class="tit">热门电台</div>
        </div>
        <div class="list_con flex-lra">
          <div class="con_li" v-for="(item, index) in list" :key="index">
            <div class="con_li_image">
              <van-image
                width="100%"
                height="100%"
                src="https://p1.music.126.net/-SxzKoLVPCgaU0w39fmaLg==/109951164702418673.jpg?param=200y200"
                fit="cover"
              >
              </van-image>
              <div class="user_num flex-a">
                <van-icon name="like-o" size="12" />
                <span>100万订阅</span>
              </div>
              <!-- <div class="user_name flex-a">
                <van-icon name="user-o" size="16" />
                <span>青丝天鹅{{ index }}</span>
              </div> -->
            </div>
            <div class="con_li_text text-over">
              [一周日语上新]TXT日语原创新曲 唱响《境界触发者》第二季
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { toRefs, reactive, computed, ref } from 'vue'
import { List, Cell, Image, Icon, Swipe, SwipeItem } from 'vant'
import catelist from '@/common/mock/catelist.js'
export default {
  name: 'HomeAnchor',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  setup() {
    const swiperData = ref(catelist)
    const state = reactive({
      loading: false,
      finished: false,
      list: [],
      dtList: 6
    })
    const onChange = () => {}

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
        if (state.list.length >= 40) {
          state.finished = true
        }
      }, 1000)
    }

    const swiperList = computed(() => {
      let data = swiperData.value
      let arr = []
      let pageNumber = 8
      let page = Math.ceil(data.length / pageNumber)
      let num = 0
      for (let i = 0; i < page; i++) {
        if (i == page - 1) {
          num = data.length
        } else {
          num = (i + 1) * pageNumber
        }
        arr.push(data.slice(i * pageNumber, num))
      }
      return arr
    })

    return {
      ...toRefs(state),
      swiperList,
      onLoad,
      onChange
    }
  }
}
</script>
<style lang="scss" scoped>
.tv_recommend {
  .tv_li {
    width: 100%;
    .tv_li_logo {
      width: 110px;
      height: 110px;
      margin-left: 20px;
      border-radius: 10px;
      overflow: hidden;
    }
    .tv_li_con {
      width: 580px;
      height: 100px;
      padding: 15px 20px 15px 0;
      border-bottom: 1px solid #f0f0f0;
      .con_tit {
        font-size: 24px;
        color: #232323;
        line-height: 50px;
      }
      .con_desc {
        font-size: 24px;
        color: #999999;
        line-height: 50px;
      }
    }
  }
}
.swiper_con {
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  .con_li {
    width: 25%;
    height: 50%;
    overflow: hidden;
    .con_li_logo {
      width: 60px;
      height: 60px;
    }
    .con_li_msg {
      font-size: 24px;
      color: #232323;
      line-height: 40px;
    }
  }
}
.sheet {
  width: 100%;
}
.hot_list {
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
          background-image: linear-gradient(
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0)
          );
          span {
            width: auto;
          }
        }
      }
      .con_li_text {
        width: 94%;
        margin: 16px auto 0;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        font-size: 24px;
        color: #232323;
      }
    }
  }
}

// 精选电台-谈情说爱
.dt_list {
  .list_con {
    width: 100%;
    box-sizing: border-box;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 6px;
    .con_li {
      width: 230px;
      padding-bottom: 16px;
      .con_li_image {
        width: 100%;
        height: 230px;
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
}
.my-swipe {
  width: 100%;
}
.list_tit {
  width: 100%;
  height: 80px;
  padding: 0 30px;
  box-sizing: border-box;
  .line {
    width: 8px;
    height: 28px;
    background-color: #bb2c08;
    border-radius: 4px;
    margin-right: 10px;
  }
  .tit {
    font-size: 30px;
    color: #232323;
    font-weight: 600;
    margin-right: 4px;
  }
}
.my-swipe .van-swipe-item {
  width: 100%;
  color: #232323;
  font-size: 20px;
  height: 230px;
  padding: 5px 0;
  text-align: center;
  background-color: #ffffff;
}
</style>
