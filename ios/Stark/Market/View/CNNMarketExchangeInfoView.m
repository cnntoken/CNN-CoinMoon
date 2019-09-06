
//
//  CNNMarketExchangeInfoView.m
//  Stark
//
//  Created by tangl on 2019/8/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNMarketExchangeInfoView.h"
#import "CNNExchange.h"

@interface CNNMarketExchangeInfoView ()
@property (nonatomic, strong) UIView *leftView;
@property (nonatomic, strong) UILabel *priceLabel; //当前价格
@property (nonatomic, strong) UILabel *percentLabel; //24h涨幅

@property (nonatomic, strong) UIView *groupView1;
@property (nonatomic, strong) UIView *groupView2;
@property (nonatomic, strong) UIView *groupView3;

@property (nonatomic, strong) UILabel *priceHigh24hLabel;//最高(24h)
@property (nonatomic, strong) UILabel *priceLow24hLabel;//最低(24h)
@property (nonatomic, strong) UILabel *volume24hLabel;//成交量(24h)
@property (nonatomic, strong) UILabel *value24hLabel; //成交额


@property (nonatomic, strong) UILabel *valueLabel;// 换手率(24h)
@property (nonatomic, strong) UILabel *changePercentLabel;// 换手率(24h)
@property (nonatomic, strong) UILabel *rankLabel;//排名

@property (nonatomic, strong) UIView *rightView;
//@property (nonatomic, strong) NSMutableArray<NSDictionary *> *dataArr;

@property (nonatomic, assign) CNNKlineChartType chartType;
@end

static NSString * const CELL_IDENTIFIER = @"CELL_IDENTIFIER";
@implementation CNNMarketExchangeInfoView

- (instancetype)initWithFrame:(CGRect)frame andChartType:(CNNKlineChartType)chartType{
    if(self = [super initWithFrame: frame]){
        _chartType = chartType;
        self.priceHigh24hLabel = [self generateValueLabel];
        self.priceLow24hLabel = [self generateValueLabel];
        self.volume24hLabel = [self generateValueLabel];
        self.value24hLabel = [self generateValueLabel];
        self.valueLabel = [self generateValueLabel];
        self.changePercentLabel = [self generateValueLabel];
        self.rankLabel = [self generateValueLabel];
        
        [self addSubview:self.leftView];
        [self addSubview:self.rightView];
        
        [self.leftView makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(self).offset(16);
            make.left.equalTo(self).offset(15);
            make.bottom.equalTo(self);
            make.width.equalTo(self.width).multipliedBy(0.4);
        }];
        
        [self.priceLabel makeConstraints:^(MASConstraintMaker *make) {
            make.top.left.right.equalTo(self.leftView);
        }];
        
        [self.percentLabel makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(self.priceLabel.bottom).offset(6);
            make.left.right.equalTo(self.leftView);
        }];
        
        [self.rightView makeConstraints:^(MASConstraintMaker *make) {
            make.top.equalTo(self.leftView);
            make.right.equalTo(self).offset(-15);
            make.bottom.equalTo(self);
            make.left.equalTo(self.leftView.right);
        }];
       
        if(chartType == CNNKlineChartTypeKline){
            [self.groupView2 makeConstraints:^(MASConstraintMaker *make) {
                make.top.bottom.right.equalTo(self.rightView);
            }];
            [self.groupView1 makeConstraints:^(MASConstraintMaker *make) {
                make.left.top.bottom.equalTo(self.rightView);
                make.right.equalTo(self.groupView2.left).offset(-10);
            }];
        }else{
            [self.groupView3 makeConstraints:^(MASConstraintMaker *make) {
                make.top.bottom.right.equalTo(self.rightView);
            }];
            [self.groupView2 makeConstraints:^(MASConstraintMaker *make) {
                make.top.bottom.equalTo(self.rightView);
                make.right.equalTo(self.groupView3.left).offset(-10);
            }];
            [self.groupView1 makeConstraints:^(MASConstraintMaker *make) {
                make.left.top.bottom.equalTo(self.rightView);
                make.right.equalTo(self.groupView2.left).offset(-10);
            }];
        }
       
    }
    return self;
}

#pragma mark - lazy

- (UILabel *)priceLabel{
    if(!_priceLabel){
        _priceLabel = [UILabel cnn_getLableWithColor:[UIColor colorFromHexCode:@"#00B7A0"] font:[UIFont systemFontOfSize:24 weight:UIFontWeightBold]];
        _priceLabel.adjustsFontSizeToFitWidth = YES;
    }
    return _priceLabel;
}
- (UILabel *)percentLabel{
    if(!_percentLabel){
        _percentLabel = [UILabel cnn_getLableWithColor:[UIColor colorFromHexCode:@"#00B7A0"] font:[UIFont systemFontOfSize:12]];
    }
    return _percentLabel;
}

- (UIView *)leftView{
    if(!_leftView){
        _leftView = [UIView new];
        [_leftView addSubview:self.priceLabel];
        [_leftView addSubview:self.percentLabel];
    }
    return _leftView;
}

