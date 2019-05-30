//
//  CNNDiscloseDialogView.h
//  Stark
//
//  Created by float.. on 2019/5/27.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>


@protocol CNNDiscloseDialogDelegate <NSObject>

-(void)onDialogOver;

@end


NS_ASSUME_NONNULL_BEGIN

@interface CNNDiscloseDialogView : UIView

@property (nonatomic, weak) id<CNNDiscloseDialogDelegate> delegate;
@end

NS_ASSUME_NONNULL_END
