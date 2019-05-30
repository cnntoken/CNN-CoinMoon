
//
//  CNNRefreshFooter.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNRefreshFooter.h"

@implementation CNNRefreshFooter

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    // 设置状态文字颜色
    self.stateLabel.textColor = [UIColor colorFromHexCode:@"#666666"];
    self.stateLabel.font = [UIFont systemFontOfSize:17];
    [self setTitle:CNNLOCALIZE(@"footer_failure_text") forState:MJRefreshStateIdle];
    [self setTitle:CNNLOCALIZE(@"footer_refreshing_text") forState:MJRefreshStateRefreshing];
    [self setTitle:CNNLOCALIZE(@"footer_nomore_text") forState:MJRefreshStateNoMoreData];
  }
  return self;
}

@end
