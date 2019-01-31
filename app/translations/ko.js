
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
        license: '회원가입을 클릭하면 서비스 약관, 개인정보 처리방침에 동의하게 됩니다',
        license_link: '이용 약관',
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
        loginout_fail: '로그아웃 실패'
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
    }
}
