//
//  HttpService.h
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

//基础网络请求 其他的请求统一由此类发出
typedef NS_ENUM(NSUInteger, HTTP_REQUEST_METHOD) {
  /**GET方式*/
  HTTP_REQUEST_METHOD_GET = 0,
  /**HEAD方式*/
  HTTP_REQUEST_METHOD_HEAD,
  /**POST方式*/
  HTTP_REQUEST_METHOD_POST,
  /**PUT方式*/
  HTTP_REQUEST_METHOD_PUT,
  /**PATCH方式*/
  HTTP_REQUEST_METHOD_PATCH,
  /**DELETE方式*/
  HTTP_REQUEST_METHOD_DELETE,
};

/**
 请求结果回调
 
 @param data 数据
 @param error 错误
 */
typedef void(^completionHandler)(id data,NSError *error);

@interface HttpService : NSObject


+ (HttpService*)service;

/**
 发送普通请求
 
 @param method 方式
 @param pathStr 地址
 @param parameters 参数
 @param completionHandler 请求结果回调
 @return 请求对象
 */
- (NSURLSessionDataTask *)sendRequestWithHttpMethod:(HTTP_REQUEST_METHOD)method URLPath:(NSString *)pathStr parameters:(NSDictionary *)parameters completionHandler:(completionHandler)completionHandler;


@end

NS_ASSUME_NONNULL_END
