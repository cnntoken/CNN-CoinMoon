//
//  CNNBundle.m
//  Stark
//
//  Created by float.. on 2019/5/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNBundle.h"

@implementation CNNBundle

- (id)mj_newValueFromOldValue:(id)oldValue property:(MJProperty *)property
{
  if ([property.name isEqualToString:@"isLoaded"]) {
    return @NO;
  }
  return oldValue;
}

@end
