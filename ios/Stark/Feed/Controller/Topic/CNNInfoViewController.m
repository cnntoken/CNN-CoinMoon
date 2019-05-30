//
//  CNNInfoViewController.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CNNInfoViewController.h"

@interface CNNInfoViewController ()

@end

@implementation CNNInfoViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
    
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
}

- (CNNTopicType)type{
   return CNNTopicTypeInfo;
}
@end
