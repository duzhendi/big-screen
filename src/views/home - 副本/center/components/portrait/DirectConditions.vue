<template>
  <div class="direct-conditions">
    <div class="conditions-list">
      <div class="condition-item" v-for="(item, index) in conditions" :key="index">
        <div class="item-left">
          <img :src="item.icon" class="item-icon" alt="" />
          <div class="label">{{ item.label }}</div>
        </div>
        <div class="item-right">
          <img :src="item.status === 'satisfied' ? satisfiedImg : unsatisfiedImg" class="status-stamp" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getImage } from '@/utils'
import { computed } from 'vue'

const props = defineProps({
  enterpriseName: String,
  portrait: {
    type: Object,
    default: null
  }
})

const satisfiedImg = getImage('center/img_已满足.png')
const unsatisfiedImg = getImage('center/img_未满足.png')

const scoreVo = computed(() => props.portrait?.scoreVo || {})
const yes = (v) => String(v) === '1'

const conditions = computed(() => [
  {
    label: '近三年内获得过国家级、省级科技奖励',
    status: yes(scoreVo.value?.isReceivedTechnologicalAward) ? 'satisfied' : 'unsatisfied',
    icon: getImage('center/icon_1.png')
  },
  {
    label: '获得高新技术企业、国家级技术创新示范企业、知识产权优势企业和知识产权示范企业等荣誉（均为有效期内）',
    status: yes(scoreVo.value?.isReceivedHonor) ? 'satisfied' : 'unsatisfied',
    icon: getImage('center/icon_2.png')
  },
  {
    label: '拥有经认定的省部级以上研发机构',
    status: yes(scoreVo.value?.provincialDevelopmentInstitution) ? 'satisfied' : 'unsatisfied',
    icon: getImage('center/icon_3.png')
  },
  {
    label: '近三年新增股权融资总额（合格机构投资者的实缴额）500万元以上',
    status: yes(scoreVo.value?.increasedEquityFinancing) ? 'satisfied' : 'unsatisfied',
    icon: getImage('center/icon_4.png')
  }
])
</script>

<style lang="scss" scoped>
.direct-conditions {
  flex: 1;
  height: 100%;
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
  position: relative;

  .conditions-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 20px;

    .condition-item {
      height: 72px;
      background: rgba(0, 84, 156, 0.1);
      border: 1px solid rgba(60, 227, 255, 0.1);
      border-radius: 4px;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s;
      box-sizing: border-box;

      &:hover {
        background: rgba(0, 84, 156, 0.2);
        border-color: rgba(60, 227, 255, 0.3);
      }

      .item-left {
        display: flex;
        align-items: center;
        gap: 20px;
        flex: 1;

        .item-icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .label {
          font-size: 15px;
          color: #ffffff;
          line-height: 1.4;
          opacity: 0.9;
        }
      }

      .item-right {
        margin-left: 40px;
        display: flex;
        align-items: center;

        .status-stamp {
          width: 56px;
          height: 56px;
          object-fit: contain;
        }
      }
    }
  }
}
</style>
