//
//  CNNUser.h
//  Stark
//
//  Created by float.. on 2019/5/8.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/*
 
 {
 "account_type": "sms",
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjI3NzQiLCJhY2NvdW50X3R5cGUiOiJzbXMiLCJ1c2VyX2lkIjoiMjc3NCIsImV4cCI6MTUyNTM1Njk1OX0.1AwPMX7iZqZ3dMQAaUtcuZFCTNFJX_1x3_IdHnGZQ1Q",
 id": 2774,
 "username": "2507",
 "announcement": "sharemax, gogo",
 "user_id": 2774,
 "name": "phil0088",
 "privacy": 0,
 "eighteen": true,
 "phone": "18515668400",
 "birthday": "",
 "avatar": "http://img.newsdog.today/thumb_mid_a4e58cfa8b7d6ee4e75ddd6f1bc06289"
 "address": "用户地址",
 "post_count": 123
 }
 
 */
@interface CNNUser : NSObject

@property (nonatomic, assign) long id;
@property (nonatomic, assign) long user_id;
@property (nonatomic, assign) int privacy;
@property (nonatomic, assign) long post_count;

@property (nonatomic, assign) BOOL eighteen;

@property (nonatomic, copy) NSString *account_type;

@property (nonatomic, copy) NSString *token;

@property (nonatomic, copy) NSString *username;
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *announcement;

@property (nonatomic, copy) NSString *phone;
@property (nonatomic, copy) NSString *birthday;
@property (nonatomic, copy) NSString *avatar;
@property (nonatomic, copy) NSString *address;

@property (nonatomic, copy) NSString *anonymous_name;


- (BOOL) isLogin;
- (BOOL) isSelf;

- (NSString *)getAnonymousAvatar;

@end

NS_ASSUME_NONNULL_END
