export default {
    label_cancel: '취소',
    label_login: '로그인',
    label_submit: '확인',
    label_please_login: '로그인',
    default: '기본값',
    page_main: {
        category_info: '정보',
        category_news: '뉴스',
    },
    page_mine: {
        // 请登录
        please_login: '로그인',
        // 我的主页
        mine_page: '마이 페이지',
        // 我的钱包
        mine_wallet: '내 지갑',
        // 设置
        setting: '설정',
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
        notice: '알림',
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
    page_market_list: {
        category_mine: '즐겨찾기',
        category_all: '코인명',
        market_pair_title: '페어',
        current_price: '현재가',
        change_24h: '변동률(24h)',
        no_mine_text: '기록 없음',
        market_cap: '시사총액',
        refreshControlLoadingText: '로딩중...',
        footerRefreshingText: '로딩중...',
        footerFailureText: '로딩실패ㅡ.ㅡ',
        footerNoMoreDataText: '-구분선-',
        footerEmptyDataText: '-아무것도 없네요-',
    },
    page_market_search: {
        search_placeholder: '코인명 또는 심볼을 입력해주세요',
        search_cancle: '취소',
        no_search_res: '검색 결과가 없습니다.'
    },
    page_market_detail: {
        load_more: '댓글 더보기',
        discuss_load_more: '내용 더보기',
        coinpair_load_more: '내용 더보기',
        loading: '로딩중...',
        discuss_coin_placeholder: '토론하기',
        global_average_price: '시장평균가',
        high_price_24h: '최고(24h)',
        low_price_24h: '최저(24h)',
        volume_24h: '24시간 거래량',
        market_cap: '시가총액',
        rank: '랭킹',
        discuss_list: '인기토론',
        marketpair_list: '시장',
        reply_discuss: '댓글',
        add_collection: '즐겨찾기 추가',
        remove_collection: '즐겨찾기 삭제',
        view_all_replies: '전체 댓글 보기',
        delete_reply: '댓글 삭제',
        cancel_delete: '취소',
        publish_discuss: '등록',
        discuss_success: '토론 성공',
        exceed_limit: '내용이 너무 깁니다',
        footerRefreshingText: '로딩중...',
        footerFailureText: '로딩실패ㅡ.ㅡ',
        footerNoMoreDataText: '-구분선-',
        footerEmptyDataText: '-아무것도 없네요-',
        discussfooterNoMoreDataText: ' '

    },
    page_market_discuss_detail: {
        all_discuss: '전체 댓글',
        all_replies: '전체 댓글'
    },
    page_wallet: {
        // 首次进入
        please_select_way: '지갑관리',
        create_wallet: '새로운 지갑 만들기',
        import_wallet: '기존 지갑 불러오기',
        // 创建
        create_tips: '이 비밀번호로 모든 보안정보가 암호화 됩니다. 코인문은 이 비밀번호를 저장하지 않으므로 되찾을 때 도와 드리지 못하니 비밀번호를 분실하지 않도록 잘 메모해 주세요!',
        later_backup: '나중에 백업',
        backup_mnemonic: '니모닉 백업',
        backup_info_start: '니모닉은 자산의 유일한 키이며 소유권은 여러분 본인에게 있사오니 사용자분의 니모닉을 책임지고 보관해주십시오. 코인문은 니모닉 분실을 책임지지 않습니다. 앱이나 지갑을 삭제 후 재설치하는 경우에 니모닉 백업만으로 지갑을 회복할 수 있으니 꼭 올바른 니모닉 백업을 확인하신 뒤 진행하십시오.',
        backup_warn: '사람과 카메라 없고 안정한 환경에서 백업을 진행하십시오.',
        backup_info_done: '니모닉 단어를 정확히 베껴서 백업해주세요.',
        confirm_mnemonic: '니모닉 문구를  확인하세요',
        backup_info_confirm: '니모닉 문구를 올바른 순서대로 선택하십시오.',
        next_step: '다음',
        done: '완료',
        create_wallet_success: '생성 성공',
        create_wallet_fail: '생성 실패',

        // 创建成功后钱包页面
        total_assets: '총 자산',
        security_reminder: '안전 알림',
        later_reminder: '나중에 하기',
        security_tips: '니모닉 백업을 반드시 완성하시기 바랍니다. 만약 당신의 휴대폰 분실, 도난, 손상된 경우 니모닉은 당신의 자산을 복구하는 데에 도움이 될 겁니다.',
        search: '검색',
        add_success: '추가 완료',
        add_fail: '추가 실패',


        // 导入
        import_wallet_eth: 'ETH 지갑 불러오기',
        import_wallet_btc: 'BTC 지갑 불러오기',
        start_import: '불러오기 시작',
        keystore: '키스토어',
        mnemonic: '니모닉 코드',
        privateKey: '개인키',
        wallet_pwd: '지갑 비밀번호',
        select_src: '경로 선택',
        setting_pwd: '비밀번호 설정',
        select_address_type: '주소 종류 선택',
        segwit: 'SegWit',
        ordinary: '일반',
        complete_info: '정보를 입력해주세요',
        import_success: '불러오기 성공',
        import_fail: '불러오기 실패',

        keystore_label: '이더리움 공식 월렛의 키스토어를 복사하여 입력칸에 붙여넣으십시오.',
        keystore_placeholder: '키스토어 파일 내용',

        mnemonic_label: '니모닉 코드를 가져올 때 비밀번호를 재설정할 수 있습니다.',
        mnemonic_placeholder: '니모닉 코드를 스페이스로 구분하여 입력해주세요.',

        privateKey_label: '개인키를 입력하거나 개인키로 생성된 큐알 코드를 스캔하십시오. 대소문자 구분을 유의하세요.',
        privateKey_placeholder: '개인키를 입력해주세요.',

        // 交易
        all_transactions: '전체 거래 기록',
        no_transaction: '아직 기록이 없습니다',
        get_transaction_error: '거래 기록을 얻기 위해 실패',
        receipt: '입금',
        payment: '출금',
        insufficient_balance: '잔액이 부족합니다',
        payment_success: '거래 확인 중입니다. 잠시만 기다려주세요',
        payment_error: '전송 실패',
        amount_gte_0: '수량을 정확히 입력해주세요',
        transfer_not_confirmed: '확인되지 않은',

        send_any: '거래',
        address: '입금 주소',
        amount: '수량',
        remark: '메모',
        miner_cost: '가스 수수료',
        slow: '느림',
        medium: '보통',
        fast: '빠름',
        wallet_null: '지갑 존재하지 않습니다',
        address_error: '주소 오류',

        payment_detail: '결제 내역',
        receipt_address: '입금 주소',
        payment_wallet: '지불 주소',
        money: '금액',
        confirm: '확인',
        payment_pwd: '결제 비밀번호',
        payment_address: '지불 주소',
        transfer_number: '거래번호',
        block: '블록',
        transfer_time: '거래일시',
        copy_receipt_address: '입금 주소 복사하기',
        copy_address: '주소 복사',
        copy_succcess: '복사 성공',
        copy_fail: '복사 실패',
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

        publishing: '등록중...'


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
    tooimages: '최대한 9장 이미지 추가',
    firstEntryDisclose: '풍문 게시판에서 게시물을 올리거나 댓글을 다는 활동 등은 모두 익명으로 진행됩니다.',

    upload_fail: '업로드 실패하였습니다. 다시 시도해주세요.',


    dislike: '관심 없습니다',
    report: '신고',
    report_placeholder: '신고 사유 선택 (허위 신고시 차단될 수 있습니다.)',
    report_submit: '제출',
    // 举报成功
    report_ok: '제출하였습니다.',
    // 举报失败
    report_fail: '신고 실패하였습니다.',


    publish_fail: '전송 실패, 다시 시도해 주세요~',


    user_feedback: '문의하기',

    policy_agree_and_continue: '전부 동의하고 시작',
    policy_view_detail: '상세내용',

    disclose_not_exist_tip: '이미 삭제된 글입니다.',

    dislikeUser: '블라인드',

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
    topping: 'Top',

    // 版本
    version: '버전',

    // 正在设置用户信息
    updating_user_info:'계정 정보를 저장하고 있습니다.',
    // 设置用户信息成功
    updating_user_info_success:'계정 정보를 변경하였습니다.',
    // 设置用户信息失败
    updating_user_info_fail:'정보 변경 실패하였습니다.'


}
