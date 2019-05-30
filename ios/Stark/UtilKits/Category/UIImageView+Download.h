//
//  UIImage+Download.h
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <UIImageView+WebCache.h>


NS_ASSUME_NONNULL_BEGIN

@interface UIImageView (Download)
- (void)cnn_setOriginImage:(NSString *)originImageURL thumbnailImage:(NSString *)thumbnailImageURL placeholder:(UIImage *)placeholder completed:(SDExternalCompletionBlock)completedBlock;

- (void)cnn_setHeader:(NSString *)headerUrl;

- (void)cnn_setRemoteUrl:(NSString *)remoteUrl;

- (void)downloadImage:(NSString *)imageUrl placehoder:(UIImage *)placeholder complete:(SDExternalCompletionBlock)completedBlock;

@end

NS_ASSUME_NONNULL_END
