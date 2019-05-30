/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <SDImageCache.h>
#import <SDWebImage/SDWebImage.h>
#import <SDWebImageWebPCoder/SDWebImageWebPCoder.h>
//#import <Firebase.h>
#import "CNNRNBridgeManage.h"
#import "CNNTabBarController.h"
#import "CNNNavigationController.h"


#ifdef DEBUG
#import "FEDevTableViewController.h"
#endif


@implementation AppDelegate

-(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{
  
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
#ifdef DEBUG
  if(IS_CNN_MODULE_DEV){
    self.window.rootViewController = [[CNNNavigationController alloc] initWithRootViewController:[[FEDevTableViewController alloc] init]];
  }else{
    self.window.rootViewController = [[CNNTabBarController alloc] init];
  }
#else
  self.window.rootViewController = [[CNNTabBarController alloc] init];
#endif
  
  
  [self.window makeKeyAndVisible];
  // 添加对webp格式图片显示支持
  [SDImageCodersManager.sharedManager addCoder:SDImageWebPCoder.sharedCoder];
  
  [CNNRNBridgeManage prepareIfNeeded:launchOptions];
  return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
  // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
  // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
  
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
  // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
  // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
  // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
  // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}



- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application{
  // 清除内存缓存
  [[SDImageCache sharedImageCache] clearMemory];
  
  CNNLog(@"======================== applicationDidReceiveMemoryWarning =====================");
}

@end
