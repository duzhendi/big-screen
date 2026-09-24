<template>
  <div class="api-call">
    <div v-for="(item, i) in apiItems" :key="i" class="api-group">
      <div class="group-title">
        <img class="title-arrow" :src="titleBg" alt="" />
        <span class="title-text">{{ item.name }}</span>
      </div>
      <div class="group-body">
        <div class="group-bg"></div>
        <div class="cards-row">
          <div class="card icon-card">
            <img :src="item.iconImg" alt="" class="icon-img" />
          </div>
          <div class="card info-card" v-for="(c, j) in item.cards" :key="j">
            <div class="info-bg"></div>
            <div class="info-label">{{ c.label }}</div>
            <div class="info-value" :class="{ warn: c.warn }">
              {{ c.value.toLocaleString() }}<span class="unit">{{ c.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import g1 from '@/assets/images/Groups1.png'
  import g2 from '@/assets/images/Groups2.png'
  import g3 from '@/assets/images/Groups3.png'
  import titleBg from '@/assets/images/标题背景123.png'

  const apiItems = [
    {
      name: '个人权益记录',
      iconImg: g1,
      cards: [
        { label: '调用总次数', value: 342467, unit: '次', warn: false },
        { label: '调用失败总次数', value: 16557, unit: '次', warn: true },
        { label: '报错率', value: 4.83, unit: '%', warn: true }
      ]
    },
    {
      name: '职业年金',
      iconImg: g2,
      cards: [
        { label: '调用总次数', value: 36978, unit: '次', warn: false },
        { label: '调用失败总次数', value: 259, unit: '次', warn: true },
        { label: '报错率', value: 0.70, unit: '%', warn: true }
      ]
    },
    {
      name: '个人参保证明',
      iconImg: g3,
      cards: [
        { label: '调用总次数', value: 540498, unit: '次', warn: false },
        { label: '调用失败总次数', value: 43839, unit: '次', warn: true },
        { label: '报错率', value: 8.11, unit: '%', warn: true }
      ]
    }
  ]
</script>

<style scoped lang="scss">
.api-call {
  width: 100%;
  height: 100%;
  padding: 6px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .api-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .group-title {
      display: flex;
      align-items: center;
      gap: 4px;
      padding-left: 4px;

      .title-arrow {
        width: 16px;
        height: 16px;
        object-fit: contain;
      }
      .title-text {
        font-size: 16px;
        font-family: Alibaba-PuHuiTi-Bold;
        letter-spacing: 1px;
        background: linear-gradient(180deg, #ffffff 10%, #0091FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .group-body {
      position: relative;
      padding: 6px;

      .group-bg {
        position: absolute;
        inset: 0;
        background-image: url('@/assets/images/Vector11.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        pointer-events: none;
      }

      .cards-row {
        position: relative;
        z-index: 1;
        display: flex;
        gap: 8px;

        .card {
          flex: 1;
          position: relative;
          height: 65px;
          box-sizing: border-box;

          &.icon-card {
            width: 45px;
            height: 65px;
            flex: 0.3; 

            .icon-img {
              width: 45px;
              height: 65px;
              object-fit: contain;
            }
          }

          &.info-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;

            .info-bg {
              position: absolute;
              inset: 0;
              background-image: url('@/assets/images/Vector11s.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center;
              pointer-events: none;
            }

            .info-label {
              position: relative;
              z-index: 1;
              font-size: 14px;
              color: #fff;
              font-family: Alibaba-PuHuiTi-Regular;
              margin-bottom: 4px;
            }
            .info-value {
              position: relative;
              z-index: 1;
              font-size: 18px;
              font-family: Alibaba-PuHuiTi-Medium;
              color: #00D4FF;
              text-shadow: 0 0 6px rgba(0, 212, 255, 0.5);
              &.warn {
                color: #FFD700;
                text-shadow: 0 0 6px rgba(255, 215, 0, 0.5);
              }
              .unit {
                font-size: 12px;
                margin-left: 2px;
                color: rgba(255, 255, 255, 0.7);
                text-shadow: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>