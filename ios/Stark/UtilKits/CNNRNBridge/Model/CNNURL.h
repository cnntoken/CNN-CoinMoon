//
//  CNNURL.h
//  Stark
//
//  Created by float.. on 2019/5/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CNNURL : NSObject

+ (NSURL *)commonJSURL;

+ (NSString *)commonJSPath;

@property (nonatomic, readonly) NSString *rnFilePath;
@property (nonatomic, readonly)  NSString *rnModuleName;
@property (nonatomic, readonly) NSURL *rnBundleURL;
@property (nonatomic, readonly) NSString *rnTitle;

//是否unbundle
@property (nonatomic, readonly) BOOL isUnbundleRNURL;
@property (nonatomic, readonly) NSString *unBundleWorkDir;

@property (nonatomic, readonly) NSString *packageName;

- (instancetype)initWithPath:(NSString *)urlPath;

- (void)readUnbundleFilePathIfNeed;

@end

NS_ASSUME_NONNULL_END
