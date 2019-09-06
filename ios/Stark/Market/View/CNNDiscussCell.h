//
//  CNNDiscussCell.h
//  Stark
//
//  Created by tangl on 2019/8/2.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@class CNNDiscussComment;
NS_ASSUME_NONNULL_BEGIN



@protocol CNNDisscussCellDelegate <NSObject>
-(void)cnncomment_replycomment:(CNNDiscussComment *)comment;
-(void)cnncomment_likecomment:(CNNDiscussComment *)comment;
-(void)cnncomment_removecomment:(CNNDiscussComment *)comment;
-(void)cnncomment_more:(CNNDiscussComment *)comment;
@end

@interface CNNDiscussCell : UITableViewCell

@property (nonatomic, weak) id<CNNDisscussCellDelegate> delegate;
@property (nonatomic, strong) CNNDiscussComment *comment;

@end


@interface CNNDiscussReplyView : UIView
@property (nonatomic, strong, nullable) NSArray<CNNDiscussComment *> *replies;
@property (nonatomic, assign) CGFloat contentHeight;
@end
NS_ASSUME_NONNULL_END
