
import serve from 'rollup-plugin-serve'
import livereolad from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
export default {
    input: './vue.js',
    output: {
        file: 'dist/bundle.js',
        format: 'umd'
    },
    plugins: [
        commonjs(),
        resolve(),
        babel(),
        serve({
            // 服务器启动的文件夹
            contentBase: 'dist',
            port: '8081'
        }),
        // watch变化的文件夹
        livereolad('./dist')
    ]
}