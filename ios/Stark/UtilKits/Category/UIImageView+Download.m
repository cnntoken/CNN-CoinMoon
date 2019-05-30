

//
//  UIImage+Download.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "UIImageView+Download.h"
#import <AFNetworkReachabilityManager.h>
#import <UIImageView+WebCache.h>
#import "SDImageCache.h"

@implementation UIImageView (Download)

-(void)cnn_setOriginImage:(NSString *)originImageURL thumbnailImage:(NSString *)thumbnailImageURL placeholder:(UIImage *)placeholder completed:(SDExternalCompletionBlock)completedBlock{
  // 根据网络状态来加载图片
  AFNetworkReachabilityManager *mgr = [AFNetworkReachabilityManager sharedManager];
  
  // 获得原图（SDWebImage的图片缓存是用图片的url字符串作为key）
  UIImage *originImage = [[SDImageCache sharedImageCache] imageFromDiskCacheForKey:originImageURL];
  if (originImage) { // 原图已经被下载过
    [self sd_setImageWithURL:[NSURL URLWithString:originImageURL] placeholderImage:placeholder completed:completedBlock];
  } else { // 原图并未下载过
    if (mgr.isReachableViaWiFi) {
      [self sd_setImageWithURL:[NSURL URLWithString:originImageURL] placeholderImage:placeholder completed:completedBlock];
    } else if (mgr.isReachableViaWWAN) {
      // 3G\4G网络下时候要下载原图
      BOOL downloadOriginImageWhen3GOr4G = YES;
      if (downloadOriginImageWhen3GOr4G) {
        [self sd_setImageWithURL:[NSURL URLWithString:originImageURL] placeholderImage:placeholder completed:completedBlock];
      } else {
        [self sd_setImageWithURL:[NSURL URLWithString:thumbnailImageURL] placeholderImage:placeholder completed:completedBlock];
      }
    } else { // 没有可用网络
      UIImage *thumbnailImage = [[SDImageCache sharedImageCache] imageFromDiskCacheForKey:thumbnailImageURL];
      if (thumbnailImage) { // 缩略图已经被下载过
        [self sd_setImageWithURL:[NSURL URLWithString:thumbnailImageURL] placeholderImage:placeholder completed:completedBlock];
      } else { // 没有下载过任何图片
        // 占位图片;
        [self sd_setImageWithURL:nil placeholderImage:placeholder completed:completedBlock];
      }
    }
  }
  
}

-(void)cnn_setHeader:(NSString *)headerUrl{
  UIImage *placeholder = [UIImage cnn_circleImageNamed:@"avatar_default"];
  [self sd_setImageWithURL:[NSURL URLWithString:headerUrl] placeholderImage:placeholder options:0 completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, NSURL *imageURL) {
    // 图片下载失败，直接返回，按照它的默认做法
    if (!image) return;
    
    self.image = [image cnn_circleImage];
  }];
  
}

- (void)downloadImage:(NSString *)imageUrl placehoder:(UIImage *)placeholder complete:(SDExternalCompletionBlock)completedBlock{
  
    [self sd_setImageWithURL:[NSURL URLWithString:imageUrl] placeholderImage:placeholder completed:completedBlock];
}

- (void)cnn_setRemoteUrl:(NSString *)remoteUrl{
  [self sd_setImageWithURL:[NSURL URLWithString:remoteUrl] placeholderImage:nil completed:nil];
}

@end
