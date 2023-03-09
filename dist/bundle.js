
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  // 模仿Vue需要哪些东西？
  /**
   * 节点 => 组件 => 真实dom + 挂载 => 页面
   */
  // 1、如何拼成 vnode，需要把 vnode 先分类（vnode是所谓的原子属性）
  var vNode = /*#__PURE__*/function () {
    function vNode(tag, content) {
      _classCallCheck(this, vNode);
      this.tag = tag;
      this.content = content;
    }
    _createClass(vNode, [{
      key: "render",
      value: function render() {
        var tag = this.tag,
          content = this.content;
        return {
          tag: tag,
          content: content
        };
      }
    }]);
    return vNode;
  }(); // 2、其实每一个Component都是用户自己手动创建的一个新的构造函数
  var YourComp = /*#__PURE__*/function () {
    function YourComp() {
      _classCallCheck(this, YourComp);
    }
    _createClass(YourComp, [{
      key: "render",
      value: function render() {
        // 这里其实就相当于用户自己设计的用户结构
        return {
          tag: 'div',
          content: '用户自定义的组件'
        };
      }
    }]);
    return YourComp;
  }(); // 3、最后将组件拼接变成页面
  // tools - 用于生成原子dom
  var mountElement = function mountElement(node, target) {
    var el = document.createElement(node.tag);
    el.innerHTML = node.content;
    target.appendChild(el);
  };
  var mountComponent = function mountComponent(node, target) {
    // 其实这里只是多了一步实例化的操作，其他都是差不多的
    var instance = new node.tag();
    // 这里其实也区分了有状态组件和无状态组件；
    // 无状态组件是直接
    // const noStatusIns = node.tag()
    instance.$vnode = instance.render();
    mountElement(instance.$vnode, target);
  };
  var render = function render(node, target) {
    console.log(_typeof(node.tag));
    if (typeof node.tag === 'string') {
      // 是普通的html节点
      mountElement(node, target);
    } else {
      mountComponent(node, target);
    }
  };
  var n1 = new vNode('h1', '我是标题').render();
  var n2 = new vNode('p1', '我是一个段落').render();
  var c1 = {
    tag: YourComp
  };
  var app = document.getElementById('app');
  render(n1, app);
  render(n2, app);
  render(c1, app);

}));
