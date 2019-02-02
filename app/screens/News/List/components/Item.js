import React,{ PureComponent } from 'react';
import { ListItem, Text,Left,Body,Button,Thumbnail,View } from 'native-base';
import { Image,TouchableOpacity  } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import IconText from 'app/components/IconText';
import styles from './item-styles'
// import moment from 'moment'
import {formatDate} from "app/utils";
export default class Item extends PureComponent{

    like = ()=>{
        const {info, onLike} = this.props;
        onLike && onLike(info);
    };

    clickAvatar = ()=>{
        const {info, onAvatarClick} = this.props;
        onAvatarClick && onAvatarClick(info)
    };

    clickItem = ()=>{
        const {info} = this.props;
        this.props.onItemClick(info);
    };

    render(){
        const {info} = this.props;
        // console.log(this.props);
        return(
            <ListItem avatar style={styles.item}>
                <Left style={{paddingTop:0}}>
                    <Button transparent light onPress={this.clickAvatar} style={{height: null}}>
                        <Thumbnail style={styles.thumbnail} small source={info.user && info.user.picture ? {uri: info.user.picture} : require('app/images/avatar_default.png')}/>
                    </Button>
                </Left>
                <Body style={{borderBottomWidth: 0,paddingVertical:0,marginLeft:6}}>
                    <TouchableOpacity onPress={this.clickItem}>
                        <Grid>
                            <Row style={styles.firstRow}>
                                <Text style={styles.name}>{info.user.nickname}</Text><IconText type='time' normal={true} text={formatDate(info.updatedAt)}/>
                            </Row>
                            <Row><Text numberOfLines={3} style={styles.title}>{info.title}</Text></Row>
                        </Grid>
                        {
                            info.cover && <Grid style={styles.itemRow}><Row><Image source={{uri: info.cover}} style={[styles.image]}/></Row></Grid>
                        }
                        <View style={[styles.itemRow,styles.interact]}>
                            <IconText type='view' text={info.viewNum || 0}  onPress={this.clickItem}/>
                            <IconText type='comment_small' text={info.commentsNum || 0}  onPress={this.clickItem}/>
                            <IconText type={info.userAction.actionValue ? 'liked_small' : 'like_small'} text={info.likeNum || 0} onPress={this.like}/>
                        </View>
                    </TouchableOpacity>
                </Body>
            </ListItem>
        )
    }
}
