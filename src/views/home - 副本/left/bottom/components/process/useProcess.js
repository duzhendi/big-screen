import { computed } from 'vue'

// 状态图标
import iconFuture from '@/assets/images/left-bottom/icon_未来节点.png'
import iconCurrent from '@/assets/images/left-bottom/icon_当前节点.png'
import iconCompleted from '@/assets/images/img_完成节点.png'
// 业务图标
import iconNotice from '@/assets/images/left-bottom/icon_发布通知.png'
import iconFillInfo from '@/assets/images/left-bottom/icon_申报信息填写.png'
import iconAuditDistrict from '@/assets/images/left-bottom/icon_区县审核.png'
import iconRecommendDistrict from '@/assets/images/left-bottom/icon_区县初审推荐.png'
import iconPublicDistrict from '@/assets/images/left-bottom/icon_区县公示.png'
import iconCityAudit from '@/assets/images/left-bottom/icon_市级审核.png'
import iconReviewExpert from '@/assets/images/left-bottom/icon_专家评审.png'
import iconReview3rd from '@/assets/images/left-bottom/icon_三方机构评审.png'
import iconPartyPublic from '@/assets/images/left-bottom/icon_委内党组会公示.png'
import iconReview4th from '@/assets/images/left-bottom/icon_市级公示四方机构复核.png'
import iconReview4thSimple from '@/assets/images/left-bottom/icon_第四方机构复核.png'
import iconCityPublic from '@/assets/images/left-bottom/icon_市级公示.png'
import iconCityNotice from '@/assets/images/left-bottom/icon_市级公告.png'
import iconCityRecord from '@/assets/images/left-bottom/icon_市级备案.png'
import iconCertAuth from '@/assets/images/left-bottom/icon_电子证书授予.png'

const COLS_PER_ROW = 3

// 业务图标映射表
const iconMap = {
  发布通知: iconNotice,
  申报信息填写: iconFillInfo,
  企业信息同步: iconFillInfo,
  申报信息同步: iconFillInfo,
  区县审核: iconAuditDistrict,
  区县审核和推荐: iconAuditDistrict,
  区县审核公示推荐: iconAuditDistrict,
  区县初审推荐: iconRecommendDistrict,
  区县公示: iconPublicDistrict,
  市级审核: iconCityAudit,
  专家评审: iconReviewExpert,
  三方机构评审: iconReview3rd,
  委内党组会公示: iconPartyPublic,
  市级公示四方机构复核: iconReview4th,
  四方机构复核: iconReview4thSimple,
  市级公示: iconCityPublic,
  市级公告: iconCityNotice,
  市级备案: iconCityRecord,
  电子证书授予: iconCertAuth,
  电子证书授权: iconCertAuth
}

const getBusinessIcon = (title) => iconMap[title] || null

const getNodeIcon = (status) => {
  const iconMap = [
    iconFuture, // 0
    iconCurrent, // 1
    iconCompleted, // 2
    iconFuture // 3
  ]
  return iconMap[status] || iconFuture
}

const getLineColor = (status) => {
  const colorMap = [
    'rgb(52, 73, 90)', // 0
    'rgb(33, 111, 132)', // 1: active
    'rgb(33, 111, 132)', // 2: completed
    'rgb(52, 73, 90)' // 3: pending
  ]
  return colorMap[status] || 'rgb(52, 73, 90)'
}

const getTextColor = (status) => {
  const colorMap = [
    '#C9E9F8', // 0
    '#3CE3FF', // 1: active
    '#309EFF', // 2: completed
    '#C9E9F8' // 3: pending
  ]
  return colorMap[status] || '#C9E9F8'
}

// 计算 flex order，实现 S 形排序
const getOrder = (index) => {
  const row = Math.floor(index / COLS_PER_ROW)
  if (row % 2 === 1) {
    return (row + 1) * COLS_PER_ROW - 1 - (index % COLS_PER_ROW)
  }
  return index
}

const isFlowStatus = (status) => status === 2 || status === 1
const getSegmentStatus = (list, index) => list[index + 1]?.status ?? list[index]?.status

export function useProcess(props) {
  const renderList = computed(() => props.list || [])
  const listLen = computed(() => renderList.value.length)

  const rowCount = computed(() => Math.ceil(listLen.value / COLS_PER_ROW))
  const dynamicSpacing = computed(() => {
    if (rowCount.value <= 1) return { mt: 45, mb: 30 }
    if (rowCount.value === 2) return { mt: 35, mb: 25 }
    if (rowCount.value === 3) return { mt: 25, mb: 15 }
    return { mt: 15, mb: 10 }
  })

  const firstStatus = computed(() => renderList.value?.[0]?.status)
  const shouldFlowStartArrows = computed(() => true)
  const startSegmentColor = computed(() => getLineColor(firstStatus.value))

  const vmList = computed(() => {
    const list = renderList.value ?? []
    const len = list.length

    return list.map((item, index) => {
      const row = Math.floor(index / COLS_PER_ROW)
      const col = index % COLS_PER_ROW
      const reverse = row % 2 === 1
      const flowDir = reverse ? 'left' : 'right'
      const isLast = index === len - 1

      const segmentStatus = getSegmentStatus(list, index)
      const lineColor = getLineColor(segmentStatus)

      // 修复弯道和轨道连接处的颜色差异问题
      // 以前：使用渐变色导致首尾颜色不一致 `linear-gradient(to ${flowDir}, rgba(33, 111, 132, 0.3), ${lineColor})`
      // 现在：使用纯色保持轨道和弯道颜色的统一
      let lineBg = lineColor
      if (isLast) {
        // 最后一段保留尾部渐变
        lineBg = `linear-gradient(to ${flowDir}, ${lineColor}, transparent)`
      }

      const shouldRound = item.status === 1
      const roundLeft = shouldRound && reverse
      const roundRight = shouldRound && !reverse

      const curveClass =
        !reverse && col === COLS_PER_ROW - 1 && index + 1 < len
          ? 'line-end'
          : !reverse && col === 0 && row > 0
            ? 'line-start'
            : ''

      const curveStatus =
        curveClass === 'line-end'
          ? getSegmentStatus(list, index)
          : curveClass === 'line-start'
            ? item.status
            : item.status
      const curveColor = getLineColor(curveStatus)

      return {
        key: `${index}-${item.title ?? ''}`,
        item,
        index,
        row,
        col,
        reverse,
        isCurrent: item.status === 1,
        order: getOrder(index),
        textColor: getTextColor(item.status),
        nodeIcon: getNodeIcon(item.status),
        bizIcon: getBusinessIcon(item.title),
        showLineArrows: isFlowStatus(segmentStatus),
        lineClass: {
          'flow-right': !reverse,
          'flow-left': reverse
        },
        lineStyle: {
          background: lineBg,
          borderTopLeftRadius: roundLeft ? '20px' : '0',
          borderBottomLeftRadius: roundLeft ? '20px' : '0',
          borderTopRightRadius: roundRight ? '20px' : '0',
          borderBottomRightRadius: roundRight ? '20px' : '0'
        },
        curveClass,
        curveColor,
        showCurveArrows: !!curveClass && isFlowStatus(curveStatus),
        spacing: dynamicSpacing.value
      }
    })
  })

  return {
    vmList,
    listLen,
    startSegmentColor,
    shouldFlowStartArrows
  }
}
