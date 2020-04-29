/**
 * 适用于一个一个查询对象+一个分页结果集展示的简单组件
 * 约束：
 * 寄主对象中应具有：
 * --this.queryCriteria : 表单查询对象封装
 * --this.initQueryCriteria() : 表单查询对象初始化函数
 * --this.executeQueryPage : 分页表单查询接口
 */

import { deepMerge, deepClone } from '@/utils'

export default {
  data() {
    const pagination = this.initPagination()
    return {
      autoRefresh: true,
      pagination: pagination
    }
  },
  activated() {
    if (this.autoRefresh) {
      this.executeQueryPage()
    }
  },
  methods: {
    initPagination(pagination = {}) {
      return deepMerge(pagination, {
        total: 0,
        pageSize: 10,
        page: 1,
        list: [],
        filters: [],
        sorts: []
      })
    },
    resetHandler() {
      this.initQueryCriteria(this.queryCriteria)
      this.initPagination(this.pagination)
      this.executeQueryPage()
    },
    queryHandler() {
      this.initPagination(this.pagination)
      this.executeQueryPage()
    },
    createPageParams(params = {}) {
      params.pageSize = this.pagination.pageSize
      params.page = this.pagination.page
      return params
    },
    createPageSorts(params = {}) {
      params.sorts = this.pagination.sorts
      return params
    },
    createQueryParams(queryMode = true) {
      const params = {}
      this.createPageParams(params)
      this.createPageSorts(params)
      this.pagination.filters = []
      if (queryMode) {
        Object.keys(this.queryCriteria).forEach(key => {
          const value = this.queryCriteria[key]
          if (value != null && value != undefined) {
            if (typeof value === 'object') {
              this.pagination.filters.push({ field: key, value: deepClone(value) })
            } else {
              this.pagination.filters.push({ field: key, value: value })
            }
          }
        })
        params.filters = this.pagination.filters
      } else {
        params.entity = this.queryCriteria
      }
      return params
    },
    queryResultHandler(result) {
      return deepMerge(this.pagination, result)
    },
    pageSizeChangeHandler(pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.page = 1
      this.executeQueryPage()
    },
    pageChangeHandler(page) {
      this.pagination.page = page
      this.executeQueryPage()
    },
    sortChangeHandler({ column, prop, order }) {
      // ElementUI 目前并不支持远端多字段排序
      // sorts数组设计的目的是为了支持ElementUI后续拓展

      this.pagination.sorts = []
      // sorts = [type: 'ORDER_BY_DESC', field: ['name']]
      if (column) {
        this.pagination.sorts.push({
          field: [prop],
          type: order === 'descending' ? 'ORDER_BY_DESC' : 'ORDER_BY_ASC'
        })
      }
      this.pagination.page = 1
      this.executeQueryPage()
    },
    delHandler() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.customDelHandler) {
          this.customDelHandler()
        } else {
          this.$message({
            type: 'info',
            message: '您未定义删除逻辑处理方法customDelHandler'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
