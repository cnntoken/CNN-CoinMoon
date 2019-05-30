//
//  CNNIdentity.h
//  Stark
//
//  Created by float.. on 2019/5/26.
//  Copyright © 2019 Facebook. All rights reserved.
//



/**
 用来区别每个设备用户的基础信息 不存在数据库 归档处理
 */

#import <Foundation/Foundation.h>


NS_ASSUME_NONNULL_BEGIN

@interface CNNIdentity : NSObject


/**是不是第一次使用软件*/
@property (nonatomic, assign) BOOL firstUseSoft;

/**是不是第一次进入爆料页面*/
@property (nonatomic, assign) BOOL firstUseDisclose;

/**最近一次软件的版本号*/
@property (nonatomic, copy) NSString *lastSoftVersion;



@end

NS_ASSUME_NONNULL_END
