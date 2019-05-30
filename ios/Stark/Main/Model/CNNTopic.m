//
//  CNNTopic.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNTopic.h"



@implementation CNNTopic


- (NSString *)format_created_at{
  if(!_format_created_at){
    _format_created_at = [NSDate cnnTopicFormatWithStr:[self valueForKey:@"created_at"]];
  }
  return _format_created_at;
}
@end
