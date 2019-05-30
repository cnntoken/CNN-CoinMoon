//
//  feedStats.h
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CNNFeedStats : NSObject


@property (nonatomic, assign) NSInteger view_count;
@property (nonatomic, assign) NSInteger like_count;
@property (nonatomic, assign) NSInteger dislike_count;
@property (nonatomic, assign) NSInteger comment_count;


@end

NS_ASSUME_NONNULL_END
