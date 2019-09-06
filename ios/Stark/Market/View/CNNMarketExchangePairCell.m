//
//  CNNMarketExchangePairCell.m
//  Stark
//
//  Created by tangl on 2019/8/1.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNMarketExchangePairCell.h"
#import "CNNExchange.h"


@interface CNNMarketExchangePairCell()

@property (nonatomic, strong) UIImageView *iconView;// 1

@property (nonatomic, strong) UIView *exchangeInfoView;//2 交易信息
@property (nonatomic, strong) UILabel *fromCoinLabel;
@property (nonatomic, strong) UILabel *toCoinLabel;
@property (nonatomic, strong) UILabel *marketLabel;

@property (nonatomic, strong) UIView *priceInfoView;//3 价格信息
@property (nonatomic, strong) UILabel *priceLabel;
@property (nonatomic, strong) UILabel *priceKRWLabel;

@property (nonatomic, strong) UILabel *percentLabel;

@property (nonatomic, strong) UIButton *selecteBtn;//自选
@end

@implementation CNNMarketExchangePairCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier{
  
  if(self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]){
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    [self.contentView addSubview:self.iconView];
    [self.contentView addSubview:self.exchangeInfoView];
    [self.contentView addSubview:self.priceInfoView];
    [self.contentView addSubview:self.percentLabel];
    [self.contentView addSubview:self.selecteBtn];
    
    //add constraints
    //1. icon
    [_iconView makeConstraints:^(MASConstraintMaker *make) {
      make.left.equalTo(self.contentView).offset(15);
      make.centerY.equalTo(self.contentView);
      make.width.equalTo(_iconView.size_width);
      make.width.equalTo(_iconView.size_height);
    }];
    //2. exchange info
    [_exchangeInfoView makeConstraints:^(MASConstraintMaker *make) {
      make.left.equalTo(_iconView.right).offset(10);
      make.centerY.equalTo(self.contentView);
    }];
    //2.1 fromcoin
    [_fromCoinLabel makeConstraints:^(MASConstraintMaker *make) {
      make.top.left.equalTo(_exchangeInfoView);
      
    }];
    //2.2 tocoin
    [_toCoinLabel makeConstraints:^(MASConstraintMaker *make) {
      make.left.equalTo(_fromCoinLabel.right).offset(5);
      make.height.centerY.equalTo(_fromCoinLabel);
      make.right.lessThanOrEqualTo(_exchangeInfoView);
    }];
    //2.3 market
    [_marketLabel makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(_fromCoinLabel.bottom).offset(4);
      make.left.bottom.equalTo(_exchangeInfoView);
      make.right.lessThanOrEqualTo(_exchangeInfoView);
    }];
    //3. price info
    [_priceInfoView makeConstraints:^(MASConstraintMaker *make) {
      make.left.equalTo(_exchangeInfoView.right).offset(5);
      make.centerY.equalTo(self.contentView);
    }];
    //3.1 price usd
    [_priceLabel makeConstraints:^(MASConstraintMaker *make) {
      make.top.left.right.equalTo(_priceInfoView);
    }];
    //3.2 price krw
    [_priceKRWLabel makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(_priceLabel.bottom).offset(4);
      make.bottom.left.right.equalTo(_priceInfoView);
    }];
    //4. percent label
    [_percentLabel makeConstraints:^(MASConstraintMaker *make) {
      make.centerY.equalTo(self.contentView);
      make.left.equalTo(_priceInfoView.right).offset(15);
      make.width.equalTo(_percentLabel.size_width);
      make.height.equalTo(_percentLabel.size_height);
    }];
    //5. select btn
    [_selecteBtn makeConstraints:^(MASConstraintMaker *make) {
      make.left.equalTo(_percentLabel.right);
      make.right.centerY.equalTo(self.contentView);
      make.width.equalTo(_selecteBtn.size_width);
      make.height.equalTo(_selecteBtn.size_height);
    }];
  }
  
  return self;
  
}
- (UIView *)priceInfoView{
  if(!_priceInfoView){
    _priceInfoView = [UIView new];
    [_priceInfoView addSubview:self.priceLabel];
    [_priceInfoView addSubview:self.priceKRWLabel];
    [_priceInfoView setContentHuggingPriority:249 forAxis:UILayoutConstraintAxisHorizontal];
  }
  return _priceInfoView;
}
- (UIView *)exchangeInfoView{
  if(!_exchangeInfoView){
    _exchangeInfoView = [UIView new];
    [_exchangeInfoView addSubview:self.fromCoinLabel];
    [_exchangeInfoView addSubview:self.toCoinLabel];
    [_exchangeInfoView addSubview:self.marketLabel];
    [_exchangeInfoView setContentCompressionResistancePriority:249 forAxis:UILayoutConstraintAxisHorizontal];
  }
  return _exchangeInfoView;
}

