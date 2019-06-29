import React, {Component} from 'react';
import styles from './styles';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import {Button} from '@components/NDLayout'

import {Col, Row, Grid} from "react-native-easy-grid";
import {cloneByJson, formatDate} from "@utils";
import FastImage from "react-native-fast-image";


export default class DiscloseListItem extends Component {

    // 删除爆料
    showDeleteDialog = (item) => {
        if (this.props.showDeleteDialog) {
            this.props.showDeleteDialog(item);
        }
    };

    // 展示不敢兴趣dialog
    showDisLikeDialog = (item) => {
        // debugger;
        if (this.props.showDisLikeDialog) {
            this.props.showDisLikeDialog(item);
        }
    };

    // 点赞爆料
    like = (item) => {
        if (this.props.like) {
            this.props.like(item);
        }
    };

    // 跳到详情页面
    pressItem = (item) => {
        if (this.props.pressItem) {
            this.props.pressItem(item);
        }
    };

    render() {

        let {item} = this.props.opt;
        item = cloneByJson(item);
        let time = formatDate(item.created_at);
        item.req_user_stats = item.req_user_stats || {};

        return (


            <Grid style={{
                marginTop: 12,
                marginHorizontal: 16,
                marginBottom: 6
            }}>
                <Col style={{
                    width: 40
                }}>
                    <Image style={styles.avatar} source={item.source}/>
                </Col>

                <Col>
                    <Row>
                        <Col size={11}>
                            <View style={styles.name}>
                                <Text style={styles.userName}>{item.userName}</Text>
                                <Text style={styles.time}>{time}</Text>
                            </View>
                        </Col>
                        {/* 仅仅只有自己发布的匿名信息可以删除 */}
                        <Col size={1}>
                            <View style={styles.edit}>
                                <Button transparent
                                        onPress={this.showDeleteDialog.bind(this, item)}>
                                    <Image source={require('@images/icon_more_black.png')}/>
                                </Button>
                            </View>
                        </Col>
                    </Row>

                    <TouchableOpacity onPress={this.pressItem.bind(this, item)}>
                        <Row>
                            <Col>
                                <Text numberOfLines={3} style={styles.title}>{item.title}</Text>
                            </Col>
                        </Row>

                        {/**************************** 九宫格图片 start *****************************/}
                        <View style={{
                            marginVertical: 12
                        }}>
                            <Row>
                                {
                                    item.images.length > 0 ? item.images.slice(0, 3).map((uri, idx) => {
                                        if (!uri) {
                                            return null;
                                        }
                                        return <Col style={styles.col_img} key={idx}>
                                            {
                                                <FastImage style={styles.image}
                                                       key={idx + 6 + ''}
                                                       source={{
                                                           uri: uri,
                                                       }}/>
                                            }

                                        </Col>
                                    }) : null
                                }
                            </Row>
                            <Row>
                                {
                                    item.images.length > 3 ?
                                        item.images.slice(3, 6).map((uri, idx) => {
                                            if (!uri) {
                                                return null;
                                            }
                                            return <Col style={styles.col_img} key={idx}>
                                                {
                                                    <FastImage style={styles.image}
                                                           key={idx + 6 + ''}
                                                           source={{
                                                               uri: uri,
                                                           }}/>
                                                }
                                            </Col>
                                        }) : null
                                }
                            </Row>
                            <Row>
                                {
                                    item.images.length > 6 ?
                                        item.images.slice(6, 9).map((uri, idx) => {
                                            if (!uri) {
                                                return null;
                                            }
                                            return <Col style={styles.col_img} key={idx + 6 + ''}>
                                                {
                                                    <FastImage style={styles.image}
                                                           key={idx + 6 + ''}
                                                           source={{
                                                               uri: uri,
                                                           }}/>
                                                }
                                            </Col>
                                        }) : null
                                }
                            </Row>
                        </View>
                    </TouchableOpacity>


                    {/**************************** 九宫格图片 end *****************************/}

                    {/*点赞操作等*/}
                    <Row style={{
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity onPress={this.pressItem.bind(this, item)}>
                            <Image source={require('@images/icon_view.png')}/>
                            <Text style={styles.number}>{item.disclose_stats.view_count || 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity transparent onPress={this.pressItem.bind(this, item)}>
                            <Image source={require('@images/icon_comment_small.png')}/>
                            <Text style={styles.number}>{item.disclose_stats.comment_count || 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity transparent onPress={this.like.bind(this, item)}>
                            {
                                !item.req_user_stats.like ?
                                    <Image source={require('@images/icon_like_small.png')}/> :
                                    <Image source={require('@images/icon_liked_small.png')}/>
                            }
                            <Text style={styles.number}>{item.disclose_stats.like_count || 0}</Text>
                        </TouchableOpacity>
                    </Row>


                </Col>

            </Grid>
        )
    }
}
