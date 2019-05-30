//
//  CNNLicenseView.h
//  Stark
//
//  Created by float.. on 2019/5/25.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>


@protocol CNNLicenseDelegate <NSObject>

-(void)onLicenceDetailClick:(NSString *)type;
-(void)onLicenceAgree;

@end

NS_ASSUME_NONNULL_BEGIN

@interface CNNLicenseView : UIView

@property (nonatomic, weak) id<CNNLicenseDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
