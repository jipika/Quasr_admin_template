<!--  -->
<template>
    <div id="wangeditor">
        <div ref="editorElem"></div>
    </div>
</template>

<script>
import E from 'wangeditor'
// import引入的组件需要注入到对象中才能使用
export default {
    name: 'Editor',
    props: ['catchData'], // 接收父组件的方法
    data() {
        // 这里存放数据
        return {
            editor: null,
            editorContent: ''
        }
    },
    // 监听属性 类似于data概念
    computed: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.editor = new E(this.$refs.editorElem)
        this.editor.config.zIndex = 1

        // 编辑器的事件，每次改变会获取其html内容
        this.editor.config.onchange = html => {
            this.editorContent = html
        }
        this.editor.config.menus = [
            // 菜单配置
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            'table', // 表格
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ]
        this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            // resultFiles 是 input 中选中的文件列表
            // insertImgFn 是获取图片 url 后，插入到编辑器的方法

            // 上传图片，返回结果，将图片插入到编辑器中
            insertImgFn(imgUrl)
        }
        this.editor.create() // 创建富文本实例
    },
    // 方法集合
    methods: {}
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
