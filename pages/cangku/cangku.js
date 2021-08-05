import naviConfigs from './navi.js';
import tabbar from '../tabbar.js';

Page({
    data: {
        naviConfigs: naviConfigs,
        list: tabbar
    },

    onNaviCard(e) {
        let {
            title,
            navigatemark
        } = e.target.dataset;
        wx.navigateTo({
            url: '/pages/' + navigatemark + '/' + navigatemark
        });
    },
    onCard() {
        // const path = e.target.dataset.path
        wx.navigateTo({
            url: '/pages/index/index'
        });
    },

    onShow: function () {
        if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
            selected: 1
          })
        }
      }

});