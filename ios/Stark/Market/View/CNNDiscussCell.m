//
//  CNNDiscussCell.m
//  Stark
//
//  Created by tangl on 2019/8/2.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNDiscussCell.h"
#import "CNNCornerView.h"

#import "CNNDiscussComment.h"
#import "CNNUser.h"


@interface CNNDiscussReplyView()

@property (nonatomic, strong) NSMutableArray<UILabel *> *labels;



@end

@implementation CNNDiscussReplyView


- (NSMutableArray<UILabel *> *)labels{
  
  if(!_labels){
    _labels = [NSMutableArray new];
  }
  return _labels;
}
- (instancetype)initWithFrame:(CGRect)frame{
  if(self = [super initWithFrame:frame]){
    self.backgroundColor = CNNCOLOR_HEX(@"#F5F5F5");
  }
  return self;
}
- (CGFloat)contentHeight{
  if(self.labels.count > 0){
    return [self.labels lastObject].bottom_y + 10;
  }
  return 0;
}

- (void)setReplies:(NSArray<CNNDiscussComment *> * _Nullable)replies{
  
  [self.labels enumerateObjectsUsingBlock:^(UILabel * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    [obj removeFromSuperview];
  }];
  self.labels = nil;
  _replies = replies;
  [replies enumerateObjectsUsingBlock:^(CNNDiscussComment * _Nonnull comment, NSUInteger idx, BOOL * _Nonnull stop) {
    UILabel *label = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#333333") font:[UIFont systemFontOfSize:13]];
    label.numberOfLines = 0;
    label.text = [NSString stringWithFormat:@"%@: %@", comment.user.name,comment.content];
    CGFloat width = CNNScreenW - 79 - 27;
    CGSize targetSize = [label sizeThatFits:CGSizeMake(width, CGFLOAT_MAX)];
    label.size_width = targetSize.width;
    label.size_height = targetSize.height;
    label.origin_x = 10;
    
    UILabel *timeLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(@"#AAAAAA") font:[UIFont systemFontOfSize:10]];
    timeLabel.text = comment.list_format_created_at;
    [timeLabel sizeToFit];
    if(idx == 0){
      label.origin_y = 10;
    }else{
      UILabel *prevLabel = [self.labels lastObject];
      label.origin_y = prevLabel.bottom_y + 10;
    }
    timeLabel.origin_x = label.origin_x;
    timeLabel.origin_y = label.bottom_y + 2;
    [self.labels addObject:label];
    [self.labels addObject:timeLabel];
    [self addSubview:label];
    [self addSubview:timeLabel];
  }];
}
@end

@interface CNNDiscussCell ()
// 1. 左边
@property (nonatomic, strong) UIImageView *avatarImageView;
// 2. 右边
@property (nonatomic, strong) UIView *rightView;
@property (nonatomic, strong) UIView *separateView;
// 用户区
@property (nonatomic, strong) UILabel *userLabel;
@property (nonatomic, strong) UILabel *userCommentLabel;
@property (nonatomic, strong) UILabel *userTimeLabel;
// 操作区
@property (nonatomic, strong) UIView *operateView;
@property (nonatomic, strong) UIButton *commentBtn;
@property (nonatomic, strong) UIButton *likeBtn;
@property (nonatomic, strong) UIButton *removeBtn;

// 回复评论区
@property (nonatomic, strong) UIView *replyView;
@property (nonatomic, strong) CNNDiscussReplyView *replyContentView;
@property (nonatomic, strong) UIButton *btnMore;// 查看全部

@property (nonatomic, strong) MASConstraint *operate2rightbottom;

@property (nonatomic, strong) MASConstraint *operate2reply;

@property (nonatomic, strong) MASConstraint *btnmore2reply;
@end

@implementation CNNDiscussCell


- (UIView *)separateView{
    if(!_separateView){
        _separateView = [UIView new];
        _separateView.backgroundColor = CNNCOLOR_HEX(@"#E6E6E6");
    }
    return _separateView;
}

- (UIImageView *)avatarImageView{
  
  if(!_avatarImageView){
    _avatarImageView = [UIImageView getAvatarViewWithFrame:CGRectMake(0, 0, 40, 40)];
  }
  return _avatarImageView;
}

