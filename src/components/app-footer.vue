<template>
  <van-tabbar
    class="van_tab"
    v-if="footerList.length > 0"
    v-model="active"
    :placeholder="placeholder"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    :route="true"
    @change="currentChange"
  >
    <van-tabbar-item
      v-for="(item, index) of footerList"
      :key="index"
      :replace="true"
      :name="item.name"
      :to="item.path"
      :icon="item.icon"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from 'vue'
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'AppFooter',
  props: {
    // 当前选择路由的name
    currentName: {
      type: String,
      default: ''
    },
    // 底部是否显示占位
    placeholder: {
      type: Boolean,
      default: true
    },
    // 默认字体颜色
    inactiveColor: {
      type: String,
      default: '#a0a0a0'
    },
    // 选中颜色
    activeColor: {
      type: String,
      default: '#efefef'
    },
    // 底部列表数据
    footerList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  setup(props, ctx) {
    const active = ref(props.currentName)
    const currentChange = data => {
      ctx.emit('click-item', data)
    }
    return {
      active,
      currentChange
    }
  }
}
</script>
<style scoped lang="scss">
/deep/.van-tabbar {
  background-color: #232323;
}
/deep/.van-tabbar-item {
  transition: color 300ms;
}
/deep/.van-tabbar-item--active {
  background-color: transparent;
  position: relative;
  animation: mymove 300ms;
  -webkit-animation: mymove 300ms; /*Safari and Chrome*/
  animation-direction: alternate; /*轮流反向播放动画。*/
  animation-timing-function: ease-in-out; /*动画的速度曲线*/
  /* Safari 和 Chrome */
  -webkit-animation: mymove 300ms;
  -webkit-animation-direction: alternate; /*轮流反向播放动画。*/
  -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
}
@keyframes mymove {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  40% {
    transform: scale(1.1); /*放大1.1倍*/
  }
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  40% {
    transform: scale(1.1); /*放大1.1倍*/
  }
  100% {
    transform: scale(1);
  }
}
</style>
