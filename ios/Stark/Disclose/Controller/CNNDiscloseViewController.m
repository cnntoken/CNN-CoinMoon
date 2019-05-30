//
//  CNNDiscloseViewController.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNDiscloseViewController.h"
#import "CNNDiscloseCell.h"
#import "CNNDiscloseTopic.h"
#import "DiscloseService.h"
#import "CNNRefreshHeader.h"
#import "CNNRefreshFooter.h"
#import "DiscloseService.h"
#import "CNNUserService.h"
#import "CNNRNBridgeManage.h"

#define TOPIC_COUNT 20

@interface CNNDiscloseViewController ()<CNNTopicCellDelegate>

//@property (nonatomic, strong) UITableView *tableView;
@property (nonatomic, assign) BOOL load_busy;

/** 当前最后一条帖子数据的描述信息，专门用来加载下一页数据 */
@property (nonatomic, copy) NSString *read_tag;

@property (nonatomic, strong) NSMutableArray<CNNDiscloseTopic *> *topics;

@property (nonatomic, assign) BOOL btnActionBusy;

@end

static NSString * const CNNDiscloseCellId = @"CNNDiscloseCellId";

@implementation CNNDiscloseViewController
- (void)loadView{
  [super loadView];
  self.view.backgroundColor = [UIColor whiteColor];
}

- (CNNDiscloseTopic *)getTopicById:(NSString *)id{
  __block CNNDiscloseTopic *topic = nil;
  [self.topics enumerateObjectsUsingBlock:^(CNNDiscloseTopic * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    if([obj.id isEqualToString:id]){
      topic = obj;
      *stop = YES;
    }
  }];
  return topic;
}

- (void)viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
  
  // 状态栏颜色
  UIView *statusBar = (UIView *)[[UIApplication sharedApplication] valueForKey:@"statusBar"];
  statusBar.backgroundColor = [UIColor clearColor];
  
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupNavgationBar];
    [self setupTable];
    [self setupRefresh];
    [self setupNotification];
}

- (void)setupNotification{
  
//  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(tabBarButtonDidRepeatClick) name:CNNTabBarButtonDidRepeatClickNotification object:nil];
//  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(titleButtonDidRepeatClick) name:CNNTitleButtonDidRepeatClickNotification object:nil];
  
  __weak typeof (self) weakSelf = self;
  [[NSNotificationCenter defaultCenter] addObserverForName:@"CNN_TOPIC_STATUS_CHANGE" object:nil queue:nil usingBlock:^(NSNotification * _Nonnull note) {
    
    NSDictionary *dict = note.object;
    NSString *topicId = dict[@"id"];
    NSString *type = dict[@"type"];
    CNNDiscloseTopic *topic = [weakSelf getTopicById:topicId];
    NSInteger targetIndex = [weakSelf.topics indexOfObject:topic];
    if([type isEqualToString:@"disclose/disclose_view_count_add"]){
      
      topic.disclose_stats.view_count += 1;
      
    }else if([type isEqualToString:@"disclose/disclose_comment_count_add"]){
      
      topic.disclose_stats.comment_count +=1;
      
    }else if([type isEqualToString:@"disclose/disclose_comment_count_minus"]){
      
      topic.disclose_stats.comment_count -=1;
      if(topic.disclose_stats.comment_count < 0){
        topic.disclose_stats.comment_count = 0;
      }
      
    }else if([type isEqualToString:@"disclose/disclose_like"]){
      
      topic.disclose_stats.like_count +=1;
      topic.req_user_stats.like = YES;
      
    }else if([type isEqualToString:@"disclose/disclose_cancel_like"]){
      topic.req_user_stats.like = NO;
      topic.disclose_stats.like_count -=1;
      if(topic.disclose_stats.like_count < 0){
        topic.disclose_stats.like_count = 0;
      }
      
    }else if([type isEqualToString:@"disclose/disclose_add"]){
      NSDictionary *discloseDict = dict[@"data"];
      CNNDiscloseTopic *topic = [CNNDiscloseTopic topicWithDict:discloseDict];
      [weakSelf.topics insertObject:topic atIndex:0];
      dispatch_async(dispatch_get_main_queue(), ^{
        [weakSelf.tableView insertRowsAtIndexPaths:@[[NSIndexPath indexPathForRow:0 inSection:0]] withRowAnimation:UITableViewRowAnimationNone];
      });
      
    }else if([type isEqualToString:@"disclose/disclose_delete"]){
      
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

- (void)setupNavgationBar{
  self.title = CNNLOCALIZE(@"disclose_title");
  self.navigationController.navigationBar.barTintColor = [UIColor colorFromHexCode:CNNPrimaryColorHex];
  self.navigationController.navigationBar.translucent = NO;
  [self.navigationController.navigationBar setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor],NSFontAttributeName: [UIFont systemFontOfSize:24 weight:UIFontWeightBold]}];
   self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"btn_post"] style:UIBarButtonItemStyleDone target:self action:@selector(goPublish)];
  
}

