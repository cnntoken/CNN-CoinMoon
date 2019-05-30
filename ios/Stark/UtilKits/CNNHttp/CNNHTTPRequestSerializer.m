//
//  CNNHTTPRequestSerializer.m
//  Stark
//
//  Created by float.. on 2019/5/15.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNHTTPRequestSerializer.h"

@implementation CNNHTTPRequestSerializer


#pragma mark - AFURLRequestSerialization

- (NSURLRequest *)requestBySerializingRequest:(NSURLRequest *)request withParameters:(id)parameters andData:(NSDictionary *)data error:(NSError * _Nullable __autoreleasing *)error{
  NSParameterAssert(request);
  
  NSMutableURLRequest *mutableRequest = [request mutableCopy];
  
  [self.HTTPRequestHeaders enumerateKeysAndObjectsUsingBlock:^(id field, id value, BOOL * __unused stop) {
    if (![request valueForHTTPHeaderField:field]) {
      [mutableRequest setValue:value forHTTPHeaderField:field];
    }
  }];
  
  NSString *query = nil;
  if(parameters){
    query = AFQueryStringFromParameters(parameters);
  }
  if (query && query.length > 0) {
    mutableRequest.URL = [NSURL URLWithString:[[mutableRequest.URL absoluteString] stringByAppendingFormat:mutableRequest.URL.query ? @"&%@" : @"?%@", query]];
  }
  // #2864: an empty string is a valid x-www-form-urlencoded payload
  if (!query) {
    query = @"";
  }
  if (![mutableRequest valueForHTTPHeaderField:@"Content-Type"]) {
    [mutableRequest setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
  }
  
  NSArray<NSString *> *arr = [NSArray arrayWithObjects:@"POST",@"PUT",@"DELETE", nil];
  
  if([arr containsObject:[[request HTTPMethod] uppercaseString]]){
    if (![NSJSONSerialization isValidJSONObject:parameters]) {
      if (error) {
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedStringFromTable(@"The `parameters` argument is not valid JSON.", @"AFNetworking", nil)};
        *error = [[NSError alloc] initWithDomain:AFURLRequestSerializationErrorDomain code:NSURLErrorCannotDecodeContentData userInfo:userInfo];
      }
      return nil;
    }
    
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:data options:(NSJSONWritingOptions)0 error:error];
    
    if (!jsonData) {
      return nil;
    }
    
    [mutableRequest setHTTPBody:jsonData];
  }
  
  return mutableRequest;
  
}

- (NSURLRequest *)requestBySerializingRequest:(NSURLRequest *)request
                               withParameters:(id)parameters
                                        error:(NSError *__autoreleasing *)error
{
  NSParameterAssert(request);
  
  NSMutableURLRequest *mutableRequest = [request mutableCopy];
  
  [self.HTTPRequestHeaders enumerateKeysAndObjectsUsingBlock:^(id field, id value, BOOL * __unused stop) {
    if (![request valueForHTTPHeaderField:field]) {
      [mutableRequest setValue:value forHTTPHeaderField:field];
    }
  }];
  
  NSString *query = nil;
  if(parameters){
    query = AFQueryStringFromParameters(parameters);
  }
  if (query && query.length > 0) {
    mutableRequest.URL = [NSURL URLWithString:[[mutableRequest.URL absoluteString] stringByAppendingFormat:mutableRequest.URL.query ? @"&%@" : @"?%@", query]];
  }
  // #2864: an empty string is a valid x-www-form-urlencoded payload
  if (!query) {
    query = @"";
  }
  if (![mutableRequest valueForHTTPHeaderField:@"Content-Type"]) {
    [mutableRequest setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
  }
  
  NSArray<NSString *> *arr = [NSArray arrayWithObjects:@"POST",@"PUT",@"DELETE", nil];
  
  if([arr containsObject:[[request HTTPMethod] uppercaseString]]){
    if (![NSJSONSerialization isValidJSONObject:parameters]) {
      if (error) {
        NSDictionary *userInfo = @{NSLocalizedFailureReasonErrorKey: NSLocalizedStringFromTable(@"The `parameters` argument is not valid JSON.", @"AFNetworking", nil)};
        *error = [[NSError alloc] initWithDomain:AFURLRequestSerializationErrorDomain code:NSURLErrorCannotDecodeContentData userInfo:userInfo];
      }
      return nil;
    }
    
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:parameters options:(NSJSONWritingOptions)0 error:error];
    
    if (!jsonData) {
      return nil;
    }
    
    [mutableRequest setHTTPBody:jsonData];
  }
  
  return mutableRequest;
}


@end
