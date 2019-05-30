//
//  UIBarButtonItem+Item.h
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIBarButtonItem (Item)


// 快速创建UIBarButtonItem
+ (UIBarButtonItem *)itemWithimage:(UIImage *)image highImage:(UIImage *)highImage target:(id)target action:(SEL)action;

+ (UIBarButtonItem *)backItemWithimage:(UIImage *)image highImage:(UIImage *)highImage target:(id)target action:(SEL)action title:(NSString *)title;

+ (UIBarButtonItem *)itemWithimage:(UIImage *)image selImage:(UIImage *)selImage target:(id)target action:(SEL)action;

@end

NS_ASSUME_NONNULL_END
