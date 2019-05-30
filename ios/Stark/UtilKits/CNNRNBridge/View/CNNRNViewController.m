//
//  CNNRNViewController.m
//  Stark
//
//  Created by float.. on 2019/5/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNRNViewController.h"
#import <React/RCTRootView.h>
#import "CNNBundle.h"
#import "CNNRNBridgeManage.h"

@interface CNNRNViewController ()

@property (nonatomic, strong) RCTRootView *rnView;
@property (nonatomic, strong) CNNBundle *cnnBundle;
@property (nonatomic, strong, nullable) NSDictionary *properties;
@end

@implementation CNNRNViewController

- (instancetype)initWithCNNBundle:(CNNBundle *)bundle andProperties:(NSDictionary * _Nullable)properties{
  if(self = [super init]){
    _cnnBundle = bundle;
    _properties = properties;
  }
  return self;
  
}


- (RCTRootView *)rnView{
  if(!_rnView){
    _rnView = [[CNNRNBridgeManage shareManage] getRNViewWithModule:_cnnBundle.moduleName andProperties:_properties];
  }
  return _rnView;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    [self setupNotification];
}

- (void)setupNotification{

  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(setupRNView) name:[NSString stringWithFormat:@"CNN_RNVIEW_MODULE_%@", _cnnBundle.moduleName] object:nil];
  
  [[CNNRNBridgeManage shareManage] loadIndividualBundle:self.cnnBundle];
}


- (void)setupRNView{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
  [self.view addSubview:self.rnView];
  // 添加约束, 适配iphoneX
  [self setupConstraints];
}

- (void)setupConstraints{
  if (@available(iOS 11.0, *)){
    // if ([UIViewController instancesRespondToSelector:@selector(safeAreaLayoutGuide)])
    // ios11开始支持safearea
    [self.rnView makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(self.view.mas_safeAreaLayoutGuideTop);
      make.left.equalTo(self.view.mas_safeAreaLayoutGuideLeft);
      make.bottom.equalTo(self.view.mas_safeAreaLayoutGuideBottom);
      make.right.equalTo(self.view.mas_safeAreaLayoutGuideRight);
    }];
  }else if([UIView instancesRespondToSelector:@selector(topLayoutGuide)]){
    // ios8开始支持topLayout
    [self.rnView makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(self.mas_topLayoutGuide);
      make.left.equalTo(@0);
      make.right.equalTo(@0);
      make.bottom.equalTo(self.mas_bottomLayoutGuide);
    }];
  }else{
    self.rnView.frame = self.view.bounds;
  }
}

- (void)viewWillAppear:(BOOL)animated{
  [super viewWillAppear: animated];
  [self.navigationController setNavigationBarHidden:YES];
  //设置状态栏颜色
  [self setStatusBarBackgroundColor: [UIColor colorFromHexCode:self.cnnBundle.statusBgColor]];
}

- (void)viewWillDisappear:(BOOL)animated{
  [super viewDidDisappear:animated];
  [self.navigationController setNavigationBarHidden:NO];
}

//- (void)viewWillDisappear:(BOOL)animated{
//  
//  [super viewWillDisappear:animated];
//  //为了不影响其他页面在viewDidDisappear做以下设置
//  [self setStatusBarBackgroundColor: [UIColor clearColor]];
//}


- (UIStatusBarStyle)preferredStatusBarStyle{
  if([self.cnnBundle.statusBgColor.lowercaseString isEqualToString: @"#ffffff"]){
    return UIStatusBarStyleDefault;
  }
  return  UIStatusBarStyleLightContent;
}


//设置状态栏颜色
- (void)setStatusBarBackgroundColor:(UIColor *)bgColor{
  UIView *statusBar = (UIView *)[[UIApplication sharedApplication] valueForKey:@"statusBar"];
  statusBar.backgroundColor = bgColor;
}


- (void)dealloc{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}
@end
