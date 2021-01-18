<template>
  <van-popup
    v-model:show="show"
    position="bottom"
    :close-on-popstate="true"
    :style="{ height: '100%' }"
    safe-area-inset-bottom
    teleport="body"
    :duration="0.2"
  >
    <div class="cat_list safe-area-inset-top">
      <div class="closetop safe-area-inset-top flex-aj">
        <van-icon
          name="cross"
          size="30"
          @click="setShow"
          color="#aaaaaa"
        ></van-icon>
      </div>
      <div class="placde"></div>
      <div
        class="head_btn flex-aj"
        :class="{ active: !activeObj }"
        @click="setActive(null)"
      >
        全部歌曲
      </div>
      <div class="catelist clear" v-for="(parent, index) in data" :key="index">
        <div class="cl_list cateicon">
          <div class="con flex-ajd">
            <van-image
              width="30px"
              height="30px"
              fit="cover"
              :src="parent.imageUrl"
            >
            </van-image>
            <span>{{ parent.name }}</span>
          </div>
        </div>
        <div
          class="cl_list"
          v-for="(sub, subIndex) in parent.children"
          :key="subIndex"
          @click="setActive(sub)"
          :class="{
            active:
              activeObj &&
              activeObj.name == sub.name &&
              activeObj.resourceCount == sub.resourceCount
          }"
        >
          {{ sub.name }}
          <img class="hot" v-if="sub.hot" src="@/assets/hot.png" alt="" />
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { Popup, Icon, Image } from 'vant'
import { onMounted, reactive, toRefs } from 'vue'
import cateListData from '@/common/mock/catlist.js'
export default {
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Image.name]: Image
  },
  setup(props, ctx) {
    const state = reactive({
      show: false, // 是否显示选择
      data: [],
      activeObj: null // 选中对象
    })
    const initData = () => {
      let data = []
      let categories = cateListData.categories || {}
      let sub = cateListData.sub || []
      let obj = {}
      let imageUrl = null
      for (const key in categories) {
        if (Object.hasOwnProperty.call(categories, key)) {
          imageUrl = require(`../../../assets/cate_${key}.png`)
          obj = {
            category: key,
            imageUrl: imageUrl,
            name: categories[key],
            children: []
          }
          sub.forEach(item => {
            if (item.category == key) {
              obj.children.push(item)
            }
          })
          data.push(obj)
        }
      }
      state.data = data
    }
    onMounted(() => {
      initData()
    })
    const setShow = () => {
      state.show = !state.show
    }
    const setActive = obj => {
      state.activeObj = obj
      setShow()
      ctx.emit('select', obj)
    }
    return {
      ...toRefs(state),
      setShow,
      setActive
    }
  }
}
</script>
<style lang="scss" scoped>
.catelist {
  width: 700px;
  margin: 0 auto 20px;
  border-left: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  .cl_list {
    float: left;
    width: 25%;
    text-align: center;
    height: 90px;
    line-height: 88px;
    box-sizing: border-box;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    color: #454545;
    font-size: 28px;
    position: relative;
    overflow: hidden;
    &.cateicon {
      height: 179px;
      line-height: 40px;
      .con {
        width: 100%;
        height: 100%;
        span {
          margin-top: 10px;
        }
      }
    }
    .hot {
      position: absolute;
      background-image: url('~@/assets/hot.png');
      background-size: cover;
      background-repeat: no-repeat;
      width: 50px;
      height: 50px;
      top: -2px;
      left: -2px;
    }
  }
}
.closetop {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
  background-color: #ffffff;
  z-index: 1;
}
.placde {
  width: 100%;
  height: 100px;
}
.head_btn {
  width: 700px;
  height: 100px;
  margin: 0 auto 20px;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  color: #454545;
  font-size: 28px;
  position: relative;
}
.active::after {
  content: '';
  position: absolute;
  background-image: url('~@/assets/checked.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  bottom: 0;
  right: 0;
}
.active::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  border: 1px solid #bb2c08;
}
</style>
