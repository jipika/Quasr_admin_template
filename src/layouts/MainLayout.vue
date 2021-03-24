<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-light-blue-9">
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-toolbar-title>
                    <q-scroll-area horizontal style="height: 45px; max-width: 70vw" class="q-mt-sm">
                        <q-chip
                            v-for="(item, index) in activateKeepLive"
                            :key="index"
                            :outline="$route.name == item.name ? false : true"
                            :removable="flag.length > 1"
                            square
                            class="text-caption"
                            @remove="remove(index, item.name)"
                            :color="$route.name == item.name ? 'secondary' : 'blue-grey-3'"
                            text-color="white"
                            :icon="item['icon']"
                            clickable
                            :id="item.name"
                            @click="goto(item.name, item.fullPath)"
                        >
                            {{ item.title }}
                            <q-menu touch-position context-menu>
                                <q-list dense style="min-width: 100px" class="text-caption">
                                    <q-item clickable v-close-popup>
                                        <q-item-section>关闭其他标签页</q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup>
                                        <q-item-section>关闭全部签页</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-chip>
                    </q-scroll-area>
                </q-toolbar-title>

                <div>
                    <q-icon @click="$q.fullscreen.toggle()" name="fullscreen" size="sm"></q-icon>
                </div>
                <div>
                    <q-btn color="white" flat>
                        <q-avatar size="26px" class="q-mr-sm">
                            <img src="https://cdn.quasar.dev/img/avatar.png" />
                        </q-avatar>
                        <span>admin</span>
                        <q-menu>
                            <q-list dense style="min-width: 100px">
                                <q-item clickable v-close-popup class="flex flex-center">
                                    <q-icon name="logout" size="xs" class="q-mr-sm" />
                                    退出登录
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer elevated :width="250" v-model="leftDrawerOpen" show-if-above persistent content-class="bg-grey-1 ">
            <q-list>
                <q-item-label header class="text-center bg-light-blue-9 text-title">组卷系统</q-item-label>

                <q-separator />
                <q-item :inset-level="0.05">
                    <q-input dense outlined v-model="text" label="搜索菜单" class="q-pt-sm" debounce="500">
                        <template v-slot:append>
                            <q-icon v-if="text === ''" name="search" size="xs" />
                            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
                        </template>
                    </q-input>
                </q-item>
                <Sidebar v-for="(item, index) in routes" :key="index" :list="item" />
            </q-list>
        </q-drawer>

        <q-page-container>
            <div class="q-pa-md q-gutter-sm">
                <q-breadcrumbs>
                    <q-breadcrumbs-el
                        v-for="(item, index) in breadList"
                        :key="index"
                        :label="item.meta ? item.meta.name : item.title"
                        :to="item.fullPath || item.path"
                    />
                </q-breadcrumbs>
            </div>
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                <keep-alive :include="keepLive">
                    <router-view class="q-ma-md" />
                </keep-alive>
            </transition>
            <q-page-scroller class="flexd" :scroll-offset="150" :offset="[20, 50]">
                <q-btn round color="blue-11" icon="keyboard_arrow_up" size="sm" />
            </q-page-scroller>
        </q-page-container>
    </q-layout>
</template>

<script>
import Sidebar from './Sidebar'
export default {
    name: 'MainLayout',
    components: {
        Sidebar
    },
    data() {
        return {
            text: '',
            leftDrawerOpen: false,
            eclair: true,
            flag: [],
            breadList: [] // 路由集合
        }
    },
    watch: {
        $route(to) {
            if (!this.flag.includes(to.name)) {
                this.flag.push(to.name)
                this.$store.commit('example/set_navigation', {
                    name: to.name,
                    fullPath: to.fullPath,
                    title: to.meta['name'],
                    icon: to.meta['icon']
                })
            }
            this.$nextTick(() => {
                document.getElementById(to.name).scrollIntoView(false)
            })
            this.getBreadcrumb()
        },
        text(val) {
            if (!val) return
            this.searchKey(val, this.routes)
        }
    },
    mounted() {
        this.flag.push(this.$route.name)
        console.log(this.$route)
        this.$store.commit('example/set_navigation', {
            name: this.$route.name,
            fullPath: this.$route.fullPath,
            title: this.$route.meta['name'],
            icon: this.$route.meta['icon']
        })
        this.getBreadcrumb()
    },
    computed: {
        /** @returns {Array} */
        routes() {
            return this.$store.state.example.mainRoute
        },
        /** @returns {Array} */
        activateKeepLive() {
            return this.$store.state.example.activateKeepLive
        },
        /** @returns {Array} */
        keepLive() {
            return this.$store.state.example.keepLive
        }
    },
    methods: {
        searchKey(val, arr = []) {
            arr.forEach(item => {
                if (item.children && item.children.length) {
                    this.searchKey(val, item.children)
                }
                if (!item.name) return
                if (item.meta.name == val && this.$route.name != item.name) {
                    this.$router.push({
                        name: item.name
                    })
                } else if (item.meta.name.indexOf(val) != -1 && this.$route.name != item.name) {
                    this.$router.push({
                        name: item.name
                    })
                }
            })
        },

        getBreadcrumb() {
            const matched = this.$route.matched
            const arr = []
            matched.forEach(item => {
                console.log(item)
                if (item.name) {
                    if (!!item.meta.breadCrumb) {
                        arr.push(...item.meta.breadCrumb)
                    }
                    arr.push(item)
                }
            })

            this.breadList = arr
        },

        remove(e, name) {
            this.$nextTick(() => {
                const ele = this.flag.indexOf(name)
                const i = ele == 0 ? ele + 2 : ele

                if (name == this.$route.name) {
                    this.$router.push({
                        name: this.flag[i - 1]
                    })
                }
                this.$store.commit('example/del_navigation', e)
                this.flag.splice(e, 1)
            })
        },
        goto(e, fullPath) {
            if (e != this.$route.name) {
                this.$router.push(fullPath)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.card-item {
    width: 70vw;
    overflow-x: auto !important;
    display: flex;
    flex-wrap: nowrap;
}
.text-title {
    color: #fff;
    font-size: 18px;
}
::v-deep .q-page-sticky {
    z-index: 9999;
}
</style>