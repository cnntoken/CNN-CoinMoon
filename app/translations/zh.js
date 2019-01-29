import i18n from "../i18n";

export default {
    label_cancel: '取消',
    label_login: '登录',
    label_submit: '提交',
    label_please_login: '请登录',
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
        please_login: '请登录'
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

        reging_tip: '正在提交, 请稍后!!!',

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
        loginout_fail: 'logout fail'
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

        // 爆料详情
        delete: '删除',
        deleteOk: '删除成功！',
        anonymous: '匿名',

        needLoginForPublish: '需要登录才能发布',

        publishing:'发布中...'


    },

    comment: {
        tooLong: '最多只能输入1000个字符',
        isNull: '输入内容不能为空',
        publish: '发布'
    }
}
