
//
//  CNNMarketTimeBtn.m
//  Stark
//
//  Created by float.. on 2019/7/31.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNMarketTimeBtn.h"

@interface CNNMarketTimeBtn ()

@property (nonatomic, strong) UIView *lineView;

@end

@implementation CNNMarketTimeBtn

- (void)setShowBottomLine:(BOOL)showBottomLine{
  _lineView.hidden = !showBottomLine;
}

- (UIView *)lineView{
  
  if(!_lineView){
    _lineView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 20, 2)];
    _lineView.backgroundColor = [UIColor whiteColor];
    _lineView.hidden = YES;
  }
  
  return _lineView;
}

- (instancetype)initWithFrame:(CGRect)frame{
  if(self = [super initWithFrame:frame]){
    [self addSubview:self.lineView];
    self.titleLabel.font = [UIFont systemFontOfSize:13];
    [self setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  }
  return self;
}

- (void)layoutSubviews{
  [super layoutSubviews];
  if(self.showTrangle){
    if(self.titleLabel.origin_x > self.imageView.origin_x){
      self.titleLabel.origin_x = self.imageView.origin_x;
      self.imageView.origin_x = self.titleLabel.right_x;
    }
  }
//  self.lineView.origin_x = (self.size_width - self.lineView.size_width)/2;
  self.lineView.center_x = self.titleLabel.center_x;
  self.lineView.bottom_y = self.size_height;
}


//- (void)didMoveToSuperview{
//  [RACObserve(self, selected) subscribeNext:^(id isSelected) {
//    if([isSelected boolValue]){
//      self.lineView.hidden = NO;
//    }else{
//      self.lineView.hidden = YES;
//    }
//  }];
//}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
