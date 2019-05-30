//
//  UIBarButtonItem+Item.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "UIBarButtonItem+Item.h"

@implementation UIBarButtonItem (Item)


+ (UIBarButtonItem *)itemWithimage:(UIImage *)image highImage:(UIImage *)highImage target:(id)target action:(SEL)action
{
  UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
  [btn setImage:image forState:UIControlStateNormal];
  [btn setImage:highImage forState:UIControlStateHighlighted];
  [btn sizeToFit];
  [btn addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
  UIView *containView = [[UIView alloc] initWithFrame:btn.bounds];
  [containView addSubview:btn];
  
  return [[UIBarButtonItem alloc] initWithCustomView:containView];
}

+ (UIBarButtonItem *)itemWithimage:(UIImage *)image selImage:(UIImage *)selImage target:(id)target action:(SEL)action
{
  UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
  [btn setImage:image forState:UIControlStateNormal];
  [btn setImage:selImage forState:UIControlStateSelected];
  [btn sizeToFit];
  [btn addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
  UIView *containView = [[UIView alloc] initWithFrame:btn.bounds];
  [containView addSubview:btn];
  
  return [[UIBarButtonItem alloc] initWithCustomView:containView];
}


+ (UIBarButtonItem *)backItemWithimage:(UIImage *)image highImage:(UIImage *)highImage target:(id)target action:(SEL)action title:(NSString *)title{
  UIButton *backButton = [UIButton buttonWithType:UIButtonTypeCustom];
  [backButton setTitle:title forState:UIControlStateNormal];
  [backButton setImage:image forState:UIControlStateNormal];
  [backButton setImage:highImage forState:UIControlStateHighlighted];
  [backButton setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
  [backButton setTitleColor:[UIColor redColor] forState:UIControlStateHighlighted];
  [backButton sizeToFit];
  backButton.contentEdgeInsets = UIEdgeInsetsMake(0, -20, 0, 0);
  [backButton addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
  
  return  [[UIBarButtonItem alloc] initWithCustomView:backButton];
}


@end
