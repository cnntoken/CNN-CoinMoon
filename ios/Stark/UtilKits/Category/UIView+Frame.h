//
//  UIView+Frame.h
//  Stark
//
//  Created by float.. on 2019/4/28.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIView (Frame)



@property CGFloat size_width;
@property CGFloat size_height;
@property CGFloat origin_x;
@property CGFloat origin_y;
@property CGFloat center_x;
@property CGFloat center_y;

+(instancetype)viewFromNib;

+(CGSize)calculateLabelHeight:(UILabel *)label lableWidth:(CGFloat)width;
@end

NS_ASSUME_NONNULL_END
