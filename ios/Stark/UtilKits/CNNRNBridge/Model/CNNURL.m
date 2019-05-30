//
//  CNNURL.m
//  Stark
//
//  Created by float.. on 2019/5/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNURL.h"





//work目录
#define kDocumentDir    [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0]

#define kWebappDirPrefixName @"webapp_work"

#define kWebAppDirName [kWebappDirPrefixName stringByAppendingFormat:@"_%@", getAppVersion()]
#define kWebAppDirPath  [kDocumentDir stringByAppendingFormat:@"/%@/",kWebAppDirName]

//const
#define kDefaultCNNUnbundleMainModuleName   @"CNNApp"
#define kCNNCommonJsBundleDirName           @"rn_common"
#define kCNNCommonJsBundleFileName          @"common_ios.js"

#define kCNNModuleName      @"CNNModuleName="
#define kCNNModuleType      @"CNNType=1"

//Notifications
#define kCNNViewDidCreateNotification       @"kCNNViewDidCreateNotification"
#define kCNNViewDidReleasedNotification     @"kCNNViewDidReleasedNotification"


#define kCNNStartLoadEvent                  @"CNNStartLoadEvent"
#define kCNNLoadSuccessEvent                @"CNNLoadSuccessEvent"
#define kCNNPageRenderSuccess               @"CNNPageRenderSuccess"

#define CNNViewLoadFailedNotification       @"CNNViewLoadFailedNotification"
#define CNNViewDidRenderSuccess             @"CNNViewDidRenderSuccess"




#define kDocRNBundleFlag    @"/doc/"  //放到设备documents目录可用
#define kAbsRNBundleFlag    @"/abs/"  //本地测试可用
#define kUnbundleFileName   @"_cnn_unbundle"

@interface CNNURL()

@property (nonatomic, copy) NSString *fileAbsolutePath;
@property (nonatomic, copy)  NSString *moduleName;
@property (nonatomic, copy)  NSString *title;
@property (nonatomic, strong) NSURL *bundleURL;
@property (nonatomic, copy) NSString *inRelativeURLStr;
@property (nonatomic, strong) NSString *unBundleFilePath;
@property (nonatomic, strong) NSString *productName;

@end

@implementation CNNURL


+ (NSURL *)commonJSURL{
  return [NSURL fileURLWithPath:[self commonJSPath]];
}

+ (NSString *)commonJSPath{
  NSString *documentDir = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
  return [documentDir stringByAppendingFormat: @"%@/%@", kCNNCommonJsBundleDirName, kCNNCommonJsBundleFileName];
}


- (BOOL)isUnbundleRNURL {
  [self readUnbundleFilePathIfNeed];
  return self.unBundleFilePath.length > 0;
}

- (NSString *)unBundleWorkDir {
  return [self.fileAbsolutePath stringByDeletingLastPathComponent];
}

- (instancetype)initWithPath:(NSString *)urlPath{
//  if(self = [super init]){
//    self.inRelativeURLStr = urlPath;
//    if ([urlPath.lowercaseString hasPrefix:@"http"] || [urlPath.lowercaseString hasPrefix:@"file:"]) {
//      self.fileAbsolutePath = urlPath;
//      self.bundleURL = [NSURL URLWithString:urlPath];
//
//    }else if ([urlPath hasPrefix:@"/"]) {
//
//      NSRange paramRange = [urlPath rangeOfString:@"?"];
//      if (paramRange.location != NSNotFound) {
//        self.fileAbsolutePath = [urlPath substringToIndex:paramRange.location];
//        if ([urlPath hasPrefix:kDocRNBundleFlag]) {
//          self.fileAbsolutePath = [self.fileAbsolutePath substringFromIndex:kDocRNBundleFlag.length];
//          self.fileAbsolutePath = [kDocumentDir stringByAppendingPathComponent:self.fileAbsolutePath];
//        }else if ([urlPath hasPrefix:kAbsRNBundleFlag]) {
//          self.fileAbsolutePath = [self.fileAbsolutePath substringFromIndex:kAbsRNBundleFlag.length];
//        }else {
//          self.fileAbsolutePath = [kWebAppDirPath stringByAppendingPathComponent:self.fileAbsolutePath];
//        }
//
//        NSString *queryString = [urlPath substringFromIndex:paramRange.location];
//        self.bundleURL = [NSURL fileURLWithPath:self.fileAbsolutePath];
//        NSString *urlStr = [self.bundleURL.absoluteString stringByAppendingString:[queryString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
//        self.bundleURL = [NSURL URLWithString:urlStr];
//      }
//
//      //read unbundle file path
//      {
//        [self readUnbundleFilePathIfNeed];
////        self.productName = [CRNUtils getPackageNameFromURLString:self.fileAbsolutePath];
//      }
//
//    }
//  }
  return [super init];
}

- (void)readUnbundleFilePathIfNeed {
  if (self.unBundleFilePath == nil) {
    NSString *unBundlFilePath = [[self.fileAbsolutePath stringByDeletingLastPathComponent]
                                 stringByAppendingPathComponent:kUnbundleFileName];
    if (access([unBundlFilePath UTF8String], 0) == 0) {
      self.unBundleFilePath = unBundlFilePath;
    }
  }
}

- (NSString *)rnFilePath {
  return self.fileAbsolutePath;
}

- (NSString *)rnModuleName {
  return self.moduleName;
}

- (NSURL *)rnBundleURL {
  return self.bundleURL;
}

- (NSString *)rnTitle {
  return self.title;
}

- (NSString *)packageName {
  return self.productName;
}

@end
