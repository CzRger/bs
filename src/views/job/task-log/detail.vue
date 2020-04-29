<template>
  <div class="panel">
    <x-button-layout :button-width="122" :is-horizontal="true">
      <el-page-header class="back" @back="goBack" style="margin-bottom: 10px"/>
      <el-form
        :model="params"
        :inline="true">
        <el-form-item label="起始条数：" prop="executorFailRetryCount">
          <el-input-number :min="1" :max="max" class="num" type="text" v-model="params.fromLineNum"/>
          &nbsp;/&nbsp;{{max}}
        </el-form-item>
      </el-form>
      <template slot="button">
        <el-button round type="info" @click="reLog">重置</el-button>
        <el-button round type="primary" @click="initLog">查询</el-button>
      </template>
    </x-button-layout>
    <el-card class="logInfo">
      <div v-html="logContent">

      </div>
    </el-card>

  </div>
</template>

<script>
  import {JobLogAPI} from "@/api/task-management/index";
  import XButtonLayout from '@/components/x-button-layout'

  export default {
    components: { XButtonLayout },
    props: {
      detail: {
        type: Object,
        required: true,
        validator: function (v) {
          return v.logId && v.triggerTime && v.executorAddress && v.fromLineNum
        }
      }
    },
    data() {
      return {
        params: {
          logId: null,
          triggerTime: null,
          executorAddress: null,
          fromLineNum: null
        },
        max: null,
        logContent: null
      }
    },
    activated() {
      this.params.logId = this.detail.logId
      this.params.triggerTime = this.detail.triggerTime
      this.params.executorAddress = this.detail.executorAddress
      this.params.fromLineNum = this.detail.fromLineNum
      this.initLog()
    },
    methods: {
      goBack() {
        this.$emit('option-changed', 'query')
      },
      initLog() {
        JobLogAPI.logDetailCat(this.params).then(data => {
          this.max = data.toLineNum
          this.logContent = data.logContent.replace(/\n/g, '<br/>')
        })
      },
      reLog() {
        this.params.fromLineNum = 1
        this.initLog()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logInfo {
    margin-top: 20px;
  }
</style>
