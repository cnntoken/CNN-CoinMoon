//
//  CNNRNContainerManage.m
//  Stark
//
//  Created by float.. on 2019/5/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNRNBridgeManage.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge+Private.h>
#import "RCTBridge+CNN.h"
#import "CNNRNNavigationController.h"
#import "CNNRNViewController.h"
#import "CNNURL.h"
#import "CNNBundle.h"
#import "CNNDeviceInfo.h"
#import "CNNUserService.h"


#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

@interface CNNRNBridgeManage ()

// 公共包
@property (nonatomic, strong) CNNBundle *commonBundle;

// bundle包
@property (nonatomic, strong) NSArray<CNNBundle *> *bundleArr;

@property (nonatomic, strong) RCTBridge *cnnbridge;

@property (nonatomic, assign) BOOL isInited;


// jsbundle的下载队列, 优先保证基础包加载
@property (nonatomic, strong) dispatch_queue_t jsdownloadQueue;
// 串行队列信号, 当收到信号时取消阻塞
@property (nonatomic, strong) dispatch_semaphore_t bridgeSem;

@end

@implementation CNNRNBridgeManage
static CNNRNBridgeManage *_instance;
static const char * jsqueueName = "cnn_js_download_queue";

RCT_EXPORT_MODULE();



+ (instancetype)allocWithZone:(struct _NSZone *)zone{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _instance = [super allocWithZone:zone];
    //RCTJavaScriptDidLoadNotification
    [[NSNotificationCenter defaultCenter] addObserver:_instance selector:@selector(onRNBridgeLoaded:) name:RCTBridgeDidDownloadScriptNotification object:nil];
    _instance.jsdownloadQueue = dispatch_queue_create(jsqueueName, DISPATCH_QUEUE_SERIAL);
    _instance.bridgeSem = dispatch_semaphore_create(0);
    dispatch_async(_instance.jsdownloadQueue, ^{
      dispatch_semaphore_wait(_instance.bridgeSem, DISPATCH_TIME_FOREVER);
      NSLog(@"----------------------------- onRNBridgeLoaded ");
    });
  });
  return _instance;
}

#pragma mark - 初始化bridge监听
- (void)onRNBridgeLoaded:(NSNotification *)notice{
  dispatch_semaphore_signal(self.bridgeSem);
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - oc方法


+ (instancetype)shareManage{
  return [[self alloc] init];
}

+(void)prepareIfNeeded: (NSDictionary * _Nullable)launchOptions{
  // TODO: 采用多线程进行异步加载, 不阻塞主线程
  CNNRNBridgeManage *bridgeManage = [[self class] shareManage];
  if(bridgeManage.cnnbridge){
    return;
  }
  NSURL *jsCodeLocation;
#ifdef DEBUG
  if(IS_CNN_JSBUNDLE){
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:[NSString stringWithFormat:@"webapp/bundles/%@",bridgeManage.commonBundle.bundleName] withExtension:nil];
  }else{
    // 开发环境下加载所有资源
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  }
#else
  // release环境只加载公共资源
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:[NSString stringWithFormat:@"webapp/bundles/%@",bridgeManage.commonBundle.bundleName] withExtension:nil];
#endif
  
  bridgeManage.cnnbridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
                                              moduleProvider:nil
                                               launchOptions:launchOptions];
  
  
  // https://github.com/facebook/react-native/issues/16376
  #if RCT_DEV
    [ bridgeManage.cnnbridge moduleForClass:[RCTDevLoadingView class]];
  #endif
}

#ifdef DEBUG
- (NSArray *) getRNBundleArray{
  return self.bundleArr;
}
#endif

- (void)initFromNible{
  if(_isInited){
    return;
  }
  NSData *configData = [NSData dataWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"webapp/config" ofType:@"json"]];
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:configData options:NSJSONReadingMutableContainers error:nil];
  _bundleArr = [CNNBundle mj_objectArrayWithKeyValuesArray:dict[@"bundles"]];
  _commonBundle = [CNNBundle mj_objectWithKeyValues:dict[@"common"]];
  _isInited = YES;
}

