import {template} from 'lodash'

const es6Test = () => {
    console.log('hhh')
}
es6Test()

const compiler = template('<h1>我是标题111</h1>')
const html = compiler()

document.getElementById('app').innerHTML = html
