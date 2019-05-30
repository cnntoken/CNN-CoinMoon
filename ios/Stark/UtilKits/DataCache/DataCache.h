//
//  DataCache.h
//  Stark
//
//  Created by float.. on 2019/5/27.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface DataCache : NSObject

+ (void)setCache:(id)data forKey:(NSString *)key;

+ (id)loadCache:(NSString *)key;

@end

NS_ASSUME_NONNULL_END
