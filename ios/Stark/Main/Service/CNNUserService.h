//
//  UserService.h
//  Stark
//
//  Created by float.. on 2019/5/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
@class CNNUser, CNNIdentity;

NS_ASSUME_NONNULL_BEGIN

@interface CNNUserService : NSObject

// 当前的user信息
@property (nonatomic, strong) CNNUser *user;
// 设备使用情况, 与是否登录无关
@property (nonatomic, strong) CNNIdentity *identity;

+ (instancetype) service;

- (void)prepareIfNeed;


#pragma mark -- User

/**
 更新用户数据
 
 @param user 最新的用户
 */
- (void)updateUser:(CNNUser *) user;

- (void)updateUserWithDict:(NSDictionary *)dict;

- (NSDictionary *)currentUserDict;

- (BOOL)removeCurrentUser;



#pragma mark - identity
- (void)saveIdentity;

@end

NS_ASSUME_NONNULL_END
