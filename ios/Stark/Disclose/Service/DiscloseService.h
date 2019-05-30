//
//  DiscloseService.h
//  Stark
//
//  Created by float.. on 2019/5/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HttpService.h"
NS_ASSUME_NONNULL_BEGIN

@class CNNDiscloseTopic;

@interface DiscloseService : NSObject


/**
 根据参数获取discloselist
 */
+ (NSURLSessionDataTask *)getListWithParams:(NSDictionary*)params handler:(completionHandler)handler;

+ (NSURLSessionDataTask *)removeWithParams:(NSDictionary*)params handler:(completionHandler)handler;

+ (NSURLSessionDataTask *)likeWithParams:(NSDictionary*)params handler:(completionHandler)handler;

+ (NSURLSessionDataTask *)dislikeWithParams:(NSDictionary*)params handler:(completionHandler)handler;

+ (NSURLSessionDataTask *)dislikeUserWithParams:(NSDictionary*)params handler:(completionHandler)handler;

@end

NS_ASSUME_NONNULL_END
