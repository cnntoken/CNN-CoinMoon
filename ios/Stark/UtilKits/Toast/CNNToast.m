
//
//  CNNToast.m
//  Stark
//
//  Created by float.. on 2019/5/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNToast.h"

@implementation CNNToast

+ (UIWindow *)getTopWindow{
  UIWindow *keyWindow = [UIApplication sharedApplication].keyWindow;
  if (!keyWindow) {
    // 有可能keyWindow不存在
    keyWindow = [UIApplication sharedApplication].windows.firstObject;
  }
  return keyWindow;
}

+ (UIView *)makeBGView{
  UIView *view = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
  //    view.backgroundColor = [UIColor colorWithRed:1/255.f green:1/255.f blue:1/255.f alpha:.1f];
  return view;
}

+ (void)showToast:(NSString *)msg{
  // 文字区域
  UILabel *label = [[UILabel alloc] init];
  label.text = msg;
  label.textColor = [UIColor whiteColor];
  UIFont *lableFont =[UIFont systemFontOfSize:16.0f];
  [label setFont:lableFont];
  label.numberOfLines = 0;
  CGSize textMaxSize = CGSizeMake(280, MAXFLOAT);// 计算 label 的高度
  NSDictionary *attrDict = @{NSFontAttributeName: lableFont, NSForegroundColorAttributeName: [UIColor whiteColor]};
  CGSize lableSize = [msg boundingRectWithSize:textMaxSize options:NSStringDrawingUsesLineFragmentOrigin attributes:attrDict context:nil].size;
  CGSize viewSize = CGSizeMake(lableSize.width + 15, lableSize.height + 15);
  
  // 内容view
  UIView *contentView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, viewSize.width, viewSize.height)];
  contentView.layer.cornerRadius = 4.f;
  contentView.backgroundColor = [UIColor blackColor];
  [contentView addSubview:label];
  label.frame = CGRectMake(0, 0, lableSize.width, lableSize.height);
  label.center = contentView.center;
  
  // 全屏背景(无色透明)
  UIView *bgView = [[self class] makeBGView];
  [bgView addSubview:contentView];
  contentView.center = bgView.center;
  
  // 在当前的keywindow中插入toast的view
  UIWindow *window = [[self class] getTopWindow];
  [window addSubview:bgView];
  
  // 添加一个淡入淡出动画
  [UIView animateWithDuration:.3f delay:1.8f options:UIViewAnimationOptionCurveEaseOut animations:^{
    //        contentView.transform = CGAffineTransformMakeScale(.9f, .9f);
    contentView.alpha = 0.0;
  } completion:^(BOOL finished) {
    [bgView removeFromSuperview];
  }];
}

@end
