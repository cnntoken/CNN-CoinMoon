//
//  CNNFeedViewController.m
//  Stark
//
//  Created by float.. on 2019/4/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#define TITLE_H 44
#define TITLE_MARGIN 18
#define TITLE_CONTENT_MARGIN 16

#import "CNNFeedViewController.h"
#import "CNNNewsViewController.h"
#import "CNNInfoViewController.h"
#import "CNNTitleButton.h"

@interface CNNFeedViewController ()<UIScrollViewDelegate>

/*主列表滚动区 */
@property (nonatomic, weak) UIScrollView *scrollView;

/*title列表滚动区 */
@property (nonatomic, weak) UIView *titlesView;

/** 上一次点击的标题按钮 */
@property (nonatomic, weak) CNNTitleButton *previousClickedTitleButton;

@end

@implementation CNNFeedViewController

- (void)loadView{
  [super loadView];
  self.view.backgroundColor = [UIColor whiteColor];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // 初始化子控制器
    [self setupAllChildVcs];
    // 标题栏
    [self setupTitlesView];
    // scrollView
    [self setupScrollView];
    // 添加第0个子控制器的view
    [self addChildVcViewIntoScrollView:0];
    [self dealTitleButtonClick:nil];
}

- (void)viewWillAppear:(BOOL)animated{
  
  [super viewWillAppear:animated];
  
  [self.navigationController setNavigationBarHidden:YES];
  
  [self setStatusBarBackgroundColor];
  
}
#pragma mark - 初始化子控制器
- (void)setupAllChildVcs{
  [self addChildViewController:[[CNNInfoViewController alloc] init]];
  [self addChildViewController:[[CNNNewsViewController alloc] init]];
}

#pragma mark - 设置主列表滚动区
- (void)setupScrollView{
  // 不允许自动修改UIScrollView的内边距
//  self.automaticallyAdjustsScrollViewInsets = NO;
  UIScrollView *scrollView = [[UIScrollView alloc] init];
//  scrollView.backgroundColor = [UIColor blueColor];
  CGRect frame = self.view.bounds;
  scrollView.frame = frame;
  scrollView.delegate = self;
  scrollView.showsHorizontalScrollIndicator = NO;
  scrollView.showsVerticalScrollIndicator = NO;
  scrollView.pagingEnabled = YES;
  //  scrollView.scrollsToTop = NO; // 点击状态栏的时候，这个scrollView不会滚动到最顶部
  [self.view addSubview:scrollView];
  self.scrollView = scrollView;
  // 添加子控制器的view
  NSUInteger count = self.childViewControllers.count;
  CGFloat scrollViewW = scrollView.size_width;
  scrollView.contentSize = CGSizeMake(count * scrollViewW, 0);
  scrollView.bounces = NO;
  [scrollView mas_makeConstraints:^(MASConstraintMaker *make) {
    make.top.equalTo(self.titlesView.bottom);
    make.bottom.equalTo(self.mas_bottomLayoutGuide);
    make.left.equalTo(self.view);
    make.right.equalTo(self.view);
  }];
}
#pragma mark - 设置title导航
- (void)setupTitlesView{
  UIView *titlesView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, CNNScreenW, TITLE_H)];
  titlesView.backgroundColor = [UIColor colorFromHexCode:CNNPrimaryColorHex];
  [self.view addSubview:titlesView];
  self.titlesView = titlesView;
  [titlesView mas_makeConstraints:^(MASConstraintMaker *make) {
      make.top.equalTo(self.mas_topLayoutGuide);
      make.left.equalTo(self.view);
      make.right.equalTo(self.view);
      make.height.equalTo(TITLE_H);
  }];
  // 标题栏按钮
  [self setupTitleButtons];
}

/**
 *  标题栏按钮
 */
- (void)setupTitleButtons
{
  // 文字
  NSArray *titles = @[CNNLOCALIZE(@"category_info"), CNNLOCALIZE(@"category_news")];
  NSUInteger count = titles.count;
  // 创建标题按钮
  for (NSInteger i = 0; i < count; i++) {
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
    btn.tag = i;
    [btn setTitleColor:[UIColor colorFromHexCode:@"#fff"] forState:UIControlStateNormal];
    [btn setTitle:titles[i] forState:UIControlStateNormal];
    UIFont *font = [UIFont systemFontOfSize:16];
    btn.titleLabel.font = font;
    btn.frame = CGRectMake(TITLE_CONTENT_MARGIN, 0, 0, TITLE_H);
    [btn sizeToFit];
    if(i>0){
      CGRect previousFrame = _titlesView.subviews[i-1].frame;
      CGPoint point = CGPointMake(previousFrame.origin.x + previousFrame.size.width + TITLE_MARGIN, 0);
      CGRect currentFrame = btn.frame;
      currentFrame.origin = point;
      btn.frame = currentFrame;
    }
    [self.titlesView addSubview:btn];
    [btn addTarget:self action:@selector(titleButtonClick:) forControlEvents:UIControlEventTouchUpInside];
  }
}

