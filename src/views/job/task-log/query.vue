<template>
  <div class="main">
    <x-button-layout :button-width="124" :is-horizontal="true">
      <el-form
        :model="queryCriteria"
        :inline="true">
        <div>
          <el-form-item label="执行器:" prop="jobGroup">
            <el-select v-model="queryCriteria.jobGroup" clearable filterable placeholder="请选择" @clear="() => {queryCriteria.jobGroup = null}">
              <el-option v-for="(item, index) in actuator"
                         :key="index"
                         :label="item.title"
                         :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="任务ID:" prop="jobId">
            <el-input v-model="queryCriteria.jobId" placeholder="请输入" clearable @clear="() => {queryCriteria.jobId = null}"/>
          </el-form-item>
          <el-form-item label="状态:" prop="logStatus">
            <el-select v-model="queryCriteria.logStatus" clearable filterable placeholder="请选择" @clear="() => {queryCriteria.logStatus = null}">
              <el-option v-for="(item, index) in dictionaries.logStatus"
                         :key="index"
                         :label="item.value"
                         :value="item.key"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="second">
          <el-form-item label="调度时间:" prop="startTime">
            <el-date-picker
              v-model="startTime"
              :picker-options="pickerBeginDateBefore"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="00:00:00"
              placeholder="选择起始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="至" prop="endTime">
            <el-date-picker
              v-model="endTime"
              :picker-options="pickerBeginDateBefore"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="23:59:59"
              placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <template slot="button">
        <el-button round type="info" @click="resetHandler">重置</el-button>
        <el-button round type="primary" @click="queryHandler">查询</el-button>
      </template>
    </x-button-layout>
    <div class="table">
      <el-table :data="pagination.list" max-height="541" stripe border @sort-change="sortChangeHandler">
        <el-table-column type="index" label="序号" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="jobId" label="任务ID" sortable="custom" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="triggerTime" label="调度时间" align="center">
          <template slot-scope="{row}">{{ row.triggerTime | parseTime }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="triggerCode" label="调度结果" align="center">
          <template slot-scope="{row}">{{ row.triggerCode | translateDictionary(dictionaries.triggerCode)}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="triggerMsg" label="调度备注" align="center">
          <template slot-scope="{ row }">
            <template v-if="row.triggerMsg">
              <el-button type="text" @click="open(row.triggerMsg)">查看</el-button>
            </template>
            <template v-else>无</template>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="handleTime" label="执行时间" align="center">
          <template slot-scope="{row}">{{ row.handleTime | parseTime }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="handleCode" label="执行结果" align="center">
          <template slot-scope="{row}">{{ row.handleCode | translateDictionary(dictionaries.handleCode)}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="handleMsg" label="执行备注" align="center">
          <template slot-scope="{ row }">
            <template v-if="row.handleMsg">
              <el-button type="text" @click="open(row.handleMsg)">查看</el-button>
            </template>
            <template v-else>无</template>
          </template>
        </el-table-column>
<!--        <el-table-column :show-overflow-tooltip="true" label="操作" align="center">-->
<!--          <template slot-scope="{ row }">-->
<!--            <el-button @click="Detail(row)" type="text" size="small">执行日志</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <pagination position="right" :pagination="pagination" @page-size-changed="pageSizeChangeHandler" @page-changed="pageChangeHandler"/>
    </div>
  </div>
</template>

<script>
  import BaseQueryPageForm from '@/views/common/mixins/BaseQueryPageForm'
  import { deepMerge } from '@/utils'
  import XButtonLayout from '@/components/x-button-layout'
  import { mapGetters } from 'vuex'
  import {JobLogAPI} from "@/api/task-management/index";
  import {JobGroupAPI} from "@/api/task-management/index";

  export default {
    mixins: [ BaseQueryPageForm ],
    components: { XButtonLayout },
    props: {
      detail: {
        required: true,
        type: Object,
      }
    },
    data() {
      const queryCriteria = this.initQueryCriteria()
      return {
        pickerBeginDateBefore:{
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        queryCriteria: queryCriteria,
        startTime: this.formatDate() + ' 00:00:00',
        endTime: this.formatDate() + ' 23:59:59',
        actuator: []
      }
    },
    computed: {
      ...mapGetters([
        'dictionaries'
      ])
    },
    methods: {
      open(data) {
        this.$alert(data, '调度备注', {
          dangerouslyUseHTMLString: true
        });
      },
      initQueryCriteria(form = {}) {
        this.startTime = this.formatDate() + ' 00:00:00'
        this.endTime = this.formatDate() + ' 23:59:59'
        return deepMerge(form, {
          jobGroup: null,
          jobId: null,
          logStatus: null,
          filterTime: this.startTime + ' - ' + this.endTime
        })
      },
      formatDate(){
        let arr = new Date().toLocaleDateString().split('/')
        arr.forEach((v, i) => {
          if (v.length < 2){
            arr[i] = '0' + v
          }
        })
        return arr[0] + '-' + arr[1] + '-' + arr[2]
      },
      executeQueryPage() {
        JobGroupAPI.findAll().then(data => {
          this.actuator = []
          this.actuator = data
        })
        const params = this.createQueryParams(false)
        params.entity.filterTime = this.startTime + ' - ' + this.endTime
        if (this.detail.jobId) {
          this.queryCriteria.jobId = this.detail.jobId
        }
        JobLogAPI.pageList(params).then(data => {
          this.queryResultHandler(data)
        })
      },
      Detail(data) {
        this.$emit('option-changed', 'detail', {logId: data.id, triggerTime: data.triggerTime, executorAddress: data.executorAddress, fromLineNum: 1})
      },
    }
  }
</script>

<style lang="scss" scoped>
  .table {
    margin-top: 20px;
  }
  .second {
    margin-top: 10px;
  }
</style>


