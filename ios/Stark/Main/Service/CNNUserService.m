//
//  UserService.m
//  Stark
//
//  Created by float.. on 2019/5/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNUserService.h"
#import "CNNUser.h"
#import "CNNIdentity.h"
#import "HttpService.h"
#import "CNNDeviceInfo.h"

@implementation CNNUserService{
  
  NSString *_filePath;
}
static CNNUserService *_instance;

static const long deviceNum = 0;
static NSString * const cnn_register_user_id = @"cnn_register_user_id";

+ (instancetype)allocWithZone:(struct _NSZone *)zone{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _instance = [super allocWithZone:zone];
  });
  return _instance;
}

+ (instancetype)service{
  return [[self alloc] init];
}

/*
 如果当前缓存用户没有token, 说明不是服务端生成的用户, 需要注册一个设备用户
 */
- (void)prepareIfNeed{
  if(!self.user.token){
    __weak typeof(self) weakSelf = self;
    [[HttpService service] sendRequestWithHttpMethod:HTTP_REQUEST_METHOD_POST URLPath:@"/v1/users/" parameters:@{@"source":@"ios",@"source_uid": [CNNDeviceInfo shareInfo].uuid} completionHandler:^(id  _Nonnull data, NSError * _Nonnull error) {
          if(!error){
            CNNLog(@"%@",data);
            CNNUser *user = [CNNUser mj_objectWithKeyValues:data];
            [weakSelf updateUser:user];
          }
    }];
  }
}

- (CNNUser *)user{
  if(!_user){
    NSInteger id = [[NSUserDefaults standardUserDefaults] integerForKey: cnn_register_user_id];
    _user = [self loadUserWithUserId: id];
  }
  return _user;
}

- (CNNIdentity *)identity{
  _identity = [DataCache loadCache:@"CNNIdentityLocalCache"];
  if(!_identity){
    _identity = [CNNIdentity new];
  }
  return _identity;
}

- (NSString *)archivePathWithUserId: (NSInteger)id{
  NSString *libraryPath = [NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) firstObject];
  NSString *path = [libraryPath stringByAppendingPathComponent:[NSString stringWithFormat:@"u_%ld.data", id]];
  CNNLog(@"archive path : %@", path);
  return path;
}

#pragma mark -- User

- (void)updateUser:(CNNUser *)user{
  _user = user;
  [NSKeyedArchiver archiveRootObject:user toFile:[self archivePathWithUserId:user.id]];
  [[NSUserDefaults standardUserDefaults] setInteger:user.id forKey:cnn_register_user_id];
  [[NSUserDefaults standardUserDefaults] synchronize];
}


- (void)updateUserWithDict:(NSDictionary *)dict{
  CNNUser *user = [CNNUser mj_objectWithKeyValues:dict];
  [self updateUser:user];
}

- (CNNUser *)loadUserWithUserId:(NSInteger)id{
  NSString *archivePath =[self archivePathWithUserId:id];
  if([[NSFileManager defaultManager] fileExistsAtPath:archivePath]){
    _user = [NSKeyedUnarchiver unarchiveObjectWithFile:archivePath];
  }else {
    _user = [CNNUser new];
  }
  return _user;
}

- (BOOL) removeCurrentUser{
  if(!_user.id){
    return YES;
  }
  //删除文件
  NSString *archivePath =[self archivePathWithUserId:_user.id];
  if([[NSFileManager defaultManager] fileExistsAtPath:archivePath]){
    [[NSFileManager defaultManager] removeItemAtPath:archivePath error:nil];
  }
  _user = nil;
  return YES;
}

- (NSDictionary *)currentUserDict{
  CNNUser *user = self.user;
  return [user mj_keyValues];
}

- (void)saveIdentity{
  [DataCache setCache:_identity forKey:@"CNNIdentityLocalCache"];
}

@end
