<template>
  <div>
    <el-button icon="el-icon-back" round @click="backHandler">返回</el-button>
    <el-card>
      <div slot="header">
        <button-right>
          编辑任务
          <template slot="button">
            <el-button type="primary" @click="submitHandler('form')">保存</el-button>
          </template>
        </button-right>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <div>
          <el-form-item label="ID" prop="id">
            <el-input v-model="form.id" disabled/>
          </el-form-item>
        </div>
        <div class="row-one">
          <div class="col-one">
            <el-form-item label="执行器" prop="jobGroup">
              <el-select v-model="form.jobGroup">
                <el-option v-for="(item, index) in actuator"
                           :key="index"
                           :label="item.title"
                           :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="路由策略" prop="executorRouteStrategy">
              <el-select v-model="form.executorRouteStrategy">
                <el-option v-for="(item, index) in dictionaries.executorRouteStrategy"
                           :key="index"
                           :label="item.value"
                           :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="运行模式" prop="glueType">
              <el-select v-model="form.glueType" :disabled="true"/>
            </el-form-item>
            <el-form-item label="阻塞处理策略" prop="executorBlockStrategy">
              <el-select v-model="form.executorBlockStrategy">
                <el-option v-for="(item, index) in dictionaries.executorBlockStrategy"
                           :key="index"
                           :label="item.value"
                           :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="任务超时时间" prop="executorTimeout">
              <el-input-number :min="0" class="num" type="text" v-model="form.executorTimeout"/>
            </el-form-item>
            <el-form-item label="负责人" prop="author">
              <el-input v-model="form.author"/>
            </el-form-item>
          </div>
          <div class="col-two">
            <el-form-item label="任务描述" prop="jobDesc">
              <el-input v-model="form.jobDesc"/>
            </el-form-item>
            <el-form-item label="cron" prop="jobCron">
              <el-popover v-model="visible" trigger="focus" placement="bottom-start">
                <vue-cron :cron-val="form.jobCron" @change="cronChange" @close="cronClose"/>
                <el-input slot="reference" type="text" rows="10" placeholder="* * * * * ?" v-model="form.jobCron" />
              </el-popover>
            </el-form-item>
            <el-form-item label="jobHandler" prop="executorHandler">
              <template v-if="form.glueType === 'BEAN'">
                <el-input v-model="form.executorHandler"/>
              </template>
              <template v-else>
                <el-input v-model="form.executorHandler" :disabled="true"/>
              </template>
            </el-form-item>
            <el-form-item label="子任务ID" prop="childJobId">
              <el-input v-model="form.childJobId"/>
            </el-form-item>
            <el-form-item label="失败重试次数" prop="executorFailRetryCount">
              <el-input-number :min="0" class="num" type="text" v-model="form.executorFailRetryCount"/>
            </el-form-item>
            <el-form-item label="报警邮件" prop="alarmEmail">
              <el-input v-model="form.alarmEmail"/>
            </el-form-item>
          </div>
        </div>
        <div class="row-two">
          <el-form-item label="任务参数" prop="executorParam">
            <el-input type="textarea" rows="10" v-model="form.executorParam" placeholder="请输入"/>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {deepMergeLeft} from '@/utils'
  import BaseEditForm from '@/views/common/mixins/BaseEditForm'
  import mixins from './mixins'
  import { mapGetters } from 'vuex'
  import {JobGroupAPI} from "@/api/task-management/index";
  import {JobInfoAPI} from "@/api/task-management/index";



  export default {
    mixins: [BaseEditForm, mixins],
    props: {
      detail: {
        required: true,
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      const form = this.initForm()
      const rules = this.initRules()
      rules.id = [{
        required: true, message: '编辑信息时ID不能为空', trigger: 'blur'
      }]
      return {
        form: form,
        rules: rules,
        actuator: []
      }
    },
    computed: {
      ...mapGetters([
        'dictionaries'
      ])
    },
    activated() {
      JobGroupAPI.findAll().then(data => {
        this.actuator = []
        this.actuator = data
      })
      deepMergeLeft(this.form, this.detail)
      if (this.form.executorHandler === 'BEAN') {
        this.rules.executorHandler[0].required = true
      } else {
        this.rules.executorHandler[0].required = false
        this.form.executorHandler = null
      }
    },
    methods: {
      customSubmitHandler() {
        JobInfoAPI.update(this.form).then(data => {
          this.submitSuccessHandler(data)
        })

      },
      customSubmitSuccessHandler() {
        this.$refs['form'].clearValidate()
        this.$emit('option-changed', 'query')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .el-card {
    margin-top: 10px;
  }
  .num {
    float: left;
    width: 150px;
  }
  p {
    float: left;
    margin: 0;
    padding: 0;
    margin-left: 10px;
  }
  .col-one {
    float: left;
    width: calc(50%);
  }
  .col-two {
    float: left;
    width: calc(50%);
  }
  .row-one {
    width: calc(100%);
    height: 300px;
  }
</style>
