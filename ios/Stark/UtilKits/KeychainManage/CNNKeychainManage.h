//
//  CNNKeychainManage.h
//  Stark
//
//  Created by float.. on 2019/5/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CNNKeychainManage : NSObject

+ (id)load:(NSString *)vendor;
+ (void)save:(NSString *)vendor data:(id)data;
+ (void)delete:(NSString *)vendor;


@end

NS_ASSUME_NONNULL_END