- (UILabel *)userLabel{
  
  if(!_userLabel){
        _userLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(CNNTextColorVice) font:[UIFont systemFontOfSize:14]];
  }
  return _userLabel;
}
- (UILabel *)userTimeLabel{
  if(!_userTimeLabel){
    _userTimeLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(CNNTextColorWeak) font:[UIFont systemFontOfSize:12]];
  }
  return _userTimeLabel;
}
- (UILabel *)userCommentLabel{
  if(!_userCommentLabel){
    _userCommentLabel = [UILabel cnn_getLableWithColor:CNNCOLOR_HEX(CNNTextColorStrong) font:[UIFont systemFontOfSize:14]];
    _userCommentLabel.lineBreakMode = NSLineBreakByCharWrapping;
    _userCommentLabel.numberOfLines = 0;
      UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(onTapMore:)];
      [_userCommentLabel addGestureRecognizer:tap];
  }
  return _userCommentLabel;
}

- (UIButton *)commentBtn{
  if(!_commentBtn){
    _commentBtn = [self generateOperateBtnWithType:@"comment" title:CNNLOCALIZE(@"reply_comment")];
  }
  return _commentBtn;
}
- (UIButton *)likeBtn{
  if(!_likeBtn){
    _likeBtn = [self generateOperateBtnWithType:@"like" title:CNNLOCALIZE(@"like_comment")];
  }
  return _likeBtn;
}
- (UIButton *)removeBtn{
  if(!_removeBtn){
    _removeBtn = [self generateOperateBtnWithType:@"remove" title:CNNLOCALIZE(@"delete_comment")];
  }
  return _removeBtn;
}

- (UIView *)operateView{
  if(!_operateView){
    _operateView = [UIView new];
    [_operateView addSubview:self.commentBtn];
    [_operateView addSubview:self.likeBtn];
    [_operateView addSubview:self.removeBtn];
  }
  return _operateView;
}

- (CNNDiscussReplyView *)replyContentView{
  if(!_replyContentView){
    _replyContentView = [CNNDiscussReplyView new];
  }
  return _replyContentView;
}

- (UIButton *)btnMore{
  if(!_btnMore){
    _btnMore = CNNCUSTOMBTN
    [_btnMore setTitleColor:CNNCOLOR_HEX(CNNPrimaryColorHex) forState:UIControlStateNormal];
    _btnMore.titleLabel.font = [UIFont systemFontOfSize:13];
    _btnMore.contentEdgeInsets = UIEdgeInsetsMake(10, 0, 10, 0);
//    _btnMore.backgroundColor = [UIColor redColor];
  }
  return _btnMore;
}

- (UIView *)replyView{
  if(!_replyView){
    _replyView = [UIView new];
    [_replyView addSubview:self.replyContentView];
    [_replyView addSubview:self.btnMore];
      UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(onTapMore:)];
      [_rightView addGestureRecognizer:tap];
  }
  return _replyView;
}

