import Api from 'app/api';
import ApiConstants from '../ApiConstants';

// 上传图片
export default function uploadImage(images) {
    return Api(
        ApiConstants.UPLOADURL,
        null,
        'post',
        null
    );
}
