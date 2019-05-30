


//
//  HttpService.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "HttpService.h"
#import "CNNDeviceInfo.h"
#import "CNNUserService.h"
#import "CNNUser.h"



/**HttpService单例对象*/
static HttpService * __singleton__;


@implementation HttpService{
  /**一般的网络请求服务*/
  AFHTTPSessionManager *_dataSessionManager;
}
#pragma mark -- Init Methods

- (instancetype)init {
  self = [super init];
  if (self) {
    [self initManagers];
  }
  return self;
}

#pragma mark -- Class Private Methods

#pragma mark -- Class Public Methods

+ (HttpService *)service {
  static dispatch_once_t predicate;
  dispatch_once( &predicate, ^{ __singleton__ = [[[self class] alloc] init]; } );
  return __singleton__;
}

#pragma mark -- Function Private Methods

#pragma mark -- Function Public Methods

#pragma mark -- Instance Private Methods

- (void)initManagers {
    //普通数据请求
    _dataSessionManager = [[AFHTTPSessionManager alloc] initWithBaseURL:[NSURL URLWithString:CNNCommonURL]];
    _dataSessionManager.requestSerializer = [AFJSONRequestSerializer serializer];
    _dataSessionManager.requestSerializer.timeoutInterval = 30.f;
    _dataSessionManager.responseSerializer = [AFJSONResponseSerializer serializer];
}

- (void)cleanAllTask {
    [self invalidateManagers];
    [self initManagers];
}

- (void)invalidateManagers {
    [_dataSessionManager invalidateSessionCancelingTasks:YES];
}

- (NSString *)stringWithMethod:(HTTP_REQUEST_METHOD)method {
    switch (method) {
      case HTTP_REQUEST_METHOD_GET:     return @"GET";      break;
      case HTTP_REQUEST_METHOD_HEAD:    return @"HEAD";     break;
      case HTTP_REQUEST_METHOD_POST:    return @"POST";     break;
      case HTTP_REQUEST_METHOD_PUT:     return @"PUT";      break;
      case HTTP_REQUEST_METHOD_PATCH:   return @"PATCH";    break;
      case HTTP_REQUEST_METHOD_DELETE:  return @"DELETE";   break;
      default:
        break;
    }
    return @"";
}

#pragma mark -- Instance Public Methods

- (NSURLSessionDataTask *)sendRequestWithHttpMethod:(HTTP_REQUEST_METHOD)method URLPath:(NSString *)pathStr parameters:(NSDictionary *)parameters completionHandler:(completionHandler)completionHandler {
    //开始菊花
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
    //初始化请求
    NSString *urlStr = [[NSURL URLWithString:pathStr relativeToURL:_dataSessionManager.baseURL] absoluteString];
    NSString *methodStr = [self stringWithMethod:method];
    CNNLog(@"urlstr = %@", urlStr);
    CNNLog(@"parameters = %@", parameters);
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[CNNDeviceInfo shareInfo].baseInfo];
    NSMutableURLRequest *request = nil;
    if([[CNNUserService service].user isLogin]){
        [_dataSessionManager.requestSerializer setValue:[NSString stringWithFormat:@"HIN %@",[CNNUserService service].user.token] forHTTPHeaderField:@"Authorization"];
    }else{
       [_dataSessionManager.requestSerializer setValue:nil forHTTPHeaderField:@"Authorization"];
    }
  
    if(method == HTTP_REQUEST_METHOD_GET || method == HTTP_REQUEST_METHOD_HEAD){
      // 如果是get,head请求,需要将设备固定参数和业务参数合并
      [parameters enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
        [dict setObject:obj forKey:key];
      }];
      request = [_dataSessionManager.requestSerializer requestWithMethod:methodStr URLString:urlStr parameters:dict error:nil];
    }else{
      // 如果是post,put等请求,需要将设备参数拼接到url后面
      NSString* query = AFQueryStringFromParameters(dict);
      request = [_dataSessionManager.requestSerializer requestWithMethod:methodStr URLString:urlStr parameters:parameters error:nil];
      request.URL = [NSURL URLWithString:[[request.URL absoluteString] stringByAppendingFormat:request.URL.query ? @"&%@" : @"?%@", query]];
    }
    __block NSURLSessionDataTask *task = nil;
    task = [_dataSessionManager dataTaskWithRequest:request uploadProgress:nil downloadProgress:nil completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
      //结束菊花
      [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
      //判断结果
      NSError *err = nil;
      id data = nil;
      if(error) {//如果是请求时的错误
        err = error;
      } else {//请求没有错
        data = responseObject;
      }
      //主线程执行回调
      dispatch_async(dispatch_get_main_queue(), ^{
        completionHandler(data, err);
      });
    }];
  
    //发起请求任务
    [task resume];
    return task;
}
@end
