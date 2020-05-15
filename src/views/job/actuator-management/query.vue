<template>
  <div class="main">
    <el-row>
      <el-col :span="24" style="margin: 10px 0px;">
        <x-button-layout :button-width="122" :is-horizontal="true">
          <el-form
            :model="queryCriteria"
            :inline="true">
            <el-form-item label="AppName:" prop="appName">
              <el-input v-model="queryCriteria.appName" placeholder="请输入" clearable @clear="() => {queryCriteria.appName = null}"/>
            </el-form-item>
            <el-form-item label="名称:" prop="title">
              <el-input v-model="queryCriteria.title" placeholder="请输入" clearable @clear="() => {queryCriteria.title = null}"/>
            </el-form-item>
            <el-form-item label="注册方式:" prop="addressType">
              <el-select v-model="queryCriteria.addressType" filterable placeholder="请选择">
                <el-option v-for="(item, index) in dictionaries.addressType"
                           :key="index"
                           :label="item.value"
                           :value="item.key"
                />
              </el-select>
            </el-form-item>
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
            </el-button-group>
          </template>
        </button-right>
      </el-col>
      <el-col :span="24">
        <div class="scrollbar">
          <el-table v-loading="loading" :data="pagination.list" max-height="541" highlight-current-row stripe border @current-change="(row) => { selected = row }" @sort-change="sortChangeHandler">
            <el-table-column type="index" label="序号" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="order" label="排序" sortable="custom" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="appName" label="AppName" sortable="custom" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="title" label="名称" sortable="custom" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="addressType" label="注册方式" sortable="custom" align="center">
              <template slot-scope="{row}">{{ row.addressType | translateDictionary(dictionaries.addressType)}}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="addressList" label="OnLine 机器地址" sortable="custom" align="center">
              <template slot-scope="{row}">
                <template v-if="row.addressList">
                  <template v-for="(item, index) in row.addressList.split(',')">
                    <span :key="index" class="badge bg-green">{{item}}</span>
                    <br :key="index"/>
                  </template>
                </template>
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
  import {JobGroupAPI} from "@/api/task-management/index";
  import { mapGetters } from 'vuex'

  export default {
    mixins: [BaseQueryPageForm, mixins],
    components: {XButtonLayout},
    data() {
      const queryCriteria = this.initQueryCriteria()
      return {
        queryCriteria: queryCriteria,
        selected: null,
        loading: true
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
        return deepMerge(form, {
          appName: null,
          title: null,
          addressType: 0
        })
      },
      executeQueryPage() {
        this.loading = true
        JobGroupAPI.pageList(this.createQueryParams(false)).then(data => {
          this.queryResultHandler(data)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      customDelHandler() {
        //TODO 2019-10-15 正常
        JobGroupAPI.remove({id: this.selected.id}).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.executeQueryPage()
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-card {
    border: none;
  }
  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
  }
  .bg-green {
    background-color: #628eff !important;
  }
</style>
