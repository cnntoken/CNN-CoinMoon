import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListTabBar from '../components/ListTabBar';
import MarketList from '../components/MarketList';
import i18n from '@i18n';
import { DeviceEventEmitter, View, AppState } from 'react-native';
import { getCurrentUser, isRNRootPage } from '@utils/CNNBridge';
import {
  cnnLogger,
  adaptUserInfo,
  getUserStateChangeEventEmitter,
  marketCollectionEventEmitter,
  debounce_next,
} from '@utils/index';

const LIMIT = 20;

class ViewControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      updateKeys: [],
      activeTab: 0,
      currentAppState: 'active',
      isPageShowing: true,
    };
    this.interval = null;
  }
  componentDidMount() {
    this.getList({ count: LIMIT, page: 0 });
    this.getRankList({
      count: LIMIT,
      page: 0,
      sort_key: '-cap',
    });
    // 监听RN页面的状态
    AppState.addEventListener('change', this._handleAppStateChange);
    this.pageShowing = DeviceEventEmitter.addListener('whichRNPageShowing', ({ page }) => {
      if (page === 'market_index') {
        this.setState({
          isPageShowing: true,
        });
      } else {
        this.setState({
          isPageShowing: false,
        });
      }
    });
    this.refreshMineData();
    // 监听搜索页面发起的自选操作事件
    this.collectionListenerForRN = DeviceEventEmitter.addListener('collectionAction', () => {
      this.getList({ count: LIMIT, category: 'mine', page: 0 });
    });
    // 监听详情页发起的自选操作事件
    this.collectionListenerForNative = marketCollectionEventEmitter().addListener(
      'refresh_self_selected_list',
      () => {
        this.getList({ count: LIMIT, category: 'mine', page: 0 });
      },
    );
    this.userStateListener = getUserStateChangeEventEmitter().addListener(
      'CNN_USER_STATUS_CHANGE',
      async data => {
        console.log('===========CNN_USER_STATUS_CHANGE=========', data);
        const newUser = await getCurrentUser({});
        this.setState(
          {
            user: adaptUserInfo(newUser),
          },
          () => {
            this.getList({ count: LIMIT, category: 'mine', page: 0 });
          },
        );
      },
    );
  }
  componentWillUnmount() {
    this.collectionListenerForRN.remove();
    this.collectionListenerForNative.remove();
    this.userStateListener.remove();
    AppState.removeEventListener('change', this._handleAppStateChange);
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  _handleAppStateChange = nextAppState => {
    this.setState({ currentAppState: nextAppState });
  };
  getRankList = (params, successCallback, failCallback) => {
    cnnLogger('currency_refresh', {
      tab: 'all', // all
    });
    this.props.getRankList(
      params,
      no_more => {
        successCallback && successCallback(no_more);
      },
      () => {
        // 网络错误
        failCallback && failCallback();
      },
    );
  };
  getList = (obj, successCallback, failCallback) => {
    cnnLogger('currency_refresh', {
      tab: 'mine', // 'mine'
    });
    this.props.getList(
      obj,
      ({ no_more, list }) => {
        successCallback && successCallback(no_more);
        let { updateKeys } = this.state;
        if (!obj.is_loadmore) {
          updateKeys = list.slice(0, 10).map(coin => {
            return `${coin.exchange}/${coin.fcoin}/${coin.tcoin}`;
          });
        }
        this.setState({
          updateKeys,
        });
      },
      () => {
        // 网络错误
        this.setState({
          updateKeys: [],
        });
        failCallback && failCallback();
      },
    );
  };
  @debounce_next({ delay: 1000 })
  listenViewableItem = coins => {
    let updateKeys = coins.map(coin => {
      return `${coin.item.exchange}/${coin.item.fcoin}/${coin.item.tcoin}`;
    });
    this.setState({
      updateKeys,
    });
  };
  getDataByPairKey = updateKeys => {
    this.props.getDataByPairKey(updateKeys);
  };
  refreshMineData = () => {
    let { market_refresh_frequency } = this.props.params; // 原生从firebase上获取刷新时间配置后，传给RN
    this.interval = setInterval(() => {
      let { updateKeys } = this.state;
      if (
        updateKeys.length  &&// 自选列表不为空
        this.state.activeTab === 0 && // 处于自选列表的tab下
        this.state.currentAppState === 'active' && // 如果进入后台则停止刷新
        this.state.isPageShowing // 如果跳转到搜索页则停止自动刷新
      ) {
        this.getDataByPairKey(updateKeys);
      }
    }, market_refresh_frequency || 5 * 1000);
  };
  handleSort = ({ sort_key }, successCallback, failCallback) => {
    this.getRankList(
      {
        sort_key,
        page: 0,
        count: LIMIT,
      },
      successCallback,
      failCallback,
    );
  };
  handleRefresh = (category, successCallback, failCallback) => {
    const params = {
      page: 0,
      count: LIMIT,
      is_loadmore: false,
    };
    if (category === 'all') {
      let sort_key = this.props[category].sort_key;
      this.getRankList({ sort_key, page: 0, count: LIMIT }, successCallback, failCallback);
    } else {
      this.getList(params, successCallback, failCallback);
    }
  };
  handleLoadMore = (category, successCallback, failCallback) => {
    const params = {
      page: this.props[category].page + 1,
      count: LIMIT,
      is_loadmore: true,
    };
    if (category === 'all') {
      params.sort_key = this.props[category].sort_key;
      this.getRankList(params, successCallback, failCallback);
    } else {
      this.getList(params, successCallback, failCallback);
    }
  };
  goSearch = () => {
    cnnLogger('click_search_pairs');
    this.props.navigation.navigate('MarketSearch');
    isRNRootPage({
      moduleName: 'stark_market',
      isRoot: false,
    });
  };
  handleTabChange = ({ i }) => {
    this.setState({
      activeTab: i,
    });
  };
  render() {
    console.disableYellowBox = true;
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          initialPage={1}
          onChangeTab={this.handleTabChange}
          renderTabBar={() => <ListTabBar goSeach={this.goSearch} />}
        >
          {['mine', 'all'].map(cate => {
            return (
              <MarketList
                LIMIT={LIMIT}
                key={cate}
                data={this.props[cate].list}
                supportSort={false} // 不支持排序
                sort_key={this.props[cate].sort_key}
                type={cate}
                showOrder={cate === 'all' ? true : false}
                tabLabel={i18n.t(`page_market_list.category_${cate}`)}
                handleSort={this.handleSort}
                handleRefresh={this.handleRefresh}
                handleLoadMore={this.handleLoadMore}
                goMarketDetail={item => this.goMarketDetail(item, cate)}
                user={this.state.user}
                listenViewableItem={this.listenViewableItem}
              />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

export default ViewControl;
