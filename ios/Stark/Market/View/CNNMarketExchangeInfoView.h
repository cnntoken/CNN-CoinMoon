//
//  CNNMarketExchangeInfoView.h
//  Stark
//
//  Created by tangl on 2019/8/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CNNStockGlobalVariable.h"
NS_ASSUME_NONNULL_BEGIN
@class CNNExchange;
@interface CNNMarketExchangeInfoView : UIView
@property (nonatomic, strong) CNNExchange *exchange;
- (instancetype)initWithFrame:(CGRect)frame andChartType:(CNNKlineChartType)chartType;
@end

NS_ASSUME_NONNULL_END
