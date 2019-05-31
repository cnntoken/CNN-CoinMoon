//
//  FEDevTableViewController.m
//  Stark
//
//  Created by float.. on 2019/5/11.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "FEDevTableViewController.h"
#import "CNNRNBridgeManage.h"
#import "CNNBundle.h"

@interface FEDevTableViewController ()

@property (nonatomic, strong) NSArray *dataArr;

@end

@implementation FEDevTableViewController


static NSString *const reuseIdentifier = @"fe_cell_reuseIdentifier";


#ifdef DEBUG
- (NSArray *)dataArr{
  if(!_dataArr){
    _dataArr = [[CNNRNBridgeManage shareManage] getRNBundleArray];
  }
  return _dataArr;
}
#endif


- (void)viewDidLoad {
    [super viewDidLoad];
//  [self.tableView registerClass:[UITableViewCell class] forCellReuseIdentifier:reuseIdentifier];
  self.tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];;
    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
    
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
}

#pragma mark - Table view data source


- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.dataArr.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
   UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:reuseIdentifier];
    if(!cell){
      cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:reuseIdentifier];
    }
    CNNBundle *bundle = self.dataArr[indexPath.row];
    cell.textLabel.text = [NSString stringWithFormat:@"%@-%@", bundle.moduleName, bundle.type];
    cell.detailTextLabel.text = bundle.bundleName;
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
  CNNBundle *bundle = self.dataArr[indexPath.row];
  UIViewController *vc = [[UIViewController alloc] init];
  vc.view.backgroundColor = [UIColor blueColor];
  [[CNNRNBridgeManage shareManage] openRNPageWithModule:bundle.moduleName andProperties:nil fromController:self];
}



@end
