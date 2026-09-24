import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import { babel } from '@rollup/plugin-babel'
import UnoCSS from 'unocss/vite'
const str = '/api'
const reg = new RegExp(str)
// https://vitejs.dev/config/
export default defineConfig({
  // 基本公共路径
  // base: '/PriceIndex/',
  // 静态资源服务文件夹
  publicDir: 'public',
  // 开发环境服务配置
  server: {
    host: '0.0.0.0',
    open: false,
    port: 5173,
    proxy: {
      [str]: {
        changeOrigin: true,
        // 测试环境
        // target: 'http://10.1.2.32:18802/',
        // 生产环境
        target: 'http://10.8.10.99:19181',
        rewrite: (path) => path.replace(reg, '')
        // 环境一
        // target: 'http://127.0.0.1:19181'
        // 环境二
        // target: "https://cap.jjxxw.cq.gov.cn:10094",
        // 陈松本地服务
        // target: 'http://192.168.8.4:19181'
      }
    }
  },
  // 打包配置
  build: {
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    assetsInlineLimit: '4096', // 小于此阈值的导入或引用资源将内联为base64编码，设置为0可禁用此项。默认4096（4kb）
    cssCodeSplit: true, // 启用/禁用CSS代码拆分，如果禁用，整个项目的所有CSS将被提取到一个CSS文件中,默认true
    sourcemap: false, // 构建后是否生成 source map 文件
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    write: true, //设置为 false 来禁用将构建后的文件写入磁盘
    emptyOutDir: true, //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    brotliSize: true, //启用/禁用 brotli 压缩大小报告
    chunkSizeWarningLimit: 500, //chunk 大小警告的限制
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }, //去除 console debugger
    cssTarget: 'chrome70', // 注意添加css的低版本兼容，当然也可以配置PostCssPresetEnv
    target: 'es2015', // 使用esbuild将代码转换为ES5
    rollupOptions: {
      plugins: [
        // https://www.npmjs.com/package/@rollup/plugin-babel
        babel({
          babelHelpers: 'bundled',
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry', // 注意这里只能使用 entry
                corejs: '3',
                targets: 'last 2 versions and not dead, > 0.2%, Firefox ESR'
              }
            ]
          ],
          plugins: [],
          compact: false
        })
      ]
    }
  },
  // @：直接表示 src 目录
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    viteCompression({
      threshold: 1024000 // 对大于 1mb 的文件进行压缩
    }),
    legacy({
      targets: ['defaults', 'ie >= 11', 'chrome 52'], //需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    })
  ],
  // css编译器配置
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
})
