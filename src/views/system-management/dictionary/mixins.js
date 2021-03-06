import { mapGetters } from 'vuex'
import * as DictionaryAPI from '@/api/system-management/dictionary'

export default {
  props: {
    category: {
      required: true,
      type: String,
      default: () => {}
    },
    detail: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      parentDictionaryName: '',
      dictionaryTypeList: []
    }
  },
  computed: {
    ...mapGetters([
      'dictionaries'
    ])
  },
  methods: {
    initForm() {
      return {
        id: null,
        systemOnly: this.$route.params.systemOnly,
        parentId: null,
        category: 2,
        type: null,
        level: 1,
        isLeaf: 'YES',
        name: null,
        code: null,
        sortNum: null,
        remark: null
      }
    },
    initRules() {
      return {
        systemOnly: [{
          required: true, message: '请明确是否为系统字典', trigger: 'change'
        }],
        category: [{
          required: true, message: '字典类别为必填项', trigger: 'change'
        }],
        type: [{
          required: true, message: '请选择字典类型', trigger: 'change'
        }],
        level: [{
          required: true, message: '请设置字典层级', trigger: 'change'
        }],
        isLeaf: [{
          required: true, message: '请设置是否为叶子节点', trigger: 'change'
        }],
        name: [{
          required: true, message: '请输入字典名称', trigger: 'blur'
        }, {
          min: 2, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        sortNum: [{
          required: true, message: '请输入字典编号', trigger: 'blur'
        }]
      }
    },
    queryAllDictionaryType() {
      DictionaryAPI.queryAllDictionaries({ filters: [{ field: 'category', value: 1 }, { field: 'systemOnly', value: this.$route.params.systemOnly }] }).then((list) => {
        this.dictionaryTypeList = list
      }, () => {
        this.dictionaryTypeList = []
      })
    },
    getDictionaryTypeName(type) {
      const dictionary = this.dictionaryTypeList.find(item => item.id === type)
      if (dictionary) {
        return dictionary.name
      }
      return type
    },
    getParentDictionaryName(id) {
      this.parentDictionaryName = ''
      if (!id || id === 'root') return
      DictionaryAPI.queryDictionaryById(id).then(dictionary => {
        this.parentDictionaryName = dictionary.name
      })
    }
  }
}
