//
//  CNNDisclose.m
//  Stark
//
//  Created by float.. on 2019/5/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNDiscloseTopic.h"

@implementation CNNDiscloseTopic

+ (instancetype)topicWithDict:(NSDictionary *)dict{
  
  return [CNNDiscloseTopic mj_objectWithKeyValues:dict];
  
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
  CGFloat imageHeight = (CNNScreenW - 16 - 52 - 10)/3;
  CGFloat imagrMarginBottom = 10;
  CGFloat toolBarHeight = 39;
  
  //唯一不确定的是title的高度
  CGFloat titleWidth = CNNScreenW - 16 - 52;
  // baseInfo 的高度
  _cellHeight += infoHeight;
  // title的高度
  CGSize textMaxSize = CGSizeMake(titleWidth, MAXFLOAT);
  
  _cellHeight += titleMarginTop + [self.attributeTitle boundingRectWithSize:textMaxSize options:NSStringDrawingUsesLineFragmentOrigin context:nil].size.height + titleMarginBottom;
  
  // 如果有图片
  if(self.images && self.images.count > 0){
    NSInteger rowCount = self.images.count % 3 == 0 ? self.images.count / 3 : self.images.count / 3 + 1;
    _cellHeight += rowCount * imageHeight + (rowCount - 1) * 5 + imagrMarginBottom;
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
  return attrString;
}


@end
