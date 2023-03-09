// 模仿Vue需要哪些东西？
/**
 * 节点 => 组件 => 真实dom + 挂载 => 页面
 */

// 1、如何拼成 vnode，需要把 vnode 先分类（vnode是所谓的原子属性）
class vNode {
    constructor(tag, content) {
        this.tag = tag
        this.content = content
    }
    render() {
        const {tag, content} = this
        return {
            tag, content
        }
    }
}

// 2、其实每一个Component都是用户自己手动创建的一个新的构造函数
class YourComp {
    render() {
        // 这里其实就相当于用户自己设计的用户结构
        return {
            tag: 'div',
            content: '用户自定义的组件'
        }
    }
}


// 3、最后将组件拼接变成页面
// tools - 用于生成原子dom
const mountElement = (node, target) => {
    const el = document.createElement(node.tag)
    el.innerHTML = node.content
    target.appendChild(el)
}

const mountComponent = (node, target) => {
    // 其实这里只是多了一步实例化的操作，其他都是差不多的
    const instance = new node.tag()
    // 这里其实也区分了有状态组件和无状态组件；
    // 无状态组件是直接
    // const noStatusIns = node.tag()
    instance.$vnode = instance.render()
    mountElement(instance.$vnode, target)
}

const render = (node, target) => {
    console.log(typeof node.tag)
    if (typeof node.tag === 'string') {
        // 是普通的html节点
        mountElement(node, target)
    } else {
        mountComponent(node, target)
    }
}

const n1 = new vNode('h1', '我是标题').render()
const n2 = new vNode('p1', '我是一个段落').render()

const c1 = {
    tag: YourComp
}

const app = document.getElementById('app')

render(n1, app)
render(n2, app)
render(c1, app)
