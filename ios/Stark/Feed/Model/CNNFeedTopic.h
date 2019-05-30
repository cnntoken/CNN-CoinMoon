//
//  CNNFeedTopic.h
//  Stark
//
//  Created by float.. on 2019/5/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNTopic.h"
#import "CNNUser.h"
#import "CNNFeedStats.h"
#import "CNNFeedUserStats.h"

NS_ASSUME_NONNULL_BEGIN

@interface CNNFeedTopic : CNNTopic

@property (nonatomic, copy) NSString *category;
@property (nonatomic, copy) NSString *id;
@property (nonatomic, assign) NSInteger user_id;
@property (nonatomic, copy) NSString *title;

// content
@property (nonatomic, copy) NSString *content;
// 图片
@property (nonatomic, copy) NSArray *images;
@property (nonatomic, copy) NSString *cover;
// source_url
@property (nonatomic, copy) NSString *source_url;


@property(nonatomic, assign) BOOL is_sticky;

@property (nonatomic, strong)  CNNFeedStats *feed_stats;


@property (nonatomic, strong) NSAttributedString *attributeTitle;

@property (nonatomic, copy) NSString *created_at;

@property (nonatomic, strong) CNNUser *user;
@property (nonatomic, strong) CNNFeedUserStats *req_user_stats;

/* 额外增加的属性（并非服务器返回的属性，仅仅是为了提高开发效率） */

@property (nonatomic, strong) NSString *format_created_at;
/** 根据当前模型计算出来的cell高度 */
@property (nonatomic, assign) CGFloat cellHeight;
+(NSString *)stringWithType: (CNNTopicType)type;


@end

NS_ASSUME_NONNULL_END
