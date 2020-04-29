export default {
  methods: {
    initForm() {
      return {
        id: null,
        systemOnly: this.$route.params.systemOnly,
        parentId: null,
        category: 1,
        type: null,
        level: 1,
        isLeaf: 'NO',
        name: null,
        code: null,
        sortNum: null,
        remark: null
      }
    },
    initRules() {
      return {
        systemOnly: [{
          required: true, message: '请明确是否属于系统内部使用', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入字典分类名称', trigger: 'blur'
        }, {
          min: 2, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        sortNum: [{
          required: true, message: '请输入字典分类编号', trigger: 'blur'
        }]
      }
    }
  }
}
