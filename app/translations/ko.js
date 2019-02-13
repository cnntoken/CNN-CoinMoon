
export default {
    label_cancel: '취소',
    label_login: '로그인',
    label_submit: '확인',
    label_please_login: '로그인',
    component_tabbar: {
        feed: '홈',
        disclose: '풍문',
        mine: '내 정보'
    },
    page_main: {
        category_info: '정보',
        category_news: '뉴스',
    },
    page_mine: {
        please_login: '로그인'
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

        resend_tip: '인증코드를 재전송하였습니다. 메일을 확인하여 주세요'


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
        go_verify: '인증하기'
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
        from: '출 처'
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
    report_placeholder:'신고 사유를 선택하십시오. 허위 신고시 차단될 수 있습니다.',
    report_submit:'제출',
}