- (UIView *)rightView{
  if(!_rightView){
    _rightView = [UIView new];
    // 用户区
    [_rightView addSubview:self.userLabel];
    [_rightView addSubview:self.userTimeLabel];
    [_rightView addSubview:self.userCommentLabel];
    // 操作区
    [_rightView addSubview:self.operateView];
    
    //回复区
    [_rightView addSubview:self.replyView];
    
    
  }
  return _rightView;
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier{
  if(self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]){
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    [self.contentView addSubview:self.avatarImageView];
    [self.contentView addSubview:self.rightView];
      [self.contentView addSubview:self.separateView];
    //设置约束
    //1. 头像
    [self.avatarImageView makeConstraints:^(MASConstraintMaker *make) {
      make.width.height.equalTo(40);
      make.left.equalTo(self.contentView.left).offset(16);
      make.top.equalTo(self.contentView.top).offset(16);
    }];
    //2. rightView
    [self.rightView makeConstraints:^(MASConstraintMaker *make) {
      make.left.equalTo(self.avatarImageView.right).offset(6);
      make.top.equalTo(self.avatarImageView.top);
//      make.bottom.equalTo(self.contentView.bottom);
      make.right.equalTo(self.contentView.right).offset(-16);
    }];
    //2.1 用户info
    //2.1.1 用户名
    [self.userLabel makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(self.rightView.top).offset(5);
      make.left.equalTo(self.rightView.left).offset(8);
      make.right.lessThanOrEqualTo(self.rightView.right).offset(-8);
    }];
    //2.1.2 发布时间
    [self.userTimeLabel makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(self.userLabel.bottom).offset(5);
      make.left.equalTo(self.rightView.left).offset(8);
      make.right.lessThanOrEqualTo(self.rightView.right).offset(-8);
    }];
    //2.1.3 评论内容
    [self.userCommentLabel makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(self.userTimeLabel.bottom).offset(5);
      make.left.equalTo(self.rightView.left).offset(8);
      make.right.lessThanOrEqualTo(self.rightView.right).offset(-8);
    }];
    //2.2 操作区
    [self.operateView makeConstraints:^(MASConstraintMaker *make) {
      make.left.right.equalTo(self.rightView);
      make.top.equalTo(self.userCommentLabel.bottom);
      make.height.equalTo(36);
      self.operate2rightbottom = make.bottom.equalTo(self.rightView);
      self.operate2reply = make.bottom.equalTo(self.replyView).priority(751);
      [self.operate2reply deactivate];
    }];
    //2.2.1 评论按钮
    [self.commentBtn makeConstraints:^(MASConstraintMaker *make) {
      make.top.left.bottom.equalTo(self.operateView);
    }];
    //2.2.2 点赞按钮
    [self.likeBtn makeConstraints:^(MASConstraintMaker *make) {
      make.top.bottom.equalTo(self.operateView);
      make.left.equalTo(self.commentBtn.right).offset(24);
      make.width.equalTo(self.commentBtn.width);
    }];
    //2.2.3 删除按钮
    [self.removeBtn makeConstraints:^(MASConstraintMaker *make) {
      make.top.bottom.right.equalTo(self.operateView);
      make.left.equalTo(self.likeBtn.right).offset(24);
      make.width.equalTo(self.likeBtn.width);
    }];
    //2.3 回复区
    [self.replyView makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(self.operateView.bottom);
      make.left.equalTo(self.rightView);
      make.right.equalTo(self.rightView).offset(-17);
      make.bottom.equalTo(self.rightView);
    }];
    [self.replyContentView makeConstraints:^(MASConstraintMaker *make) {
      make.top.left.right.equalTo(self.replyView);
      make.bottom.equalTo(self.replyView).priority(999);
    }];
  
    [self.btnMore makeConstraints:^(MASConstraintMaker *make) {
      make.left.equalTo(self.replyView);
      make.top.equalTo(self.replyContentView.bottom);
      self.btnmore2reply = make.bottom.equalTo(self.replyView);
    }];
    //3. 分界线
      [self.separateView makeConstraints:^(MASConstraintMaker *make) {
          make.height.equalTo(1/CNNScreenScale);
          make.top.equalTo(self.rightView.bottom);
          make.right.bottom.equalTo(self.contentView);
          make.left.equalTo(self.contentView).offset(30);
      }];
    [self setupEvents];
  }
  return self;
}

- (UIButton *)generateOperateBtnWithType:(NSString *)type title:(NSString *)title{
  UIButton *btn = CNNCUSTOMBTN
  [btn setTitle:title forState:UIControlStateNormal];
  [btn setTitleColor:CNNCOLOR_HEX(CNNTextColorVice) forState:UIControlStateNormal];
  [btn setTitleColor:CNNCOLOR_HEX(CNNPrimaryColorHex) forState:UIControlStateSelected];
  if([type isEqualToString:@"comment"]){
    [btn setImage:[UIImage imageNamed:@"comment5"] forState:UIControlStateNormal];
  }else if([type isEqualToString:@"like"]){
    [btn setImage:[UIImage imageNamed:@"like5"] forState:UIControlStateNormal];
    [btn setImage:[UIImage imageNamed:@"liked5"] forState:UIControlStateSelected];
  }
  btn.titleLabel.font = [UIFont systemFontOfSize: 12.f];
  btn.contentHorizontalAlignment = UIControlContentHorizontalAlignmentLeft;
  btn.titleEdgeInsets = UIEdgeInsetsMake(0, 4, 0, -4);
  btn.contentEdgeInsets = UIEdgeInsetsMake(0, 0, 0, 4);
  [btn sizeToFit];
  return btn;
}

