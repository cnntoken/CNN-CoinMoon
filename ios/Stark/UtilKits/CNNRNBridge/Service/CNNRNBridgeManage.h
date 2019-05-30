//
//  CNNRNContainerManage.h
//  Stark
//
//  Created by float.. on 2019/5/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTRootView.h>

@class CNNBundle;

// CNNRNBaseProperties, rn需要的基础属性
@protocol CNNRNBaseProperties <NSObject>

- (nonnull NSDictionary *) RNBaseInfo;

@end

NS_ASSUME_NONNULL_BEGIN

@interface CNNRNBridgeManage : NSObject<RCTBridgeModule,CNNRNBaseProperties>


+(instancetype)shareManage;

// 预加载
+(void)prepareIfNeeded: (NSDictionary * _Nullable)launchOptions;

// 通过moduleName跳转到rn界面
- (BOOL)openRNPageWithModule:(NSString *)moduleName andProperties:(nullable NSDictionary *) properties fromController:(UIViewController *)vc;


- (UIViewController *)getRootViewControllerWithModule:(NSString *)moduleName andProperties:(NSDictionary * _Nullable)properties;


- (RCTRootView *)getRNViewWithModule:(NSString *)moduleName andProperties:(NSDictionary * _Nullable)properties;

- (void)loadIndividualBundle:(CNNBundle *)targetBundle;

#ifdef DEBUG
- (NSArray *)getRNBundleArray;
#endif

@end

NS_ASSUME_NONNULL_END
