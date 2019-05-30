
//
//  CNNRefreshHeader.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNRefreshHeader.h"

@implementation CNNRefreshHeader

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    // 设置状态文字颜色
    self.stateLabel.textColor = [UIColor colorFromHexCode:@"#666666"];
    self.stateLabel.font = [UIFont systemFontOfSize:17];
    [self setTitle:CNNLOCALIZE(@"refresh_normal_text") forState:MJRefreshStateIdle];
    [self setTitle:CNNLOCALIZE(@"refresh_prepare_text") forState:MJRefreshStatePulling];
    [self setTitle:CNNLOCALIZE(@"refresh_loading_text") forState:MJRefreshStateRefreshing];
    // 隐藏时间
    self.lastUpdatedTimeLabel.hidden = YES;
    // 自动切换透明度
    self.automaticallyChangeAlpha = YES;
  }
  return self;
}

@end
