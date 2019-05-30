//
//  RCTBridge+LoadJs.h
//  Stark
//
//  Created by float.. on 2019/5/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTBridge.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBridge (CNN)

- (void)executeSourceCode:(NSData *)sourceCode sync:(BOOL)sync;

@end

NS_ASSUME_NONNULL_END
