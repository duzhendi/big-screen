<template>
  <div class="three-container">
    <SecondTitle title="分层分类管理" width="auto" height="24px" />
    <!-- <div class="title-container">
      <fourTitle title="分层管理" width="183px" height="24px" />
      <fourTitle title="分类管理" width="290px" height="24px" />
    </div> -->
    <div class="content-container">
      <div class="img-container">
        <div v-for="(item, index) in titles" :key="item.code">
          <div
            class="bg-item"
            :key="item.code"
            :style="{
              ...item.style,
              animationDelay: `${(titles.length - 1 - index) * 1}s`,
              zIndex: titles.length - index,
              fontSize: 9 + index + 'px'
            }"
          ></div>
          <div
            :style="{
              ...item.style,
              zIndex: titles.length - index,
              background: 'none',
              fontSize: 9 + index + 'px'
            }"
            class="img-text"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="table-container">
        <div class="t-header">
          <div class="th" @click="handleClick('认定潜力库')">认定潜力库</div>
          <div class="th" @click="handleClick('培育潜力库')">培育潜力库</div>
          <div class="th" @click="handleClick('其他')">其他</div>
        </div>
        <div class="t-body">
          <div
            v-for="(row, index) in tableData1"
            :key="index"
            class="t-row data-row"
            :style="{
              '--rowDelay': `${(tableData1.length - 1 - index) * 1}s`,
              '--rowBgImg': `url(${getRowBg(index)})`
            }"
          >
            <div class="td" v-for="(item, i) in row.values" :key="i">
              <span class="val">{{ item.val }}</span
              ><span class="unit">家</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommonDialog v-model:visible="visible" :title="title" :isShowBtn="true" :currentType="currentType" />
  </div>
</template>
<script setup>
import CommonDialog from './CommonDialog.vue'
import SecondTitle from '@/components/titles/second-title.vue'
import fourTitle from '@/components/titles/four-title.vue'
import { getLeftTopData } from '@/apis'
import { getImage } from '@/utils'

import { onMounted, ref } from 'vue'

const getRowBg = (index) => {
  // 上三行绿色，第四行青色，最后一行蓝色
  if (index <= 2) return getImage('img_绿色层.png')
  if (index === 3) return getImage('img_青色层.png')
  return getImage('img_蓝色层.png')
}

const visible = ref(false)
const currentType = ref('')
const title = ref('')
const titles = ref([
  {
    title: '国家级\n单项冠军',
    code: 'gjjdxgj',
    image: getImage('left-top/国家级.png'),
    style: {
      position: 'absolute',
      width: '57px',
      height: '57px',
      top: 'calc(16% + 1px)',
      left: '59%',
      transform: 'translate(-50%, -50%)',
      backgroundImage: `url(${getImage('left-top/国家级.png')})`
    }
  },
  {
    title: '市级\n单项冠军',
    code: 'sjdxgj',
    image: getImage('left-top/市级.png'),
    style: {
      position: 'absolute',
      width: '85px',
      height: '52px',
      top: 'calc(33% + 1px)',
      left: '57%',
      transform: 'translate(-50%, -50%)',
      backgroundImage: `url(${getImage('left-top/市级.png')})`,
      paddingTop: '0px',
      paddingRight: '25px'
    }
  },
  {
    title: '"小巨人"企业',
    code: 'xjrqy',
    image: getImage('left-top/小巨人.png'),
    style: {
      position: 'absolute',
      width: '116px',
      height: '56px',
      top: 'calc(46% - 1px)',
      left: 'calc(55% + 1px)',
      transform: 'translate(-50%, -50%)',
      backgroundImage: `url(${getImage('left-top/小巨人.png')})`,
      paddingTop: '15px',
      paddingRight: '25px'
    }
  },
  {
    title: '专精特新中小企业',
    code: 'zjtxzxqy',
    image: getImage('left-top/专精特新.png'),
    style: {
      position: 'absolute',
      width: '146px',
      height: '70px',
      top: 'calc(58% - 1px)',
      left: '54%',
      transform: 'translate(-50%, -50%)',
      backgroundImage: `url(${getImage('left-top/专精特新.png')})`,
      paddingTop: '15px',
      paddingRight: '25px'
    }
  },
  {
    title: '创新型中小企业',
    code: 'cxxzxqy',
    image: getImage('left-top/创新型.png'),
    style: {
      position: 'absolute',
      width: '211px',
      height: '92px',
      top: '75%',
      left: 'calc(51% - 2px)',
      transform: 'translate(-50%, -50%)',
      backgroundImage: `url(${getImage('left-top/创新型.png')})`,
      paddingTop: '15px',
      paddingRight: '25px'
    }
  }
])

