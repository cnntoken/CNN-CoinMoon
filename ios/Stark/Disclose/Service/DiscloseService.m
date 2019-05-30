//
//  DiscloseService.m
//  Stark
//
//  Created by float.. on 2019/5/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "DiscloseService.h"
#import "CNNDiscloseTopic.h"

static BOOL topicPrepared;
@implementation DiscloseService

+(void) prepare{
  if(!topicPrepared){
    topicPrepared = YES;
    [CNNDiscloseTopic mj_setupObjectClassInArray:^NSDictionary *{
      return @{@"user": @"CNNUser",@"disclose_stats": @"CNNFeedStats",@"req_user_stats": @"CNNFeedUserStats"};
    }];
  }
}

// 列表
+(NSURLSessionDataTask *) getListWithParams:(NSDictionary *)params handler:(completionHandler)handler{
  CNNLog(@"%s",__func__);
  NSString *urlPath = @"/v1/discloses/";
  completionHandler compleionHandler = ^(id data,NSError *error) {
    [DiscloseService prepare];
    NSArray *arr = [CNNDiscloseTopic mj_objectArrayWithKeyValuesArray:data];
    handler(arr,error);
  };
  
  return [[HttpService service] sendRequestWithHttpMethod:HTTP_REQUEST_METHOD_GET URLPath:urlPath parameters:params completionHandler:compleionHandler];
}

// 删除爆料(仅能删除自己发布的爆料)
+ (NSURLSessionDataTask *)removeWithParams:(NSDictionary *)params handler:(completionHandler)handler{
  NSString *urlPath = [NSString stringWithFormat:@"/v1/discloses/%@/", params[@"id"]];
  HTTP_REQUEST_METHOD method = HTTP_REQUEST_METHOD_DELETE;
  return [[HttpService service] sendRequestWithHttpMethod:method URLPath:urlPath parameters:params completionHandler:handler];
}

//点赞(取消点赞)
+ (NSURLSessionDataTask *)likeWithParams:(NSDictionary *)params handler:(completionHandler)handler{
  NSString *urlPath = [NSString stringWithFormat:@"/v1/discloses/%@/likes/", params[@"id"]];
  HTTP_REQUEST_METHOD method = HTTP_REQUEST_METHOD_POST;
  if([params[@"isCancel"] boolValue] == YES){
    method = HTTP_REQUEST_METHOD_DELETE;
  }
  return [[HttpService service] sendRequestWithHttpMethod:method URLPath:urlPath parameters:params completionHandler:handler];
}

// 不感兴趣
+ (NSURLSessionDataTask *)dislikeWithParams:(NSDictionary *)params handler:(completionHandler)handler{
  NSString *urlPath = [NSString stringWithFormat:@"/v1/discloses/%@/dislikes/", params[@"id"]];
  completionHandler compleionHandler = ^(id data,NSError *error) {
    handler(data,error);
  };
  HTTP_REQUEST_METHOD method = HTTP_REQUEST_METHOD_POST;
  return [[HttpService service] sendRequestWithHttpMethod:method URLPath:urlPath parameters:params completionHandler:compleionHandler];
}

// 屏蔽某人
+ (NSURLSessionDataTask *)dislikeUserWithParams:(NSDictionary *)params handler:(completionHandler)handler{
  NSString *urlPath = [NSString stringWithFormat:@"/v1/discloses/users/%@/dislikes/", params[@"user_id"]];
  
  completionHandler compleionHandler = ^(id data,NSError *error) {
    handler(data,error);
  };
  HTTP_REQUEST_METHOD method = HTTP_REQUEST_METHOD_POST;
  return [[HttpService service] sendRequestWithHttpMethod:method URLPath:urlPath parameters:params completionHandler:compleionHandler];
}

@end
