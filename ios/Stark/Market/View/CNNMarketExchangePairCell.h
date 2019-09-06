//
//  CNNMarketExchangePairCell.h
//  Stark
//
//  Created by tangl on 2019/8/1.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class CNNExchange;

@interface CNNMarketExchangePairCell : UITableViewCell

@property (nonatomic, strong) CNNExchange *exchange;

@property (nonatomic, strong) RACSubject *subject;

@end

NS_ASSUME_NONNULL_END
