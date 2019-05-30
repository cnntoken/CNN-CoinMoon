//
//  CNNTopicCell.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNTopicCell.h"
#import "CNNFeedTopic.h"

@interface CNNTopicCell ()

@property (weak, nonatomic) IBOutlet UIImageView *avatarImageView;
@property (weak, nonatomic) IBOutlet UILabel *nameLabel;
@property (weak, nonatomic) IBOutlet UIButton *timeBtn;
@property (weak, nonatomic) IBOutlet UIButton *moreBtn;
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UILabel *topLabel;
@property (weak, nonatomic) IBOutlet UIImageView *coverImageView;
@property (weak, nonatomic) IBOutlet UIButton *viewBtn;
@property (weak, nonatomic) IBOutlet UIButton *commentBtn;
@property (weak, nonatomic) IBOutlet UIButton *likeBtn;

@end

@implementation CNNTopicCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
    [self.timeBtn setTitleColor:[UIColor colorFromHexCode:@"#666"] forState:UIControlStateNormal];
    [self setSeparatorInset:UIEdgeInsetsMake(0, 0, 0, 0)];
    self.titleLabel.lineBreakMode = NSLineBreakByWordWrapping;
    self.titleLabel.textColor = [UIColor colorFromHexCode:@"#333"];
    self.topLabel.layer.cornerRadius = 2;
    [self.topLabel setClipsToBounds:YES];
  
  
    self.avatarImageView.contentMode = UIViewContentModeScaleAspectFit;
    self.coverImageView.contentMode = UIViewContentModeScaleAspectFit;
  
    self.coverImageView.backgroundColor = [UIColor colorFromHexCode:@"#fafafa"];
    self.coverImageView.layer.cornerRadius = 12;
    self.coverImageView.contentMode = UIViewContentModeScaleAspectFill;
  
    [self.coverImageView setClipsToBounds:YES];
    self.avatarImageView.layer.cornerRadius = 15;
    self.avatarImageView.contentMode = UIViewContentModeScaleAspectFit;
    [self.avatarImageView setClipsToBounds:YES];
  
    [self.viewBtn setTitleColor:[UIColor colorFromHexCode:@"#666"] forState:UIControlStateNormal];
    [self.commentBtn setTitleColor:[UIColor colorFromHexCode:@"#666"] forState:UIControlStateNormal];
    [self.likeBtn setTitleColor:[UIColor colorFromHexCode:@"#666"] forState:UIControlStateNormal];
    //按钮添加点击事件
    [self addClickEvent];
}

- (void)addClickEvent{
  // 点击viewBtn的时候直接跳转 不做处理
  _viewBtn.userInteractionEnabled = NO;
  [_moreBtn addTarget:self action:@selector(onBtnClick:) forControlEvents:UIControlEventTouchUpInside];
  [_commentBtn addTarget:self action:@selector(onBtnClick:) forControlEvents:UIControlEventTouchUpInside];
  [_likeBtn addTarget:self action:@selector(onBtnClick:) forControlEvents:UIControlEventTouchUpInside];
  
  //点击头像 跳转到个人详情
  UIGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(onAvatarTap:)];
  [_avatarImageView addGestureRecognizer:tap];
  _avatarImageView.userInteractionEnabled = YES;
}

- (void)onAvatarTap:(UITapGestureRecognizer *)regognizer{
  CNNLog(@"%@",regognizer);
  if([self.delegate respondsToSelector:@selector(topicCell:onClickedWithTopic:andAction:)]){
    [self.delegate topicCell:self onClickedWithTopic:self.topic andAction:TopicCellActionAvatar];
  }
}

- (void)onBtnClick:(UIButton *)button{
  CNNTopicCellAction action;
  if(button == _likeBtn){
    // 点赞
    action = TopicCellActionLike;
    
  }else if(button == _commentBtn){
    // 评论
    action = TopicCellActionComment;
  }else if(button == _moreBtn){
    // 更多
    action = TopicCellActionMore;
  }else{
    return;
  }
  if([self.delegate respondsToSelector:@selector(topicCell:onClickedWithTopic:andAction:)]){
    [self.delegate topicCell:self onClickedWithTopic:self.topic andAction:action];
  }
}



- (void)setTopic:(CNNFeedTopic *)topic
{
  _topic = topic;
  
  // 顶部控件的数据
  [self.avatarImageView cnn_setRemoteUrl:topic.user.avatar];
  
  self.nameLabel.text = topic.user.name;
  self.titleLabel.attributedText = topic.attributeTitle;
  [self.timeBtn setTitle:topic.format_created_at forState:UIControlStateNormal];
  
  if(topic.cover && topic.cover.length >0){
    self.coverImageView.hidden = NO;
    [self.coverImageView cnn_setRemoteUrl:topic.cover];
  }else{
    self.coverImageView.hidden = YES;
  }
  self.topLabel.hidden = !topic.is_sticky;
  // 底部按钮的文字
  [self setupButtonTitle:self.viewBtn number:topic.feed_stats.view_count];
  [self setupButtonTitle:self.commentBtn number:topic.feed_stats.comment_count];
  [self setupButtonTitle:self.likeBtn number:topic.feed_stats.like_count];
  self.likeBtn.selected = topic.req_user_stats.like;
  
}



/**
 *  设置按钮文字
 *  @param number      按钮的数字
 *  @param placeholder 数字为0时显示的文字
 */
- (void)setupButtonTitle:(UIButton *)button number:(NSInteger)number
{
  [button setTitle:[NSString stringWithFormat:@"%zd", number] forState:UIControlStateNormal];
}


@end