const tableData1 = ref([
  {
    key: 'gjjdxgj',
    values: [
      { val: 0, color: '#00FF9D', code: 'identifyNum' },
      { val: 0, color: '#00FF9D', code: 'cultivateNum' },
      { val: 0, color: '#00FF9D', code: 'otherNum' }
    ]
  },
  {
    key: 'sjdxgj',
    values: [
      { val: 0, color: '#00FF9D', code: 'identifyNum' },
      { val: 0, color: '#00FF9D', code: 'cultivateNum' },
      { val: 0, color: '#00FF9D', code: 'otherNum' }
    ]
  },
  {
    key: 'xjrqy',
    values: [
      { val: 0, color: '#00FF9D', code: 'identifyNum' },
      { val: 0, color: '#00FF9D', code: 'cultivateNum' },
      { val: 0, color: '#00FF9D', code: 'otherNum' }
    ]
  },
  {
    key: 'zjtxzxqy',
    values: [
      { val: 0, color: '#3CE3FF', code: 'identifyNum' },
      { val: 0, color: '#3CE3FF', code: 'cultivateNum' },
      { val: 0, color: '#3CE3FF', code: 'otherNum' }
    ]
  },
  {
    key: 'cxxzxqy',
    values: [
      { val: 0, color: '#3CE3FF', code: 'identifyNum' },
      { val: 0, color: '#3CE3FF', code: 'cultivateNum' },
      { val: 0, color: '#3CE3FF', code: 'otherNum' }
    ]
  }
])
const getTableData = async () => {
  try {
    const res = await getLeftTopData({
      belongModel: 'flgl'
    })
    if (res && res.data && res.data.code === 100000 && res.data.data) {
      const data = res.data.data
      tableData1.value.forEach((item) => {
        const target = data.find((i) => i.indexCode === item.key)
        if (target) {
          const targetToData = JSON.parse(target.indexValue)
          item.values.forEach((value) => {
            value.val = targetToData[value.code]
          })
        }
      })
    }
  } catch (error) {
    console.error('获取精准筛选数据失败', error)
  }
}

onMounted(() => {
  getTableData()
})

const handleClick = (type) => {
  visible.value = true
  currentType.value = type
  title.value = type === '认定潜力库' ? '认定潜力库企业' : type === '培育潜力库' ? '培育潜力库企业' : '其他'
}
</script>
<style lang="scss" scoped>
.three-container {
  width: 100%;
  height: 100%;
  .title-container {
    margin-top: 8px;
    display: flex;
    gap: 19px;
  }
  .content-container {
    display: flex;
    margin-top: 10px;
    height: 214px;
    .img-container {
      background: url('@/assets/images/left-top/金字塔默认态.png') no-repeat center center;
      background-size: contain;
      width: 210px;
      position: relative;
      top: 12px;
      .bg-item {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-size: 12px;
        font-family: Alibaba-PuHuiTi-2;
        font-weight: normal;
        color: #ffffff;
        // padding-bottom: 20px;
        // padding-left: 10px;
        box-sizing: border-box;
        opacity: 0;
        // 显隐节奏 + 上浮位移（两段动画叠加）
        animation: fadeOpacityLoop 5s ease-in-out infinite;
      }
      .img-text {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Alibaba-PuHuiTi-2;
        transform: rotate(10deg) translate(-55%, -30%) !important;
        white-space: pre-line;
        text-align: center;
        line-height: 1.1;
        opacity: 1;
        position: absolute;
        z-index: 100;
      }
    }

    // 公共显隐节奏：与金字塔层 & 表格高亮对齐（0/10/90/95/100）
    @keyframes fadeOpacityLoop {
      0%,
      19.99% {
        opacity: 1;
      }
      20%,
      100% {
        opacity: 0;
      }
    }

    // 金字塔层位移：配合 fadeOpacityLoop 使用
    @keyframes pyramidFloatLoop {
      0%,
      100% {
        transform: translate(-50%, -40%);
      }
      10%,
      90% {
        transform: translate(-50%, -50%);
      }
      95% {
        transform: translate(-50%, -50%);
      }
    }
    .table-container {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .t-header {
        display: flex;
        height: 30px;
        align-items: center;
        .th {
          cursor: pointer;
          flex: 1;
          text-align: center;
          font-family: Alibaba-PuHuiTi-2;
          font-weight: normal;
          font-size: 14px;
          color: #b9e8ff;
        }
      }
      .t-row {
        display: flex;
        align-items: center;
        .td {
          flex: 1;
          text-align: center;
          position: relative;
          z-index: 1;
          .val {
            font-family: Helvetica, Helvetica;
            font-weight: bold;
            font-size: 18px;
          }
          .unit {
            font-family: Alibaba-PuHuiTi-2;
            font-weight: normal;
            font-size: 12px;
            color: #b9e8ff;
            margin-left: 2px;
          }
        }
      }
      .t-body {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 4px;
        .summary-row {
          height: 30px;
        }
        .h-line {
          width: 100%;
          height: 1px;
          border-top: 1px dashed rgba(255, 255, 255, 0.2);
          margin: -4px 0;
        }
        .data-row {
          height: 30px;
          background: url('@/assets/images/left-top/img_分类管理列表bg.png') no-repeat center center;
          background-size: 100% 100%;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          &::after {
            content: '';
            position: absolute;
            inset: 0;
            background: var(--rowBgImg) no-repeat center center;
            background-size: 100% 100%;
            border-radius: 2px;
            pointer-events: none;
            opacity: 0;
            animation: fadeOpacityLoop 5s ease-in-out infinite;
            animation-delay: var(--rowDelay, 0s);
            box-shadow: 0 0 12px rgba(60, 227, 255, 0.2) inset;
          }
        }
      }
      .v-line {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        border-left: 1px dashed rgba(255, 255, 255, 0.2);
        pointer-events: none;
        &.line-1 {
          left: 33.33%;
        }
        &.line-2 {
          left: 66.66%;
        }
      }
    }
  }
}
</style>
