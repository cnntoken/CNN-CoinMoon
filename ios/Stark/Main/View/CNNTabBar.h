//
//  CNNTabBar.h
//  Stark
//
//  Created by float.. on 2019/4/28.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol CNNTabBarDelegate <NSObject>

- (void)onTabBarButtonClick:(UIControl *)tarBarButton;

@end

NS_ASSUME_NONNULL_BEGIN

@interface CNNTabBar : UITabBar

//@property (nonatomic, weak) id<CNNTabBarDelegate> delegate;
@end

NS_ASSUME_NONNULL_END
