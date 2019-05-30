
//
//  FeedService.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FeedService.h"
#import "CNNFeedTopic.h"

static BOOL topicPrepared;

@implementation FeedService
+(void) prepare{
  if(!topicPrepared){
    topicPrepared = YES;
    [CNNFeedTopic mj_setupObjectClassInArray:^NSDictionary *{
      return @{@"user": @"CNNUser",@"feed_stats": @"CNNFeedStats",@"req_user_stats": @"CNNFeedUserStats"};
    }];
  }
}

// feed列表
+(NSURLSessionDataTask *) getListWithParams:(NSDictionary *)params handler:(completionHandler)handler{
  CNNLog(@"%s",__func__);
  NSString *urlPath = @"/v1/feeds/";
  completionHandler compleionHandler = ^(id data,NSError *error) {
    [FeedService prepare];
    NSArray *arr = [CNNFeedTopic mj_objectArrayWithKeyValuesArray:data];
    handler(arr,error);
  };
  
  return [[HttpService service] sendRequestWithHttpMethod:HTTP_REQUEST_METHOD_GET URLPath:urlPath parameters:params completionHandler:compleionHandler];
}
//点赞(取消点赞)
+ (NSURLSessionDataTask *)likeWithParams:(NSDictionary *)params handler:(completionHandler)handler{
    NSString *urlPath = [NSString stringWithFormat:@"/v1/feeds/%@/likes/", params[@"id"]];
    HTTP_REQUEST_METHOD method = HTTP_REQUEST_METHOD_POST;
    if([params[@"isCancel"] boolValue] == YES){
      method = HTTP_REQUEST_METHOD_DELETE;
    }
   return [[HttpService service] sendRequestWithHttpMethod:method URLPath:urlPath parameters:params completionHandler:handler];
}
// 不感兴趣
+ (NSURLSessionDataTask *)dislikeFeedWithParams:(NSDictionary *)params handler:(completionHandler)handler{
  NSString *urlPath = [NSString stringWithFormat:@"/v1/feeds/%@/dislikes/", params[@"id"]];
  completionHandler compleionHandler = ^(id data,NSError *error) {
    handler(data,error);
  };
  HTTP_REQUEST_METHOD method = HTTP_REQUEST_METHOD_POST;
  return [[HttpService service] sendRequestWithHttpMethod:method URLPath:urlPath parameters:params completionHandler:compleionHandler];
}
// 屏蔽某人
+ (NSURLSessionDataTask *)dislikeUserWithParams:(NSDictionary *)params handler:(completionHandler)handler{
    NSString *urlPath = [NSString stringWithFormat:@"/v1/feeds/users/%@/dislikes/", params[@"user_id"]];
  
    completionHandler compleionHandler = ^(id data,NSError *error) {
      handler(data,error);
    };
    HTTP_REQUEST_METHOD method = HTTP_REQUEST_METHOD_POST;
    return [[HttpService service] sendRequestWithHttpMethod:method URLPath:urlPath parameters:params completionHandler:compleionHandler];
}

@end
