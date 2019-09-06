//
//  CNNMarketCoinInfoCell.h
//  Stark
//
//  Created by tangl on 2019/8/1.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>


@class CNNCoinNotice;
NS_ASSUME_NONNULL_BEGIN

@interface CNNMarketCoinInfoCell : UITableViewCell

@property (nonatomic, strong) CNNCoinNotice *model;

@end

NS_ASSUME_NONNULL_END
