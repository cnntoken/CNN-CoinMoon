

//
//  CNNMarketCoinInfoCell.m
//  Stark
//
//  Created by tangl on 2019/8/1.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNMarketCoinInfoCell.h"
#import "CNNCoinNotice.h"
#import "CNNCircleView.h"


@interface CNNMarketCoinInfoCell ()

@property (nonatomic, strong) UILabel *timeLabel;
@property (nonatomic, strong) UIView *tagWrapView;//包裹tag的view 因为tag的数量可能不定
@property (nonatomic, strong) UIButton *moreBtn;
@property (nonatomic, strong) UILabel *contentLabel;
@property (nonatomic, strong) NSMutableArray<UILabel *> *tags;

@end

@implementation CNNMarketCoinInfoCell
- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier{
  if(self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]){
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    // 分成左中右结构
    //1. 左边
    // 时间label
    [self.contentView addSubview:self.timeLabel];
    //2. 中间
    UIView *timeLine = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 1/CNNScreenScale, 1)];
    timeLine.backgroundColor = CNNCOLOR_HEX(CNNPrimaryColorHex);
//    [timeLine setContentHuggingPriority:UILayoutPriorityRequired forAxis:UILayoutConstraintAxisHorizontal];
    UIView *cricleView = [[CNNCircleView alloc] initWithFrame:CGRectMake(-9, 22, 18, 18)];
    [timeLine addSubview:cricleView];
    [self.contentView addSubview:timeLine];
    //3. 右边
    [self.contentView addSubview:self.tagWrapView];
    [self.contentView addSubview:self.contentLabel];
    [self.contentView addSubview:self.moreBtn];
    
    
    // 设置约束
    [_timeLabel makeConstraints:^(MASConstraintMaker *make) {
      make.left.equalTo(self.contentView).offset(16);
      make.right.equalTo(timeLine.left).offset(-12);
      make.centerY.equalTo(self.contentView.top).offset(31);
    }];
    [timeLine makeConstraints:^(MASConstraintMaker *make) {
      make.top.bottom.equalTo(self.contentView);
      make.left.equalTo(self.contentView).offset(83);
      make.width.equalTo(timeLine.size_width);
    }];
    [_tagWrapView makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(self.contentView).offset(17);
      make.left.equalTo(timeLine.right).offset(24);
      make.right.equalTo(self.moreBtn.left);
      make.height.equalTo(20);
    }];
    [_contentLabel makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(self.tagWrapView.bottom);
      make.left.right.equalTo(self.tagWrapView);
      make.bottom.equalTo(self.contentView);
    }];
    [_moreBtn makeConstraints:^(MASConstraintMaker *make) {
      make.right.equalTo(self.contentView);
      make.centerY.equalTo(self.timeLabel);
      make.width.equalTo(self.moreBtn.size_width);
      make.height.equalTo(self.moreBtn.size_height);
    }];
  }
  return self;
}

#pragma mark - lazy

- (UILabel *)timeLabel{
  if(!_timeLabel){
    _timeLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#AAAAAA") font:[UIFont systemFontOfSize:13]];
    _timeLabel.numberOfLines = 0;
      _timeLabel.textAlignment = NSTextAlignmentCenter;
  }
  return _timeLabel;
}

- (UIView *)tagWrapView{
  
  if(!_tagWrapView){
    _tagWrapView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, CNNScreenW - self.moreBtn.size_width - 107, 100)];
//    [_tagWrapView setContentHuggingPriority:200 forAxis:UILayoutConstraintAxisHorizontal];
//    [_tagWrapView setContentCompressionResistancePriority:UILayoutPriorityRequired forAxis:UILayoutConstraintAxisHorizontal];
  }
  return _tagWrapView;
}

- (UILabel *)contentLabel{
  if(!_contentLabel){
    _contentLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#333333") font:[UIFont systemFontOfSize:13]];
    _contentLabel.numberOfLines = 0;
  }
  return _contentLabel;
}

-(UIButton *)moreBtn{
  if(!_moreBtn){
    _moreBtn = CNNCUSTOMBTN
    [_moreBtn setImage:[UIImage imageNamed:@"icon_more_black"] forState:UIControlStateNormal];
    _moreBtn.contentEdgeInsets = UIEdgeInsetsMake(10, 16, 10, 16);
    [_moreBtn sizeToFit];
      _moreBtn.hidden = YES;
  }
  return _moreBtn;
}
#pragma mark - private

- (UILabel *)generateTagWithTitle:(NSString *)title andColor:(NSString *)colorStr{
  UILabel *label = [UILabel new];
  label.text = title;
  label.backgroundColor = CNNCOLOR_HEX(colorStr);
  label.textColor = [UIColor whiteColor];
  label.layer.cornerRadius = 3;
  label.layer.masksToBounds = YES;
  label.textAlignment = NSTextAlignmentCenter;
  CGSize size = [label sizeThatFits:CGSizeMake(CGFLOAT_MAX, 25)];
  label.frame = CGRectMake(0, 0, size.width + 18, size.height+10);
  return label;
}

-(NSMutableArray<UILabel *> *)tags{
  if(!_tags){
    _tags = [NSMutableArray new];
  }
  return _tags;
}

#pragma mark - 设置数据

- (void)setModel:(CNNCoinNotice *)model{
  self.timeLabel.text = model.format_happend_at;
  self.contentLabel.attributedText = [[NSAttributedString alloc] initWithData:[model.format_content  dataUsingEncoding:NSUnicodeStringEncoding] options:@{ NSDocumentTypeDocumentAttribute: NSHTMLTextDocumentType } documentAttributes:nil error:nil];
  
  [self.tags enumerateObjectsUsingBlock:^(UILabel * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    [obj removeFromSuperview];
  }];
  [self.tags removeAllObjects];
  if(model.tags.count == 0){
    // 重新设置约束
    [self.tagWrapView updateConstraints:^(MASConstraintMaker *make) {
      make.height.equalTo(0);
    }];
    return;
  }
  [model.tags enumerateObjectsUsingBlock:^(CNNNoticeTag * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    UILabel *label = [self generateTagWithTitle:obj.name andColor:obj.color];
    [self.tags addObject:label];
    [self.tagWrapView addSubview:label];
    if(idx > 0){
      UILabel *prevLabel = self.tags[idx-1];
      if(prevLabel.right_x + 15 + label.size_width > self.tagWrapView.size_width){
        // 换行
        label.origin_x = 0;
        label.origin_y = prevLabel.bottom_y + 10;
      }else{
        label.origin_x = prevLabel.right_x + 15;
        label.origin_y = prevLabel.origin_y;
      }
    }
  }];
  // 重新设置约束
  [self.tagWrapView updateConstraints:^(MASConstraintMaker *make) {
    make.height.equalTo([self.tags lastObject].bottom_y + 15);
  }];
}

@end
