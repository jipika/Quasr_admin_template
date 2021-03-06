<!--  -->
<template>
    <div>
        <q-expansion-item
            v-if="hasChild && !list.hidden && !list.redirect"
            :value="open"
            :group="list.path"
            :icon="list.meta ? list.meta.icon : ''"
            :label="list.meta ? list.meta.name : ''"
            :default-opened="open"
            :header-class="open ? 'heder' : ''"
            class="text-blue-grey-10"
            :to="list.path"
        >
            <Sidebar v-for="(item, index) in list.children" :key="index" :list="item" tier />
        </q-expansion-item>
        <q-item :class="tier ? 'q-ml-lg' : ''" v-else-if="!list.redirect" clickable v-ripple :to="{ name: list.name }">
            <q-item-section avatar>
                <q-icon :name="list.meta ? list.meta.icon : ''" />
            </q-item-section>
            <q-item-section>{{ list.meta ? list.meta.name : '' }}</q-item-section>
        </q-item>
    </div>
</template>

<script>
// import引入的组件需要注入到对象中才能使用

export default {
    name: 'Sidebar',
    props: {
        list: {
            type: [Array, Object],
            default: () => {
                return []
            },
            required: true
        },
        tier: {
            type: Boolean,
            default: false
        }
    },

    data() {
        // 这里存放数据
        return {}
    },
    watch: {},
    // 监听属性 类似于data概念
    computed: {
        /** @returns {Boolean} */
        hasChild() {
            return this.list.children && this.list.children.length
        },
        /** @returns {Boolean} */
        open() {
            if (this.$route.path.indexOf(this.list.path) == -1) {
                return false
            } else {
                return true
            }
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    // 方法集合
    methods: {}
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
::v-deep .heder {
    color: #1976d2;
}
</style>
