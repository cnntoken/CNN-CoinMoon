//
//  CNNKeychainManage.m
//  Stark
//
//  Created by float.. on 2019/5/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNKeychainManage.h"

@implementation CNNKeychainManage

// 查询
+ (id)load:(NSString *)vendor {
  id ret = nil;
  NSMutableDictionary *keychainQuery = [CNNKeychainManage getKeychainQuery:vendor];
  //Configure the search setting
  //Since in our simple case we are expecting only a single attribute to be returned (the password) we can set the attribute kSecReturnData to kCFBooleanTrue
  [keychainQuery setObject:(id)kCFBooleanTrue forKey:(__bridge id)kSecReturnData];
  [keychainQuery setValue:(__bridge id)kSecMatchLimitOne forKey:(__bridge id)kSecMatchLimit];
  
  CFDataRef keyData = NULL;
  if (SecItemCopyMatching((__bridge CFDictionaryRef)keychainQuery, (CFTypeRef *)&keyData) == noErr) {
    @try {
      ret = [NSKeyedUnarchiver unarchiveObjectWithData:(__bridge NSData *)keyData];
    }
    @catch (NSException *e) {
      NSLog(@"Unarchive of %@ failed: %@", vendor, e);
    }
    @finally {}
  }
  if (keyData) {
    CFRelease(keyData);
  }
  return ret;
}

// 增加
+ (void)save:(NSString *)vendor data:(id)data {
  //Get search dictionary
  NSMutableDictionary *keychainQuery = [CNNKeychainManage getKeychainQuery:vendor];
  //Delete old item before add new item
  SecItemDelete((__bridge CFDictionaryRef)keychainQuery);
  //Add new object to search dictionary(Attention:the data format)
  [keychainQuery setObject:[NSKeyedArchiver archivedDataWithRootObject:data] forKey:(__bridge id)kSecValueData];
  //Add item to keychain with the search dictionary
  SecItemAdd((__bridge CFDictionaryRef)keychainQuery, NULL);
}

// 删除
+ (void)delete:(NSString *)vendor {
  NSMutableDictionary *keychainQuery = [CNNKeychainManage getKeychainQuery:vendor];
  SecItemDelete((__bridge CFDictionaryRef)keychainQuery);
}

// 初始化配置
+ (NSMutableDictionary *)getKeychainQuery:(NSString *)vendor {
  return [NSMutableDictionary dictionaryWithObjectsAndKeys: (__bridge id)kSecClassGenericPassword,
          (__bridge id)kSecClass, vendor, (__bridge id)kSecAttrService, vendor, (__bridge id)kSecAttrAccount,
          (__bridge id)kSecAttrAccessibleAfterFirstUnlock, (__bridge id)kSecAttrAccessible, nil];
}
@end
