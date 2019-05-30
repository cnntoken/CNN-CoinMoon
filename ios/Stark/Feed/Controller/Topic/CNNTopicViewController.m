//
//  CNNTopicViewController.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//
#define TOPIC_COUNT 15
#import "CNNTopicViewController.h"
#import "CNNFeedTopic.h"
#import "CNNTopicCell.h"
#import "CNNRefreshHeader.h"
#import "CNNRefreshFooter.h"
#import "FeedService.h"
#import "CNNUserService.h"
#import "CNNRNBridgeManage.h"

@interface CNNTopicViewController ()<CNNTopicCellDelegate>

@property (nonatomic, assign) BOOL load_busy;

/** 当前最后一条帖子数据的描述信息，专门用来加载下一页数据 */
@property (nonatomic, copy) NSString *read_tag;

@property (nonatomic, strong) NSMutableArray<CNNFeedTopic *> *topics;

@property (nonatomic, assign) BOOL btnActionBusy;

@end

/* cell的重用标识 */
static NSString * const CNNTopicCellId = @"CNNTopicCellId";


@implementation CNNTopicViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupTable];// 设置tableview
    [self setupNotification]; // 注册消息监听
    [self setupRefresh];// 上拉加载, 下拉刷新
}
- (CNNFeedTopic *)getTopicById:(NSString *)id{
  __block CNNFeedTopic *topic = nil;
  [self.topics enumerateObjectsUsingBlock:^(CNNFeedTopic * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    if([obj.id isEqualToString:id]){
      topic = obj;
      *stop = YES;
    }
  }];
  return topic;
}
- (void)setupNotification{
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(tabBarButtonDidRepeatClick) name:CNNTabBarButtonDidRepeatClickNotification object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(titleButtonDidRepeatClick) name:CNNTitleButtonDidRepeatClickNotification object:nil];
  
  __weak typeof (self) weakSelf = self;
  [[NSNotificationCenter defaultCenter] addObserverForName:@"CNN_TOPIC_STATUS_CHANGE" object:nil queue:nil usingBlock:^(NSNotification * _Nonnull note) {
    
    NSDictionary *dict = note.object;
    NSString *topicId = dict[@"id"];
    NSString *type = dict[@"type"];
    CNNFeedTopic *topic = [weakSelf getTopicById:topicId];
    if(!topic){
      return;
    }
    NSInteger targetIndex = [weakSelf.topics indexOfObject:topic];
    if([type isEqualToString:@"feed/feed_view_count_add"]){
      
      topic.feed_stats.view_count += 1;
      
    }else if([type isEqualToString:@"feed/feed_comment_count_add"]){
      
      topic.feed_stats.comment_count +=1;
      
    }else if([type isEqualToString:@"feed/feed_comment_count_minus"]){
      
      topic.feed_stats.comment_count -=1;
      if(topic.feed_stats.comment_count < 0){
        topic.feed_stats.comment_count = 0;
      }
      
    }else if([type isEqualToString:@"feed/feed_like"]){
      topic.req_user_stats.like = YES;
      topic.feed_stats.like_count +=1;
      
    }else if([type isEqualToString:@"feed/feed_cancel_like"]){
      topic.req_user_stats.like = NO;
      topic.feed_stats.like_count -=1;
      if(topic.feed_stats.like_count < 0){
        topic.feed_stats.like_count = 0;
      }
      
    }else if([type isEqualToString:@"feed/feed_add"]){
      
    }else if([type isEqualToString:@"feed/feed_delete"]){
      
      [weakSelf.topics removeObject:topic];
      dispatch_async(dispatch_get_main_queue(), ^{
         [weakSelf.tableView deleteRowsAtIndexPaths:@[[NSIndexPath indexPathForRow:targetIndex inSection:0]] withRowAnimation:UITableViewRowAnimationNone];
      });
      return;
    }else{
      return;
    }
    
    dispatch_async(dispatch_get_main_queue(), ^{
       [weakSelf.tableView reloadRowsAtIndexPaths:@[[NSIndexPath indexPathForRow:targetIndex inSection:0]] withRowAnimation:UITableViewRowAnimationNone];
    });
  }];
}

