//
//  CNNLicenseView.m
//  Stark
//
//  Created by float.. on 2019/5/25.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNLicenseView.h"

@interface CNNLicenseView ()

@property (nonatomic, strong) UIView *firstView;
@property (nonatomic, strong) UIView *secondView;
@property (nonatomic, strong) UIView *thirdView;
@property (nonatomic, strong) UIButton *submitBtn;

@property (nonatomic, assign) BOOL isProvicyAgree;
@property (nonatomic, assign) BOOL isUsertermsAgree;

@end

@implementation CNNLicenseView

- (instancetype)initWithFrame:(CGRect)frame{
  if(self = [super initWithFrame:frame]){
    
    [self setupViews];
  }
  return self;
}


- (UIView *)firstView{
  if(!_firstView){
    UIImageView *imagev = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"img-license"]];
    imagev.contentMode = UIViewContentModeCenter | UIViewContentModeBottom;
    imagev.size_height = 162.f;
    imagev.autoresizesSubviews = YES;
    UIView *lineView = [[UIView alloc] initWithFrame:CGRectMake(0, imagev.size_height-0.5, imagev.size_width, 0.5)];
    lineView.backgroundColor = [UIColor colorWithRed:230/255.0 green:230/255.0 blue:230/255.0 alpha:1.0];
    lineView.autoresizingMask = UIViewAutoresizingFlexibleWidth;
    [imagev addSubview: lineView];
    _firstView = imagev;
  }
  return _firstView;
}

- (UIView *)secondView{
  if(!_secondView){
    UIStackView *sv = [[UIStackView alloc] init];
    sv.axis = UILayoutConstraintAxisVertical;
    sv.alignment = UIStackViewAlignmentFill;
    sv.size_width = 138.f;
    [sv addArrangedSubview:[self generateItemView:1]];
    [sv addArrangedSubview:[self generateItemView:2]];
    
    sv.layoutMarginsRelativeArrangement = YES;
    sv.layoutMargins = UIEdgeInsetsMake(21, 0, 30, 0);
    
    _secondView = sv;
  }
  return _secondView;
}

