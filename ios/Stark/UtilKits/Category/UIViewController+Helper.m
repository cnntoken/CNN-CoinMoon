//
//  UIViewController+Helper.m
//  Stark
//
//  Created by float.. on 2019/5/11.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "UIViewController+Helper.h"

@implementation UIViewController (Helper)

+(UIViewController *) getCurrentTopViewController{
  UIViewController *rootViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
  UIViewController *currentVC = [UIViewController getCurrentVCFrom:rootViewController];
  
  return currentVC;
  
}


+ (UIViewController *)getCurrentVCFrom:(UIViewController *)rootVC
{
  UIViewController *currentVC;
  
  if ([rootVC presentedViewController]) {
    // 视图是被presented出来的
    rootVC = [rootVC presentedViewController];
  }
  
  if ([rootVC isKindOfClass:[UITabBarController class]]) {
    // 根视图为UITabBarController
    currentVC = [self getCurrentVCFrom:[(UITabBarController *)rootVC selectedViewController]];
  } else if ([rootVC isKindOfClass:[UINavigationController class]]){
    // 根视图为UINavigationController
    currentVC = [self getCurrentVCFrom:[(UINavigationController *)rootVC visibleViewController]];
  } else {
    // 根视图为非导航类
    currentVC = rootVC;
  }
  
  return currentVC;
}

@end