- (CNNBundle *)commonBundle{
  if(!_commonBundle){
    [self initFromNible];
  }
  return _commonBundle;
}

- (NSArray<CNNBundle *> *)bundleArr{
  if(!_bundleArr){
    [self initFromNible];
  }
  return _bundleArr;
}

- (CNNBundle *)getBundleByModuleName:(NSString *)nameStr{
  CNNBundle *target = nil;
  for (CNNBundle* bundle in self.bundleArr) {
    if([nameStr isEqualToString:bundle.moduleName]){
      target = bundle;
      break;
    }
  }
  return target;
}

- (void)postDownloadNotification:(NSString *)notificationName{
  [[NSNotificationCenter defaultCenter] postNotificationName:notificationName object:nil];
}

- (void)loadIndividualBundle:(CNNBundle *)targetBundle{
  NSString *notificationName = [NSString stringWithFormat:@"CNN_RNVIEW_MODULE_%@", targetBundle.moduleName];
  if(!targetBundle.isLoaded){
    
    NSURL *jsCodeLocationBuz = [[NSBundle mainBundle] URLForResource:[NSString stringWithFormat:@"webapp/bundles/%@", targetBundle.bundleName] withExtension:nil];
    NSError *error = nil;
    NSData *sourceBuz = [NSData dataWithContentsOfFile:jsCodeLocationBuz.path
                                               options:NSDataReadingMappedIfSafe
                                                 error:&error];
    
    dispatch_sync(_jsdownloadQueue, ^{
      dispatch_async(dispatch_get_main_queue(), ^{
        [self.cnnbridge.batchedBridge executeSourceCode:sourceBuz sync:NO];
        NSLog(@"%@------jsdownloded--", targetBundle.bundleName);
         [self postDownloadNotification:notificationName];
      });
    });
    targetBundle.isLoaded = YES;
  }else{
    [self postDownloadNotification:notificationName];
  }
}

- (RCTRootView *)getRNViewWithModule:(NSString *)moduleName andProperties:(NSDictionary * _Nullable)properties{
  if(!self.cnnbridge){
    [CNNRNBridgeManage prepareIfNeeded:nil];
  }
   return [[RCTRootView alloc] initWithBridge:self.cnnbridge moduleName:moduleName initialProperties:[self generateRNInitialPropertiesWithDict:properties]];
}

- (UIViewController *)getRootViewControllerWithModule:(NSString *)moduleName andProperties:(NSDictionary * _Nullable)properties{
    if(!self.cnnbridge){
      [CNNRNBridgeManage prepareIfNeeded:nil];
    }
    CNNBundle *targetBundle = [self getBundleByModuleName:moduleName];
    CNNRNViewController *cnnVC = [[CNNRNViewController alloc] initWithCNNBundle:targetBundle andProperties:properties];
    return cnnVC;
}

- (BOOL)openRNPageWithModule:(NSString *)moduleName andProperties:(NSDictionary *)properties fromController:(UIViewController *)vc{
  CNNBundle *targetBundle = [self getBundleByModuleName:moduleName];
  CNNRNViewController *cnnVC = (CNNRNViewController *)[self getRootViewControllerWithModule:moduleName andProperties:properties];
  UINavigationController *navc = nil;
  if([vc isKindOfClass:UITabBarController.class]){
    navc = (UINavigationController *)vc;
  }else{
    navc = vc.navigationController ? vc.navigationController : (UINavigationController *)vc.presentingViewController;
  }
  if([targetBundle.type isEqualToString:@"push"] && ![vc isKindOfClass:UITabBarController.class]){
    [navc pushViewController:cnnVC animated:targetBundle.animate];
  }else{
    CNNRNNavigationController *nav = [[CNNRNNavigationController alloc] initWithRootViewController: cnnVC];
    [navc presentViewController:nav animated:targetBundle.animate completion:nil];
  }
  return YES;
}