- (UIStatusBarStyle)preferredStatusBarStyle{
  return UIStatusBarStyleLightContent;
}
- (void)setupTable{
  self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
  self.tableView.scrollIndicatorInsets = self.tableView.contentInset;
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
  self.tableView.separatorColor = [UIColor colorFromHexCode:@"#E6E6E6"]; //设置分割线的颜色
  [self.tableView setSeparatorInset:UIEdgeInsetsMake(0, 0, 0, 0)]; //设置分割线的边Insets
  self.tableView.estimatedRowHeight = 0;
  // 注册cell
  UINib *nib = [UINib nibWithNibName:NSStringFromClass([CNNDiscloseCell class]) bundle:nil];
  [self.tableView registerNib:nib forCellReuseIdentifier:CNNDiscloseCellId];
//  [self.view addSubview:self.tableView];
}

- (void)setupRefresh
{
  // header
  self.tableView.mj_header = [CNNRefreshHeader headerWithRefreshingTarget:self refreshingAction:@selector(loadNewTopics)];
  [self.tableView.mj_header beginRefreshing];
  self.tableView.mj_footer = [CNNRefreshFooter footerWithRefreshingTarget:self refreshingAction:@selector(loadMoreTopics)];
  
}

#pragma mark - 发布爆料
-(void)goPublish{
  if(![CNNUserService service].user.isLogin){
    [[CNNRNBridgeManage shareManage] openRNPageWithModule:@"stark_login" andProperties:nil fromController:self];
  }else{
    [[CNNRNBridgeManage shareManage] openRNPageWithModule:@"stark_disclose_publish" andProperties:nil fromController:self];
  }
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
  if(!isRefresh){
    parameters[@"read_tag"] = self.read_tag;
  }
  // 3.发送请求
  [DiscloseService getListWithParams:parameters handler:^(id  _Nonnull data, NSError * _Nonnull error) {
    
    [self.tableView.mj_header endRefreshing];
    if(error){
      self.load_busy = NO;
      CNNLog(@"%s, %@",__func__,error);
      self.tableView.mj_footer.state = MJRefreshStateIdle;
      // 结束刷新
      return;
    }
    NSMutableArray *arr = (NSMutableArray<CNNDiscloseTopic*> *)data;
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
    CNNDiscloseTopic *last = [self.topics lastObject];
    self.read_tag = last.id;
    // 刷新表格
    [self.tableView reloadData];
    self.load_busy = NO;
  }];
}

#pragma mark - UITableViewDataSource


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
   CNNDiscloseCell *cell = [tableView dequeueReusableCellWithIdentifier:CNNDiscloseCellId];
   cell.topic = self.topics[indexPath.row];
   cell.delegate = self;
   return cell;
}

- (NSInteger)tableView:(nonnull UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
  // 根据数据量显示或者隐藏footer
  self.tableView.mj_footer.hidden = (self.topics.count == 0);
  if(self.topics != nil ){
    return self.topics.count;
  }
  return 0;
}



#pragma mark - UITableViewDelegate

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
  return [self.topics objectAtIndex:indexPath.row].cellHeight;
}


- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
  CNNLog(@"%@", indexPath);
  CNNDiscloseTopic *topic = self.topics[indexPath.row];
  NSDictionary *dict = [topic mj_JSONObject];
  NSLog(@"%@",dict);
  [[CNNRNBridgeManage shareManage] openRNPageWithModule:@"stark_disclose_detail" andProperties:@{@"data": dict} fromController:self];
}

#pragma mark - cell点击代理(CNNTopicCellDelegate)

