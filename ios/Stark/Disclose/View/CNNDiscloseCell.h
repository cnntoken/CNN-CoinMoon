//
//  CNNDiscloseCell.h
//  Stark
//
//  Created by float.. on 2019/5/20.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "CNNTopicCell.h"


@class CNNDiscloseTopic;
NS_ASSUME_NONNULL_BEGIN

@interface CNNDiscloseCell : UITableViewCell

@property (nonatomic, strong) CNNDiscloseTopic *topic;

@property (nonatomic, weak) id<CNNTopicCellDelegate> delegate;
@end

NS_ASSUME_NONNULL_END
