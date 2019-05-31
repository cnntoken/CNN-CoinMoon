import React, {Component} from 'react';
import {ListItem, Text, Left, Body, Button, Thumbnail, View} from 'native-base';
import {Image, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image'
// import ImageContent from './ImageContent'
import {Row, Grid, Col} from 'react-native-easy-grid';
import IconText from '@components/IconText';
import styles from './item-styles'
// import moment from 'moment'
import {formatDate, cloneByJson} from "@utils";


export default class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 1,
            height: 1,
            loaded: false,
            loading: false
        }
    }

    like = () => {
        const {info, onLike} = this.props;
        onLike && onLike(info);
    };

    showDislikeDialog = () => {
        const {info, showDislikeDialog, isShowDislikeDialog} = this.props;
        if (isShowDislikeDialog) {
            showDislikeDialog && showDislikeDialog(info);
        }
    };


    clickAvatar = () => {
        const {info, onAvatarClick} = this.props;
        onAvatarClick && onAvatarClick(info)
    };

    clickItem = () => {
        const {info} = this.props;
        this.props.onItemClick(info);
    };


    onError = (e) => {
        this.setState({
            width: 1,
            height: 1,
            loaded: true
        })
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.loading) {
            return;
        }
        if (!this.state.loaded || this.props.info.cover !== nextProps.info.cover) {
            this.componentWillMount();
        }
    }

    componentWillMount() {
        let uri = this.props.info.cover;
        if (uri) {
            this.setState({
                loading: true,
                loaded: false,
            });
            Image.getSize(uri, (width, height) => {
                // console.log(width, height);
                this.setState({
                    width: width,
                    height: height,
                    loaded: true,
                    loading: false
                })

            }, (error) => {
                this.setState({
                    width: 1,
                    height: 1,
                    loaded: true,
                    loading: false
                })
            })
        }
    }


    render() {

        const {info, isShowDislikeDialog} = this.props;
        const {width, height, loaded} = this.state;

        // 容错
        info.req_user_stats = info.req_user_stats || {};

        return (
            <ListItem avatar style={styles.item}>


                <Left style={{paddingTop: 0}}>
                    <Button transparent light onPress={this.clickAvatar} style={{height: null}}>
                        <FastImage style={styles.thumbnail}
                                   source={info.user && info.user.avatar ? {uri: info.user.avatar} : require('@images/avatar_default.png')}/>
                    </Button>
                </Left>
                <Body style={{borderBottomWidth: 0, paddingTop: 0, paddingBottom: 0, marginLeft: 6}}>
                <TouchableOpacity onPress={this.clickItem}>
                    <Grid>
                        <Row style={[styles.firstRow]}>
                            <View style={styles.firstRow_item1}>
                                <Text style={styles.name}>{info.user.name}</Text>
                                <IconText type='time' normal={true} text={formatDate(info.created_at)}/>
                            </View>
                            <TouchableOpacity block transparent light style={styles.actionBtn}
                                              onPress={this.showDislikeDialog}>
                                {
                                    isShowDislikeDialog ? <Image
                                        resizeMode='center'
                                        style={{paddingVertical: 10}}
                                        source={require('@images/icon_more_black.png')}/> : null
                                }

                            </TouchableOpacity>
                        </Row>
                        <Row style={styles.row_title}>
                            {
                                info.is_sticky ? <Text style={styles.top_text}>Top</Text> : null
                            }
                            <Text numberOfLines={3} style={styles.title}>
                                {/* 如果是置顶，则前面展示连续的几个空格 */}
                                {info.is_sticky ? '        ' : null}{info.title}</Text>
                        </Row>
                    </Grid>
                    {
                        info.cover ? <Grid style={styles.itemRow}><Row>
                            <Image
                                onError={this.onError}
                                source={{uri: info.cover}}
                                style={[styles.image, loaded && width < 300 ? {width: 0, height: 0} : {}]}
                                resizeMode='cover'/>
                        </Row></Grid> : null
                    }
                    <View style={[styles.itemRow, styles.interact]}>
                        <IconText type='view' text={info.feed_stats.view_count || 0} onPress={this.clickItem}/>
                        <IconText type='comment_small' text={info.feed_stats.comment_count || 0}
                                  onPress={this.clickItem}/>
                        <IconText type={info.req_user_stats.like ? 'liked_small' : 'like_small'}
                                  text={info.feed_stats.like_count || 0} onPress={this.like}/>
                    </View>
                </TouchableOpacity>
                </Body>
            </ListItem>
        )
    }
}
