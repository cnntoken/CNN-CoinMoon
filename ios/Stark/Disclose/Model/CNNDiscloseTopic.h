//
//  CNNDisclose.h
//  Stark
//
//  Created by float.. on 2019/5/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CNNTopic.h"
#import "CNNUser.h"
#import "CNNFeedStats.h"
#import "CNNFeedUserStats.h"

NS_ASSUME_NONNULL_BEGIN

@interface CNNDiscloseTopic : CNNTopic


@property (nonatomic, copy) NSString *id;
@property (nonatomic, assign) NSInteger user_id;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSArray *images;
@property (nonatomic, copy) NSString *created_at;
@property (nonatomic, strong) CNNUser *user;
@property (nonatomic, strong) CNNFeedStats *disclose_stats;
@property (nonatomic, strong) CNNFeedUserStats *req_user_stats;

@property (nonatomic, strong) NSAttributedString *attributeTitle;

/* 额外增加的属性（并非服务器返回的属性，仅仅是为了提高开发效率） */
/** 根据当前模型计算出来的cell高度 */
@property (nonatomic, assign) CGFloat cellHeight;

+ (instancetype)topicWithDict:(NSDictionary *)dict;

@end

NS_ASSUME_NONNULL_END
