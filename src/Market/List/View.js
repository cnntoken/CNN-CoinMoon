import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListTabBar from '../components/ListTabBar';
import MarketList from '../components/MarketList';
import i18n from '@i18n';
import { DeviceEventEmitter, View } from 'react-native';
import { getCurrentUser, isRNRootPage } from '@utils/CNNBridge';
import {
  cnnLogger,
  adaptUserInfo,
  getUserStateChangeEventEmitter,
  debounce_next,
} from '@utils/index';

const LIMIT = 20;

class ViewControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_netError: false,
      mine_netError: false,
      netError: false,
      user: props.user,
      updateKeys: [],
      activeTab: 0
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
    this.refreshMineData()
    // 监听详情页发起的自选操作事件
    this.collectionListener = DeviceEventEmitter.addListener('collectionAction', () => {
      this.getList({ count: LIMIT, category: 'mine', page: 0 });
    });
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
    this.collectionListener.remove();
    this.userStateListener.remove();
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  getRankList = (params, successCallback, failCallback) => {
    cnnLogger('currency_refresh', {
      tab: 'all', // all
    });
    this.props.getRankList(
      params,
      data => {
        this.setState({
          [`all_netError`]: false,
        });
        successCallback && successCallback(data);
      },
      () => {
        // 网络错误
        this.setState({
          [`all_netError`]: true,
        });
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
        let { updateKeys } = this.state
        if(!obj.is_loadmore){
          updateKeys = list.slice(0, 10).map(coin => {
            return `${coin.exchange}/${coin.fcoin}/${coin.tcoin}`;
          });
        }
        this.setState({
          [`${obj.category}_netError`]: false,
          updateKeys,
        });
      },
      () => {
        // 网络错误
        this.setState({
          [`${obj.category}_netError`]: true,
          updateKeys: []
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
    this.interval = setInterval(() => {
      let { updateKeys } = this.state;
      if (updateKeys.length && this.state.activeTab === 0) {
        this.getDataByPairKey(updateKeys);
      }
    }, 5 * 1000);
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
  handleTabChange = ({i}) => {
    this.setState({
      activeTab: i
    })
  }
  render() {
    console.disableYellowBox = true;
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          onChangeTab={this.handleTabChange}
          renderTabBar={() => <ListTabBar goSeach={this.goSearch} />}>
          {['mine', 'all'].map(cate => {
            return (
              <MarketList
                LIMIT={LIMIT}
                key={cate}
                data={
                  this.props[cate].list
                }
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
                netError={this.state[`${cate}_netError`]}
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
