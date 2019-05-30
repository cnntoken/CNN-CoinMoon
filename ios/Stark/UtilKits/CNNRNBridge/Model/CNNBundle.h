//
//  CNNBundle.h
//  Stark
//
//  Created by float.. on 2019/5/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CNNBundle : NSObject

@property (nonatomic, assign) BOOL animate;
@property (nonatomic, copy) NSString *bundleName;
@property (nonatomic, copy) NSString *moduleName;
@property (nonatomic, copy) NSString *type;
@property (nonatomic, strong) NSString *statusBgColor;

// 是否已经加载
@property (nonatomic, assign) BOOL isLoaded;

@end

NS_ASSUME_NONNULL_END
