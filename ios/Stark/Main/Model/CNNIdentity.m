//
//  CNNIdentity.m
//  Stark
// 
//  Created by float.. on 2019/5/26.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNIdentity.h"

@implementation CNNIdentity

MJExtensionCodingImplementation

- (instancetype)init{
  if(self = [super init]){
    _firstUseSoft = YES;
    _firstUseDisclose = YES;
  }
  return self;
}





@end
