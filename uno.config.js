/*
 * @Author: wangyu
 * @Date: 2025-03-12 16:24:18
 * @LastEditTime: 2025-06-12 11:11:03
 * @LastEditors: wangyu
 * @Description:
 * @FilePath: \statistics-bigscreen\uno.config.js
 */
import { defineConfig } from 'unocss'
export default defineConfig({
  rules: [
    ['font-size-39px', { 'font-size': '39px' }],
    [
      'color-lineGreen',
      {
        background: 'linear-gradient(180deg, #FFFFFF 0%, #14DA6A 100%)',
        'text-transform': 'none',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'font-style': 'normal',
      },
    ],
    [
      'color-lineGreen1',
      {
        background: 'linear-gradient(180deg, #14DA6A 0%, #FFFFFF 80%)',
        'text-transform': 'none',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'font-style': 'normal',
      },
    ],
    [
      'color-lineBlue',
      {
        background: 'linear-gradient(180deg, #FFFFFF 0%, #36E2FF 100%)',
        'text-transform': 'none',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'font-style': 'normal',
      },
    ],
    [
      'color-lineBlue1',
      {
        background: 'linear-gradient(180deg, #FFFFFF 0%, #18C7E2 100%)',
        'text-transform': 'none',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'font-style': 'normal',
      },
    ],
    [
      'color-lineBlue2',
      {
        background: 'linear-gradient(180deg, #FFFFFF 0%, #0AA7FF 100%)',
        'text-transform': 'none',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'font-style': 'normal',
      },
    ],
    [
      's-color-tLineBlue',
      {
        background: 'linear-gradient(180deg,  #31BEFF 0%, #ffffff 25%)',
        'text-transform': 'none',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'font-style': 'normal',
      },
    ],
    [
      'color-tLineBlue',
      {
        // linear-gradient(180deg, #4bb4e5 0%, #ffffff 75%)
        background: 'linear-gradient(180deg, #4bb4e5 0%, #ffffff 100%)',
        'text-transform': 'none',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'font-style': 'normal',
      },
    ],
    [
      'color-lineYellow',
      {
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F4EB36 100%)',
        'text-transform': 'none',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'font-style': 'normal',
      },
    ],
    [
      'color-lineOrange',
      {
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EC7F1C 100%)',
        'text-transform': 'none',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'font-style': 'normal',
      },
    ],
  ],
})