- (void)setupTable{
  self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
  self.tableView.scrollIndicatorInsets = self.tableView.contentInset;
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
  self.tableView.separatorColor = [UIColor colorFromHexCode:@"#E6E6E6"]; //设置分割线的颜色
  [self.tableView setSeparatorInset:UIEdgeInsetsMake(0, 0, 0, 0)]; //设置分割线的边Insets
  // 关闭cell高度的预估, 防止table刷新跳动
  self.tableView.estimatedRowHeight = 0;
  self.tableView.estimatedSectionHeaderHeight = 0;
  self.tableView.estimatedSectionFooterHeight = 0;
  // 注册cell
  UINib *nib = [UINib nibWithNibName:NSStringFromClass([CNNTopicCell class]) bundle:nil];
  [self.tableView registerNib:nib forCellReuseIdentifier:CNNTopicCellId];
}

- (void)setupRefresh
{
  // header
  self.tableView.mj_header = [CNNRefreshHeader headerWithRefreshingTarget:self refreshingAction:@selector(loadNewTopics)];
  [self.tableView.mj_header beginRefreshing];
  self.tableView.mj_footer = [CNNRefreshFooter footerWithRefreshingTarget:self refreshingAction:@selector(loadMoreTopics)];
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - 监听
/**
 *  监听tabBarButton重复点击
 */
- (void)tabBarButtonDidRepeatClick
{
  // 重复点击的不是精华按钮
  if (self.view.window == nil) return;
  
  // 显示在正中间的不是VideoViewController
  if (self.tableView.scrollsToTop == NO) return;
  
  // 进入下拉刷新
  [self.tableView.mj_header beginRefreshing];
}

/**
 *  监听titleButton重复点击
 */
- (void)titleButtonDidRepeatClick
{
  [self tabBarButtonDidRepeatClick];
}

- (void)rnActions:(NSNotification *)note{
  
}

#pragma mark - 数据处理
/**
 *  发送请求给服务器，下拉刷新数据
 */
- (void)loadNewTopics
{
  [self getList:YES];

}

/**
 *  发送请求给服务器，上拉加载更多数据
 */
- (void)loadMoreTopics
{
  [self getList:NO];
  // 1.取消之前的请求
//  [self.manager.tasks makeObjectsPerformSelector:@selector(cancel)];
}

- (void)getList:(Boolean) isRefresh
{
  if(self.load_busy){
    return;
  }else{
    self.load_busy = YES;
  }
   // 2.拼接参数
  NSMutableDictionary *parameters = [NSMutableDictionary dictionary];
  parameters[@"count"] = @TOPIC_COUNT;
  parameters[@"category"] = [CNNFeedTopic stringWithType:self.type];
  if(!isRefresh){
    parameters[@"read_tag"] = self.read_tag;
  }
  // 3.发送请求
  [FeedService getListWithParams:parameters handler:^(id  _Nonnull data, NSError * _Nonnull error) {
    
      [self.tableView.mj_header endRefreshing];
      if(error){
        self.load_busy = NO;
        CNNLog(@"%s, %@",__func__,error);
        self.tableView.mj_footer.state = MJRefreshStateIdle;
        // 结束刷新
        return;
      }
      NSMutableArray *arr = (NSMutableArray<CNNFeedTopic*> *)data;
      if(arr.count < TOPIC_COUNT){
        self.tableView.mj_footer.state = MJRefreshStateNoMoreData;
      }else{
        self.tableView.mj_footer.state = MJRefreshStateIdle;
      }
      if(isRefresh){
          self.topics = arr;
      }else{
          [self.topics addObjectsFromArray:arr];
      }
      CNNFeedTopic *last = [self.topics lastObject];
      self.read_tag = last.id;
      // 刷新表格
      [self.tableView reloadData];
      self.load_busy = NO;
  }];
}

#pragma mark - 数据源(UITableViewDatasource)

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  // 根据数据量显示或者隐藏footer
  self.tableView.mj_footer.hidden = (self.topics.count == 0);
  if(self.topics != nil ){
    return self.topics.count;
  }
  return 0;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    CNNTopicCell *cell = [tableView dequeueReusableCellWithIdentifier:CNNTopicCellId];
    cell.topic = self.topics[indexPath.row];
    cell.delegate = self;
    return cell;
}



#pragma mark - 代理方法(UITableViewDelegate)
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return self.topics[indexPath.row].cellHeight;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
  CNNLog(@"%@", indexPath);
  CNNFeedTopic *topic = self.topics[indexPath.row];
  NSDictionary *dict = [topic mj_JSONObject];
  NSLog(@"%@",dict);
  [[CNNRNBridgeManage shareManage] openRNPageWithModule:@"stark_news_detail" andProperties:@{@"data": dict} fromController:self];
}

