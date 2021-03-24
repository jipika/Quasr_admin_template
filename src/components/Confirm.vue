<!--  -->
<template>
    <div>
        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-bar>
                    <div>增加知识点</div>

                    <q-space />

                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip>关闭</q-tooltip>
                    </q-btn>
                </q-bar>
                <q-card-section class="row q-gutter-md items-center">
                    <slot>
                        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
                        <span class="q-ml-sm">You are currently not connected to any network.</span>
                    </slot>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="确定" color="primary" v-close-popup />
                    <q-btn flat label="取消" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
// import引入的组件需要注入到对象中才能使用
export default {
    name: 'Confirm',
    data() {
        // 这里存放数据
        return {}
    },
    props: {
        confirm: {
            type: Boolean,
            default: false
        }
    },
    // 监听属性 类似于data概念
    computed: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    // 方法集合
    methods: {}
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
