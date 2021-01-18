<template>
  <van-pull-refresh
    class="content"
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      :loop="true"
      lazy-render
      @change="onChange"
    >
      <van-swipe-item v-for="item in bannerHome" :key="item.targetId">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="item.imageUrl"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="self_grid flex-lra">
      <div class="grid_li flex-ajd">
        <div class="li_logo flex-aj">
          <img src="@/assets/siren.png" alt="" />
        </div>
        <div class="li_tit">私人FM</div>
      </div>
      <div class="grid_li flex-ajd">
        <div class="li_logo flex-aj">
          <img src="@/assets/meiri.png" alt="" />
          <div class="num">1</div>
        </div>
        <div class="li_tit">每日歌曲推荐</div>
      </div>
      <div class="grid_li flex-ajd">
        <div class="li_logo flex-aj">
          <img src="@/assets/rank.png" alt="" />
        </div>
        <div class="li_tit">云音乐热歌榜</div>
      </div>
    </div>
    <div class="list">
      <div class="list_tit flex-a">
        <div class="line"></div>
        <div class="tit">推荐歌单</div>
        <van-icon name="arrow" color="#898989" size="16" />
      </div>
      <div class="list_con flex-lra">
        <div class="con_li" v-for="(item, index) in list" :key="index">
          <div class="con_li_image">
            <van-image
              width="100%"
              height="100%"
              src="https://p2.music.126.net/B2Ola_NkDdldLH9MgNbpLw==/109951165598458189.jpg?param=200y200"
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
          v-show="list % 3 > 0"
          v-for="(item, index) in 3 - (list % 3)"
          :key="index"
        ></div>
      </div>
    </div>
  </van-pull-refresh>
</template>
<script>
import { toRefs, reactive } from 'vue'
import { Swipe, SwipeItem, PullRefresh, Icon, Image } from 'vant'
import bannerHome from '@/common/mock/banner-home.js'
export default {
  name: 'HomeSelf',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon,
    [Image.name]: Image
  },
  setup() {
    const state = reactive({
      isLoading: false,
      list: 10,
      bannerHome: bannerHome
    })
    const onChange = () => {}
    const onRefresh = () => {
      setTimeout(() => {
        state.isLoading = false
      }, 300)
    }

    return {
      ...toRefs(state),
      onChange,
      onRefresh
    }
  }
}
</script>
<style lang="scss" scoped>
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
      width: 100%;
      height: 80px;
      line-height: 40px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 24px;
      color: #232323;
      margin-top: 16px;
    }
  }
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
.self_grid {
  width: 100%;
  height: 230px;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  .grid_li {
    height: 100%;
    flex: 1;
    .li_logo {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 1px solid #bb2c08;
      color: #bb2c08;
      position: relative;
      overflow: hidden;
      &:active {
        background-color: rgba(187, 44, 8, 0.1);
        transition: background-color 300ms;
      }
      img {
        width: 130px;
        height: 130px;
      }
      .num {
        position: absolute;
        top: 55%;
        left: 50%;
        width: 50px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: #bb2c08;
      }
    }
    .li_tit {
      width: 100%;
      text-align: center;
      font-size: 24px;
      color: #232323;
      line-height: 60px;
      margin-top: 10px;
    }
  }
}
.my-swipe {
  width: 100%;
}
.my-swipe .van-swipe-item {
  width: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 300px;
  height: 260px;
  text-align: center;
}
.content {
  min-height: 100%;
  width: 100%;
}
</style>
