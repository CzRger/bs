import * as DictionaryAPI from '@/api/system-management/dictionary'

const dictionaries = {
  state: {
    // 字典是否自动初始化完成
    initCompleted: false,

    trueOrFalse: [{
      key: '',
      value: ''
    }],

    gender: [{
      key: '',
      value: ''
    }],

    dictionaryCategory: [{
      key: '',
      value: ''
    }],

    allMicroService: [{
      key: '',
      value: ''
    }],
    qrtzStatus: [{
      key: 1, value: '等待调度'
    },{
      key: 2, value: '暂停调度'
    },{
      key: 3, value: '已离线'
    },],
    
    executorRouteStrategy: [{
      key: 'FIRST', value: '第一个'
    }, {
      key: 'LAST', value: '最后一个'
    }, {
      key: 'ROUND', value: '轮询'
    }, {
      key: 'RANDOM', value: '随机'
    }, {
      key: 'CONSISTENT_HASH', value: '一致性HASH'
    }, {
      key: 'LEAST_FREQUENTLY_USED', value: '最不经常使用'
    }, {
      key: 'LEAST_RECENTLY_USED', value: '最近最久未使用'
    }, {
      key: 'FAILOVER', value: '故障转移'
    }, {
      key: 'BUSYOVER', value: '忙碌转移'
    }, {
      key: 'SHARDING_BROADCAST', value: '分片广播'
    }],
  
    addressType: [{
      key: 0, value: '自动注册'
    }, {
      key: 1, value: '手动注册'
    }],
  
    triggerStatus: [{
      key: 0, value: '停止'
    }, {
      key: 1, value: '启动'
    }],
  
    glueType: [{
      key: 'BEAN', value: 'BEAN'
    }, {
      key: 'GLUE_GROOVY', value: 'GLUE(Java)'
    }, {
      key: 'GLUE_SHELL', value: 'GLUE(Shell)'
    }, {
      key: 'GLUE_PYTHON', value: 'GLUE(Python)'
    }, {
      key: 'GLUE_PHP', value: 'GLUE(PHP)'
    }, {
      key: 'GLUE_NODEJS', value: 'GLUE(Nodejs)'
    }, {
      key: 'GLUE_POWERSHELL', value: 'GLUE(PowerShell)'
    }, ],
  
    executorBlockStrategy: [{
      key: 'SERIAL_EXECUTION', value: '单机串行'
    }, {
      key: 'DISCARD_LATER', value: '丢弃后续调度'
    }, {
      key: 'COVER_EARLY', value: '覆盖之前调度'
    }, ],
  
    triggerCode: [{
      key: 200, value: '成功'
    }, {
      key: 500, value: '500失败'
    }, ],
    
    handleCode: [{
      key: 200, value: '成功'
    }, {
      key: 500, value: '500失败'
    }, {
      key: 502, value: '502失败'
    }, ],
  
    logStatus: [{
      key: 1, value: '成功'
    }, {
      key: 2, value: '失败'
    }, {
      key: 3, value: '进行中'
    }, ]
  },
  mutations: {
    REFRESH_INIT_COMPLETED: ( state, data ) => {
      state.initCompleted = data
    },
    REFRESH_TRUE_OR_FALSE: ( state, data ) => {
      state.trueOrFalse = data
    },
    REFRESH_GENDER: ( state, data ) => {
      state.gender = data
    },
    REFRESH_DICTIONARY_CATEGORY: ( state, data ) => {
      state.dictionaryCategory = data
    },
    REFRESH_MICRO_SERVICE: ( state, data ) => {
      state.allMicroService = data
    }
  },
  actions: {
    loadBaseSystemDictionary({ commit, state }) {
      if(!state.initCompleted) {
        DictionaryAPI.queryBaseSystemDictionary().then(data => {
          for (let key in data) {
            // REFRESH_TRUE_OR_FALSE, REFRESH_GENDER, REFRESH_DICTIONARY_CATEGORY, REFRESH_MICRO_SERVICE 与后端枚举值是一样的
            commit(key, data[key])
          }
          commit('REFRESH_INIT_COMPLETED', true)
        }).catch(() => {
          commit('REFRESH_INIT_COMPLETED', false)
        })
      }
    }
  }
}
export default dictionaries
