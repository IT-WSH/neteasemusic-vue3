<template>
  <div>
    <div class="home_head">
      <div class="placehead safe-area-inset-top"></div>
      <div class="head_content flex-aj safe-area-inset-top">
        <div class="ipt flex-aj">单曲/歌单/电台</div>
      </div>
      <div class="nav">
        <van-tabs
          v-model:active="active"
          animated
          swipeable
          :color="'#bb2c08'"
          line-width="80px"
          line-height="2px"
          :title-active-color="'#bb2c08'"
          :title-inactive-color="'#454545'"
          background="rgba(240, 240, 240, .0)"
          @change="changeTabFun"
        >
          <van-tab
            v-for="(item, index) in navList"
            :key="index"
            :title="item.title"
          >
            <!-- 组件显示过，组件名称存在则显示 -->
            <div class="tab_com">
              <component
                v-if="item.comName && item.status"
                :is="item.comName"
              ></component>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { toRefs, reactive, onMounted, ref } from 'vue'
import { Tabs, Tab } from 'vant'
import { storageSession } from '@/utils/storage.js'
import HomeSelf from './components/home-self.vue'
import HomeSheet from './components/home-sheet.vue'
import HomeAnchor from './components/home-anchor.vue'
import HomeRank from './components/home-rank.vue'
export default {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    HomeSelf,
    HomeSheet,
    HomeAnchor,
    HomeRank
  },
  setup() {
    const count = ref(0)
    const state = reactive({
      active: null,
      scrollTop: [],
      navList: [
        {
          title: '个性推荐',
          comName: 'HomeSelf',
          status: true
        },
        {
          title: '歌单',
          comName: 'HomeSheet'
        },
        {
          title: '主播电台',
          comName: 'HomeAnchor'
        },
        {
          title: '排行榜',
          comName: 'HomeRank'
        }
      ]
    })
    // 设置当前位置
    const setTabIndex = () => {
      let index = storageSession('homeTabIndex') || 0
      state.navList[index].status = true
      state.active = index
    }
    setTabIndex()
    onMounted(() => {})
    // tab切换
    const changeTabFun = index => {
      storageSession('homeTabIndex', index)
      state.navList[index].status = true
      count.value++
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
    return {
      count,
      ...toRefs(state),
      changeTabFun
    }
  }
}
</script>
<style lang="scss" scoped>
.home_head {
  width: 100%;
  .placehead {
    width: 100%;
    height: 188px;
  }
  .head_content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #bb2c08;
    z-index: 20;
    .ipt {
      width: 680px;
      height: 70px;
      font-size: 28px;
      background: #ffffff;
      border-radius: 35px;
      color: #999999;
      overflow: hidden;
    }
  }
}
.tab_com {
  width: 100%;
  display: flex;
  min-height: calc(100vh - 300px);
}
/deep/.van-tabs__wrap {
  width: 100%;
  top: 100px;
  position: fixed;
  left: 0;
  overflow: hidden;
  z-index: 20;
  height: 88px;
  font-weight: bold;
  color: #232323;
  .van-tabs__nav {
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(240, 240, 240, 0.8);
    backdrop-filter: blur(30px);
  }
}
/deep/.van-tab--active {
  font-weight: bold;
}
</style>
