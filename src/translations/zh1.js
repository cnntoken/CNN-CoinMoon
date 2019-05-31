// import i18n from "../i18n";

export default {
    label_cancel: '取消',
    label_login: '登录',
    label_submit: '提交',
    label_please_login: '请登录',
    default: '默认',
    component_tabbar: {
        feed: '资讯',
        disclose: '爆料',
        mine: '我'
    },
    page_main: {
        category_info: '信息',
        category_news: '新闻',
    },
    page_mine: {
        please_login: '请登录',
        mine_page: '我的主页',
        mine_wallet: '我的钱包',
        setting: '设置',
    },
    page_register: {
        register_account: '注册账户',
        email: '请输入邮箱地址',
        password: '请输入密码',
        re_password: '请再次输入密码',
        license: '点击注册自动同意各项隐私政策',
        license_link: '隐私政策',
        register: '注 册',
        go_login: '已有账号，去登录',

        email_invalid: '邮箱格式不对',
        pwd_len_invalid: '密码不能少于8位',
        pwd_eq_invalid: '密码不一致',

        reging_tip: '正在提交, 请稍后!',

        reg_ok: '注册成功',
        reg_fail: '注册失败',

        verifing: '验证中！',

        resend_tip: '已经重新发送验证码, 请查看邮箱'


    },
    page_login: {
        email: '邮箱',
        password: '密码',
        login: '登录',
        email_register: '邮箱注册',
        loginout_ok: 'logout ok',
        loginout_fail: 'logout fail',

        loging: '正在登录,请稍后',
        login_success: '登录成功',
        login_fail: '登录失败',
        not_verify_message: '您还没有验证',
        go_verify: '去验证'
    },
    page_verify: {
        email_verify: '验证邮箱',
        email_verify_text: '点击发送验证码按钮，我们将向您的邮箱 {{email}} 发送验证邮件',
        email_verify_send: '发送验证码',
        code_input: '请输入验证码',
        code_input_placeholder: '请输入验证码',
        register_success: '注册成功',
        go_login: '去登录',

        verifing: '正在验证邮箱, 请稍后...',

        verify_modal_tip: '已经向你的邮箱发送验证码，请输入',

        verify_fail: '验证失败',


    },
    page_wallet: {
        // 首次进入
        please_select_way: '请选择方式',
        create_wallet: '创建钱包',
        import_wallet: '导入钱包',
        // 创建
        create_tips: '密码用于加密保护私钥，以及转账调用合约等，所以强度非常重要。Coinmoon不储存密码，也无法帮您找回，请务必牢记。',
        later_backup: '稍后备份',
        backup_mnemonic: '备份助记词',
        backup_info_start: '有没妥善备份就无法保障资产安全。删除程序或钱包后，你需要备份文件来恢复钱包。',
        backup_warn: '请在四周无人，确保没有摄像头的安全环境进行备份。',
        backup_info_done: '请准确抄写并安全备份助记词。',
        confirm_mnemonic: '确认助记词',
        backup_info_confirm: '请按顺序点击助记词，以确认您的正确备份。',
        next_step: '下一步',
        done: '完成',
        create_wallet_success: '创建成功',

        // 创建成功后钱包页面
        total_assets: '总资产',
        security_reminder: '安全提醒',
        later_reminder: '稍后提醒',
        security_tips: '你的身份助记词未备份，请务必备份助记词，以用于恢复身份下钱包资产，防止忘记密码，应用删除，手机丢失等情况导致资产损失。',
        search: '搜索',

        // 导入
        import_wallet_eth: '导入ETH钱包',
        import_wallet_btc: '导入BTC钱包',
        start_import: '开始导入',
        keystore: 'keystore',
        mnemonic: '助记词',
        privateKey: '私钥',
        wallet_pwd: '钱包密码',
        select_src: '选择路径',
        setting_pwd: '设置密码',
        select_address_type: '选择地址类型',
        segwit: '隔离见证',
        ordinary: '普通',

        keystore_label: '复制粘贴以太坊官方钱包Keystore文件内容至输入框。',
        keystore_placeholder: 'Keystore文件内容',
        
        mnemonic_label: '使用助记词导入的同时可以修改钱包密码。',
        mnemonic_placeholder: '输入助记词，用空格分隔',

        privateKey_label: '输入Private Key文件内容至输入框。或通过扫描Private Key 内容生产的二维码录入。请留意大小写。',
        privateKey_placeholder: '输入明文私钥',
        
        // 交易
        all_transactions: '全部交易',
        no_transaction: '暂无交易记录',
        receipt: '收款',
        payment: '转账',

        send_eth: '发送ETH',
        send_btc: '发送BTC',
        address: '地址',
        amount: '数量',
        remark: '备注',
        miner_cost: '矿工费用',
        slow: '慢',
        medium: '中',
        fast: '快',

        payment_detail: '支付详情',
        receipt_address: '收款地址',
        payment_wallet: '付款钱包',
        money: '金额',
        confirm: '确认',
        payment_pwd: '支付密码',
        payment_address: '发款地址',
        transfer_number: '交易号',
        block: '区块',
        transfer_time: '交易时间',
        copy_receipt_address: '复制收款地址',
    },
    toast: {},
    // i18n.t('disclose.deleteOk')
    disclose: {
        title: '爆料',
        no_data_tip: 'no data !',
        publish: '发布',
        cancel: '取消',
        publish_input_tip: '最多输入9张图片',
        publish_valid_textarea: '请输入爆料内容！',
        list_nomore_tip: '没有更多数据了',
        needlogin_tip: '需要登录才能点赞',
        needloginTocomment: '需要登录才能评论',

        // 爆料列表页面
        footerRefreshingText: '玩命加载中....',
        footerFailureText: '我擦嘞，居然失败了 =.=!',
        footerNoMoreDataText: '-我是有底线的-',
        footerEmptyDataText: '-好像什么东西都没有-',

        refreshControlNormalText: '下拉刷新', // 正常状态
        refreshControlPrepareText: '松开加载', // 达到临界值, 松开即可触发刷新
        refreshControlLoadingText: '正在加载中...', // 加载中状态

        // 爆料详情
        delete: '删除',
        deleteOk: '删除成功！',
        anonymous: '匿名',

        needLoginForPublish: '需要登录才能发布',

        publishing: '发布中...'


    },

    comment: {
        tooLong: '最多只能输入1000个字符',
        isNull: '输入内容不能为空',
        publish: '发布'
    },

    //////// 新添加
    logging: '正在登录, 请稍后!',
    go_verify: '去验证',
    cancel: '取消',
    login_ok: '登陆成功',
    edit_info: '编辑信息',
    username: '用户名',
    save: '保存',
    edit_ok: '修改成功',
    exit: '退出',
    confirm_logout: '确认退出登录',
    settting: '设置',
    account: '账户',
    logout: '退出登录',
    allComments: '所有评论',
    no_comment: '暂无评论',
    reply_comment: '回复评论',
    like_comment: '赞评论',
    delete_comment: '删除评论',
    loadmore_comments: '加载更多评论',
    delete: "删除",
    delete_disclose_confirm: '是否删除该爆料',
    delete_comment_confirm: '是否删除该评论',
    no_access_photo: ' Cannot access images. Please allow access if you want to be able to select images.',
    valid_user_isnull: '用户名不能为空',
    tooimages:'最多只能添加9张图片',
    firstEntryDisclose:'您将以匿名身份在爆料区进行评论及发帖',

}
