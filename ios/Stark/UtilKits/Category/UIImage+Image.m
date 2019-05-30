//
//  UIImage+Image.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "UIImage+Image.h"

@implementation UIImage (Image)


+ (instancetype)imageOriginalWithName:(NSString *)imageName
{
  UIImage *image = [UIImage imageNamed:imageName];
  
  return [image imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
  
}

- (instancetype)cnn_circleImage
{
  // 1.开启图形上下文
  // 比例因素:当前点与像素比例
  UIGraphicsBeginImageContextWithOptions(self.size, NO, 0);
  // 2.描述裁剪区域
  UIBezierPath *path = [UIBezierPath bezierPathWithOvalInRect:CGRectMake(0, 0, self.size.width, self.size.height)];
  // 3.设置裁剪区域;
  [path addClip];
  // 4.画图片
  [self drawAtPoint:CGPointZero];
  // 5.取出图片
  UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
  // 6.关闭上下文
  UIGraphicsEndImageContext();
  
  return image;
}

+ (instancetype)cnn_circleImageNamed:(NSString *)name
{
  return [[self imageNamed:name] cnn_circleImage];
}


+ (instancetype)imageWithColor:(UIColor *)color AndSize:(CGSize)size{
  UIGraphicsBeginImageContext(size);
  CGContextRef context = UIGraphicsGetCurrentContext();
  CGContextSetFillColorWithColor(context, [color CGColor]);
  CGContextFillRect(context, CGRectMake(0, 0, size.width, size.height));
  UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return image;
}

@end