- (void)topicCell:(CNNTopicCell *)cell onClickedWithTopic:(CNNDiscloseTopic *)topic andAction:(CNNTopicCellAction)action{
    if(_btnActionBusy){
      return;
    }
    if(action != TopicCellActionAvatar && ![CNNUserService service].user.isLogin){
      CNNLog(@"not login");
      _btnActionBusy = NO;
      [[CNNRNBridgeManage shareManage] openRNPageWithModule:@"stark_login" andProperties:nil fromController:self];
      
      return;
  }
  _btnActionBusy = YES;
  NSInteger targetIndex = [self.topics indexOfObject:topic];
  CNNLog(@"cell=%@",cell);
  CNNLog(@"action=%ld, topic=%@",action, topic);
  CNNLog(@"targetIndex=%ld",targetIndex);
  __weak typeof(self) weakself = self;
  if(action == TopicCellActionLike){// 点赞
    BOOL isCancle = topic.req_user_stats.like;
    NSDictionary *params = @{@"id": topic.id, @"isCancel": @(isCancle)};
    [DiscloseService likeWithParams:params handler:^(id  _Nonnull data, NSError * _Nonnull error) {
      if(error){
        CNNLog(@"%@",error);
      }else{
//        [CNNToast showToast: isCancle ? @"取消成功" : @"点赞成功"];
        topic.disclose_stats.like_count = isCancle ? topic.disclose_stats.like_count - 1 : topic.disclose_stats.like_count + 1;
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

- (void)onMoreClickedWithTopic:(CNNDiscloseTopic *)topic index:(NSInteger)index{
  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:nil message:nil preferredStyle:UIAlertControllerStyleActionSheet];
  UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:CNNLOCALIZE(@"cancel") style:UIAlertActionStyleCancel handler:nil];
   [alertController addAction:cancelAction];
  if([topic.user isSelf]){ // 如果是自己发的爆料, 显示删除
    // 添加删除按钮
    UIAlertAction *removeAction = [UIAlertAction actionWithTitle:CNNLOCALIZE(@"delete") style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      NSDictionary *params = @{@"id": topic.id};
      [self.topics removeObject:topic];
      [self.tableView deleteRowsAtIndexPaths:[NSArray arrayWithObject:[NSIndexPath indexPathForRow:index inSection:0]] withRowAnimation:UITableViewRowAnimationFade];
      [DiscloseService removeWithParams:params handler:^(id  _Nonnull data, NSError * _Nonnull error) {
        if(error){
          [CNNToast showToast:@"fail"];
        }
      }];
    }];
    [alertController addAction:removeAction];
  }else{ //如果是别人发的爆料, 显示屏蔽
    // 添加屏蔽按钮
    UIAlertAction *dislikeAction = [UIAlertAction actionWithTitle:@"dislike" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      NSDictionary *params = @{@"id": topic.id};
      [self.topics removeObject:topic];
      [self.tableView deleteRowsAtIndexPaths:[NSArray arrayWithObject:[NSIndexPath indexPathForRow:index inSection:0]] withRowAnimation:UITableViewRowAnimationFade];
      [DiscloseService dislikeWithParams:params handler:^(id  _Nonnull data, NSError * _Nonnull error) {}];
    }];
    UIAlertAction *dislikeUserAction = [UIAlertAction actionWithTitle:@"dislikeUser" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      NSDictionary *params = @{@"user_id": [NSNumber numberWithLong:topic.user.user_id]};
      NSMutableArray *indexArr = [NSMutableArray array];
      NSMutableArray *newArr = [NSMutableArray array];
      [self.topics enumerateObjectsUsingBlock:^(CNNDiscloseTopic * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if(obj.user.id == topic.user.id){
          [indexArr addObject:[NSIndexPath indexPathForRow:idx inSection:0]];
        }else{
          [newArr addObject:obj];
        }
      }];
      self.topics = newArr;
      [self.tableView deleteRowsAtIndexPaths:indexArr withRowAnimation:UITableViewRowAnimationFade];
      [DiscloseService dislikeUserWithParams:params handler:^(id  _Nonnull data, NSError * _Nonnull error) {}];
      CNNLog(@"dislike user");
    }];
    
    [alertController addAction:dislikeAction];
    [alertController addAction:dislikeUserAction];
  }
 
  [self presentViewController:alertController animated:YES completion:nil];
}
@end
