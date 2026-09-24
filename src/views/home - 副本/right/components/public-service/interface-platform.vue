<template>
  <div class="interface-platform">
    <FourTitle title="接口平台" width="auto" height="24px" />
    <div class="tab-container">
      <div class="tab2-container">
        <div class="table-container">
          <div class="thead">
            <div class="thcell" :class="`col_${thindex + 1}`" v-for="(thcell, thindex) in columns" :key="thindex">
              {{ thcell.label }}
            </div>
          </div>
          <div ref="tbodyShellRef" class="tbody-shell">
            <div
              ref="tbodyRef"
              class="tbody"
              @mouseenter="stopAutoScroll"
              @mouseleave="startAutoScroll"
              @scroll="handleTbodyScroll"
            >
              <div class="tbrow" v-for="(row, index) in currentRows" :key="`${row.id}-${index}`">
                <div class="tbcell col_1">{{ index + 1 }}</div>
                <div class="tbcell col_2" :title="row.name">
                  {{ row.name }}
                </div>
                <div class="tbcell col_3" :title="row.org">{{ row.org }}</div>
                <div class="tbcell col_4 tbcell_tag">
                  <div class="tag-list">
                    <span
                      v-for="tag in getVisibleTags(row.tags)"
                      :key="tag.label"
                      class="tag-item"
                      :class="tag.className"
                    >
                      {{ tag.label }}
                    </span>
                    <div
                      v-if="row.tags.length > 1"
                      class="tag-popover"
                      @mouseenter="openTagPopover(row, $event)"
                      @mouseleave="scheduleClosePopover"
                    >
                      <span class="tag-item tag-item--more">+{{ row.tags.length - 1 }}</span>
                    </div>
                  </div>
                </div>
                <div class="tbcell col_5 tbcell_operation">
                  <div
                    class="intro-popover"
                    @mouseenter="openIntroPopover(row, $event)"
                    @mouseleave="scheduleClosePopover"
                  >
                    <span class="operation-text">简介</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="popover-layer">
              <div
                v-if="activePopover"
                ref="popoverPanelRef"
                class="floating-panel-overlay"
                :class="[`floating-panel-overlay--${activePopover.type}`, `is-placement-${activePopover.placement}`]"
                :style="popoverStyle"
                @mouseenter="cancelClosePopover"
                @mouseleave="scheduleClosePopover"
              >
                <span class="floating-panel-overlay__arrow" :style="popoverArrowStyle"></span>
                <template v-if="activePopover.type === 'tags'">
                  <span
                    v-for="tag in activePopover.tags"
                    :key="`${activePopover.rowId}-${tag.label}`"
                    class="tag-item"
                    :class="tag.className"
                  >
                    {{ tag.label }}
                  </span>
                </template>
                <template v-else>
                  {{ activePopover.intro }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import FourTitle from '@/components/titles/four-title.vue'
const DEFAULT_ROW_STRIDE = 42
const AUTO_SCROLL_INTERVAL = 5000
const SHELL_PADDING = 12
const TAG_PANEL_GAP = 10
const INTRO_PANEL_GAP = 16
const POPOVER_CLOSE_DELAY = 120
const tbodyShellRef = ref(null)
const tbodyRef = ref(null)
const popoverPanelRef = ref(null)
const visibleRowCount = ref(1)
const currentPage = ref(0)
const activePopover = ref(null)
const popoverStyle = ref({})
const popoverArrowStyle = ref({})
const columns = [
  { key: 'order', label: '序号', className: 'col_1' },
  { key: 'name', label: '名称', className: 'col_2' },
  { key: 'org', label: '运营机构', className: 'col_3' },
  { key: 'tags', label: '标签', className: 'col_4' },
  { key: 'operation', label: '操作', className: 'col_5' }
]

const platformRows = [
  {
    id: 'district-1',
    order: '1',
    name: '万州区中小企业公共服务窗口平台',
    org: '重庆优快人力资源管理有限公司',
    intro:
      '重庆优快人力资源管理有限公司经营多元化的人力资源业务，致力于搭建综合人力资源服务平台，帮助企业组建团队，让人才更有价值。自2007年4月在万州成立以来，发展了网上招聘、现场招聘、代理招聘、劳务派遣、劳务外包、社保服务、人才培训、职业介绍、创业服务等领先业务。公司现有团队100余人，其目标是构建一个开放、协同、繁荣的人力资源服务生态系统。',
    tags: [
      { label: '区县窗口平台', className: 'tag-item--gold' },
      { label: '国家级示范平台', className: 'tag-item--cyan' },
      { label: '市级示范平台', className: 'tag-item--gold' },
      { label: '2023年最受欢迎区县窗口平台', className: 'tag-item--cyan' }
    ]
  },
  {
    id: 'district-2',
    order: '2',
    name: '荣昌区中小企业公共服务窗口平台',
    org: '重庆市荣昌区兴荣中小企业服务中心',
    intro:
      '重庆市荣昌区中小企业公共服务平台是经重庆市中小企业局、重庆市荣昌区经济和信息化委员会批准，按照重庆市“1+39+N”公共服务平台体系整体建设成立的区县窗口服务平台，在重庆市中小企业局和荣昌区经信委等相关部门的指导下开展工作。 重庆市荣昌区中小企业公共服务平台以“建平台”“聚资源”“促发展”为目标导向，聚集和引进全国优势服务资源和能力，面向荣昌区中小企业广泛开展政务服务、企业商服、人才服务、金融服务、管理咨询服务、信息化服务、法律服务、知识产权服务、安全与环保、综合事务代理等一站式服务。',
    tags: [{ label: '区县窗口平台', className: 'tag-item--gold' }]
  },
  {
    id: 'district-3',
    order: '3',
    name: '梁平区中小企业公共服务窗口平台',
    org: '重庆衡丰远拓会计咨询有限公司',
    intro:
      '重庆衡丰远拓会计咨询有限公司是经梁平区财政局批准成立的会计咨询机构，公司拥有多名注册会计师、资产评估师、房地产估价师、土地估价师、造价工程师等专业人员，技术力量雄厚；公司现有中级职称专业人员3名，本科以上学历5名，从业人员均为大专以上学历，年龄35岁以下占比80%以上，是一支技术力量雄厚，年龄结构合理、朝气蓬勃、积极向上的队伍。 公司始终坚持“创新超越，合作共赢”的方针，以创新作为发展动力和源泉，以双赢为合作目标，以“客户至上、服务贴心、质量优先”为原则，遵守职业道德，严守客户的商业秘密，为客户提供全面、优质、专业化的服务。',
    tags: [
      { label: '区县窗口平台', className: 'tag-item--gold' },
      { label: '2023年最受欢迎区县窗口平台', className: 'tag-item--cyan' }
    ]
  },
  {
    id: 'district-4',
    order: '4',
    name: '南川区中小企业公共服务窗口平台',
    org: '重庆市南川区中小企业创业服务中心',
    intro:
      '重庆市南川区中小企业创业服务中心位于南川区成教中心一楼，现有服务场地共1200余平，专职服务人员25人，行业专家4人。致力于为全区中小企业提供全方位、社会化、专业化服务，是政府主管部门的参谋和助手，联系专业组织的纽带和桥梁，全区中小企业服务体系的核心机构。遵循“求真务实、开拓创新、追求卓越”的服务精神，为中小企业提供高效、优质、快捷服务。服务范围涵盖“信息、创业、融资、法律财税、人才培训、市场开拓、管理咨询、技术创新和质量”八个方面，设立信息服务部、创业服务部、项目服务部、融资服务部、科技服务部等多个部室。聚集服务机构40余家，年服务企业2000余家次，年融资服务上亿元。',
    tags: [
      { label: '区县窗口平台', className: 'tag-item--gold' },
      { label: '国家级示范平台', className: 'tag-item--cyan' },
      { label: '市级示范平台', className: 'tag-item--gold' },
      { label: '2023年最受欢迎区县窗口平台', className: 'tag-item--cyan' }
    ]
  },
  {
    id: 'district-5',
    order: '5',
    name: '大渡口区中小企业公共服务窗口平台',
    org: '重庆凌山企业管理有限公司',
    intro:
      '重庆凌山中小企业公共服务示范平台坐落于重庆市大渡口区天安数码城园区，占地1700㎡，近四年来得到了飞速发展，在2021年12月被评定为市级公共服务示范平台。2021年9月——被重庆市商务委员会——评定为重庆市市级电子商务发展服务支撑项目，2021-2022连续两年被大渡口区人力资源社会保障局评定为A级劳动保障诚信企业，2023年获得工信部颁发的第四批中小企业志愿服务工作站，并且 3 名工作人员获得中小企业志愿服务的荣誉称号，拥有强大的公信力背书。 平台聚集了多家专业机构，比如和马来西亚城市大学和商学院、四川外国语大学外等10家高校签订了战略合作，与重庆港城工业园等八个产业园签订了战略合作，与重庆盛世文辉律所等五家专业律所有着深度合作，与UPS重庆公司、dhl等国际国内快递签订了战略合作，致力于打造成为一家综合性、专业性的的服务平台。2022年成立集群企孵化基地，帮助企业成长和发展！主营业务涉及创业孵化、政务代理、管理咨询、政策咨询、外贸咨询、专利代理、国际国内物流咨询等综合业务，是一家针对全重庆市中小企业成长和发展，开展360度服务的综合性企业服务平台，目前有400家会员企业！平台拥有一支素养高、实战经验足、专业服务能力强、涉足领域广、执行力强的团队。 目前平台管理团队拥有硕士研究生4人，海外留学生1人，国家高级工程师5人，本科以上学历19人.在重庆市政府各部门的精心指导和大力支持下，本平台一直坚持做最落地、最有特色的企业综合服务平台，承担着重庆市中小企业“走出去，请进来”的责任和使命，是推行国家“一带一路”项目的践行者，为重庆市中小企业的成长和发展提供一站式综合服务。',
    tags: [
      { label: '区县窗口平台', className: 'tag-item--gold' },
      { label: '市级示范平台', className: 'tag-item--cyan' }
    ]
  },
  {
    id: 'district-6',
    order: '6',
    name: '九龙坡区中小企业公共服务窗口平台',
    org: '重庆市龙商融资担保有限责任公司',
    intro:
      '九龙坡区中小企业公共服务窗口平台成立于2021年4月，是经区政府批准同意、市经信委备案许可。着力为九龙坡区中小企业提供融资咨询、法律服务、信息服务、创业服务、人才培训、技术创新和质量服务、管理咨询、市场开拓等服务项目，解决企业日常经营管理过程中的各类需求。龙商担保公司（属国有企业）成为窗口平台的运营机构，以融资担保为特色，以降低担保费率、创新反担保措施为抓手，以提质增资为指导方针，将在小微企业普惠金融服务领域推出一系列创新措施，为产品有市场、项目有前景、技术有竞争力但融资渠道不畅的小微企业，尤其是高新技术企业、“专精特新”企业保驾护航，并为企业提供专项资金申报服务，助力实体企业健康良性的发展。',
    tags: [{ label: '区县窗口平台', className: 'tag-item--gold' }]
  },
  {
    id: 'district-7',
    order: '7',
    name: '大足区中小企业公共服务窗口平台',
    org: '重庆市大足区仁致科技咨询有限公司',
    intro:
      '重庆市大足区仁致科技咨询有限公司于2017年6月1日正式成立，经营范围主要是科技产品信息咨询；科技成果转让、技术服务、市场推广服务；知识产权咨询；商标办理咨询；企业管理咨询；展览展示；会议服务。 我司获重庆市经济和信息化委员会批准设立重庆市大足区中小企业公共服务窗口平台，平台致力为区域内中小企业提供“找得着、用得着、有保障、可信赖”网络公共服务，开展企业政务服务、企业商务服务、人才与培训服务、投融资服务、管理创新咨询服务、信息服务、两化深度整合服务、法律服务、知识产权服务等“线上+线下”贯穿企业生命周期的一站式服务。',
    tags: [
      { label: '区县窗口平台', className: 'tag-item--gold' },
      { label: '市级示范平台', className: 'tag-item--cyan' }
    ]
  },
  {
    id: 'district-8',
    order: '8',
    name: '江北区中小企业公共服务窗口平台',
    org: '硕睿(重庆)企业服务有限公司',
    intro:
      '硕睿中小企业公共服务示范平台成立于2014年12月，由硕睿(重庆)企业服务有限公司具体运营;2017年经重庆市经信委评审认定为市级中小企业公共服务示范平台、市两化融合管理体系贯标服务机构，江北区市场监督管理局认定为江北区重合同守信用企业;作为重庆市科技创新协会常务理事单位、重庆市青年创新创业促进会会员;硕睿平台是集合知识产权、项目申报、体系认证、工商财税、网络广告、上市辅导等创新创业服务为一体的企业全方位服务平台;现有员工51名平均从业年限达5年以上、大专以上学历100%;为更好地发挥平台服务先锋模范作用于2019年设立非公企业党支部，有正式党员6名，入党积极分子3名。平台先后获得重庆新闻联播、腾讯网、重庆晨报、华龙网、凤凰网、九龙日报等众多媒体报道。我们皆在改变传统单一的基础代理服务模式，改变企业日常商务需求与不同机构合作的繁琐问题，进而定位于为企业提供“全方位的管家式企业服务平台”。 硕睿平台主要采用“互联网 +线下服务“相结合的布局服务模式，即拥有一个集合政策集群、产业共享、商务服务、产学研、知识产权运营、硕睿直播教学为一体的线上服务云平台，于各大区县、工业园区、孵化园、众创空间、行业组织设立线下服务中心，以此提供更加专业化、标准化、便捷化的企业服务工作。',
    tags: [
      { label: '区县窗口平台', className: 'tag-item--gold' },
      { label: '市级示范平台', className: 'tag-item--cyan' }
    ]
  },
  {
    id: 'district-9',
    order: '9',
    name: '云阳县中小企业公共服务窗口平台',
    org: '重庆市云阳县同弘创业孵化中心',
    intro:
      '云阳县中小企业公共服务窗口平台是依托重庆市云阳县同弘创业孵化中心运营的中小企业公共综合窗口服务平台。平台位于云阳县双江街道香山路93号，面积1688.36平米，现有服务人员22人，大专以上19人。按照民办公助、公益服务与有偿服务相结合的服务方式，采取多渠道、高效率、全方位的服务模式，为云阳的中小微企业提供信息服务、创业创新、融资对接、人才培训、技术提升和财务管理、质量咨询、市场开拓、政策法规等服务。先后荣获“国家级中小企业公共服务示范平台”、“重庆市中小企业创业服务重点机构”、“重庆市就业创业工作先进集体”、“市级创业孵化基地”、“市级众创空间”、“市级青创空间”等荣誉。',
    tags: [{ label: '区县窗口平台', className: 'tag-item--gold' }]
  },
  {
    id: 'district-10',
    order: '10',
    name: '开州区中小企业公共服务窗口平台',
    org: '重庆市开州区中小企业公共服务中心',
    intro:
      '重庆市开州区金开中小企业公共服务中心(以下简称金开中心)是经开州区经济信息委批准，区民政局登记注册的民办非企业专业服务机构。是重庆市经济和信息化委员会、重庆市商务委员会授予开州唯一的为全区中小企业服务的综合性服务平台。 金开中心在区政务服务中心服务大厅设有帮办专窗，会同重庆浦里工业公司高新产业公司（浦发集团全资子公司）在工业园区科创中心共同设立了服务站。重庆市商标品牌（开州区）指导站、开州区知识产权综合服务中心、重庆市工业设计赋能中小企业公共服务平台等专业平台在金开中心挂牌运行。现有各类专业技术人才、管理人员16人，兼职创业导师（市级）1人。办公场地1076平方米。 金开中心已为开州2000余家企业提供创业培训、代理记账、融资、项目申报、优质企业梯度培育、商标注册、专利申请、人力资源和法律咨询等服务。被市经济信息委评为“2024年度重庆市最受欢迎中小企业服务机构”。',
    tags: [
      { label: '区县窗口平台', className: 'tag-item--gold' },
      { label: '市级示范平台', className: 'tag-item--cyan' },
      { label: '2023年最受欢迎区县窗口平台', className: 'tag-item--gold' }
    ]
  },
  {
    id: 'industry-1',
    order: '1',
    name: '江津区近贤中小企业公共服务窗口平台',
    org: '重庆近贤房地产开发有限公司',
    intro: '暂无详细介绍。',
    tags: [{ label: '区县窗口平台', className: 'tag-item--gold' }]
  },
  {
    id: 'industry-2',
    order: '2',
    name: '江津区金桥中小企业公共服务窗口平台',
    org: '重庆金桥中小企业服务有限公司',
    intro:
      '平台成立于2014年6月。现有综合服务大厅2个，专业服务人员34人，服务专家22人，服务窗口43个，服务内容25项。平台秉承“集聚社会资源，搭建服务平台；助推企业成长，实现共赢发展”的服务理念，在为企业提供生产、生活服务的基础上，围绕服务区域特色产业、构建特色食品产业链，以提升产业创新服务能力为核心，建设产业创新服务综合体，推动食品及农产品加工产业集聚集约发展；与各类生产性服务资源合资合作，构建完善专业化服务平台；实施优质企业梯度培育，引导企业专精特新发展；建设“酒及饮料”、“肉类及火锅食材”、“调味品”、“植物基食品”、“美食品牌孵化”五大创新中心，构建和服务特色产业集群，提供“保姆式”全方位服务。',
    tags: [
      { label: '区县窗口平台', className: 'tag-item--gold' },
      { label: '市级示范平台', className: 'tag-item--cyan' },
      { label: '2023年最受欢迎区县窗口平台', className: 'tag-item--gold' }
    ]
  },
  {
    id: 'industry-3',
    order: '3',
    name: '九龙坡区西城中小企业公共服务窗口平台',
    org: '重庆市九龙坡区百可中小微企业公共服务中心',
    intro:
      '重庆市九龙坡区百可中小微企业公共服务中心成立于2014年，注册资金100万元，是九龙西城中小微企业公共服务平台、九龙西城科技创新服务中心的运营管理单位。服务中心现有专业服务团队25人，大专以上学历人员占比100%，其中硕士及以上学历5人，占比20%。本科及以上学历21人，占比84%。',
    tags: [{ label: '区县窗口平台', className: 'tag-item--gold' }]
  },
  {
    id: 'industry-4',
    order: '4',
    name: '重庆曙光中小企业公共服务窗口平台',
    org: '重庆曙光都市工业园建设集团有限公司',
    intro: '暂无详细介绍。',
    tags: [{ label: '区县窗口平台', className: 'tag-item--gold' }]
  }
]

const currentRows = computed(() => platformRows)

const getVisibleTags = (tags) => tags.slice(0, 1)
const getHiddenTags = (tags) => tags.slice(1)

let scrollTimer = null
let closePopoverTimer = null
let popoverRafId = null
let activeTriggerEl = null

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const getRowElements = () => {
  const bodyEl = tbodyRef.value
  if (!bodyEl) return []
  return Array.from(bodyEl.querySelectorAll('.tbrow'))
}

const getRowStride = () => {
  const rows = getRowElements()
  if (rows.length > 1) {
    return rows[1].offsetTop - rows[0].offsetTop || DEFAULT_ROW_STRIDE
  }
  if (rows.length === 1) {
    return rows[0].offsetHeight || DEFAULT_ROW_STRIDE
  }
  return DEFAULT_ROW_STRIDE
}

const updateVisibleRowCount = () => {
  const bodyEl = tbodyRef.value
  if (!bodyEl) return
  visibleRowCount.value = Math.max(Math.floor(bodyEl.clientHeight / getRowStride()), 1)
}

const getTotalPages = () => Math.max(Math.ceil(currentRows.value.length / visibleRowCount.value), 1)

const getScrollTopByPage = (page) => {
  const bodyEl = tbodyRef.value
  const rows = getRowElements()
  if (!bodyEl || !rows.length) return 0

  const startIndex = Math.min(page * visibleRowCount.value, rows.length - 1)
  const firstOffsetTop = rows[0].offsetTop
  const targetScrollTop = rows[startIndex].offsetTop - firstOffsetTop
  const maxScrollTop = Math.max(bodyEl.scrollHeight - bodyEl.clientHeight, 0)

  return Math.min(targetScrollTop, maxScrollTop)
}

const scrollToPage = (page, behavior = 'smooth') => {
  const bodyEl = tbodyRef.value
  if (!bodyEl) return

  bodyEl.scrollTo({
    top: getScrollTopByPage(page),
    behavior
  })
}

const cancelClosePopover = () => {
  if (closePopoverTimer) {
    window.clearTimeout(closePopoverTimer)
    closePopoverTimer = null
  }
}

const clearPopoverFrame = () => {
  if (popoverRafId) {
    window.cancelAnimationFrame(popoverRafId)
    popoverRafId = null
  }
}

const closePopover = () => {
  cancelClosePopover()
  clearPopoverFrame()
  activePopover.value = null
  activeTriggerEl = null
  popoverStyle.value = {}
  popoverArrowStyle.value = {}
  startAutoScroll()
}

const scheduleClosePopover = () => {
  cancelClosePopover()
  closePopoverTimer = window.setTimeout(() => {
    closePopover()
  }, POPOVER_CLOSE_DELAY)
}

const updatePopoverPosition = () => {
  if (!activePopover.value || !activeTriggerEl || !tbodyShellRef.value || !popoverPanelRef.value) return

  const shellEl = tbodyShellRef.value
  const shellRect = shellEl.getBoundingClientRect()
  const triggerRect = activeTriggerEl.getBoundingClientRect()
  const panelEl = popoverPanelRef.value
  const scaleX = shellRect.width && shellEl.offsetWidth ? shellRect.width / shellEl.offsetWidth : 1
  const scaleY = shellRect.height && shellEl.offsetHeight ? shellRect.height / shellEl.offsetHeight : 1
  const localLeft = (triggerRect.left - shellRect.left) / scaleX
  const localRight = (triggerRect.right - shellRect.left) / scaleX
  const localTop = (triggerRect.top - shellRect.top) / scaleY
  const localBottom = (triggerRect.bottom - shellRect.top) / scaleY
  const localHeight = triggerRect.height / scaleY
  const panelWidth = panelEl.offsetWidth
  const panelHeight = panelEl.offsetHeight
  const maxLeft = Math.max(shellEl.clientWidth - panelWidth - SHELL_PADDING, SHELL_PADDING)
  const maxTop = Math.max(shellEl.clientHeight - panelHeight - SHELL_PADDING, SHELL_PADDING)

  if (activePopover.value.type === 'tags') {
    const shouldPlaceTop = localTop >= panelHeight + TAG_PANEL_GAP + SHELL_PADDING
    const top = shouldPlaceTop ? localTop - panelHeight - TAG_PANEL_GAP : localBottom + TAG_PANEL_GAP
    const left = clamp(localRight - panelWidth, SHELL_PADDING, maxLeft)
    const arrowLeft = clamp(localRight - left - 20, 18, panelWidth - 18)

    activePopover.value = {
      ...activePopover.value,
      placement: shouldPlaceTop ? 'top' : 'bottom'
    }
    popoverStyle.value = {
      top: `${clamp(top, SHELL_PADDING, maxTop)}px`,
      left: `${left}px`
    }
    popoverArrowStyle.value = {
      left: `${arrowLeft}px`
    }
    return
  }

  const shouldPlaceLeft = localLeft >= panelWidth + INTRO_PANEL_GAP + SHELL_PADDING
  const left = shouldPlaceLeft ? localLeft - panelWidth - INTRO_PANEL_GAP : localRight + INTRO_PANEL_GAP
  const top = clamp(localTop + localHeight / 2 - panelHeight / 2, SHELL_PADDING, maxTop)
  const arrowTop = clamp(localTop + localHeight / 2 - top, 18, panelHeight - 18)

  activePopover.value = {
    ...activePopover.value,
    placement: shouldPlaceLeft ? 'left' : 'right'
  }
  popoverStyle.value = {
    top: `${top}px`,
    left: `${clamp(left, SHELL_PADDING, maxLeft)}px`
  }
  popoverArrowStyle.value = {
    top: `${arrowTop}px`
  }
}

const queuePopoverPositionUpdate = () => {
  if (!activePopover.value) return

  nextTick(() => {
    clearPopoverFrame()
    popoverRafId = window.requestAnimationFrame(() => {
      updatePopoverPosition()
    })
  })
}

const openPopover = (payload, event) => {
  cancelClosePopover()
  stopAutoScroll()
  activeTriggerEl = event.currentTarget
  activePopover.value = {
    ...payload,
    placement: payload.type === 'intro' ? 'left' : 'top'
  }
  queuePopoverPositionUpdate()
}

const openTagPopover = (row, event) => {
  openPopover(
    {
      type: 'tags',
      rowId: row.id,
      tags: getHiddenTags(row.tags)
    },
    event
  )
}

const openIntroPopover = (row, event) => {
  openPopover(
    {
      type: 'intro',
      rowId: row.id,
      intro: row.intro
    },
    event
  )
}

const stopAutoScroll = () => {
  if (scrollTimer) {
    window.clearInterval(scrollTimer)
    scrollTimer = null
  }
}

const tickAutoScroll = () => {
  const totalPages = getTotalPages()
  if (totalPages <= 1) return

  if (currentPage.value < totalPages - 1) {
    currentPage.value += 1
    scrollToPage(currentPage.value)
    return
  }

  currentPage.value = 0
  scrollToPage(0, 'auto')
}

const startAutoScroll = () => {
  stopAutoScroll()

  if (activePopover.value) return
  if (getTotalPages() <= 1) return

  scrollTimer = window.setInterval(() => {
    tickAutoScroll()
  }, AUTO_SCROLL_INTERVAL)
}

const resetAutoScroll = () => {
  stopAutoScroll()
  currentPage.value = 0

  nextTick(() => {
    updateVisibleRowCount()
    scrollToPage(0, 'auto')
    startAutoScroll()
  })
}

const handleResize = () => {
  resetAutoScroll()
}

const handleTbodyScroll = () => {
  if (activePopover.value) {
    queuePopoverPositionUpdate()
  }
}

watch(
  () => currentRows.value.length,
  () => {
    closePopover()
    resetAutoScroll()
  }
)

onMounted(() => {
  nextTick(() => {
    updateVisibleRowCount()
    startAutoScroll()
  })

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelClosePopover()
  clearPopoverFrame()
  stopAutoScroll()
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.interface-platform {
  display: flex;
  flex-direction: column;
  height: 330px;
  margin-top: 8px;
  min-height: 0;
  font-family: Alibaba-PuHuiTi-2;

  .tab-container {
    box-sizing: border-box;
    flex: 1;
    height: 0;
    margin-top: 8px;
    min-height: 0;
    position: relative;
  }

  .tab2-container {
    position: absolute;
    width: 100%;
    height: 75%;
    color: #dff6ff;
    overflow: hidden;
  }

  .table-container {
    width: 100%;
    height: 100%;
    margin-top: 0;

    .thead {
      width: 100%;
      height: 32px;
      font-size: 14px;
      padding: 0 16px;
      background: url('./images/img_多部门联合赋能列表页头@2x.png') no-repeat center center;
      background-size: 100% 32px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      box-sizing: border-box;
    }

    .tbody-shell {
      position: relative;
      width: 100%;
      height: calc(100% - 32px);
      overflow: visible;

      .tbody {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: rgba(110, 213, 255, 0.72) rgba(8, 33, 66, 0.36);

        &::-webkit-scrollbar {
          width: 8px;
        }

        &::-webkit-scrollbar-track {
          background: rgba(8, 33, 66, 0.36);
          border-radius: 999px;
        }

        &::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(118, 221, 255, 0.92) 0%, rgba(46, 145, 255, 0.82) 100%);
          border: 1px solid rgba(197, 243, 255, 0.24);
          border-radius: 999px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(152, 232, 255, 0.96) 0%, rgba(67, 167, 255, 0.9) 100%);
        }
      }

      .tbrow {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-top: 2px;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        box-sizing: border-box;

        .tbcell {
          height: 100%;
          font-family: Alibaba-PuHuiTi-2;
          font-size: 14px;
          color: #eff8ff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }

        .tbcell_tag {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          overflow: visible;

          .tag-list {
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 0;
            flex-wrap: nowrap;
            overflow: visible;

            .tag-item {
              flex-shrink: 0;
              max-width: 100%;
              height: 28px;
              padding: 0 10px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 700;
              line-height: 12px;
              white-space: nowrap;
              box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);

              &.tag-item--gold {
                color: #f3b325;
                background: linear-gradient(180deg, rgba(102, 74, 10, 0.96) 0%, rgba(75, 56, 12, 0.96) 100%);
                border: 1px solid rgba(185, 144, 34, 0.55);
              }

              &.tag-item--cyan {
                color: #3ce3ff;
                background: linear-gradient(180deg, rgba(15, 77, 109, 0.96) 0%, rgba(14, 56, 89, 0.96) 100%);
                border: 1px solid rgba(49, 178, 222, 0.5);
              }

              &.tag-item--more {
                min-width: 24px;
                color: #eef7ff;
                background: linear-gradient(180deg, rgba(109, 123, 138, 0.96) 0%, rgba(88, 101, 118, 0.96) 100%);
                border: 1px solid rgba(154, 169, 185, 0.45);
                cursor: pointer;
              }
            }

            .tag-popover {
              display: inline-flex;
              align-items: center;
              cursor: pointer;
            }
          }
        }

        .tbcell_operation {
          overflow: visible;
          white-space: normal;
          .intro-popover {
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;

            .operation-text {
              font-size: 14px;
              font-weight: 700;
              color: #58d9ff;
              line-height: 14px;
              cursor: pointer;
              transition: color 0.2s ease;

              &:hover {
                color: #8ee8ff;
              }
            }
          }
        }
      }

      .tbrow:nth-of-type(2n) {
        background: rgba(11, 37, 65, 0.82);
      }

      .tbrow:nth-of-type(2n + 1) {
        background: rgba(15, 46, 80, 0.92);
      }

      .popover-layer {
        position: absolute;
        inset: 0;
        overflow: visible;
        pointer-events: none;
        z-index: 40;

        .floating-panel-overlay {
          position: absolute;
          box-sizing: border-box;
          pointer-events: auto;

          .floating-panel-overlay__arrow {
            position: absolute;
            width: 12px;
            height: 12px;
          }

          &.floating-panel-overlay--tags {
            min-width: 220px;
            max-width: 320px;
            padding: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            background: linear-gradient(180deg, rgba(8, 54, 106, 0.98) 0%, rgba(8, 33, 66, 0.98) 100%);
            border: 1px solid rgba(88, 170, 255, 0.42);
            border-radius: 8px;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.24);

            .tag-item {
              flex-shrink: 0;
              max-width: 100%;
              height: 28px;
              padding: 0 10px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 700;
              line-height: 12px;
              white-space: nowrap;
              box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
            }

            .tag-item--gold {
              color: #f3b325;
              background: linear-gradient(180deg, rgba(102, 74, 10, 0.96) 0%, rgba(75, 56, 12, 0.96) 100%);
              border: 1px solid rgba(185, 144, 34, 0.55);
            }

            .tag-item--cyan {
              color: #3ce3ff;
              background: linear-gradient(180deg, rgba(15, 77, 109, 0.96) 0%, rgba(14, 56, 89, 0.96) 100%);
              border: 1px solid rgba(49, 178, 222, 0.5);
            }

            &.is-placement-top {
              .floating-panel-overlay__arrow {
                bottom: -7px;
                background: rgba(8, 33, 66, 0.98);
                border-bottom: 1px solid rgba(88, 170, 255, 0.42);
                border-right: 1px solid rgba(88, 170, 255, 0.42);
                transform: translateX(-50%) rotate(45deg);
              }
            }

            &.is-placement-bottom {
              .floating-panel-overlay__arrow {
                top: -5px;
                background: rgba(8, 54, 106, 0.98);
                border-top: 1px solid rgba(88, 170, 255, 0.42);
                border-left: 1px solid rgba(88, 170, 255, 0.42);
                transform: translateX(-50%) rotate(45deg);
              }
            }
          }

          &.floating-panel-overlay--intro {
            width: 480px;
            max-height: 176px;
            padding: 18px 20px;
            overflow-y: auto;
            background: linear-gradient(90deg, rgba(18, 76, 152, 0.98) 0%, rgba(8, 43, 92, 0.98) 100%);
            border: 1px solid rgba(98, 181, 255, 0.58);
            border-radius: 12px;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.28);
            font-size: 14px;
            line-height: 24px;
            color: rgba(226, 246, 255, 0.96);
            text-align: left;
            white-space: normal;
            word-break: break-all;
            overflow-wrap: anywhere;
            scrollbar-width: thin;
            scrollbar-color: rgba(110, 213, 255, 0.78) rgba(8, 33, 66, 0.32);

            &::-webkit-scrollbar {
              width: 6px;
            }

            &::-webkit-scrollbar-track {
              background: rgba(8, 33, 66, 0.32);
              border-radius: 999px;
            }

            &::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, rgba(124, 224, 255, 0.9) 0%, rgba(55, 155, 255, 0.78) 100%);
              border-radius: 999px;
            }

            &.is-placement-left {
              .floating-panel-overlay__arrow {
                right: -7px;
                background: rgba(8, 43, 92, 0.98);
                border-top: 1px solid rgba(98, 181, 255, 0.58);
                border-right: 1px solid rgba(98, 181, 255, 0.58);
                transform: translateY(-50%) rotate(45deg);
              }
            }

            &.is-placement-right {
              .floating-panel-overlay__arrow {
                left: -5px;
                background: rgba(18, 76, 152, 0.98);
                border-bottom: 1px solid rgba(98, 181, 255, 0.58);
                border-left: 1px solid rgba(98, 181, 255, 0.58);
                transform: translateY(-50%) rotate(45deg);
              }
            }
          }
        }
      }
    }

    .col_1 {
      width: 10%;
      text-align: center;
      box-sizing: border-box;
      padding: 0 4px;
      flex-shrink: 0;
    }

    .col_2 {
      width: 24%;
      box-sizing: border-box;
      padding: 0 4px;
      flex-shrink: 0;
    }

    .col_3 {
      width: 28%;
      box-sizing: border-box;
      padding: 0 4px;
      flex-shrink: 0;
    }

    .col_4 {
      width: 32%;
      box-sizing: border-box;
      padding: 0 4px;
      flex-shrink: 0;
    }

    .col_5 {
      width: 10%;
      box-sizing: border-box;
      padding: 0 4px;
      flex-shrink: 0;
      text-align: center;
    }
  }
}
</style>
