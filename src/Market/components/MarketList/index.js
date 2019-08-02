import React, { Component } from 'react';
import styles from './styles';
import i18n from '@i18n';
import {
  // Image,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import TriangleIcon from '../TriangleIcon/index';
import MarketItem from '../MarketItem/index';

import RefreshListView, { RefreshState } from '@components/RefreshListView';

/**
 * showOrder 展示序列号
 * showAction 展示添加自选/移除自选icon
 */
class MarketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: false,
      refreshState: RefreshState.Idle,
      LIMIT: props.LIMIT || 20,
    };
  }

  // 添加自选
  addCollection = ({ id, index, type, info }, successCallback) => {
    this.props.addCollection({ id, index, type, info }, successCallback);
  };

  // 取消自选
  removeCollection = ({ id, index, type, info }, successCallback) => {
    this.props.removeCollection({ id, index, type, info }, successCallback);
  };

  // 请求结束后,设置refreshState状态
  setRefreshState = refreshState => {
    this.setState({ refreshState });
  };
  // 下拉刷新
  handleRefresh = (category, _, cb) => {
    this.setState(
      {
        refreshState: RefreshState.HeaderRefreshing,
      },
      () => {
        this.props.handleRefresh(
          category,
          () => {
            cb && cb();
            this.setRefreshState(RefreshState.Idle);
          },
          () => {
            cb && cb();
            this.setRefreshState(RefreshState.Failure);
          },
        );
      },
    );
  };
  handleLoadMore = category => {
    this.setState(
      {
        refreshState: RefreshState.FooterRefreshing,
      },
      () => {
        this.props.handleLoadMore(
          category,
          nomore => {
            let refreshState = RefreshState.Idle;
            if (nomore) {
              refreshState = RefreshState.NoMoreData;
            }
            this.setRefreshState(refreshState);
          },
          () => {
            this.setRefreshState(RefreshState.Failure);
          },
        );
      },
    );
  };
  _renderItem = ({ item, index }) => {
    const { showAction, showOrder, type } = this.props;
    return (
      <MarketItem
        key={item.id}
        addCollection={this.addCollection}
        removeCollection={this.removeCollection}
        showAction={showAction}
        showOrder={showOrder}
        item={item}
        index={index}
        user={this.props.user}
        type={type}
      />
    );
  };

  handleSort = (category, sort_key, count) => {
    this.flatlist.scrollToIndex({ index: 0 });
    if (this.state.sorting) {
      return false;
    }
    this.setState({
      sorting: true,
    });
    let dir;
    if (sort_key === this.props.sort_key.replace(/-/g, '')) {
      dir = this.props.sort_key.includes('-') ? sort_key : '-' + sort_key;
    } else {
      dir = '-' + sort_key;
    }
    this.props.handleSort(
      { category, sort_key: dir, count },
      () => {
        this.setState({
          sorting: false,
        });
        this.setRefreshState(RefreshState.Idle);
      },
      () => {
        this.setState({
          sorting: false,
        });
        this.setRefreshState(RefreshState.Failure);
      },
    );
  };
  // 头部过滤条件
  ListHeaderComponent = type => {
    if (this.props.data && !this.props.data.length) return null;
    const { sort_key, supportSort } = this.props;
    if (!supportSort) {
      return (
        <View style={styles.filter_con}>
          <View style={styles.filter_item_1}>
            <Image style={styles.pair_icon} source={require('@images/market_pair.png')} />
            <Text style={styles.text}>{i18n.t('page_market_list.market_pair_title')}</Text>
          </View>
          <View style={styles.filter_item_2}>
            <Text style={styles.text}>{i18n.t('page_market_list.current_price')}</Text>
          </View>
          <View style={styles.filter_item_3}>
            <Text style={styles.text}>{i18n.t('page_market_list.change_24h')}</Text>
            {//空白占位,保证对齐
            this.props.showAction ? <View style={styles.action_placeholder} /> : null}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.filter_con}>
          <View style={styles.filter_item_1}>
            <TouchableOpacity
              disabled={this.state.sorting}
              onPress={() => this.handleSort('all', 'cap', this.state.LIMIT)}
              style={styles.filter_item_left_btn}
            >
              <Text style={styles.text}>{i18n.t('page_market_list.market_cap')}</Text>
              <TriangleIcon
                sort_dir={sort_key !== '-cap' ? (sort_key === 'cap' ? 'asc' : '') : 'desc'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.filter_item_2}>
            <TouchableOpacity
              disabled={this.state.sorting}
              onPress={() => this.handleSort('all', 'price', this.state.LIMIT)}
              style={styles.filter_item_right_btn}
            >
              <Text style={styles.text}>{i18n.t('page_market_list.current_price')}</Text>
              <TriangleIcon
                sort_dir={sort_key !== '-price' ? (sort_key === 'price' ? 'asc' : '') : 'desc'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.filter_item_3}>
            <TouchableOpacity
              disabled={this.state.sorting}
              style={styles.filter_item_right_btn}
              onPress={() => this.handleSort('all', 'chg', this.state.LIMIT)}
            >
              <Text style={styles.text}>{i18n.t('page_market_list.change_24h')}</Text>
              <TriangleIcon
                sort_dir={sort_key !== '-chg' ? (sort_key === 'chg' ? 'asc' : '') : 'desc'}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  renderEmptyView = type => {
    if (
      type === 'mine' &&
      this.state.refreshState !== RefreshState.HeaderRefreshing &&
      this.state.refreshState !== RefreshState.Failure
    ) {
      return (
        <View style={styles.no_mine}>
          <Text style={styles.no_mine_text}>{i18n.t('page_market_list.no_mine_text')}</Text>
        </View>
      );
    } else {
      return <View />;
    }
  };
  getKey = (item, index) => {
    return index.toString();
  };
  _onViewableItemsChanged = info => {
    if (this.props.listenViewableItem) {
      let { viewableItems } = info;
      let coins = viewableItems.filter(coin => coin.item.id !== '--');
      this.props.listenViewableItem(coins);
    }
  };
  render() {
    let { data, type } = this.props;
    return (
      <View style={{ flex: 1 }} onLayout={this.props.onLayout}>
        <View style={{ flex: 1 }}>
          {this.ListHeaderComponent(type)}
          <RefreshListView
            listRef={ref => (this.flatlist = ref)}
            // initialNumToRender={20}
            getItemLayout={(data, index) => ({ length: 65, offset: 65 * index, index })}
            data={data}
            keyExtractor={this.getKey}
            renderItem={this._renderItem}
            refreshState={this.state.refreshState}
            onHeaderRefresh={(_, cb) => this.handleRefresh(type, _, cb)}
            onFooterRefresh={() => this.handleLoadMore(type)}
            ListEmptyComponent={() => this.renderEmptyView(type)}
            onViewableItemsChanged={type === 'mine' ? this._onViewableItemsChanged : null}
            viewabilityConfig={{
              waitForInteraction: true,
              minimumViewTime: 1000,
              viewAreaCoveragePercentThreshold: 100,
            }}
            // 可选
            footerRefreshingText={i18n.t('page_market_list.footerRefreshingText')}
            footerFailureText={i18n.t('page_market_list.footerFailureText')}
            footerNoMoreDataText={
              type === 'mine' && !data.length ? '' : i18n.t('page_market_list.footerNoMoreDataText')
            }
            footerEmptyDataText={i18n.t('page_market_list.footerEmptyDataText')}
          />
        </View>
      </View>
    );
  }
}

export default MarketList;
