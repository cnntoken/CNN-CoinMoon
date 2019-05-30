//
//  CNNDeviceInfo.h
//  Stark
//
//  Created by float.. on 2019/5/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CNNDeviceInfo : NSObject

+(instancetype)shareInfo;

/* 设备type: iphoneX , iphone 8 */
@property (nonatomic, copy, readonly) NSString *deviceType;

/* 设备唯一标识 存放在keychain当中 */
@property (nonatomic, copy, readonly) NSString *uuid;

/* 所有需要的参数 https://github.com/tmrwh/NewsDog/wiki/CNN-Backend-API */
@property (nonatomic, strong, readonly) NSDictionary *baseInfo;


@end

NS_ASSUME_NONNULL_END
