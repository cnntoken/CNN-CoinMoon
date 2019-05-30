//
//  CNNUser.m
//  Stark
//
//  Created by float.. on 2019/5/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNUser.h"
#import "CNNUserService.h"

@interface CNNUser ()
@property (nonatomic, copy) NSString *anonymousAvatar;
@end

@implementation CNNUser
MJExtensionCodingImplementation

-(NSString *)anonymous_name{
  return CNNLOCALIZE(@"anonymous");
}

- (BOOL)isLogin{
  if(self.id){
    return !([self.account_type isEqualToString:@"android"]  ||  [self.account_type isEqualToString:@"ios"]);
  }
  return NO;
}

- (BOOL)isSelf{
  if(self.id){
    return [CNNUserService service].user.id == self.id;
  }
  return NO;
}
- (NSString *)getAnonymousAvatar{
  if(!_anonymousAvatar){
    NSString *uid = [[NSNumber numberWithInteger:self.user_id] stringValue];
    NSArray *arr = [uid componentsSeparatedByString:@""];
    __block NSInteger total = 0;
    [arr enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      total += [(NSString *)obj integerValue];
    }];
    _anonymousAvatar = [NSString stringWithFormat:@"avatar_%ld", (total%5 + 1)];
  }
  return _anonymousAvatar;
}

@end
