//
//  CNNRNViewController.h
//  Stark
//
//  Created by float.. on 2019/5/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@class RCTRootView, CNNBundle;

NS_ASSUME_NONNULL_BEGIN

@interface CNNRNViewController : UIViewController

- (instancetype)initWithCNNBundle:(CNNBundle *)bundle andProperties:(NSDictionary * _Nullable)properties;

@end

NS_ASSUME_NONNULL_END
