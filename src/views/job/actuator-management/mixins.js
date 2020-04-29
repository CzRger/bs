
export default {
  methods: {
    initForm() {
      return {
        id: null,
        appName: null,
        title: null,
        order: null,
        addressType: null,
        addressList: null,
      }
    },
    initRules() {
      return {
        appName: [{
          required: true, message: '请输入appName', trigger: 'blur'
        }, {
          min: 4, max: 64, message: '长度在 4 到 64 个字符', trigger: 'blur'
        }],
        title: [{
          required: true, message: '请输入名称', trigger: 'blur'
        }, {
          min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur'
        }],
        order: [{
          required: true, message: '请选择排序', trigger: 'blur'
        }],
        addressType: [{
          required: true, message: '请选择注册方式', trigger: 'change'
        }],
        addressList: [{
          required: true, message: ' ', trigger: 'blur'
        }, {
          min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur'
        }],
      }
    },
  }
}