- (UIImageView *)iconView{
  if(!_iconView){
    _iconView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 20, 20)];
    _iconView.contentMode = UIViewContentModeScaleAspectFit;
  }
  return _iconView;
}

- (UILabel *)fromCoinLabel{
  if(!_fromCoinLabel){
    _fromCoinLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#333333") font:[UIFont systemFontOfSize:16]];
  }
  return _fromCoinLabel;
}
- (UILabel *)toCoinLabel{
  if(!_toCoinLabel){
    _toCoinLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#5E5E5E") font:[UIFont systemFontOfSize:12]];
  }
  return _toCoinLabel;
}

- (UILabel *)marketLabel{
  if(!_marketLabel){
    _marketLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#5E5E5E") font:[UIFont systemFontOfSize:11]];
  }
  return _marketLabel;
}
- (UILabel *)priceLabel{
  if(!_priceLabel){
    _priceLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#00B7A0") font:[UIFont systemFontOfSize:20]];
    _priceLabel.textAlignment = NSTextAlignmentRight;
    _priceLabel.adjustsFontSizeToFitWidth = YES;
    
  }
  return _priceLabel;
}
- (UILabel *)priceKRWLabel{
  if(!_priceKRWLabel){
    _priceKRWLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#979797") font:[UIFont systemFontOfSize:11]];
    _priceKRWLabel.textAlignment = NSTextAlignmentRight;
    _priceLabel.adjustsFontSizeToFitWidth = YES;
    
  }
  return _priceKRWLabel;
}

- (UILabel *)percentLabel{
  if(!_percentLabel){
    _percentLabel = [UILabel cnn_getLableWithColor:[UIColor whiteColor] font:[UIFont systemFontOfSize:17]];
    _percentLabel.textAlignment = NSTextAlignmentCenter;
    _percentLabel.layer.cornerRadius = 4;
    _percentLabel.layer.masksToBounds = YES;
    _percentLabel.size_width = 80;
    _percentLabel.size_height = 32;
    _percentLabel.adjustsFontSizeToFitWidth = YES;
  }
  return _percentLabel;
}
-(UIButton *)selecteBtn{
  if(!_selecteBtn){
    _selecteBtn = CNNCUSTOMBTN
    [_selecteBtn setImage:[UIImage imageNamed:@"wallet_icon_add"] forState:UIControlStateNormal];
    [_selecteBtn setImage:[UIImage imageNamed:@"wallet_icon_done"] forState:UIControlStateSelected];
    _selecteBtn.contentEdgeInsets = UIEdgeInsetsMake(15, 12, 15, 12);
    [_selecteBtn sizeToFit];
    
    [[_selecteBtn rac_signalForControlEvents:UIControlEventTouchUpInside] subscribeNext:^(__kindof UIControl * _Nullable x) {
      [self.subject sendNext:self.exchange];
    }];
  }
  return _selecteBtn;
}

- (void)setExchange:(CNNExchange *)exchange{
  _exchange = exchange;
  [self.iconView cnn_setRemoteUrl:exchange.icon];
  self.fromCoinLabel.text = exchange.fcoin;
  self.toCoinLabel.text = [NSString stringWithFormat:@"/%@",exchange.tcoin];
  self.marketLabel.text = exchange.exchange;
  self.priceLabel.text = exchange.format_price;
    self.priceKRWLabel.text = [NSString stringWithFormat:@"≈₩%@",exchange.format_price_krw];
  self.percentLabel.text = exchange.format_change_pct_24_hour;
  if(exchange.change_pct_24_hour >= 0){
    self.percentLabel.backgroundColor = CNNCOLOR_HEX(@"#00B793");
  }else{
    self.percentLabel.backgroundColor = CNNCOLOR_HEX(@"#FF7D40");
  }
  self.selecteBtn.selected = exchange.selected;
}

@end
