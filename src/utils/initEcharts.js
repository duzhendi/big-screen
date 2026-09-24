/**
 *  echarts：
 *    dom: 节点
 *    opt: echarts 中 option 参数
 */

import * as echarts from "echarts";

class Charts {
  constructor(dom, opt) {
    this.dom = dom;
    this.opt = opt;
    this.chartObj = echarts.init(dom);
  }

  init() {
    const myChart = this.chartObj;
    this.opt && myChart.setOption(this.opt, true);

    return myChart;
  }

  // 清空图形&清除实例
  clearAndDispose() {
    const _myChart = this.chartObj;
    _myChart.clear();
    _myChart.dispose();
  }
  
  // 自动轮播
  // handleMove(data, endNumber, timeout) {
  //   const _myChart = this.chartObj,
  //     option = this.opt;
  //   let timeOut = "",
  //     timeOut2 = "",
  //     timeOut3 = '',
  //     timeOut4 = '',
  //     currentIndex = 0;

  //   let timeGo = 2000 * (currentIndex + 1)
   
  //   timeOut = setInterval(() => {
  //     const _t = (endNumber + 1) * timeout
  //     if(timeGo == _t) {
  //       clearInterval(timeOut)

  //       timeOut3 = setInterval(() => {
  //         if (Number(option.dataZoom[0].endValue) === data.length - 1) {
  //           option.dataZoom[0].endValue = endNumber;
  //           option.dataZoom[0].startValue = 0;
            
  //           clearInterval(timeOut2)
  //           timeOut2 = null
  //           currentIndex = 0

  //           timeOut4 = setInterval(() => {
  //             _myChart.dispatchAction({
  //               type: "showTip",
  //               seriesIndex: 0,
  //               dataIndex: currentIndex,
  //             });
        
  //             currentIndex++;
  //             timeGo += 2000
  //           }, timeout);
  //         } else {
  //           option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
  //           option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
  //         }
  //         _myChart.setOption(option);
  //       }, timeout)
        
  //     }
  //     if (Number(option.dataZoom[0].endValue) === data.length - 1) {
  //       option.dataZoom[0].endValue = endNumber;
  //       option.dataZoom[0].startValue = 0;
  //     } else {
  //       option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
  //       option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
  //     }
  //     _myChart.setOption(option);
  //   }, (endNumber + 1) * timeout );
   
  //   timeOut2 = setInterval(() => {
  //     _myChart.dispatchAction({
  //       type: "showTip",
  //       seriesIndex: 0,
  //       dataIndex: currentIndex,
  //     });

  //     currentIndex++;
  //     timeGo += 2000
  //   }, timeout);

  //   return {timeOut, timeOut2, timeOut3};
  // }
}

export default Charts;
