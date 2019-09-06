//
//  CNNMarketCoinRiseCell.h
//  Stark
//
//  Created by tangl on 2019/8/7.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@class CNNExchange;
NS_ASSUME_NONNULL_BEGIN

typedef enum : NSUInteger {
    CNNMarketCoinSettingCellTypePriceRise,
    CNNMarketCoinSettingCellTypeBigOrder,
} CNNMarketCoinSettingCellType;

@class CNNMarketCoinSettingCell;
@protocol CNNMarketCoinSettingCellDelegate <NSObject>

- (void)cnn_marketconin_setting_onChange:(CNNMarketCoinSettingCell *)cell Andstatus:(BOOL)status;

@end

@interface CNNMarketCoinSettingCell : UITableViewCell
@property (nonatomic, strong) UISwitch *switchView;
@property (nonatomic, assign) BOOL isSelected;

@property (nonatomic, weak) id<CNNMarketCoinSettingCellDelegate> delegate;
@property (nonatomic, assign) CNNMarketCoinSettingCellType settingType;

@end

@interface CNNMarketCoinRiseCell : CNNMarketCoinSettingCell

@end



@interface CNNMarketCoinBigOrderCell : CNNMarketCoinSettingCell
@property (nonatomic, strong) CNNExchange *exchange;
@end

NS_ASSUME_NONNULL_END