#pragma mark - cell点击代理(CNNTopicCellDelegate)

- (void)topicCell:(CNNTopicCell *)cell onClickedWithTopic:(CNNFeedTopic *)topic andAction:(CNNTopicCellAction)action{
  if(_btnActionBusy){
    return;
  }
  _btnActionBusy = YES;
  if(action != TopicCellActionAvatar && ![CNNUserService service].user.isLogin){
    CNNLog(@"not login");
    [[CNNRNBridgeManage shareManage] openRNPageWithModule:@"stark_login" andProperties:nil fromController:self];
    _btnActionBusy = NO;
    return;
  }
  
  NSInteger targetIndex = [self.topics indexOfObject:topic];
  CNNLog(@"cell=%@",cell);
  CNNLog(@"action=%ld, topic=%@",action, topic);
  CNNLog(@"targetIndex=%ld",targetIndex);
  if(action == TopicCellActionLike){// 点赞
    BOOL isCancle = topic.req_user_stats.like;
    NSDictionary *params = @{@"id": topic.id, @"isCancel": @(isCancle)};
    __weak typeof(self) weakself = self;
    [FeedService likeWithParams:params handler:^(id  _Nonnull data, NSError * _Nonnull error) {
      if(error){
        CNNLog(@"%@",error);
      }else{
//        [CNNToast showToast: isCancle ? @"取消成功" : @"点赞成功"];
        topic.feed_stats.like_count = isCancle ? topic.feed_stats.like_count - 1 : topic.feed_stats.like_count + 1;
        topic.req_user_stats.like = !isCancle;
        [self.tableView reloadRowsAtIndexPaths:@[[NSIndexPath indexPathForRow:targetIndex inSection:0]] withRowAnimation:UITableViewRowAnimationNone];
      }
      weakself.btnActionBusy = NO;
    }];
  }else if(action == TopicCellActionMore){// 更多
    [self onMoreClickedWithTopic:topic index:targetIndex];
    _btnActionBusy = NO;
  }else if(action == TopicCellActionComment){// 评论
    _btnActionBusy = NO;
  }else if(action == TopicCellActionAvatar){// 点击头像
    [[CNNRNBridgeManage shareManage] openRNPageWithModule:@"stark_others_home" andProperties:@{@"user":[topic.user mj_JSONObject]} fromController:self];
    _btnActionBusy = NO;
  }
}

#pragma mark - cell 按钮"更多"点击

- (void)onMoreClickedWithTopic:(CNNFeedTopic *)topic index:(NSInteger)index{
  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:nil message:nil preferredStyle:UIAlertControllerStyleActionSheet];
  UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:CNNLOCALIZE(@"cancel") style:UIAlertActionStyleCancel handler:nil];
  UIAlertAction *dislikeAction = [UIAlertAction actionWithTitle:CNNLOCALIZE(@"dislike") style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    CNNLog(@"dislike");
    NSDictionary *params = @{@"id": topic.id};
    [self.topics removeObject:topic];
    [self.tableView deleteRowsAtIndexPaths:[NSArray arrayWithObject:[NSIndexPath indexPathForRow:index inSection:0]] withRowAnimation:UITableViewRowAnimationFade];
    [FeedService dislikeFeedWithParams:params handler:^(id  _Nonnull data, NSError * _Nonnull error) {}];
  }];
  UIAlertAction *dislikeUserAction = [UIAlertAction actionWithTitle:CNNLOCALIZE(@"dislike_user") style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    NSDictionary *params = @{@"user_id": [NSNumber numberWithLong:topic.user.user_id]};
    NSMutableArray *indexArr = [NSMutableArray array];
    NSMutableArray *newArr = [NSMutableArray array];
    [self.topics enumerateObjectsUsingBlock:^(CNNFeedTopic * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      if(obj.user.id == topic.user.id){
        [indexArr addObject:[NSIndexPath indexPathForRow:idx inSection:0]];
      }else{
        [newArr addObject:obj];
      }
    }];
    self.topics = newArr;
    [self.tableView deleteRowsAtIndexPaths:indexArr withRowAnimation:UITableViewRowAnimationFade];
    [FeedService dislikeUserWithParams:params handler:^(id  _Nonnull data, NSError * _Nonnull error) {}];
  }];
  [alertController addAction:cancelAction];
  [alertController addAction:dislikeAction];
  [alertController addAction:dislikeUserAction];
  [self presentViewController:alertController animated:YES completion:nil];
}

@end
