//
//  FeedService.h
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HttpService.h"

NS_ASSUME_NONNULL_BEGIN

@interface FeedService : NSObject

/**
 根据参数获取feedlist
 */
+ (NSURLSessionDataTask *)getListWithParams:(NSDictionary*)params handler:(completionHandler)handler;

+ (NSURLSessionDataTask *)likeWithParams:(NSDictionary*)params handler:(completionHandler)handler;

+ (NSURLSessionDataTask *)dislikeFeedWithParams:(NSDictionary*)params handler:(completionHandler)handler;

+ (NSURLSessionDataTask *)dislikeUserWithParams:(NSDictionary*)params handler:(completionHandler)handler;

@end

NS_ASSUME_NONNULL_END
