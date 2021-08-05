import tabbar from '../tabbar.js';
const api = require("../../utils/app.js")

Page({
  
  data: {
    //下拉框
    option1: [
      { text: '顺网', value: '顺网' },
      { text: '浮云', value: '浮云' },
      { text: '自有', value: '自有' },
    ],
    option2: [
      { text: '硬盘', value: '硬盘' },
      { text: '内存条', value: '内存条' },
      { text: '模块', value: '模块' },
      { text: '线材', value: '线材' },
      { text: '其他', value: '其他' },
    ],
    option3: [
      { text: '在库', value: 1 },
      { text: '出库', value: 0 }
    ],
    company: '顺网' ,
    name: '硬盘',
    deleted: 1,
    xinghao:'',

    //滑块
    checked: true,
    value: '',
    cklist: [],
    showLoading: true,
    list: tabbar,
    //滑动距离顶部距离
    myScrollTop: 0
  },

  onLoad: function () {
    this.getList()
  },

  getList(){
    let data = []
    let that = this
    api.getInfo('ck/list').then(res => {
      data = res.page.list
      that.setData({
        cklist:data
      })
    })
  },

  viewTrip() {
    wx.navigateTo({
      url: '/pages/ruku/ruku',
    })
  },

  getListShuxin(){
    this.setData({
      cklist:""
    })
    this.getList()

  },

      /**
     * 按条件过滤数据
     * @param rows 待过滤数组
     * @param name 待过滤属性
     * @param val 值
     * @return {[]}
     */
    filterData(rows, name, val) {
      let tmp = []

      if (val && val !== '') {
        if (['company', 'name', 'xinghao', 'deleted'].indexOf(name) > -1) {
          /*           tmp = rows.filter((value) => {
            return Object.keys(value).some((key) => {
              return String(value[key]).search(val) > -1
            })
          }) */
          tmp = rows.filter((value) => {
            return value[name] == val
          })
        } else if (name === 'time') {
          tmp = rows.filter((value, index, arr) => {
            if (!val) {
              val = ['1900-01-01', '2050-01-01']
            }
            if (val[0] === '') {
              val[0] = '1900-01-01'
            }
            if (val[1] === '') {
              val[1] = '2050-01-01'
            }
            let val_start_timestr = val[0].replace(/-/g, '/')
            let val_end_timestr = val[1].replace(/-/g, '/')
            let val_now_timestr = value.time.replace(/-/g, '/')

            let time_start = new Date(val_start_timestr)
            let time_end = new Date(val_end_timestr)
            let time_now = new Date(val_now_timestr)
            return time_now >= time_start && time_now <= time_end
          })
        } else {
          tmp = rows.filter((value) => value[name].indexOf(val) >= 0)
        }
      } else {
        tmp = rows
      }
      return tmp
    },
    //查询
    onSearch() {
      const company = this.data.company
      const name = this.data.name
      const xinghao = this.data.xinghao
      let rows = this.data.cklist
      let deleted = this.data.deleted
      rows = this.filterData(rows, 'deleted', deleted)
      rows = this.filterData(rows, 'company', company)
      rows = this.filterData(rows, 'name', name)
      rows = this.filterData(rows, 'xinghao', xinghao)
      console.log(rows)
      this.setData({
        cklist:rows
      })
    }
})
