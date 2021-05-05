import Vue from 'vue'
import request from '@/vue-xlib/request'
import _ from 'lodash'
import fa from 'element-ui/src/locale/lang/fa'

Vue.directive('show', function(el, binding) {
  el.style.display = binding.value ? '' : 'none'
})

Vue.directive('test', function(el, binding, vnode) {
  console.log(vnode)
})

Vue.directive('proxy', {
  inserted: function(el, binding, vnode) {
    const conf = {
      request: request,
      config: {},
      onFulfilled: r => r.data,
      onRejected: r => r
    }
    _.merge(conf, binding.value)
    const pullConf = { config: { method: 'get' }, on: true }
    const pushConf = { config: { method: 'post' }, on: false }
    _.merge(pullConf, conf)
    _.merge(pushConf, conf)
    conf.pull = pullConf
    conf.push = pushConf
    _.merge(conf, binding.value)
    console.log('v-proxy', binding, conf)
    if (conf.pull.on) {
      pull()
    }
    if (conf.push.on) {
      vnode.componentInstance.$on(conf.push.on, push)
    }
    function pull() {
      const { request, config, onFulfilled } = conf.pull
      request(config).then(response => {
        vnode.componentInstance[binding.arg] = onFulfilled(response)
      })
    }
    function push() {
      const { request, config, onFulfilled } = conf.push
      config.data = vnode.componentInstance[binding.arg]
      config.headers = ContentTypeHeader.json
      request(config).then(response => {
        onFulfilled(response)
      })
    }
  }
})

/**
 * 测试src是否具有dst所有可枚举的属性且值都相等(src>dst)
 * 只适用于判断一层深度的对象
 * @returns {boolean}
 * @param dst
 * @param src
 */
export function isObjectEqual(dst, src) {
  if (dst === src) {
    return true
  } else if ((typeof dst === 'object' && dst != null) && (typeof src === 'object' && src != null)) {
    if (Object.keys(dst).length !== Object.keys(src).length) {
      return false
    }
    for (const prop in dst) {
      if (!Object.prototype.hasOwnProperty.call(src, prop)) {
        return false
      } else if (dst[prop] !== src[prop]) {
        return false
      }
    }
  } else {
    return false
  }
  return true
}

/**
 * props:str
 * props:{name:computedName,get:Function,set:Function}
 * get/set just a hook,their result will be ignore
 * @param prop
 * @returns {{set: set, get: (function(): any)}}
 */
export function alias(prop) {
  // props:str
  // props:{name:computedName,get:Function,set:Function}
  // get/set just a hook,their result will be ignore
  const accessor = function(attr, getterHook, setterHook) {
    return {
      get: function() {
        getterHook && getterHook()
        return this.$props[attr]
      },
      set: function(val) {
        setterHook && setterHook(val)
        // console.log('setter', val)
        this.$emit('update:' + attr, val)
      }
    }
  }
  if (typeof prop === 'string') {
    console.log('alias', prop)
    return accessor(prop)
  } else if (prop instanceof Object) {
    return accessor(prop.name, prop.get, prop.set)
  }
}

export function date2mysql(date) {
  return date.toLocaleString().replace(/上午|下午/, '')
}

export function str2minutes(str) {
  const res = str.split(':')
  return res[0] * 60 + res[1] * 1
}

/**
 * 将e-开头的属性所代表的事件和该属性值对应的内部函数注册到事件监听器
 * @param vm
 * @param ref
 */
export function bindEvent(vm, ref) {
  for (const attr of Object.keys(vm.$attrs)) {
    // console.log('attr', attr, vm.$attrs[attr])
    if (attr.startsWith('e-')) {
      vm.$refs[ref].$on(attr.substring(2), vm[vm.$attrs[attr]])
    }
  }
}

export function inheritMethod(vm, ref, methods) {
  for (const name in methods) {
    // console.log('inheritMethod', name)
    vm[name] = methods[name].bind(ref)
  }
  // console.log('vm ', vm)
}

export function download(url, filename) {
  const a = document.createElement('a')
  a.href = '/dev-api/' + url
  a.download = filename
  console.log('download', a)
  a.click()
}
Object.defineProperty(Vue.prototype, 'download', { get() {
  return download
} })

export const ColType = {
  add: 'add',
  mod: 'mod',
  del: 'del'
}

const ContentType = {
  json: 'application/json',
  form_data: 'application/form-data',
  x_www_form_urlencoded: 'application/x-www-form-urlencoded'
}

const ContentTypeHeader = {
  json: { 'Content-Type': ContentType.json },
  form_data: { 'Content-Type': ContentType.form_data },
  x_www_form_urlencoded: { 'Content-Type': ContentType.x_www_form_urlencoded }
}

export { ContentType, ContentTypeHeader }
