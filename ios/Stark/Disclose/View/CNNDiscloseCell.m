//
//  CNNDiscloseCell.m
//  Stark
//
//  Created by float.. on 2019/5/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNDiscloseCell.h"
#import "CNNDiscloseTopic.h"

#define discloseImageMargin 5

@interface CNNDiscloseCell ()
@property (weak, nonatomic) IBOutlet UIImageView *avatarView;
@property (weak, nonatomic) IBOutlet UILabel *nameLabel;
@property (weak, nonatomic) IBOutlet UIButton *timeBtn;
@property (weak, nonatomic) IBOutlet UIButton *moreBtn;
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UIView *imageContentView;
@property (weak, nonatomic) IBOutlet UIButton *viewBtn;
@property (weak, nonatomic) IBOutlet UIButton *commentBtn;
@property (weak, nonatomic) IBOutlet UIButton *likeBtn;

@property (nonatomic, strong) NSArray *imagesArray;


@property (nonatomic, strong) NSArray *imagecontentConstraints;
@end

@implementation CNNDiscloseCell

- (void)awakeFromNib {
    [super awakeFromNib];
    self.selectionStyle = UITableViewCellSelectionStyleNone;
    [self.timeBtn setTitleColor:[UIColor colorFromHexCode:@"#666"] forState:UIControlStateNormal];
    self.avatarView.contentMode = UIViewContentModeScaleAspectFill;
    [self.viewBtn setTitleColor:[UIColor colorFromHexCode:@"#666"] forState:UIControlStateNormal];
    [self.commentBtn setTitleColor:[UIColor colorFromHexCode:@"#666"] forState:UIControlStateNormal];
    [self.likeBtn setTitleColor:[UIColor colorFromHexCode:@"#666"] forState:UIControlStateNormal];
    // Initialization code
    [self addImageView];// 添加9宫格图片
    //按钮添加点击事件
    [self addClickEvent];
}


- (void)addImageView{
  NSMutableArray<UIImageView *> *tempArray = [NSMutableArray array];
  for(int i = 0; i<9; i++){
    UIImageView *imageView = [UIImageView new];
    imageView.hidden = YES;
    imageView.layer.cornerRadius = 5;
    imageView.contentMode = UIViewContentModeScaleAspectFill;
    imageView.backgroundColor = [UIColor colorFromHexCode:@"#fafafa"];
    [imageView setClipsToBounds:YES];
    [self.imageContentView addSubview:imageView];
    [tempArray addObject:imageView];
  }
  _imagesArray = tempArray;
}

- (void)addClickEvent{
  // 点击viewBtn的时候直接跳转 不做处理
  _viewBtn.userInteractionEnabled = NO;
  [_moreBtn addTarget:self action:@selector(onBtnClick:) forControlEvents:UIControlEventTouchUpInside];
  [_commentBtn addTarget:self action:@selector(onBtnClick:) forControlEvents:UIControlEventTouchUpInside];
  [_likeBtn addTarget:self action:@selector(onBtnClick:) forControlEvents:UIControlEventTouchUpInside];
  
  //点击头像 跳转到个人详情
//  UIGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(onAvatarTap:)];
//  [_avatarView addGestureRecognizer:tap];
//  _avatarView.userInteractionEnabled = YES;
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


- (void)setTopic:(CNNDiscloseTopic *)topic
{
  _topic = topic;
  
  // 顶部控件的数据
  self.avatarView.image = [UIImage imageNamed:[topic.user getAnonymousAvatar]];
  self.nameLabel.text = topic.user.anonymous_name;
  self.titleLabel.attributedText = topic.attributeTitle;
  [self.timeBtn setTitle:topic.format_created_at forState:UIControlStateNormal];
  
  // 底部按钮的文字
  [self setupButtonTitle:self.viewBtn number:topic.disclose_stats.view_count];
  [self setupButtonTitle:self.commentBtn number:topic.disclose_stats.comment_count];
  [self setupButtonTitle:self.likeBtn number:topic.disclose_stats.like_count];
  self.likeBtn.selected = topic.req_user_stats.like;
  
  
  // 设置9宫格数据
  NSInteger count = topic.images.count;
  CGFloat discloseIimageWidth = [self calculateImageWidth];
  CGFloat imageContentHeight = 0.f;
  CGFloat imageContentMarginTop = 10.f;
  if(count){
    for(NSInteger i = 0; i < 9; i++){
      UIImageView *imagev = self.imagesArray[i];
      if(i >= count){
        imagev.hidden = YES;
        imagev.image = nil;
        continue;
      }
      NSInteger rowNum = i / 3;
      NSInteger colNum = i % 3;
      CGFloat imageX = colNum * (discloseIimageWidth + discloseImageMargin);
      CGFloat imageY = rowNum * (discloseIimageWidth + discloseImageMargin);
      CGRect frame = CGRectMake(imageX, imageY, discloseIimageWidth, discloseIimageWidth);
      [imagev sd_setImageWithURL:[NSURL URLWithString:topic.images[i]] placeholderImage:nil];
      imagev.frame = frame;
      imagev.hidden = NO;
      imageContentHeight = imageY + discloseIimageWidth;
    }
    self.imageContentView.hidden = NO;
    self.imageContentView.size_height = imageContentHeight;

  }else{
    imageContentMarginTop = 0.f;
    self.imageContentView.hidden = YES;
  }
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


- (CGFloat)calculateImageWidth{
  return (CNNScreenW - 16 - 52 - 10)/3;
}

@end