- (UIView *)thirdView{
  if(!_thirdView){
    UIStackView *sv = [UIStackView new];
    sv.alignment = UIStackViewAlignmentCenter;
    sv.axis = UILayoutConstraintAxisVertical;
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
    [btn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    [btn setTitle:CNNLOCALIZE(@"license_agree_and_continue") forState:UIControlStateNormal];
    btn.titleLabel.font = [UIFont systemFontOfSize:18.f];
    btn.backgroundColor = [UIColor colorFromHexCode: CNNViceColorHex];
    btn.enabled = NO;
    btn.layer.cornerRadius = 16;
    btn.contentEdgeInsets = UIEdgeInsetsMake(16, 75, 16, 75);
    [btn addTarget:self action:@selector(onTermsAgree:) forControlEvents:UIControlEventTouchUpInside];
    _submitBtn = btn;
    [sv addArrangedSubview:btn];
    _thirdView = sv;
  }
  return _thirdView;
}

- (UIView *)generateItemView:(int)tag{
  NSString *type = tag == 1 ? @"license_privicy": @"license_userterms";
  UIStackView *sv = [[UIStackView alloc] init];
  sv.axis = UILayoutConstraintAxisHorizontal;
  sv.alignment = UIStackViewAlignmentCenter;
  
  // button1
  NSString *title = CNNLOCALIZE(type);
  UIButton *labelBtn = [UIButton buttonWithType:UIButtonTypeCustom];
  labelBtn.titleLabel.font = [UIFont systemFontOfSize:16.f];
  [labelBtn setTitle:title forState:UIControlStateNormal];
  [labelBtn setTitleColor:[UIColor colorFromHexCode:@"#333333"] forState:UIControlStateNormal];
  [labelBtn setTitleEdgeInsets:UIEdgeInsetsMake(0, 12.f, 0, 0)];
  [labelBtn setImage:[UIImage imageNamed:@"checkbox_normal"]  forState:UIControlStateNormal];
  [labelBtn setImage:[UIImage imageNamed:@"checkbox_checked"]  forState:UIControlStateSelected];
  [labelBtn.titleLabel sizeToFit];
  labelBtn.contentHorizontalAlignment = UIControlContentHorizontalAlignmentLeft;
  labelBtn.tag = tag;
  [labelBtn addTarget:self action:@selector(onLicenseClick:) forControlEvents:UIControlEventTouchUpInside];
  
  // button2
  UIButton *detailBtn = [UIButton buttonWithType:UIButtonTypeCustom];
  detailBtn.titleLabel.font = [UIFont systemFontOfSize: 14.f];
  [detailBtn setTitle:CNNLOCALIZE(@"license_view_detail") forState:UIControlStateNormal];
  [detailBtn setTitleColor:[UIColor colorFromHexCode:@"#999999"] forState:UIControlStateNormal];
  [detailBtn.titleLabel sizeToFit];
  [detailBtn setContentHuggingPriority:UILayoutPriorityRequired forAxis:UILayoutConstraintAxisHorizontal];
  detailBtn.tag = tag;
  [detailBtn addTarget:self action:@selector(onDetailClick:) forControlEvents:UIControlEventTouchUpInside];
  
  [sv addArrangedSubview:labelBtn];
  [sv addArrangedSubview:detailBtn];
  sv.layoutMarginsRelativeArrangement = YES;
  sv.layoutMargins = UIEdgeInsetsMake(0, 40, 0, 40);
  return sv;
}
- (void)setupViews{
  self.backgroundColor = [UIColor colorWithRed:0/255.0 green:0/255.0 blue:0/255.0 alpha:0.5];
  UIView *contentV = [[UIView alloc] initWithFrame:CGRectMake(24,138,327,390)];
  contentV.center = self.center;
  contentV.backgroundColor = [UIColor whiteColor];
  contentV.layer.cornerRadius = 8;
  contentV.clipsToBounds = YES;
  [self addSubview:contentV];
  
  UIStackView *stackView = [[UIStackView alloc] initWithFrame:contentV.bounds];
  stackView.axis = UILayoutConstraintAxisVertical;
  stackView.alignment = UIStackViewAlignmentFill;
  [stackView addArrangedSubview:self.firstView];
  [stackView addArrangedSubview:self.secondView];
  [stackView addArrangedSubview:self.thirdView];
  [contentV addSubview:stackView];
  
  stackView.layoutMarginsRelativeArrangement = YES;
  stackView.layoutMargins = UIEdgeInsetsMake(26, 0, 26, 0);
}

#pragma mark - button click

- (void)onLicenseClick:(UIButton *)button{
  if(button.tag == 1){ // 隐私政策
    _isProvicyAgree = !_isProvicyAgree;
  }else if(button.tag == 2){ // 用户协议
    _isUsertermsAgree = !_isUsertermsAgree;
  }
  button.selected = !button.isSelected;
  
  if(_isProvicyAgree && _isUsertermsAgree){
    _submitBtn.enabled = YES;
    _submitBtn.backgroundColor = [UIColor colorFromHexCode:CNNPrimaryColorHex];
  }else{
    _submitBtn.enabled = NO;
     _submitBtn.backgroundColor = [UIColor colorFromHexCode:CNNViceColorHex];
  }
}

- (void)onDetailClick:(UIButton *)button{
  NSString *policy = nil;
  if(button.tag == 1){ // 隐私政策
    policy = @"privacy";
  }else if(button.tag == 2){ // 用户协议
    policy = @"user-terms";
  }
  if([self.delegate respondsToSelector:@selector(onLicenceDetailClick:)]){
    [self.delegate performSelector:@selector(onLicenceDetailClick:) withObject:policy];
  }
}

- (void)onTermsAgree:(UIButton *)button{
  if([self.delegate respondsToSelector:@selector(onLicenceAgree)]){
    [self.delegate performSelector:@selector(onLicenceAgree)];
  }
}
@end
