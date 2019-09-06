//
//  CNNMarketCoinRiseCell.m
//  Stark
//
//  Created by tangl on 2019/8/7.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNMarketCoinRiseCell.h"
#import "CNNExchange.h"


@implementation CNNMarketCoinSettingCell
- (UISwitch *)switchView{
    if(!_switchView){
        _switchView = [[UISwitch alloc] initWithFrame:CGRectMake(0, 0, 44, 25)];
        _switchView.tintColor = CNNCOLOR_HEX(@"#DDDDDD");
        _switchView.onTintColor = CNNCOLOR_HEX(CNNPrimaryColorHex);
        [_switchView addTarget:self action:@selector(onSwitchChange:) forControlEvents:UIControlEventValueChanged];
    }
    return _switchView;
}

- (void)setIsSelected:(BOOL)isSelected{
    
    _isSelected = isSelected;
    
    [self.switchView setOn:isSelected animated:NO];
}
- (void)onSwitchChange:(UISwitch *)sw{
    if([self.delegate respondsToSelector:@selector(cnn_marketconin_setting_onChange:Andstatus:)]){
        [self.delegate cnn_marketconin_setting_onChange:self Andstatus:sw.isOn];
    }
}
@end

@interface CNNMarketCoinRiseCell ()
@property (nonatomic, strong) UILabel *titleLabel;
@end
@implementation CNNMarketCoinRiseCell



- (UILabel *)titleLabel{
    if(!_titleLabel){
        _titleLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#333333") font:[UIFont systemFontOfSize:15]];
        _titleLabel.text = CNNLOCALIZE(@"暴涨暴跌提醒");
        [_titleLabel sizeToFit];
    }
    return _titleLabel;
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier{
    if(self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]){
        self.selectionStyle = UITableViewCellSelectionStyleNone;
        self.settingType = CNNMarketCoinSettingCellTypePriceRise;
        [self.contentView addSubview:self.titleLabel];
        [self.contentView addSubview:self.switchView];
        
        [self.titleLabel makeConstraints:^(MASConstraintMaker *make) {
            make.left.equalTo(self.contentView).offset(16);
            make.centerY.equalTo(self.contentView);
            make.width.equalTo(self.titleLabel.size_width);
        }];
        [self.switchView makeConstraints:^(MASConstraintMaker *make) {
            make.centerY.equalTo(self.contentView);
            make.right.equalTo(self.contentView).offset(-16);
            make.width.equalTo(self.switchView.size_width);
        }];
    }
    return self;
}

@end

@interface CNNMarketCoinBigOrderCell ()
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UIView *middleView;
@property (nonatomic, strong) UILabel *limitTipLabel;
@property (nonatomic, strong) UILabel *limitLabel;

@end
@implementation CNNMarketCoinBigOrderCell

- (void)setExchange:(CNNExchange *)exchange{
    _exchange = exchange;
    if([[exchange.fcoin lowercaseString] isEqualToString:@"btc"]){
        self.limitLabel.text = @"100000.0USDT (USD)";
    }else{
        self.limitLabel.text = @"50000.0USDT (USD)";
    }
}

- (UILabel *)titleLabel{
    if(!_titleLabel){
        _titleLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#333333") font:[UIFont systemFontOfSize:15]];
        _titleLabel.text = CNNLOCALIZE(@"大单买卖提醒");
        [_titleLabel sizeToFit];
    }
    return _titleLabel;
}

- (UILabel *)limitTipLabel{
    if(!_limitTipLabel){
        _limitTipLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#AAAAAA") font:[UIFont systemFontOfSize:13]];
        _limitTipLabel.text = CNNLOCALIZE(@"提醒额度");
        [_limitTipLabel sizeToFit];
    }
    return _limitTipLabel;
}
-(UILabel *)limitLabel{
    if(!_limitLabel){
        _limitLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#AAAAAA") font:[UIFont systemFontOfSize:13]];
        _limitLabel.text = @"50000.0USDT (USD)";
        [_limitLabel sizeToFit];
    }
    return _limitLabel;
}



- (UIView *)middleView{
    if(!_middleView){
        _middleView = [UIView new];
        [_middleView addSubview:self.limitTipLabel];
        [_middleView addSubview:self.limitLabel];
    }
    return _middleView;
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier{
    if(self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]){
        self.selectionStyle = UITableViewCellSelectionStyleNone;
        self.settingType = CNNMarketCoinSettingCellTypeBigOrder;
        
        [self.contentView addSubview:self.titleLabel];
        [self.contentView addSubview:self.middleView];
        [self.contentView addSubview:self.switchView];
        
        //添加约束
        [self.titleLabel makeConstraints:^(MASConstraintMaker *make) {
            make.left.equalTo(self.contentView).offset(16);
            make.centerY.equalTo(self.contentView);
            make.width.equalTo(self.titleLabel.size_width);
        }];
        [self.middleView makeConstraints:^(MASConstraintMaker *make) {
            make.left.equalTo(self.titleLabel.right).offset(16);
            make.centerY.equalTo(self.contentView);
            make.height.equalTo(40);
        }];
        
        [self.limitTipLabel makeConstraints:^(MASConstraintMaker *make) {
            make.left.top.equalTo(self.middleView);
            make.height.equalTo(self.limitTipLabel.size_height);
            make.width.equalTo(self.limitTipLabel.size_width);
            make.right.lessThanOrEqualTo(self.middleView);
        }];
        
        [self.limitLabel makeConstraints:^(MASConstraintMaker *make) {
            make.left.bottom.equalTo(self.middleView);
            make.top.equalTo(self.limitTipLabel.bottom).offset(4);
            make.height.equalTo(self.limitLabel.size_height);
//            make.width.equalTo(self.limitLabel.size_width);
            make.right.lessThanOrEqualTo(self.middleView);
        }];
        
        [self.switchView makeConstraints:^(MASConstraintMaker *make) {
            make.centerY.equalTo(self.contentView);
            make.right.equalTo(self.contentView).offset(-16);
            make.width.equalTo(self.switchView.size_width);
            make.left.equalTo(self.middleView.right);
        }];
        
    }
    return self;
    
}

@end
