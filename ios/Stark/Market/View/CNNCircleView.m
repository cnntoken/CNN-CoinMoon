//
//  CNNCircleView.m
//  Stark
//
//  Created by tangl on 2019/8/2.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNCircleView.h"

@implementation CNNCircleView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithFrame:(CGRect)frame{

  if(self = [super initWithFrame:frame]){
//    self.backgroundColor = [UIColor whiteColor];
  }
  return self;
}
- (void)drawRect:(CGRect)rect{
  [super drawRect:rect];
  CGContextRef ctx = UIGraphicsGetCurrentContext();
  CGContextClearRect(ctx, rect);
  CGContextSetFillColorWithColor(ctx, [UIColor whiteColor].CGColor);
  CGContextFillRect(ctx, rect);
  
  CGSize size = rect.size;
  CGFloat radius = size.width/2;
  CGContextSetLineWidth(ctx, 1);
  CGContextSetStrokeColorWithColor(ctx, CNNCOLOR_HEX(CNNPrimaryColorHex).CGColor);
  
//  [CNNCOLOR_HEX(CNNPrimaryColorHex) set];
  CGContextSetFillColorWithColor(ctx, [UIColor whiteColor].CGColor);
  CGContextAddArc(ctx, radius , radius, radius-1, 0, 2*M_PI, 0);
  CGContextDrawPath(ctx, kCGPathStroke);
  
  CGContextSetFillColorWithColor(ctx, CNNCOLOR_HEX(CNNPrimaryColorHex).CGColor);
  CGContextAddEllipseInRect(ctx, CGRectInset(rect, 3, 3));
  
  CGContextDrawPath(ctx, kCGPathFill);
}


@end
