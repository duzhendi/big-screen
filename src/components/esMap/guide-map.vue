<template>
  <div class="guide-map">
    <div id="guide-map"></div>
  </div>
</template>
<script setup>
import mapData from "@/views/modules/dp/components/esMap/hainan.json"
import {cityMapData} from './map'
import * as echarts from "echarts";
// 处理 mapJson 数据 
const initMap = (data, centerValue, sansha = false) => {
  const myEcharts = echarts.init(document.getElementById("guide-map"));
  echarts.registerMap('海南', data);
  
  const options = {
    tooltip: {
      triggerOn: "mousemove",
      formatter: function (e) {
        return e.name + "：" + (e.value ? e.value : 0);
      },
      show: false,
    },
    geo: {
      map: '海南', //上面引入的数据名
      show: true,
      roam: false, //关闭拖拽
      zoom: sansha ? 1 : 9, //当前视角缩放比例
      selectedMode: true, //是否支持选中
      center: centerValue,
      label: {
        // 文字
        show: false,
        color: "#000",
        fontSize: 10,
      },
      itemStyle: {
        // 地图样式
        areaColor: "#02225D", //区域颜色2,34,93
        borderColor: "rgba(21,75,188,0.8)", //边框颜色
        borderWidth: 1,
      },
      emphasis: {
        disabled: true,

        // 鼠标移入时显示的默认样式
        itemStyle: {
          areaColor: "red",
          borderColor: "#E6A23C",
          borderWidth: 1,
        },
        label: {
          // 文字
          show: true,
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
        },
      },
      select: {
        //选中显示设置
        disabled: true,
        label: {
          color: "#000",
        },
        itemStyle: {
          areaColor: "#9DE3FF", //选中后的背景颜色
        },
      },
    },
    series: [
      //配置数据的显示
      {
        type: "map", //类型map
        geoIndex: 0, //指定geo属性后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
        label: {
          show: false, // 默认显示所有标签
        },
        itemStyle: {
          areaColor: "red", // 设置统一的颜色为红色
          borderColor: "#fff", // 边界颜色可以根据需要设置
          borderWidth: 1,
        },
        data: [],
      },
    ],
  };

  myEcharts.setOption(options);

  // 点击事件
  myEcharts.on('click', params => {
    console.log(params, 111)
  })

  window.addEventListener('resize', () => {
    myEcharts.setOption(options);
  })
};


const changeMap = (params) => {
  if (params.adcName === 'hainan') {
    initMap(mapData, ['109.93', '19.08']);
  } else {
    initMap(cityMapData[params.adc], [], params.adc === '460300000000');
  }
}

onMounted(() => {
  initMap(mapData, ['109.93', '19.08']);
})

defineExpose({ changeMap });
</script>
<style lang="scss" scoped>
.guide-map {
  width: 100%;
  height: 100%;
  #guide-map {
    width: 323px;
    height: 101px;
  }
}

</style>
