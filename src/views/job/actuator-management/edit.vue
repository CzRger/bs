<template>
  <div>
    <el-button icon="el-icon-back" round @click="backHandler">返回</el-button>
    <el-card>
      <div slot="header">
        <button-right>
          编辑执行器
          <template slot="button">
            <el-button type="primary" @click="submitHandler('form')">保存</el-button>
          </template>
        </button-right>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" disabled/>
        </el-form-item>
        <el-form-item label="AppName" prop="appName">
          <el-input v-model="form.appName"/>
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number :min="1" class="num" type="text" v-model="form.order"/>
        </el-form-item>
        <el-form-item label="注册方式" prop="addressType">
          <el-radio-group v-model="form.addressType" @change="addressTypeChange">
            <el-radio v-for="(item, index) in dictionaries.addressType"
                      :key="index"
                      :label="item.key"
            >{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="机器地址" prop="addressList">
          <template v-if="form.addressType == 1">
            <el-input type="textarea" rows="10" v-model="form.addressList" placeholder="请输入执行器地址列表，多地址逗号分隔"/>
          </template>
          <template v-else>
            <el-input type="textarea" rows="10" v-model="form.addressList" :disabled="true" placeholder="请输入执行器地址列表，多地址逗号分隔"/>
          </template>
        </el-form-item>
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
      }
    },
    computed: {
      ...mapGetters([
        'dictionaries'
      ])
    },
    activated() {
      deepMergeLeft(this.form, this.detail)
      if (this.form.addressType === 0) {
        this.rules.addressList[0].required = false
        this.form.addressList = null
      }
    },
    methods: {
      addressTypeChange(data) {
        if (data === 0) {
          this.form.addressList = null
          this.rules.addressList[0].required = false
        } else {
          this.rules.addressList[0].required = true
        }
      },
      customSubmitHandler() {
        JobGroupAPI.update(this.form).then(data => {
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
</style>
