export default {
    set_roles(state, context) {
        const arr = []
        context.forEach(item => {
            if (item.root) {
                arr.push(...item.children)
            }
        })
        const filter = (ele = arr) => {
            ele.forEach((item, i) => {
                if (item.hidden) {
                    ele.splice(i, 1)
                }
                if (!!item.children) {
                    filter(item.children)
                }
            })
        }
        filter()
        console.log(arr)
        state.mainRoute = arr
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
