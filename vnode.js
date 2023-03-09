// 其实以下的key值设定取决于你如何设计，基于什么样的原则去设计
// 尽可能保证语义的情况下复用属性

/**
 * tag，节点的名称【如果是 string 则代表是原生的dom；如果是一个构造函数则说明是组件】
 * code，节点名称对应的code
 * class，节点的类名
 * style，内嵌样式 => 同时注意这里的样式是个对象
 * content，元素的内容
 * children，节点的孩子们
 */

/**
 * 关于Vue的 template，就是我们的 Fragment 节点，类似于我们创建 document.createDocumentFragment()
 * 那么，什么是 Portal 页面，我们有一个应用场景，假设我们要实现一个蒙层组件，我们需要将其渲染到任何我们需要蒙层的地方！！
 */

function render(node, target) {

}