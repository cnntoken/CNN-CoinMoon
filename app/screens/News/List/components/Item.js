import React,{ PureComponent } from 'react';
import { ListItem, Text,Left,Body,Button,Thumbnail,View } from 'native-base';
import { Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './item-styles'
import moment from 'moment'


const iconType = {
    view: require('app/images/icon_view.png'),
    comment: require('app/images/icon_comment_small.png'),
    like: require('app/images/icon_like_small.png'),
    liked: require('app/images/icon_liked_small.png'),
    time: require('app/images/icon_time.png'),
}

class Icon extends PureComponent{
    onPress = ()=>{
        this.props.onPress && this.props.onPress()
    }
    render (){
        const {type,text,normal} = this.props;
        if(normal){
            return <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={iconType[type]}/>
            <Text style={styles.number}>{text}</Text>
        </View>
        }
        return  <Button transparent light onPress={this.onPress} style={{height: null}}>
                    <Image source={iconType[type]}/>
                    <Text style={styles.number}>{text}</Text>
                </Button>
    }
}


export default class Item extends PureComponent{

    like = ()=>{
        const {info, onLike} = this.props;
        onLike && onLike(info)
    }

    clickAvatar = ()=>{
        const {info, onAvatarClick} = this.props;
        onAvatarClick && onAvatarClick(info)
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
                    <Grid>
                        <Row style={styles.firstRow}>
                            <Text style={styles.name}>{info.user.nickname}</Text><Icon type='time' normal={true} text={moment(styles.createdAt).format('HH:MM')}/>
                        </Row>
                        <Row><Text numberOfLines={2} style={styles.title}>{info.title}</Text></Row>
                    </Grid>
                    {
                        info.images && info.images.length ? 
                        <Grid style={styles.itemRow}><Row><Image source={{uri: info.images[0]}} style={[styles.image]}/></Row></Grid>
                        :null
                    } 
                    <View style={[styles.itemRow,styles.interact]}>
                        <Icon type='view' text={info.viewNum || 0}/>
                        <Icon type='comment' text={info.commentNum || 0}/>
                        <Icon type='like' text={info.likeNum || 0} onPress={this.like}/>
                    </View>
                </Body>
            </ListItem>
        )
    }
}