- (void)onTapMore:(UIGestureRecognizer *)tap{
    if([self.delegate respondsToSelector: @selector(cnncomment_more:)]){
        [self.delegate cnncomment_more:self.comment];
    }
}

- (void)setupEvents{
  [[self.btnMore rac_signalForControlEvents:UIControlEventTouchUpInside] subscribeNext:^(__kindof UIControl * _Nullable x) {
    if([self.delegate respondsToSelector: @selector(cnncomment_more:)]){
      [self.delegate cnncomment_more:self.comment];
    }
  }];
  [[self.commentBtn rac_signalForControlEvents:UIControlEventTouchUpInside] subscribeNext:^(__kindof UIControl * _Nullable x) {
    if([self.delegate respondsToSelector: @selector(cnncomment_replycomment:)]){
      [self.delegate cnncomment_replycomment:self.comment];
    }
  }];
  [[self.likeBtn rac_signalForControlEvents:UIControlEventTouchUpInside] subscribeNext:^(__kindof UIControl * _Nullable x) {
    if([self.delegate respondsToSelector: @selector(cnncomment_likecomment:)]){
      [self.delegate cnncomment_likecomment:self.comment];
    }
  }];
  [[self.removeBtn rac_signalForControlEvents:UIControlEventTouchUpInside] subscribeNext:^(__kindof UIControl * _Nullable x) {
    if([self.delegate respondsToSelector: @selector(cnncomment_removecomment:)]){
      [self.delegate cnncomment_removecomment:self.comment];
    }
  }];
}

//- (void)onOperateBtnClick:(UIButton *)btn{
//  if(btn == self.commentBtn){
//    if([self.delegate respondsToSelector: @selector(cnncomment_replycomment:)]){
//      [self.delegate cnncomment_replycomment:self.comment];
//    }
//  }else if(btn == self.likeBtn){
//    if([self.delegate respondsToSelector:@selector(cnncomment_likecomment:)]){
//      [self.delegate cnncomment_likecomment:self.comment];
//    }
//  }else{
//    if([self.delegate respondsToSelector:@selector(cnncomment_removecomment:)]){
//      [self.delegate cnncomment_removecomment:self.comment];
//    }
//  }
//}

#pragma mark - 设置数据
- (void)setComment:(CNNDiscussComment *)comment{
  _comment = comment;
  // 头像
  [self.avatarImageView cnn_setAvatarWithUrl:comment.user.avatar];
  // 用户区
  self.userLabel.text = comment.user.name;
  self.userCommentLabel.text = comment.content;
  self.userTimeLabel.text = comment.list_format_created_at;
  // 操作区
  self.removeBtn.hidden = !comment.user.isSelf;
  self.likeBtn.selected = comment.isLiked;
  [self.likeBtn setTitle:[NSString stringWithFormat:@"%ld",comment.like_count] forState:UIControlStateNormal];
  // 回复区
  if(comment.replies && comment.replies.count > 0){
    self.replyView.hidden = NO;
    self.replyContentView.replies = comment.replies;
    [self.operate2reply activate];
    [self.operate2rightbottom deactivate];
  }else{
    self.replyContentView.replies = nil;
    self.replyView.hidden = YES;
    [self.operate2reply deactivate];
    [self.operate2rightbottom activate];
  }
  [self.btnMore setTitle:[NSString stringWithFormat:CNNLOCALIZE(@"查看全部评论"), comment.reply_count] forState:UIControlStateNormal];
  [self.btnMore sizeToFit];
  self.btnMore.hidden = comment.reply_count < 3;
  if(comment.reply_count < 3){
    self.btnMore.hidden = YES;
    [self.btnmore2reply deactivate];
  }else{
    self.btnMore.hidden = NO;
    [self.btnmore2reply activate];
  }
  [self.replyContentView updateConstraints:^(MASConstraintMaker *make) {
    make.height.equalTo(self.replyContentView.contentHeight);
  }];
  [self.btnMore updateConstraints:^(MASConstraintMaker *make) {
    make.width.equalTo(self.btnMore.size_width);
    make.height.equalTo(self.btnMore.size_height);
  }];
}
@end