#pragma mark - 监听
/**
 *  点击标题按钮
 */
- (void)titleButtonClick: (CNNTitleButton *)titleButton{
  
  // 重复点击了标题按钮
  if (self.previousClickedTitleButton == titleButton) {
    [[NSNotificationCenter defaultCenter] postNotificationName:CNNTitleButtonDidRepeatClickNotification object:nil];
  }
  
  // 处理标题按钮点击
  [self dealTitleButtonClick:titleButton];
}

/**
 *  处理标题按钮点击
 */
- (void)dealTitleButtonClick:(CNNTitleButton *)titleButton
{
  if(!titleButton){
    titleButton = self.titlesView.subviews[0];
  }
  // 切换按钮状态
  if(self.previousClickedTitleButton){
    self.previousClickedTitleButton.selected = NO;
    self.previousClickedTitleButton.titleLabel.font = [UIFont systemFontOfSize:16];
  }
  titleButton.selected = YES;
  NSUInteger index = titleButton.tag;
  
  [UIView animateWithDuration:0.2 animations:^{
    // 放大字号
    titleButton.transform = CGAffineTransformMakeScale(1.5, 1.5);
    self.previousClickedTitleButton.transform = CGAffineTransformMakeScale(1, 1);
    // 滚动scrollView
    CGFloat offsetX = self.scrollView.size_width * index;
    self.scrollView.contentOffset = CGPointMake(offsetX, self.scrollView.contentOffset.y);
  } completion:^(BOOL finished) {
    self.previousClickedTitleButton = titleButton;
    // 添加子控制器的view
    [self addChildVcViewIntoScrollView:index];
  }];
  
  // 设置index位置对应的tableView.scrollsToTop = YES， 其他都设置为NO
  for (NSUInteger i = 0; i < self.childViewControllers.count; i++) {
    UIViewController *childVc = self.childViewControllers[i];
    // 如果view还没有被创建，就不用去处理
    if (!childVc.isViewLoaded) continue;
    
    UIScrollView *scrollView = (UIScrollView *)childVc.view;
    if (![scrollView isKindOfClass:[UIScrollView class]]) continue;
    scrollView.scrollsToTop = (i == index);
  }
}

#pragma mark - <UIScrollViewDelegate>
/**
 *  当用户松开scrollView并且滑动结束时调用这个代理方法（scrollView停止滚动的时候）
 */
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
  // 求出标题按钮的索引
  NSUInteger index = scrollView.contentOffset.x / scrollView.size_width;
  
  // 点击对应的标题按钮
  CNNTitleButton *titleButton = self.titlesView.subviews[index];
  if(titleButton != _previousClickedTitleButton){
    [self dealTitleButtonClick:titleButton];
  }
}


#pragma mark - 其他
/**
 *  添加第index个子控制器的view到scrollView中
 */
- (void)addChildVcViewIntoScrollView:(NSUInteger)index
{
  UIViewController *childVc = self.childViewControllers[index];
  
  // 如果view已经被加载过，就直接返回
  if (childVc.isViewLoaded) return;
  
  // 取出index位置对应的子控制器view
  UIView *childVcView = childVc.view;
  
  // 设置子控制器view的frame
  CGFloat scrollViewW = self.scrollView.size_width;
  childVcView.frame = CGRectMake(index * scrollViewW, 0, scrollViewW, self.scrollView.size_height);
  // 添加子控制器的view到scrollView中
  [self.scrollView addSubview:childVcView];
}

- (UIStatusBarStyle)preferredStatusBarStyle{
  return  UIStatusBarStyleLightContent;
}

//设置状态栏颜色
- (void)setStatusBarBackgroundColor{
  UIView *statusBar = (UIView *)[[UIApplication sharedApplication] valueForKey:@"statusBar"];
  statusBar.backgroundColor = [UIColor colorFromHexCode:CNNPrimaryColorHex];
}

@end
