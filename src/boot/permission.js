// import something here
import mainRoute from 'src/router/mainRoute'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ router, store } /* { app, router, Vue ... } */) => {
    // something to do
    router.beforeEach((to, from, next) => {
        if (store.state.example.mainRoute.length > 0) {
            handleKeepAlive(to)
            next()
        } else {
            router.addRoutes(mainRoute)
            store.commit('example/set_roles', mainRoute)
            next({ ...to, replace: true })
        }
    })
}
/**
 * 把路由拍平
 * 方法二：兼容<layout>按需加载，上面的方法<layout>必须正常引入，不能按需加载
 * @param to
 */
async function handleKeepAlive(to) {
    if (to.matched && to.matched.length > 2) {
        for (let i = 0; i < to.matched.length; i++) {
            const element = to.matched[i]
            if (element.components.default.name === 'Views') {
                to.matched.splice(i, 1)
                await handleKeepAlive(to)
            }
            // 如果没有按需加载完成则等待加载
            if (typeof element.components.default === 'function') {
                await element.components.default()
                await handleKeepAlive(to)
            }
        }
    }
}
