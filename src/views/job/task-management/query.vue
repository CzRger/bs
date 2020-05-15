<template>
  <div class="main" v-loading="loadingAll">
    <el-row>
      <el-col :span="24" style="margin: 10px 0px;">
        <x-button-layout :button-width="122" :is-horizontal="true">
          <el-form
            :model="queryCriteria"
            :inline="true">
            <div>
              <el-form-item label="执行器:" prop="jobGroup">
                <el-select v-loading="loadingActuator" v-model="queryCriteria.jobGroup" filterable placeholder="请选择">
                  <el-option v-for="(item, index) in actuator"
                             :key="index"
                             :label="item.title"
                             :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="运行状态:" prop="triggerStatus">
                <el-select v-model="queryCriteria.triggerStatus" filterable placeholder="请选择">
                  <el-option v-for="(item, index) in dictionaries.triggerStatus"
                             :key="index"
                             :label="item.value"
                             :value="item.key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="任务描述:" prop="jobDesc">
                <el-input v-model="queryCriteria.jobDesc" placeholder="请输入" clearable @clear="() => {queryCriteria.jobDesc = null}"/>
              </el-form-item>
            </div>
            <div class="second">
              <el-form-item label="jobHandler:" prop="executorHandler">
                <el-input v-model="queryCriteria.executorHandler" placeholder="请输入" clearable @clear="() => {queryCriteria.executorHandler = null}"/>
              </el-form-item>
              <el-form-item label="负责人:" prop="author">
                <el-input v-model="queryCriteria.author" placeholder="请输入" clearable @clear="() => {queryCriteria.author = null}"/>
              </el-form-item>
            </div>
          </el-form>
          <template slot="button">
            <el-button round type="info" @click="resetHandler">重置</el-button>
            <el-button round type="primary" @click="queryHandler">查询</el-button>
          </template>
        </x-button-layout>
      </el-col>
      <el-col :span="24" style="margin: 10px 0px;">
        <button-right>
          <template slot="button">
            <el-button-group>
              <el-button type="primary" @click="$emit('option-changed','add')">新增</el-button>
              <el-button v-if="selected" type="primary" @click="$emit('option-changed','edit', selected)">编辑</el-button>
              <el-button v-if="selected" type="primary" @click="delHandler">删除</el-button>
              <el-button v-if="selected && selected.triggerStatus === 0" type="success" @click="startLog">启动</el-button>
              <el-button v-if="selected && selected.triggerStatus === 1" type="danger" @click="stopLog">停止</el-button>
            </el-button-group>
          </template>
        </button-right>
      </el-col>
      <el-col :span="24">
        <div class="scrollbar">
          <el-table v-loading="loadingTable" :data="pagination.list" max-height="541" highlight-current-row stripe border @current-change="(row) => { selected = row }" @sort-change="sortChangeHandler">
            <el-table-column type="index" label="序号" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="id" label="任务ID" sortable="custom" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="jobDesc" label="任务描述" sortable="custom" align="center"/>
            <el-table-column :show-overflow-tooltip="true" label="运行模式" sortable="custom" align="center">
              <template slot-scope="{row}">{{ row.glueType + ':' + row.executorHandler}}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="jobCron" label="Cron" sortable="custom" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="author" label="负责人" sortable="custom" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="triggerStatus" label="状态" sortable="custom" align="center">
              <template slot-scope="{row}">{{ row.triggerStatus | translateDictionary(dictionaries.triggerStatus)}}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="操作" width="300" align="center">
              <template slot-scope="{ row }">
                <el-button @click="triggerLog(row)" type="text" size="small">执行一次</el-button>
                <el-button @click="findLog(row)" type="text" size="small">查询日志</el-button>
                <el-button @click="loadByJobGroup(row)" type="text" size="small">注册节点</el-button>
                <el-button @click="glueIde(row)" v-if="row.glueType !== 'BEAN'" type="text" size="small">GLUE IDE</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination position="right" :pagination="pagination" @page-size-changed="pageSizeChangeHandler" @page-changed="pageChangeHandler"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {deepMerge} from '@/utils'
  import BaseQueryPageForm from '@/views/common/mixins/BaseQueryPageForm'
  import mixins from './mixins'
  import XButtonLayout from '@/components/x-button-layout'
  import {JobInfoAPI} from "@/api/task-management/index"
  import { mapGetters } from 'vuex'
  import {JobGroupAPI} from "@/api/task-management/index";

  export default {
    mixins: [BaseQueryPageForm, mixins],
    components: {XButtonLayout},
    data() {
      const queryCriteria = this.initQueryCriteria()
      return {
        queryCriteria: queryCriteria,
        selected: null,
        actuator: [],
        loadingTable: true,
        loadingActuator: true,
        loadingAll: false
      }
    },
    computed: {
      ...mapGetters([
        'dictionaries'
      ])
    },
    activated() {
      this.selected = null

    },
    methods: {
      initQueryCriteria(form = {}) {
        let jobGroup = 1
        if (this.actuator) {
          jobGroup = this.actuator[0].id
        }
        return deepMerge(form, {
          jobGroup: jobGroup,
          triggerStatus: 0,
          jobDesc: null,
          executorHandler: null,
          author: null
        })
      },
      executeQueryPage() {
        this.loadingActuator = true
        JobGroupAPI.findAll().then(data => {
          this.actuator = []
          this.actuator = data
          this.loadingActuator = false
        }).catch(() => {
          this.loadingActuator = false
        })
        this.loadingTable = true
        JobInfoAPI.pageList(this.createQueryParams(false)).then(data => {
          this.queryResultHandler(data)
          this.loadingTable = false
        }).catch(() => {
          this.loadingTable = false
        })
      },
      customDelHandler() {
        //TODO 2019-10-15 正常
        JobInfoAPI.remove({id: this.selected.id}).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.executeQueryPage()
        })
      },
      findLog(data) {
        this.$router.push({ name: '94d3fd397673477085946c2b8a3b9051', params: { jobId: data.id }})
      },
      startLog() {
        JobInfoAPI.start({id: this.selected.id}).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.executeQueryPage()
        })
      },
      stopLog() {
        JobInfoAPI.stop({id: this.selected.id}).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.executeQueryPage()
        })
      },
      triggerLog(data) {
        this.loadingTable = true
        this.$prompt('任务参数', '执行一次', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.loadingTable = true
          JobInfoAPI.trigger({id: data.id, executorParam: value}).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.executeQueryPage()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      loadByJobGroup(data) {
        this.loadingAll = true
        JobGroupAPI.loadById({id: data.jobGroup}).then(data => {
          let str = ''
          const style = 'display: inline-block;\n' +
            '    min-width: 10px;\n' +
            '    padding: 3px 7px;\n' +
            '    font-size: 12px;\n' +
            '    font-weight: 700;\n' +
            '    line-height: 1;\n' +
            '    color: #fff;\n' +
            '    text-align: center;\n' +
            '    white-space: nowrap;\n' +
            '    vertical-align: middle;\n' +
            '    background-color: #777;\n' +
            '    border-radius: 10px;\n' +
            '    background-color: #628eff !important;'
          data.registryList.forEach((v, i) => {
            i === 0 ?
              str += '<span style="' + style + '">' + v + '</span>' :
              str += '<br/><span style="' + style + '">' + v + '</span>'
          })
          this.$alert(str, '注册节点', {
            dangerouslyUseHTMLString: true
          });
          this.loadingAll = false
        }).catch(() => {
          this.loadingAll = false
        })
      },
      glueIde(data) {
        this.$emit('option-changed', 'GlueIde', {jobId: data.id})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .second {
    margin-top: 10px;
  }


</style>
