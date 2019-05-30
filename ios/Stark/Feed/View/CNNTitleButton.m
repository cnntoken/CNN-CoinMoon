
//
//  CNNTitleButton.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNTitleButton.h"

@implementation CNNTitleButton

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    self.titleLabel.font = [UIFont systemFontOfSize:16];
    [self setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  }
  return self;
}

- (void)setHighlighted:(BOOL)highlighted
{ // 只要重写了这个方法，按钮就无法进入highlighted状态
  
  if(highlighted){
    self.titleLabel.font = [UIFont systemFontOfSize:24 weight:UIFontWeightBold];
  }else{
    self.titleLabel.font = [UIFont systemFontOfSize:16];
  }
}

@end
