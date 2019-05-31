import React, {Component} from 'react';
import {Container} from '@components/NDLayout';
import {Image, TouchableOpacity, StyleSheet, ImageBackground, Text, View} from 'react-native';
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

            <Grid style={{
                marginHorizontal: 16,
                marginTop: 12,
                marginBottom: 6
            }}>
                <Col style={{
                    width: 40
                }}>
                    <Image style={styles.thumbnail}
                           source={info.user && info.user.avatar ? {uri: info.user.avatar} : require('@images/avatar_default.png')}/>
                </Col>
                <Col onPress={this.clickItem}>
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
                        <Text numberOfLines={3} style={styles.title}>{info.title}</Text>
                    </Row>
                    {
                        info.cover ? <Row style={{
                            marginTop: 10
                        }}>
                            <Image
                                onError={this.onError}
                                source={{uri: info.cover}}
                                style={[styles.image, loaded && width < 300 ? {width: 0, height: 0} : {}]}
                                resizeMode='cover'/>
                        </Row> : null
                    }
                    <Row style={[styles.itemRow, styles.interact]}>
                        <Col style={{
                            width: 100,
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }}>
                            <View>
                                <IconText type='view' text={info.feed_stats.view_count || 0} onPress={this.clickItem}/>

                            </View>
                        </Col>
                        <Col>
                            <View>
                                <IconText type='comment_small' text={info.feed_stats.comment_count || 0}
                                          onPress={this.clickItem}/>
                            </View>

                        </Col>
                        <Col style={{
                            width: 100,
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                            <View>
                                <IconText type={info.req_user_stats.like ? 'liked_small' : 'like_small'}
                                          text={info.feed_stats.like_count || 0} onPress={this.like}/>
                            </View>

                        </Col>


                    </Row>
                </Col>
            </Grid>
        )
    }
}
