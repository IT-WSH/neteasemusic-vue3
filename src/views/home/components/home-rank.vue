<template>
  <div class="sheet">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="list_tit flex-a">
        <div class="line"></div>
        <div class="tit">云音乐官方榜</div>
      </div>
      <div class="tv_recommend">
        <div
          class="tv_li flex-lra"
          v-for="(item, index) in topList"
          :key="index"
          @click="onLinkPage(item)"
        >
          <div class="tv_li_logo">
            <van-image
              width="100%"
              height="100%"
              :src="item.coverImgUrl"
              fit="cover"
            >
            </van-image>
            <div class="msg">{{ item.updateFrequency }}</div>
          </div>
          <div class="tv_li_con flex-ajd">
            <div
              class="con_tit text-over"
              v-for="(tit, idx) in item.tracks"
              :key="idx"
            >
              <span>{{ idx + 1 }}.</span>
              <span class="tit">{{ tit.first }}</span>
              <span class="sp">-</span> {{ tit.second }}
            </div>
          </div>
        </div>
      </div>
      <div class="hot_list">
        <div class="list_tit flex-a">
          <div class="line"></div>
          <div class="tit">全球榜</div>
        </div>
        <div class="list_con flex-lra">
          <div
            class="con_li"
            v-for="(item, index) in list"
            :key="index"
            @click="onLinkPage(item)"
          >
            <div class="con_li_image">
              <van-image
                width="100%"
                height="100%"
                :src="item.coverImgUrl"
                fit="cover"
              >
              </van-image>
              <div class="user_num flex-a">
                <span>{{ item.updateFrequency }}</span>
              </div>
            </div>
            <div class="con_li_text text-over">
              {{ item.name }}
            </div>
          </div>
          <div class="con_li" v-if="3 - (list.length % 3) >= 1"></div>
          <div class="con_li" v-if="3 - (list.length % 3) >= 2"></div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { toRefs, reactive } from 'vue'
import { List, Cell, Image, Icon } from 'vant'
import rankData from '@/common/mock/yunrank.js'
import { useRouter } from 'vue-router'
export default {
  name: 'HomeAnchor',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  setup() {
    const state = reactive({
      loading: false,
      finished: false,
      list: [], // 全球榜
      topList: [...rankData.topList], // 云音乐榜
      dtList: 6,
      pageIndex: 1,
      pageSize: 12
    })
    const onChange = () => {}
    const route = useRouter()
    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      let data = rankData.list
      let list = []
      let pageIndex = state.pageIndex
      let pageSize = state.pageSize
      setTimeout(() => {
        if (pageSize * pageIndex >= data.length) {
          list = data.slice((pageIndex - 1) * pageSize, data.length)
        } else {
          list = data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        }
        state.list = [...state.list, ...list]
        // 加载状态结束
        state.loading = false
        // 数据全部加载完成
        if (state.list.length >= data.length) {
          state.finished = true
        } else {
          state.pageIndex++
        }
      }, 1000)
    }
    const onLinkPage = () => {
      route.push({
        name: 'Playlist',
        params: {
          name: '云音乐说唱榜',
          istop: 1
        }
      })
    }

    return {
      ...toRefs(state),
      onLoad,
      onChange,
      onLinkPage
    }
  }
}
</script>
<style lang="scss" scoped>
.tv_recommend {
  .tv_li {
    width: 100%;
    margin-bottom: 20px;
    .tv_li_logo {
      width: 240px;
      height: 240px;
      margin-left: 20px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      .msg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 24px;
        color: #ffffff;
        background-image: linear-gradient(
          rgba(255, 255, 255, 0),
          rgba(0, 0, 0, 0.2)
        );
      }
    }
    .tv_li_con {
      width: 450px;
      height: 240px;
      padding: 0 20px 0 0;
      border-bottom: 1px solid #f0f0f0;
      .con_tit {
        width: 100%;
        font-size: 28px;
        color: #454545;
        line-height: 50px;
        padding: 6px 0;
        .sp {
          padding: 0 4px;
        }
      }
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
    justify-content: space-around;
    padding: 0 6px;
    .con_li {
      width: 230px;
      padding-bottom: 16px;
      .con_li_image {
        width: 100%;
        height: 230px;
        position: relative;
      }
      .user_num {
        position: absolute;
        right: 0;
        color: #fff;
        z-index: 2;
        width: 100%;
        bottom: 0;
        padding: 8px;
        font-size: 20px;
        box-sizing: border-box;
        background-image: linear-gradient(
          rgba(255, 255, 255, 0),
          rgba(0, 0, 0, 0.2)
        );
        span {
          padding-left: 8px;
          display: inline-block;
          width: 320px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .con_li_text {
        width: 100%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        font-size: 24px;
        color: #232323;
        margin-top: 16px;
      }
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
</style>
