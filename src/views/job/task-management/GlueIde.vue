<template>
  <div class="main">
    <el-button icon="el-icon-back" round @click="backHandler">返回</el-button>
    <el-card>
      <div slot="header">
        <button-right>
          WebIDE
          <template slot="button">
            <el-button type="primary" @click="save">保存</el-button>
          </template>
        </button-right>
      </div>
      <el-form class="glueRemark" :model="params" label-width="100px">

      </el-form>
      <el-form :model="params" label-width="100px">
        <el-form-item label="版本回溯">
          <el-select v-model="params.glueRemark[0]">
            <el-option v-for="(item, index) in params.glueRemark"
                       :key="index"
                       :label="item"
                       :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="glueSource">
          <el-input type="textarea" rows="30" v-model="params.glueSource" placeholder="请输入"/>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
  import BaseEditForm from '@/views/common/mixins/BaseEditForm'
  import {JobCodeAPI} from "@/api/task-management/index";

  export default {
    mixins: [BaseEditForm],

    props: {
      detail: {
        type: Object,
        required: true,
        validator: function (v) {
          return v.jobId
        }
      }
    },
    data() {
      return {
        params: {
          id: null,
          glueSource: null,
          glueRemark: [],
        },
      }
    },
    activated() {
      this.params.id = this.detail.jobId
      this.initSource()
    },
    methods: {
      goBack() {
        this.$emit('option-changed', 'query')
      },
      initSource() {
        JobCodeAPI.jobcode({jobId: this.params.id}).then(data => {
          this.params.glueRemark = []
          if (data.jobLogGlues && data.jobLogGlues.length > 0) {
            data.jobLogGlues.forEach(v => {
              this.params.glueRemark.push(v.glueRemark)
            })
          } else {
            this.params.glueRemark.push(data.jobInfo.glueRemark)
          }
          this.params.glueSource = data.jobInfo.glueSource
        })
      },
      save() {
        this.$prompt('源码备注', '保存', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{4,100}$/,
          inputErrorMessage: '源码备注长度限制为4~100'
        }).then(({ value }) => {
          JobCodeAPI.save({
            id: this.params.id,
            glueSource: this.params.glueSource,
            glueRemark: value,
          }).then(() => {
            this.initSource()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-card {
    margin-top: 10px;
  }
</style>
