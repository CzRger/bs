<template>
  <el-row>
    <el-card>
      <el-col :span="20">
        <el-form
          :model="queryCriteria"
          :inline="true">
          <el-form-item label="字典分类:" prop="type">
            <el-select v-model="queryCriteria.type" filterable clearable placeholder="全部">
              <el-option v-for="(item, index) in dictionaryTypeList" :key="index" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="字典名称:" prop="name">
            <el-input v-model="queryCriteria.name" placeholder="请输入字典名称"/>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" class="query-btn">
        <el-button round type="info" @click="resetHandler">重置</el-button>
        <el-button round type="primary" @click="queryHandler">查询</el-button>
      </el-col>
    </el-card>
    <el-col :span="24" style="margin: 10px 0px;">
      <button-right>
        字典列表
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
      <el-table :data="pagination.list" highlight-current-row stripe border
                @current-change="(row) => { selected = row }" @row-dblclick="$emit('option-changed','check', selected)"
                @sort-change="sortChangeHandler">
        <el-table-column :show-overflow-tooltip="true" prop="type" label="字典分类" sortable="custom">
          <template slot-scope="scope">
            {{ getDictionaryTypeName(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" sortable="custom" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="code" label="规则码" width="120" sortable="custom"
                         align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="sortNum" label="编号" width="80" sortable="custom"
                         align="center"/>
        <el-table-column prop="createdDate" label="创建时间" width="180" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
        </el-table-column>
        <el-table-column prop="modifiedDate" label="最后修改时间" width="180" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.modifiedDate | parseTime }}</template>
        </el-table-column>
      </el-table>
      <pagination :pagination="pagination" position="right" @page-size-changed="pageSizeChangeHandler"
                  @page-changed="pageChangeHandler"/>
    </el-col>
  </el-row>
</template>

<script>
  import {deepMerge} from '@/utils'
  import BaseQueryPageForm from '@/views/common/mixins/BaseQueryPageForm'
  import * as DictionaryAPI from '@/api/system-management/dictionary'
  import mixins from './mixins'

  export default {
    mixins: [BaseQueryPageForm, mixins],
    data() {
      const queryCriteria = this.initQueryCriteria()
      return {
        queryCriteria: queryCriteria,
        selected: null
      }
    },
    activated() {
      this.selected = null
      this.queryAllDictionaryType()
    },
    methods: {
      initQueryCriteria(form = {}) {
        return deepMerge(form, {
          systemOnly: this.$route.params.systemOnly,
          category: '2',
          type: null,
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

  .query-btn /deep/ .el-button {
    float: right;
    margin-left: 10px;
  }
</style>