- (NSDictionary *)generateRNInitialPropertiesWithDict: (NSDictionary * _Nullable) dict{
  if(!dict){
    dict = @{};
  }
  return @{@"baseInfo": [self RNBaseInfo], @"params": dict};
}

#pragma mark - CNNRNBaseProperties

- (NSDictionary *)RNBaseInfo{
  return  @{
            @"currentUser": [[CNNUserService service] currentUserDict]
          };
}

#pragma mark - JS通信方法

// 导出常量需要设置此方法
+ (BOOL)requiresMainQueueSetup{
  return YES;
}

// 导出一个常量字典
- (NSDictionary *)constantsToExport{
  
  return @{
           @"deviceInfo": [[CNNDeviceInfo shareInfo] baseInfo],
         };
}

// toast
RCT_EXPORT_METHOD(showToast:(NSString *)msg)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [CNNToast showToast:msg];
  });
}

// 关闭当前承载rn的viewController
RCT_EXPORT_METHOD(closeRNPage:(NSDictionary *)dict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *currentVC = [UIViewController getCurrentTopViewController];
    if([currentVC isKindOfClass:[CNNRNViewController class]]){
      if([currentVC.navigationController isKindOfClass:[CNNRNNavigationController class]]){
        // 当前vc是被present出来的rnnavvc
        if(currentVC.navigationController.childViewControllers.count > 1){
          // 当栈顶控制器还有其他view的时候 pop回去
          [currentVC.navigationController popViewControllerAnimated:YES];
        }else{
          // 当前view已经是根view的时候, dimiss
          [currentVC dismissViewControllerAnimated:YES completion:nil];
        }
      }else{
        [currentVC.navigationController popViewControllerAnimated:YES];
      }
    }else{
      reject(@"401",@"not rn message",nil);
    }
  });
}

// 跳转到一个原生页面
RCT_EXPORT_METHOD(goNativePage:(NSDictionary *)dict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  
  
}

// 跳转到一个RN页面
RCT_EXPORT_METHOD(goRNPage:(NSDictionary *)dict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSString *moduleName = dict[@"moduleName"];
  NSDictionary *properties = dict[@"params"];
  dispatch_async(dispatch_get_main_queue(), ^{
    [self openRNPageWithModule:moduleName andProperties:properties fromController: [UIViewController getCurrentTopViewController]];
  });
}

// 查询原生资源
RCT_EXPORT_METHOD(query:(NSDictionary *)dict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  
}

// 发送http请求
RCT_EXPORT_METHOD(ajax:(NSDictionary *)dict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  
}

#pragma mark - 发送一个全局事件
// 查询原生资源
RCT_EXPORT_METHOD(eventEmit:(NSDictionary *)dict)
{
  NSString *eventName = [dict objectForKey:@"eventName"];
  NSString *params = [dict objectForKey:@"params"];
  [[NSNotificationCenter defaultCenter] postNotificationName:eventName object:params userInfo:nil];
}

#pragma mark - user 全局信息
// 获取当前user信息
RCT_EXPORT_METHOD(getCurrentUser:(NSDictionary *)dict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  resolve([[CNNUserService service] currentUserDict]);
}

// 修改user信息
RCT_EXPORT_METHOD(updateCurrentUser:(NSDictionary *)dict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [[CNNUserService service] updateUserWithDict:dict];
  resolve(@"ok");
}

// 退出登录
RCT_EXPORT_METHOD(logout:(NSDictionary *)dict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  BOOL res = [[CNNUserService service] removeCurrentUser];
  if(res){
    resolve(@"ok");
  }else{
    reject(@"500",@"logout: user clear fail",nil);
  }
}
@end
