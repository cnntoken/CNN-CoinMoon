
//
//  CNNCoinRiseTagBtn.m
//  Stark
//
//  Created by tangl on 2019/8/7.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNCoinRiseTagBtn.h"

@implementation CNNCoinRiseTagBtn

+ (instancetype)buttonWithTagName:(NSString *)tagName{
    CNNCoinRiseTagBtn *btn = [self buttonWithType:UIButtonTypeCustom];
    
    [btn setImage:[UIImage imageNamed:@"hook"] forState: UIControlStateNormal];
//    [btn setBackgroundImage:[UIImage imageWithColor:CNNCOLOR_HEX(@"#E6E6E6") AndSize:CGSizeMake(1, 1)] forState:UIControlStateSelected];
//    [btn setBackgroundImage:[UIImage imageWithColor:CNNCOLOR_HEX(@"#AAAAAA") AndSize:CGSizeMake(1, 1)] forState:UIControlStateNormal];
    [btn setTitle:tagName forState: UIControlStateNormal];
//    [btn setTitle:tagName forState: UIControlStateSelected];
//    btn.contentEdgeInsets = UIEdgeInsetsMake(0, 4, 0, 4);
    [btn setTitleColor:CNNCOLOR_HEX(@"#AAAAAA") forState:UIControlStateNormal];
    [btn setTitleColor:CNNCOLOR_HEX(@"#333333") forState:UIControlStateSelected];
    btn.titleLabel.font = [UIFont systemFontOfSize:14];
    

    btn.contentVerticalAlignment = UIControlContentVerticalAlignmentCenter;
    btn.contentHorizontalAlignment = UIControlContentVerticalAlignmentCenter;
    btn.layer.borderColor = CNNCOLOR_HEX(@"#AAAAAA").CGColor;
    btn.layer.borderWidth = 1;
    btn.layer.cornerRadius = 5;
    btn.layer.masksToBounds = YES;
    btn.size_width =[btn.titleLabel sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)].width + 24;
    btn.size_height = 27;
    
    return btn;
}

- (instancetype)initWithFrame:(CGRect)frame{

    if(self = [super initWithFrame:frame]){
        [RACObserve(self, selected) subscribeNext:^(id  _Nullable x) {
            if([x boolValue]){
                self.backgroundColor = CNNCOLOR_HEX(@"#E6E6E6");
            }else{
                self.backgroundColor = [UIColor whiteColor];
            }
        }];
    }
    return self;
}


- (void)layoutSubviews{
    [super layoutSubviews];
    self.imageView.right_x = self.size_width;
    self.imageView.origin_y = 0;
    self.imageView.hidden = !self.isSelected;
    self.titleLabel.center = CGPointMake(self.size_width/2, self.size_height/2);
}

@end
