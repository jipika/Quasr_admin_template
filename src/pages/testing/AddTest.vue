<!-- 
 -->
<template>
    <div>
        <q-form @submit="onSubmit" @reset="onReset" class="form q-mb-md">
            <div class="form q-gutter-md" style="justify-content: flex-start">
                <q-select style="min-width: 200px" outlined dense v-model="name" label="学科" :options="options" />
                <q-select style="min-width: 200px" outlined dense v-model="name" label="年级" :options="options" />
                <q-select style="min-width: 200px" outlined dense v-model="name" label="题型" :options="options" />
                <q-select
                    style="min-width: 250px"
                    outlined
                    dense
                    v-model="name"
                    label="关联知识点"
                    :options="options"
                />
                <q-input style="min-width: 200px" outlined dense v-model="name" label="试题难度（1-5，越大越难）" />
                <q-input style="min-width: 200px" outlined dense v-model="name" label="试题区域(选填)" />
                <q-input style="min-width: 200px" outlined dense v-model="name" label="试题年份(选填)" />
                <q-select
                    style="min-width: 200px"
                    outlined
                    dense
                    v-model="name"
                    label="试题类型(选填)"
                    :options="options"
                />
                <q-input style="min-width: 250px" outlined dense v-model="name" label="试题来源(试卷)(选填)" />
            </div>
        </q-form>

        <div>
            <div class="q-mb-md text-accent">题干:</div>
            <Editor :height="250" />
        </div>
        <div class="q-mt-md">
            <div class="q-mb-md text-accent">标准答案:</div>
            <Editor :height="250" />
        </div>
        <div class="q-mt-md">
            <div class="q-mb-md text-accent">试题解答:</div>
            <Editor :height="250" />
        </div>
        <div class="q-mt-md">
            <div class="q-mb-md text-accent">试题解析:</div>
            <Editor :height="250" />
        </div>
        <div class="q-mt-md flex flex-center">
            <q-btn label="确定" color="primary" />
            <q-btn flat label="取消" color="primary" />
        </div>
    </div>
</template>

<script>
// import引入的组件需要注入到对象中才能使用
import Editor from 'src/components/Editor'
export default {
    name: 'AddTest',
    components: { Editor },
    data() {
        // 这里存放数据
        return {
            content: '',
            options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
        }
    },
    // 监听属性 类似于data概念
    computed: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    // 方法集合
    methods: {
        saveWork() {
            this.$q.notify({
                message: 'Saved your text to local storage',
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done'
            })
        },
        uploadIt() {
            this.$q.notify({
                message: 'Server unavailable. Check connectivity.',
                color: 'red-5',
                textColor: 'white',
                icon: 'warning'
            })
        }
    }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
</style>
