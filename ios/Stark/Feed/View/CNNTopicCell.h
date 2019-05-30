//
//  CNNTopicCell.h
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, CNNTopicCellAction){
  TopicCellActionLike = 1,
  TopicCellActionComment,
  TopicCellActionMore,
  TopicCellActionAvatar
};

@class CNNTopic, CNNFeedTopic, CNNTopicCell;

@protocol CNNTopicCellDelegate <NSObject>

- (void)topicCell:(UITableViewCell *_Nullable)cell onClickedWithTopic: (CNNTopic *)topic andAction:(CNNTopicCellAction)action;

@end

NS_ASSUME_NONNULL_BEGIN

@interface CNNTopicCell : UITableViewCell

/** 模型数据 */
@property (nonatomic, strong) CNNFeedTopic *topic;

@property (nonatomic, weak) id<CNNTopicCellDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
