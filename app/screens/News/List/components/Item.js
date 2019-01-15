import React,{ PureComponent } from 'react';
import { ListItem, Text,Left,Body,Button,Thumbnail,View } from 'native-base';
import { Image,TouchableOpacity } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import IconText from 'app/components/IconText';
import styles from './item-styles'
import moment from 'moment'

export default class Item extends PureComponent{

    like = ()=>{
        const {info, onLike} = this.props;
        onLike && onLike(info)
    }

    clickAvatar = ()=>{
        const {info, onAvatarClick} = this.props;
        onAvatarClick && onAvatarClick(info)
    }

    clickItem = ()=>{
        const {info} = this.props;
        this.props.onItemClick(info);
    }

    render(){
        const {info} = this.props;
        return(
            <ListItem avatar style={styles.item}>
                <Left style={{paddingTop:0}}>
                    <Button transparent light onPress={this.clickAvatar} style={{height: null}}>
                        <Thumbnail style={styles.thumbnail} small source={{uri:info.user && info.user.picture ? info.user.picture : require('app/images/avatar_default.png')}}/>
                    </Button>
                </Left>
                <Body style={{borderBottomWidth: 0,paddingVertical:0,marginLeft:6}}>
                    <TouchableOpacity onPress={this.clickItem}>
                        <Grid>
                            <Row style={styles.firstRow}>
                                <Text style={styles.name}>{info.user.nickname}</Text><IconText type='time' normal={true} text={moment(info.updatedAt).format('HH:mm')}/>
                            </Row>
                            <Row><Text numberOfLines={2} style={styles.title}>{info.title}</Text></Row>
                        </Grid>
                        {
                            info.images && info.images.length ? 
                            <Grid style={styles.itemRow}><Row><Image source={{uri: info.images[0]}} style={[styles.image]}/></Row></Grid>
                            :null
                        } 
                        <View style={[styles.itemRow,styles.interact]}>
                            <IconText type='view' text={info.viewNum || 0}/>
                            <IconText type='comment_small' text={info.commentNum || 0}/>
                            <IconText type='like_small' text={info.likeNum || 0} onPress={this.like}/>
                        </View>
                    </TouchableOpacity>
                </Body>
            </ListItem>
        )
    }
}
