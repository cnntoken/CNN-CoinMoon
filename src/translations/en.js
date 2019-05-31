
export default {
    label_cancel: '취소',
    label_login: '로그인',
    label_submit: '확인',
    label_please_login: '로그인',
    default: '默认',
    component_tabbar: {
        feed: '홈',
        disclose: '풍문',
        mine: '내 정보',
        market: '行情'

    },
    page_main: {
        category_info: '정보',
        category_news: '뉴스',
    },
    page_mine: {
        please_login: '로그인',
        mine_page: '我的主页',
        mine_wallet: '我的钱包',
        setting: '设置',
    },
    page_register: {
        register_account: '회원가입',
        email: '이메일',
        password: '비밀번호',
        re_password: '비밀번호 재확인',
        license1: '개인정보 처리방침',
        license2: '동의',
        license3: '이용약관',
        register: '회원가입',
        go_login: '로그인',

        email_invalid: '정확한 이메일 주소를 입력하여 주세요',
        pwd_len_invalid: '비밀번호는 최소 8자리입니다',
        pwd_eq_invalid: '비밀번호가 일치하지 않습니다',

        reging_tip: '처리중입니다, 잠시만 기다려 주세요~',

        reg_ok: '회원가입 성공',
        reg_fail: '회원가입 실패',

        verifing: '인증중입니다~',

        resend_tip: '인증코드를 재전송하였습니다. 메일을 확인하여 주세요',
        username_exists: '이미 가입된 이메일입니다'


    },
    page_login: {
        email: '이메일',
        password: '비밀번호',
        login: '로그인',
        email_register: '회원가입',
        loginout_ok: '로그아웃 하였습니다',
        loginout_fail: '로그아웃 실패',
        loging: '로그인 중입니다',
        login_success: '로그인 되었습니다',
        login_fail: '로그인 실패',
        not_verify_message: '아직 인증되지 않았습니다',
        go_verify: '인증하기',
        notice:'알림',
    },
    page_verify: {
        email_verify: '이메일 인증',
        email_verify_text: '{{email}}로 인증코드가 전송됩니다',
        email_verify_send: '인증코드 전송',
        code_input: '메일 인증',
        code_input_placeholder: '인증코드 입력',
        register_success: '회원가입 성공',
        go_login: '로그인하기',

        verifing: '메일 인증중입니다, 잠시만 기다려 주세요~',

        verify_modal_tip: '입력한 이메일 주소로 인증 코드를 확인하고 입력하여 주세요',

        verify_fail: '인증 실패',


    },
    page_news_detail: {
        from: '출처'
    },
    page_market_list:{
        category_mine: '즐겨찾기',
        category_all: '코인명'
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
        title: '풍문',
        no_data_tip: '데이터가 없습니다',
        publish: '등록',
        cancel: '취소',
        publish_input_tip: '이미지 파일 9개 첨부가능',
        publish_valid_textarea: '내용',
        list_nomore_tip: '데이터가 없습니다',
        needlogin_tip: '먼저 로그인 후 좋아요 클릭 가능합니다',
        needloginTocomment: '먼저 로그인 후 댓글을 남길 수 있습니다',

        // 爆料列表页面
        footerRefreshingText: '로딩중...',
        footerFailureText: '로딩실패ㅡ.ㅡ',
        footerNoMoreDataText: '-구분선-',
        footerEmptyDataText: '-아무것도 없네요-',


        refreshControlNormalText: '아래로 당기시면 새로고침', // 正常状态
        refreshControlPrepareText: '손을 놓으시면 로딩', // 达到临界值, 松开即可触发刷新
        refreshControlLoadingText: '로딩중', // 加载中状态

        // 爆料详情
        delete: '삭제',
        deleteOk: '삭제 성공！',
        anonymous: '익명',

        needLoginForPublish: '먼저 로그인 후 등록 가능합니다',

        publishing:'등록중...'


    },

    comment: {
        tooLong: '최대 500자 입력 가능합니다',
        isNull: '내용을 입력하여 주세요',
        publish: '등록'
    },


    //////// 新添加
    //////// 新添加
    logging: '로그인 중입니다',
    go_verify: '인증하기',
    cancel: '취소',
    login_ok: '로그인 되었습니다',
    edit_info: '프로필 편집',
    username: '닉네임',
    save: '저장',
    edit_ok: '변경되었습니다',
    exit: '로그아웃',
    confirm_logout: '로그아웃 확인',
    settting: '설정',
    account: '계정',
    logout: '로그아웃',
    allComments: '전체 댓글',
    no_comment: 'no comment',
    reply_comment: '댓글',
    like_comment: '추천',
    delete_comment: '삭제',
    loadmore_comments: '댓글 더 보기',
    delete: "삭제",
    delete_disclose_confirm: '풍문 게시글 삭제',
    delete_comment_confirm: '댓글 삭제',
    no_access_photo: '이미지를 선택하려면 이미지에 접근 권한을 부여하시길 바랍니다.',

    valid_user_isnull: '닉네임을 입력하셔야 합니다',
    tooimages:'최대한 9장 이미지 추가',
    firstEntryDisclose:'풍문 게시판에서 게시물을 올리거나 댓글을 다는 활동 등은 모두 익명으로 진행됩니다.',

    upload_fail:'업로드 실패하였습니다. 다시 시도해주세요.',



    dislike: '관심 없습니다',
    report: '신고',
    report_placeholder:'신고 사유 선택 (허위 신고시 차단될 수 있습니다.)',
    report_submit:'제출',
    report_ok:'제출하였습니다.',

    publish_fail: '전송 실패, 다시 시도해 주세요~',


    user_feedback:'문의하기',

    policy_agree_and_continue: '전부 동의하고 시작',
    policy_view_detail: '상세내용',

    disclose_not_exist_tip:'이미 삭제된 글입니다.',

    dislikeUser:'블라인드',

    // add 2019.3.25

    login_input_phone_tip: '전화번호 입력해주세요',
    login_phone_msg_code: '인증번호',

    phone_invalid_tip: '전화번호가 맞지 않습니다.',
    code_invalid_tip: '인증번호가 맞지 않습니다.',
    get_phone_code_tip: '인증번호 받기',
    send_sms_ok: '인증번호 발송하였습니다.',
    send_sms_fail: '인증번호 발송 실패하였습니다. 다시 시도해 주세요.',
    // 选择区号
    select_phone_area: '국제번호 선택',

    // 用户名太长
    name_too_long: '입력하신 닉네임 너무 깁니다.',
    // 网络错误
    net_error: '네트워크 연결 오류',
    // 取消
    confirm: '확인',
    // 选择区号
    plsSelect: '국제번호 선택',
    // 置顶
    topping:'Top'
}
