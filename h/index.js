import { VNodeFlags, ChildrenFlags } from './node.js'

function createTextVNode(text) {
    return {
        _isVNode: true,
        // flags 是 VNodeFlags.TEXT
        flags: VNodeFlags.TEXT,
        tag: null,
        data: null,
        // 纯文本类型的 VNode，其 children 属性存储的是与之相符的文本内容
        children: text,
        // 文本节点没有子节点
        childFlags: ChildrenFlags.NO_CHILDREN,
        el: null
    }
}
function normalizeVNodes(children) {
    const newChildren = []
    // 遍历 children
    for (let i = 0; i < children.length; i++) {
        const child = children[i]
        if (child.key == null) {
            // 如果原来的 VNode 没有key，则使用竖线(|)与该VNode在数组中的索引拼接而成的字符串作为key
            child.key = '|' + i
        }
        newChildren.push(child)
    }
    // 返回新的children，此时 children 的类型就是 ChildrenFlags.KEYED_VNODES
    return newChildren
}
// function h() {
//     return {
//         _isVNode: true,
//         flags: VNodeFlags.ELEMENT_HTML,
//         tag: 'h1',
//         data: null,
//         children: null,
//         childFlags: ChildrenFlags.NO_CHILDREN,
//         el: null
//     }
// }
/**
 * 循序渐进的设计，我们先给node进行分类
 * 1、html/svg(tag - string)
 * 2、组件（这组件又可以细分成好多好多） - (tag - fn)
 * 3、纯文本(tag - null)
 * 4、Fragment(tag - null) —— 抽象的根元素，类似于 template 最外层
 * 5、Portal(tag - null) —— 其tag是存储的挂载的全局的目标
 */
/**
 * 1、不需要 _isVNode
 * 2、flags可以用 tag 来逆推
 * - tag 入选
 * - data 入选
 * - children 入选
 * - el
 */
export const Fragment = Symbol()
export const Portal = Symbol()
export function h(tag, data = null, children = null) {
    let flags = null
    let childFlags = null
    let _isVNode = true
    /**
     * 确定flags
     */
    if (typeof tag === 'string') {
        // svg/html
        flags = tag === 'svg' ? VNodeFlags.ELEMENT_SVG : VNodeFlags.ELEMENT_HTML
    } else if (tag === Fragment) {
        flags = VNodeFlags.Fragment
    } else if (tag === Portal) {
        flags = VNodeFlags.Portal
        tag = data && data.target
    } else {
        // 兼容Vue2的对象式组件
        if (tag !== null && typeof tag === 'object') {
            flags = tag.functional ?
                VNodeFlags.COMPONENT_FUNCTIONAL : // 函数式组件
                VNodeFlags.COMPONENT_STATEFUL_NORMAL // 有状态组件
        } else if (typeof tag === 'function') {
            // vue3组件
            flags = tag.prototype && tag.prototype.render ?
                VNodeFlags.COMPONENT_STATEFUL_NORMAL :
                VNodeFlags.COMPONENT_FUNCTIONAL
        }
    }
    /**
     * 确定 childrenFlag
     */
    if (Array.isArray(children)) {
        const { length } = children
        if (length === 0) {
            childFlags = ChildrenFlags.NO_CHILDREN
        } else if (length === 1) {
            // 单个子节点
            childFlags = ChildrenFlags.SINGLE_VNODE
        } else {
            // 多节点，并且子节点使用key
            childFlags = ChildrenFlags.KEYED_VNODES
            children = normalizeVNodes(children)
        }
    } else if (children === null) {
        childFlags = ChildrenFlags.NO_CHILDREN
    } else if (children._isVNode) {
        // 单个子节点
        childFlags = ChildrenFlags.SINGLE_VNODE
    } else {
        // 其他都当文本节点处理，即单个子节点
        childFlags = ChildrenFlags.SINGLE_VNODE
        children = createTextVNode(children + '')
    }
    
    return {
        _isVNode,
        flags,
        tag,
        data,
        children,
        childFlags,
        el: null
    }
}