- (UILabel *)generateTipLabelWithText:(NSString *)text{
    UILabel *label = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#8693A3") font:[UIFont systemFontOfSize:10]];
    label.textAlignment = NSTextAlignmentRight;
    label.text = text;
    [label sizeToFit];
    return label;
}

- (UILabel *)generateValueLabel{
    UILabel *label =  [UILabel cnn_getLableWithColor:[UIColor whiteColor] font:[UIFont systemFontOfSize:11]];
    label.textAlignment = NSTextAlignmentRight;
    return label;
}

- (void)groupFit:(UIView *)wrapView{
    NSArray<UILabel *> *arr = wrapView.subviews;
    [arr enumerateObjectsUsingBlock:^(UILabel * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj makeConstraints:^(MASConstraintMaker *make) {
            make.right.equalTo(wrapView);
            make.left.greaterThanOrEqualTo(wrapView);
            if(idx == 0){
                make.top.equalTo(wrapView);
            }else if(idx > 0){
                UILabel *prev = arr[idx -1];
                CGFloat offset = idx == 2 ? 12 : 4;
                make.top.equalTo(prev.bottom).offset(offset);
            }
        }];
    }];
}

- (UIView *)groupView1{
    if(!_groupView1){
        UIView *view = [UIView new];
        UILabel *tipLabel1 = [self generateTipLabelWithText:CNNLOCALIZE(@"最高(24h)")];
        [view addSubview:tipLabel1];
        [view addSubview:self.priceHigh24hLabel];
        
        UILabel *tipLabel2 = [self generateTipLabelWithText:CNNLOCALIZE(@"最低(24h)")];
        //    tipLabel2.origin_y = self.priceHigh24hLabel.bottom_y + 5;
        [view addSubview:tipLabel2];
        [view addSubview:self.priceLow24hLabel];
        //    self.priceLow24hLabel.origin_y = tipLabel2.bottom_y + 4;
        [self groupFit:view];
        _groupView1 = view;
    }
    return _groupView1;
}
- (UIView *)groupView2{
    if(!_groupView2){
        UIView *view = [UIView new];

        UILabel *tipLabel2 = [self generateTipLabelWithText:CNNLOCALIZE(@"成交额(24h)")];
        [view addSubview:tipLabel2];
        [view addSubview:self.value24hLabel];
        
        UILabel *tipLabel1 = [self generateTipLabelWithText:CNNLOCALIZE(@"成交量(24h)")];
        [view addSubview:tipLabel1];
        [view addSubview:self.volume24hLabel];
        
        [self groupFit:view];
        _groupView2 = view;
    }
    return _groupView2;
}
- (UIView *)groupView3{
    if(!_groupView3){
        UIView *view = [UIView new];
        UILabel *tipLabel1 = [self generateTipLabelWithText:CNNLOCALIZE(@"市值")];
        [view addSubview:tipLabel1];
        [view addSubview:self.valueLabel];
        UILabel *tipLabel2 = [self generateTipLabelWithText:CNNLOCALIZE(@"排名")];
        [view addSubview:tipLabel2];
        [view addSubview:self.rankLabel];
        [self groupFit:view];
        _groupView3 = view;
    }
    return _groupView3;
}

- (UIView *)rightView{
    if(!_rightView){
        _rightView = [UIView new];
        [_rightView addSubview:self.groupView1];
        if(_chartType == CNNKlineChartTypeKline){
             [_rightView addSubview:self.groupView2];
        }else{
            [_rightView addSubview:self.groupView2];
            [_rightView addSubview:self.groupView3];
        }
    }
    return _rightView;
}

- (void)refreshTextWithLabel:(UILabel *)Label andText:(NSString *)text{
    Label.text = text;
    [Label sizeToFit];
    [Label updateConstraints:^(MASConstraintMaker *make) {
        make.width.equalTo(Label.size_width);
    }];
}

- (void)setExchange:(CNNExchange *)exchange{
    _exchange = exchange;
    self.priceLabel.text = [NSString stringWithFormat:@"$%@",self.exchange.format_price];
    self.percentLabel.text = self.exchange.format_change_pct_24_hour;
    
    [self refreshTextWithLabel:self.priceHigh24hLabel andText:[NSString stringWithFormat:@"$%@",self.exchange.format_high_24_hour]];//最高(24h)
    [self refreshTextWithLabel:self.priceLow24hLabel andText: [NSString stringWithFormat:@"$%@",self.exchange.format_low_24_hour]];//最低(24h)
    
    [self refreshTextWithLabel:self.volume24hLabel andText:self.exchange.format_volume_24_hour];//成交量(24h)
    [self refreshTextWithLabel:self.value24hLabel andText:self.exchange.format_volume_24_hour_to];// 换手率
    
    [self refreshTextWithLabel:self.valueLabel andText:self.exchange.format_market_cap];//市值
    [self refreshTextWithLabel:self.rankLabel andText:[NSString stringWithFormat:@"%ld",exchange.rank]];//排名
}

@end


