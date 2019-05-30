//
//  CNNTabBar.m
//  Stark
//
//  Created by float.. on 2019/4/28.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNTabBar.h"

@implementation CNNTabBar



// 只会调用一次
//+ (void)load
//{
//  // 获取哪个类中UITabBarItem
////  UITabBarItem *item = [UITabBarItem appearanceWhenContainedIn:self, nil];
//  
//  UITabBarItem *item =  [UITabBarItem appearanceWhenContainedInInstancesOfClasses:[NSArray arrayWithObjects:[self class], nil]];
//  // 设置按钮选中标题的颜色:富文本:描述一个文字颜色,字体,阴影,空心,图文混排
//  // 创建一个描述文本属性的字典
//  NSMutableDictionary *attrs = [NSMutableDictionary dictionary];
//  attrs[NSForegroundColorAttributeName] = [UIColor colorFromHexCode:@"#408EF5"];
//  [item setTitleTextAttributes:attrs forState:UIControlStateSelected];
//  
//  // 设置字体尺寸:只有设置正常状态下,才会有效果
//  NSMutableDictionary *attrsNor = [NSMutableDictionary dictionary];
//  attrsNor[NSFontAttributeName] = [UIFont systemFontOfSize:10];
//  attrs[NSForegroundColorAttributeName] = [UIColor colorFromHexCode:@"#666666"];
//  [item setTitleTextAttributes:attrsNor forState:UIControlStateNormal];
//}

- (instancetype)initWithFrame:(CGRect)frame{
  if(self = [super initWithFrame:frame]){
    self.barTintColor = [UIColor whiteColor];
    self.translucent = NO;
  }
  return self;
}

- (void)layoutSubviews{
  [super layoutSubviews];
  
  // 调整tabBarButton位置
//  NSInteger count = self.items.count;
//  
//  CGFloat btnW = self.size_width / count;
//  CGFloat btnH = self.size_height;
//  
//  CNNLog(@"%@",self.subviews);
//  int i = 0;
//  for (UIControl *tabBarButton in self.subviews) {
//    if([tabBarButton isKindOfClass:NSClassFromString(@"UITabBarButton")]){
//      tabBarButton.tag = i++;
//      [tabBarButton addTarget:self action:@selector(onTabBarButtonClick:) forControlEvents:UIControlEventTouchUpInside];
//    }
//  }
}
@end
