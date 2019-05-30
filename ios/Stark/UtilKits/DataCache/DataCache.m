//
//  DataCache.m
//  Stark
//
//  Created by float.. on 2019/5/27.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "DataCache.h"

@implementation DataCache

+ (void)setCache:(id)data forKey:(NSString *)key{
  
  [[NSUserDefaults standardUserDefaults] setValue:[NSKeyedArchiver archivedDataWithRootObject:data] forKey:key];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

+ (id)loadCache:(NSString *)key{
  
  return [NSKeyedUnarchiver unarchiveObjectWithData:[[NSUserDefaults standardUserDefaults] objectForKey:key]];
}

@end
