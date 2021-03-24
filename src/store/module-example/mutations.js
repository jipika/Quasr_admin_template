export default {
    set_roles(state, context) {
        const filter = (ele = context[0].children) => {
            return ele
                .filter(item => {
                    return !item.hidden && !item.redirect
                })
                .map(i => {
                    // Object.assign 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
                    // 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性
                    i = Object.assign({}, i)
                    if (!!i.children) {
                        i.children = filter(i.children)
                    }
                    return i
                })
        }

        state.mainRoute = filter()
    },
    set_navigation(state, context) {
        state.activateKeepLive.push(context)
        this.commit('example/set_keeplive')
    },
    del_navigation(state, context) {
        state.activateKeepLive.splice(context, 1)
        this.commit('example/set_keeplive')
    },
    set_keeplive(state, context) {
        state.keepLive = state.activateKeepLive.map(item => {
            return item.name
        })
    }
}
