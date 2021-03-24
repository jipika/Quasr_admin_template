<!--  -->
<template>
    <div>
        <q-card class="my-card" flat>
            <q-card-section>
                <div class="text-h6">知识点搜索表单</div>
            </q-card-section>
            <q-separator inset />
            <q-card-section>
                <q-form @submit="onSubmit" @reset="onReset" class="form q-mb-md">
                    <div class="form q-gutter-md" style="justify-content: flex-start">
                        <q-select
                            style="min-width: 100px"
                            outlined
                            dense
                            v-model="name"
                            label="科目"
                            :options="options"
                        />
                        <q-select
                            style="min-width: 100px"
                            outlined
                            dense
                            v-model="name"
                            label="学段"
                            :options="options"
                        />

                        <q-input
                            outlined
                            dense
                            style="min-width: 250px"
                            v-model="name"
                            label="根知识点名"
                            placeholder="请输入查找根知识点的标题(选填)"
                        />
                    </div>
                    <div class="q-mt-md btn">
                        <q-btn size="sm" label="提交" type="submit" color="primary" />
                        <q-btn size="sm" label="重置" type="reset" color="primary" flat class="q-ml-sm" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
        <q-card class="my-card">
            <q-splitter v-model="splitterModel" before-class="left" :horizontal="$q.platform.is.mobile">
                <template v-slot:before>
                    <div class="q-ma-md">
                        <div class="text-accent">知识点节点</div>
                        <q-tree
                            :nodes="customize"
                            node-key="label"
                            accordion
                            @update:expanded="onChange"
                            :expanded.sync="expanded"
                        ></q-tree>
                    </div>
                </template>
                <template v-slot:after>
                    <div class="q-ma-md">
                        <Tables :getItem="getItem" :columns="columns">
                            <template v-slot:left-top>
                                <q-btn
                                    color="secondary"
                                    label="添加根知识点"
                                    :to="{ name: 'AddTest' }"
                                    size="sm"
                                    icon="add"
                                />
                            </template>
                            <template v-slot:operation="">
                                <q-btn color="primary" size="sm" icon="add" @click="confirm = !confirm" dense />
                                <q-btn color="secondary" size="sm" icon="edit" dense />
                                <q-btn color="negative" size="sm" icon="delete" dense />
                            </template>
                        </Tables>
                    </div>
                </template>
            </q-splitter>
        </q-card>
        <Confirm :confirm="confirm">
            <q-select style="min-width: 400px" outlined dense v-model="name" label="等级一知识点" :options="options" />
            <q-select style="min-width: 400px" outlined dense v-model="name" label="等级二知识点" :options="options" />
        </Confirm>
    </div>
</template>

<script>
import Tables from 'src/components/Tables.vue'
// import引入的组件需要注入到对象中才能使用
import Confirm from 'src/components/Confirm'
export default {
    name: 'basicsLevel',
    data() {
        // 这里存放数据
        return {
            options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
            splitterModel: 20,
            customize: [
                {
                    label: 'Satisfied customers',
                    header: 'root',
                    children: [
                        {
                            label: 'Good food',
                            icon: 'restaurant_menu',
                            header: 'generic',
                            children: [
                                {
                                    label: 'Quality ingredients',
                                    header: 'generic',
                                    body: 'story',
                                    story: 'Lorem ipsum dolor sit amet.'
                                },
                                {
                                    label: 'Good recipe',
                                    body: 'story',
                                    story:
                                        'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.'
                                }
                            ]
                        },
                        {
                            label: 'Good service',
                            header: 'generic',
                            body: 'toggle',
                            caption:
                                'Why are we as consumers so captivated by stories of great customer service? Perhaps it is because...',
                            enabled: false,
                            children: [{ label: 'Prompt attention' }, { label: 'Professional waiter' }]
                        },
                        {
                            label: 'Pleasant surroundings',
                            children: [
                                { label: 'Happy atmosphere' },
                                { label: 'Good table presentation', header: 'generic' },
                                { label: 'Pleasing decor' }
                            ]
                        }
                    ]
                }
            ],
            confirm: false,
            expanded: [],
            columns: [
                {
                    name: 'name',
                    required: true,
                    label: 'ID',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
                { name: 'subject', align: 'center', label: '学段', field: 'calories' },
                { name: 'subject', align: 'center', label: '知识点', field: 'calories' },

                {
                    align: 'center',
                    name: 'operation',
                    label: '操作'
                    // field: 'calcium'
                }
            ]
        }
    },
    components: {
        Tables,
        Confirm
    },
    // 监听属性 类似于data概念
    computed: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        console.log(321)
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    // 方法集合
    methods: {
        onChange(expanded) {
            console.log(expanded)
        },
        getItem(e) {
            console.log(321, e)
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
