import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    TouchableWithoutFeedback
} from "react-native";

import FitImage from 'react-native-fit-image';
import inline_tags from "@data/html_inline_tag";
import block_tags from "@data/html_block_tag";


import styles from './styles';
// import {Container, Content} from "@src/components/NDLayout";
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import Modal from "react-native-modal";


const Entities = require('html-entities').XmlEntities;

const entities = new Entities();


class FeedDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            img: this.initImgState(),
            previewImgs: this.handlePreviewImages(),
            preview: false,
            previewIdx: 0
        }
    }

    initImgState = () => {

        let {images, cover} = this.props;
        let img = {};
        let imgArr = [...images];

        if (imgArr.length === 0 && cover) {
            imgArr.push(cover)
        }

        imgArr.forEach((item) => {
            img[item] = {
                width: 100,
                height: 100
            }
        });

        return img;

    };

    handlePreviewImages = () => {

        let {images, cover} = this.props;

        let imgs = [];
        let imgArr = [...images];

        if (imgArr.length === 0 && cover) {
            imgArr.push(cover)
        }

        (imgArr || []).forEach((item, index) => {
            imgs.push({
                // Simplest usage.
                url: item,
                // Optional, if you know the image size, you can set the optimization performance
                // You can pass props to <Image />.
                props: {
                    index: index
                    // headers: ...
                }
            })
        });

        return imgs;
    };


    // 将HTML转成rn组件
    transformHtmlContent = (html) => {

        let str = '';
        let arr = [];
        // 匹配所有的HTML tag
        let inline_tag_str = (function () {
            let reg_str = '';
            let length = inline_tags.length;
            inline_tags.forEach((item, index) => {
                if (length === index + 1) {
                    reg_str += `<${item}>|<\\/${item}>`;
                } else {
                    reg_str += `<${item}>|<\\/${item}>|`;
                }
            });
            return reg_str;
        })();

        // 匹配所有的HTML block tag
        let block_tag_str = (function () {
            let reg_str = '';
            let length = block_tags.length;
            block_tags.forEach((item, index) => {
                if (length === index + 1) {
                    reg_str += `<${item}>|<\\/${item}>`;
                } else {
                    reg_str += `<${item}>|<\\/${item}>|`;
                }
            });
            return reg_str;
        })();


        let inline_tag_reg = new RegExp(inline_tag_str, 'ig');
        let block_tag_reg = new RegExp(block_tag_str, 'ig');


        str = html.replace(/<p>&#xA0;<\/p>/g, '')
            .replace(/<p><span>&#x200B;<\/span><\/p>/g, '')
            .replace(/<p><span>&#xFFFC;<\/span><\/p>/g, '')
            .replace(inline_tag_reg, '')
            .replace(block_tag_reg, 'coinmoon_cnn_block_tag')
            .replace(/<cnn-image\/>/ig, 'coinmoon_cnn_block_tagcoinmoon_cnn_imagecoinmoon_cnn_block_tag');

        arr = str.split('coinmoon_cnn_block_tag');
        arr.forEach((item, index) => {
            arr[index] = item.trim();
        });

        return arr;

    };


    componentDidMount() {
        //
        // Object.keys(this.state.img).forEach((item) => {
        //     Image.getSize(item, (width, height) => {
        //         this.state.img[item] = {
        //             width: width,
        //             height: height,
        //         };
        //         this.setState({});
        //
        //     }, (error) => {
        //         this.state.img[item] = {
        //             width: 0,
        //             height: 0,
        //         };
        //         this.setState({});
        //     })
        // });

    }

    preview = (idx) => {
        this.setState({
            preview: true,
            previewIdx: idx
        });
    };


    render() {

        let {html} = this.props;
        let {preview, previewImgs, img, previewIdx} = this.state;

        let images = Object.keys(img);

        let data = this.transformHtmlContent(html);

        return (<View>

            <Modal
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                style={styles.modal} isVisible={preview}>
                <ImageViewer
                    renderImage={(props) => {
                        return <FastImage
                            {...props}
                            resizeMode={FastImage.resizeMode.contain}/>
                    }}
                    renderIndicator={()=>{
                        return null;
                    }}
                    onClick={(onCancel) => {
                        onCancel();
                        this.setState({
                            preview: false
                        })
                    }}
                    index={previewIdx}
                    enablePreload={true}
                    imageUrls={previewImgs}/>
            </Modal>

            {
                data.map((item, index) => {


                    if (!item) {
                        return null;
                    }

                    // 渲染图片
                    if (item === 'coinmoon_cnn_image') {
                        if (images.length > 0) {

                            let uri = images.shift();
                            let idx = previewImgs.length - images.length - 1;

                            img[uri] = img[uri] || {
                                width: "100%",
                                height: 100
                            };

                            return <TouchableWithoutFeedback onPress={this.preview.bind(this, idx)} key={index}>
                                <FitImage
                                    indicator={true}
                                    indicatorColor="#408EF5"
                                    indicatorSize="small"
                                    // originalWidth={img[uri].width}
                                    // originalHeight={img[uri].height}
                                    resizeMode={'contain'}
                                    style={styles.fitImage}
                                    source={{uri: uri}}/>
                            </TouchableWithoutFeedback>

                        }
                    } else {
                        return <Text
                            key={index.toString()}
                            style={styles.text}>
                            {entities.decode(item)}
                        </Text>
                    }
                })
            }
        </View>);
    }
}

export default FeedDetail;
