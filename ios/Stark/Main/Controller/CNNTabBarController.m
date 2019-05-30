//
//  CNNTabBarController.m
//  Stark
//
//  Created by float.. on 2019/4/28.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNTabBarController.h"
#import "CNNTabBar.h"
#import "CNNNavigationController.h"
#import "CNNFeedViewController.h"
#import "CNNDiscloseViewController.h"
#import "CNNMarketViewController.h"
#import "CNNMineViewController.h"
#import "CNNLicenseView.h"
#import "CNNDiscloseDialogView.h"
#import "CNNRNBridgeManage.h"
#import "CNNUserService.h"
#import "CNNIdentity.h"



@interface CNNTabBarController ()<UITabBarDelegate,CNNLicenseDelegate,CNNDiscloseDialogDelegate>

@property (nonatomic, strong) NSArray *navArray;

@property (nonatomic, strong) CNNLicenseView *licenseView; // 首次进入 弹窗用户协议dialog
@property (nonatomic, strong) CNNDiscloseDialogView *discloseDialogView;
@property (nonatomic, weak) CNNIdentity *identity;
@end

@implementation CNNTabBarController


- (NSArray *)navArray{
  if(!_navArray){
    _navArray = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TabBar" ofType:@"plist"]];
  }
  return _navArray;
}

- (CNNLicenseView *)licenseView{
  if(!_licenseView){
    _licenseView = [[CNNLicenseView alloc] initWithFrame:self.view.bounds];
    _licenseView.delegate = self;
    [self.view addSubview:_licenseView];
  }
  return _licenseView;
}

-(CNNDiscloseDialogView *)discloseDialogView{
  if(!_discloseDialogView){
    _discloseDialogView = [[CNNDiscloseDialogView alloc] initWithFrame:self.view.bounds];
    _discloseDialogView.delegate = self;
    [self.view addSubview:_discloseDialogView];
  }
  return _discloseDialogView;
  
}

-(CNNIdentity *)identity{
  if(!_identity){
    _identity = [CNNUserService service].identity;
  }
  return _identity;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self setupTabBar];
    [self setupAllChildViewController];
    [self judgeDeviceIdentity];
    [[CNNUserService service] prepareIfNeed];
}

/*
 判断用户设备是否是第一次使用app
 */
- (void)judgeDeviceIdentity{
  CNNIdentity *identity = self.identity;
  identity.lastSoftVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
  if(identity.firstUseSoft){// 第一次使用app需要弹出license的dialog
    [self setupLicense];
  }
  [[CNNUserService service] saveIdentity];
}

#pragma mark - 自定义tabBar
- (void)setupTabBar{
  CNNTabBar *tabBar = [[CNNTabBar alloc] init];
  [self setValue:tabBar forKey:@"tabBar"];
}

#pragma mark - 添加所有子控制器
- (void)setupAllChildViewController{
  int itemTag = 0;
  for (NSDictionary *dict in self.navArray) {
    UIViewController *controller = nil;
    if([dict[@"title"] isEqualToString:@"tabbar_market"]){
      controller = [[CNNRNBridgeManage shareManage] getRootViewControllerWithModule:@"stark_market" andProperties:nil];
    }else if([dict[@"title"] isEqualToString:@"tabbar_mine"]){
      controller = [[CNNRNBridgeManage shareManage] getRootViewControllerWithModule:@"stark_mine" andProperties:nil];
    }else{
      controller = [[NSClassFromString(dict[@"control"]) alloc] init];
    }
    CNNNavigationController *nav = [[CNNNavigationController alloc] initWithRootViewController:controller];
    nav.tabBarItem.tag = itemTag++;
    nav.tabBarItem.title = CNNLOCALIZE(dict[@"title"]);
    nav.tabBarItem.image = [UIImage imageNamed:dict[@"icon"]];
    // 创建一个描述文本属性的字典
    NSMutableDictionary *attrs = [NSMutableDictionary dictionary];
    attrs[NSForegroundColorAttributeName] = [UIColor colorFromHexCode:CNNPrimaryColorHex];

    nav.tabBarItem.selectedImage = [UIImage imageOriginalWithName:dict[@"icon2"]];
    [nav.tabBarItem setTitleTextAttributes:attrs forState:UIControlStateSelected];
    
    // 设置字体尺寸:只有设置正常状态下,才会有效果
    NSMutableDictionary *attrsNor = [NSMutableDictionary dictionary];
    attrsNor[NSFontAttributeName] = [UIFont systemFontOfSize:12];
    attrs[NSForegroundColorAttributeName] = [UIColor colorFromHexCode:@"#666666"];

    [nav.tabBarItem setTitleTextAttributes:attrsNor forState:UIControlStateNormal];
    [self addChildViewController:nav];
  }
}

#pragma mark - 添加license
- (void)setupLicense{
  [self.view addSubview:self.licenseView];
  [self.view bringSubviewToFront:self.licenseView];
}


#pragma mark - cnnlicensedelegate

- (void)onLicenceAgree{
  [self.licenseView removeFromSuperview];
  self.licenseView = nil;
  self.identity.firstUseSoft = NO;
  [[CNNUserService service] saveIdentity];
}

- (void)onLicenceDetailClick:(NSString *)type{
  [[CNNRNBridgeManage shareManage] openRNPageWithModule:@"stark_policy" andProperties:@{@"policy":type} fromController:self];
}


#pragma mark - CNNDiscloseDialogDelegate

- (void)onDialogOver{
  [self.discloseDialogView removeFromSuperview];
  self.discloseDialogView = nil;
  self.identity.firstUseDisclose = NO;
  [[CNNUserService service] saveIdentity];
}

#pragma mark - UITabBarDelegate
- (void)tabBar:(UITabBar *)tabBar didSelectItem:(UITabBarItem *)item{
  if(item.tag == 2){// 点击disclose
    if(self.identity.firstUseDisclose){// 第一次使用disclose需要弹出dialog
      [self.view addSubview:self.discloseDialogView];
      [self.view bringSubviewToFront:self.discloseDialogView];
      [[CNNUserService service] saveIdentity];
    }
  }
}

@end
