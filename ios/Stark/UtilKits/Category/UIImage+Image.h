//
//  UIImage+Image.h
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIImage (Image)
+ (instancetype)imageOriginalWithName:(NSString *)imageName;

- (instancetype)cnn_circleImage;

+ (instancetype)cnn_circleImageNamed:(NSString *)name;

+ (instancetype)imageWithColor:(UIColor *)color AndSize:(CGSize)size;
@end

NS_ASSUME_NONNULL_END
