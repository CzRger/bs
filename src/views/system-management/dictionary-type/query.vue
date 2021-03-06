<template>
  <el-row>
    <x-button-layout :button-width="122" :is-horizontal="true">
      <el-form
        :model="queryCriteria"
        :inline="true">
        <el-form-item label="字典类型名称:" prop="name">
          <el-input v-model="queryCriteria.name" placeholder="请输入字典类型名称"/>
        </el-form-item>
      </el-form>
      <template slot="button">
        <el-button round type="info" @click="resetHandler">重置</el-button>
        <el-button round type="primary" @click="queryHandler">查询</el-button>
      </template>
    </x-button-layout>
    <el-col :span="24" style="margin: 10px 0px;">
      <button-right>
        字典类型列表
        <template slot="button">
          <el-button-group>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','check', selected)">查看</el-button>
            <el-button type="primary" @click="$emit('option-changed','add')">新增</el-button>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','edit', selected)">编辑</el-button>
            <el-button v-if="selected" type="primary" @click="delHandler">删除</el-button>
          </el-button-group>
        </template>
      </button-right>
    </el-col>
    <el-col :span="24">
      <el-table :data="pagination.list" highlight-current-row stripe border @current-change="(row) => { selected = row }" @row-dblclick="$emit('option-changed','check', selected)" @sort-change="sortChangeHandler">
        <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" sortable="custom"/>
        <el-table-column :show-overflow-tooltip="true" prop="code" label="规则码" width="120" sortable="custom" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="sortNum" label="编号" width="80" sortable="custom" align="center"/>
        <el-table-column prop="createdDate" label="创建时间" width="180" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
        </el-table-column>
        <el-table-column prop="modifiedDate" label="最后修改时间" width="180" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.modifiedDate | parseTime }}</template>
        </el-table-column>
      </el-table>
      <pagination :pagination="pagination" position="right" @page-size-changed="pageSizeChangeHandler" @page-changed="pageChangeHandler"/>
    </el-col>
  </el-row>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {deepMerge} from '@/utils'
  import BaseQueryPageForm from '@/views/common/mixins/BaseQueryPageForm'
  import * as DictionaryAPI from '@/api/system-management/dictionary'
  import XButtonLayout from '@/components/x-button-layout'

  export default {
    mixins: [BaseQueryPageForm],
    components: {XButtonLayout},
    data() {
      const queryCriteria = this.initQueryCriteria()
      return {
        queryCriteria: queryCriteria,
        selected: null
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
          systemOnly: this.$route.params.systemOnly,
          category: 1,
          name: null
        })
      },
      executeQueryPage() {
        this.selected = null
        DictionaryAPI.queryPageDictionaries(this.createQueryParams()).then(data => {
          this.queryResultHandler(data)
        })
      },
      customDelHandler() {
        DictionaryAPI.delDictionary(this.selected.id).then(() => {
          this.queryHandler()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-card {
    border: none;
  }
</style>
