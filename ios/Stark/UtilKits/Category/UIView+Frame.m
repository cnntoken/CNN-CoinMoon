//
//  UIView+Frame.m
//  Stark
//
//  Created by float.. on 2019/4/28.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "UIView+Frame.h"

@implementation UIView (Frame)

+ (instancetype)viewFromNib{
    return [[NSBundle mainBundle] loadNibNamed:NSStringFromClass(self) owner:nil options:nil].firstObject;
}

- (void)setOrigin_x:(CGFloat)origin_x{
  CGRect rect = self.frame;
  rect.origin.x = origin_x;
  self.frame = rect;
}
- (CGFloat)origin_x{
  return self.frame.origin.x;
}

- (void)setOrigin_y:(CGFloat)origin_y{
  CGRect rect = self.frame;
  rect.origin.y = origin_y;
  self.frame = rect;
}
- (CGFloat)origin_y{
  return self.frame.origin.y;
}

- (void)setSize_width:(CGFloat)size_width{
  CGRect rect = self.frame;
  rect.size.width = size_width;
  self.frame = rect;
  
}
- (CGFloat)size_width{
  return self.bounds.size.width;
}

- (void)setSize_height:(CGFloat)size_height{
  CGRect rect = self.frame;
  rect.size.height = size_height;
  self.frame = rect;
}

- (CGFloat)size_height{
  return self.bounds.size.height;
}

- (void)setCenter_x:(CGFloat)center_x{
  CGPoint center = self.center;
  center.x = center_x;
  self.center = center;
}

- (CGFloat)center_x{
  return self.center.x;
}

-(void)setCenter_y:(CGFloat)center_y{
  CGPoint center = self.center;
  center.x = center_y;
  self.center = center;
}

- (CGFloat)center_y{
  return self.center.y;
}

- (CGFloat)cnn_bottom{
  
  return self.frame.origin.y + self.frame.size.height;
}



+ (CGSize)calculateLabelHeight:(UILabel *)label lableWidth:(CGFloat)width{
  CGSize baseSize = CGSizeMake(width, CGFLOAT_MAX);
  return  [label sizeThatFits:baseSize];
}
@end
