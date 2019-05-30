//
//  CNNDiscloseDialogView.m
//  Stark
//
//  Created by float.. on 2019/5/27.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNDiscloseDialogView.h"

@implementation CNNDiscloseDialogView

- (instancetype)initWithFrame:(CGRect)frame{
  if(self = [super initWithFrame:frame]){
    [self setupViews];
  }
  return self;
}


- (void)setupViews{
  
  self.backgroundColor = [UIColor colorWithRed:0/255.0 green:0/255.0 blue:0/255.0 alpha:0.5];
  UIView *contentV = [[UIView alloc] initWithFrame:CGRectMake(0,0,CNNScreenW - 120 ,190)];
  contentV.center = self.center;
  contentV.origin_y = self.size_height;
  contentV.backgroundColor = [UIColor whiteColor];
  contentV.layer.cornerRadius = 12;
  contentV.clipsToBounds = YES;
  [self addSubview:contentV];
  
  UILabel *titleLabel = [[UILabel alloc] initWithFrame:CGRectZero];
  titleLabel.lineBreakMode = NSLineBreakByWordWrapping;
  titleLabel.text = @"您将以匿名身份爆料区进行评论及发帖";
  titleLabel.textColor = [UIColor colorFromHexCode:@"#030303"];
  titleLabel.font = [UIFont systemFontOfSize:18];
  titleLabel.numberOfLines = 0;
  titleLabel.textAlignment = NSTextAlignmentCenter;
  CGSize labelSize = [UIView calculateLabelHeight:titleLabel lableWidth:(contentV.size_width -24)];
  titleLabel.frame = CGRectMake((contentV.size_width - labelSize.width)/2, 31, labelSize.width, labelSize.height);
  [contentV addSubview:titleLabel];
  
  UIImageView *imageV = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"avatar_1"]];
  imageV.frame = CGRectMake(0, 0, 50, 50);
  imageV.contentMode = UIViewContentModeScaleAspectFit;
  UILabel *avatarLable = [UILabel new];
  avatarLable.text = @"预言家";
  avatarLable.textColor = [UIColor colorFromHexCode:@"#666666"];
  avatarLable.font = [UIFont systemFontOfSize:14];
  [avatarLable sizeToFit];
  avatarLable.origin_y = imageV.size_height + 8;
  if(avatarLable.size_width > 50){
    imageV.origin_x = (avatarLable.size_width - 50)/2;
  }else{
    avatarLable.origin_x = (50 - avatarLable.size_width)/2;
  }
  
  CGFloat width = avatarLable.size_width > 50 ? avatarLable.size_width : 50;
  UIView *avatarView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
  avatarView.size_height = 50+avatarLable.size_height + 8;
  avatarView.size_width = width;
  avatarView.origin_y = CGRectGetMaxY(avatarView.frame) + 11;
  avatarView.origin_x = (contentV.size_width - width)/2;
  [avatarView addSubview:imageV];
  [avatarView addSubview:avatarLable];
  [contentV addSubview:avatarView];
  [self addSubview:contentV];
  
  [UIView animateWithDuration:0.3 delay:0 options:UIViewAnimationOptionCurveEaseIn animations:^{
    contentV.center = self.center;
  } completion:nil];

  [UIView animateWithDuration:0.3 delay:2.5 options:UIViewAnimationOptionCurveEaseIn animations:^{
    contentV.origin_y = self.size_height;
  } completion: ^(BOOL finished){
    if([self.delegate respondsToSelector:@selector(onDialogOver)]){
      [self.delegate performSelector:@selector(onDialogOver)];
    }
  }];
}

@end
