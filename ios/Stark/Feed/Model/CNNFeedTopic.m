//
//  CNNFeedTopic.m
//  Stark
//
//  Created by float.. on 2019/5/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNFeedTopic.h"
#import "NSDate+Format.h"

@implementation CNNFeedTopic
+ (NSString *)stringWithType:(CNNTopicType)type{
  switch (type) {
    case CNNTopicTypeInfo:
      return @"info";
    case CNNTopicTypeNews:
      return @"news";
    case CNNTopicTypeDisclose:
      return @"disclose";
    default:
      break;
  }
  return @"";
}
/*
 如果错误信息里面包含了：NaN，一般都是因为除0造成（比如x/0）
 (NaN : Not a number）
 */

- (CGFloat)cellHeight
{
  // 如果已经计算过，就直接返回
  if (_cellHeight) return _cellHeight;
  CGFloat infoHeight = 30; // info label
  CGFloat titleMarginTop = 4;
  CGFloat titleMarginBottom = 10;
  CGFloat coverHeight = 160;
  CGFloat toolBarHeight = 39;
  
  //唯一不确定的是title的高度
  CGFloat titleWidth = CNNScreenW - 2*16 - 6 - 30;
  // baseInfo 的高度
  _cellHeight += infoHeight;
  // title的高度
  CGSize textMaxSize = CGSizeMake(titleWidth, MAXFLOAT);
  _cellHeight += titleMarginTop + [self.attributeTitle boundingRectWithSize:textMaxSize options:NSStringDrawingUsesLineFragmentOrigin context:nil].size.height + titleMarginBottom;
  // 如果有封面
  if(self.cover && self.cover.length > 0){
    _cellHeight += coverHeight;
  }
  // 工具条
  _cellHeight += toolBarHeight;
  
  return _cellHeight;
}



- (NSAttributedString *)attributeTitle{
  if(_attributeTitle){
    return _attributeTitle;
  }
  NSDictionary *attrDict = @{NSFontAttributeName: [UIFont systemFontOfSize:14], NSForegroundColorAttributeName: [UIColor colorFromHexCode:@"#333"]};
  NSMutableAttributedString *attrString = [[NSMutableAttributedString alloc] initWithString:_title];
  [attrString addAttributes:attrDict range:NSMakeRange(0, _title.length)];
  if(self.is_sticky){
    NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
    paragraphStyle.firstLineHeadIndent = 30.f;
    [attrString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:NSMakeRange(0, _title.length)];
  }
  
  return attrString;
}

@end
