import VueCron from '@/components/vue-cron'
export default {
  data() {
    return {
      visible: false
    }
  },
  components: { VueCron },
  methods: {
    initForm() {
      return {
        id: null,
        jobGroup: null,
        jobDesc: null,
        executorRouteStrategy: null,
        jobCron: null,
        glueType: null,
        executorHandler: null,
        executorBlockStrategy: null,
        childJobId: null,
        executorTimeout: null,
        executorFailRetryCount: null,
        author: null,
        alarmEmail: null,
        executorParam: null,
      }
    },
    initRules() {
      return {
        jobGroup: [{
          required: true, message: '请选择执行器', trigger: 'change'
        }],
        jobDesc: [{
          required: true, message: '请输入任务描述', trigger: 'blur'
        }],
        executorRouteStrategy: [{
          required: true, message: '请选择路由策略', trigger: 'change'
        }],
        jobCron: [{
          required: true, message: '请输入Cron', trigger: 'change'
        }],
        glueType: [{
          required: true, message: '请选择运行模式', trigger: 'change'
        }],
        executorHandler: [{
          required: true, message: ' ', trigger: 'blur'
        }, {
          pattern: '/S', message: '请输入', trigger: 'blur'
        }],
        executorBlockStrategy: [{
          required: true, message: '请选择阻塞处理策略', trigger: 'change'
        }],
        childJobId: [{
          required: false, message: '请输入子任务ID', trigger: 'blur'
        }],
        executorTimeout: [{
          required: false, message: '请输入任务超时时间', trigger: 'blur'
        }],
        executorFailRetryCount: [{
          required: false, message: '请输入失败重试次数', trigger: 'blur'
        }],
        author: [{
          required: true, message: '请输入负责人', trigger: 'blur'
        }],
        alarmEmail: [{
          required: false, message: '请输入报警邮件', trigger: 'blur'
        }],
        executorParam: [{
          required: false, message: '请输入任务参数', trigger: 'blur'
        }],
      }
    },
    cronChange(cron) {
      this.form.jobCron = cron
    },
    cronClose() {
      this.visible = false
    }
  }
}
