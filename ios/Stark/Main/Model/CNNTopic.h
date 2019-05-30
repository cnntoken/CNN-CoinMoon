//
//  CNNTopic.h
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CNNUser.h"
#import "CNNFeedUserStats.h"

typedef NS_ENUM(NSInteger, CNNTopicType) {
  /** 全部 */
  CNNTopicTypeAll = 0,
  /** news */
  CNNTopicTypeNews,
  /** info */
  CNNTopicTypeInfo,
  /** disclose */
  CNNTopicTypeDisclose
};


NS_ASSUME_NONNULL_BEGIN


@interface CNNTopic : NSObject

- (BOOL)isSelf;

@property (nonatomic, copy) NSString *format_created_at;
@end

NS_ASSUME_NONNULL_END
