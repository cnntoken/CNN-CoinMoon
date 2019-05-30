//
//  CNNHTTPRequestSerializer.h
//  Stark
//
//  Created by float.. on 2019/5/15.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AFURLRequestSerialization.h"

NS_ASSUME_NONNULL_BEGIN

@interface CNNHTTPRequestSerializer : AFHTTPRequestSerializer

-(NSURLRequest *)requestBySerializingRequest:(NSURLRequest *)request withParameters:(nullable id)parameters andData:(nullable NSDictionary *)data error:(NSError *__autoreleasing *)error;

@end

NS_ASSUME_NONNULL_END
