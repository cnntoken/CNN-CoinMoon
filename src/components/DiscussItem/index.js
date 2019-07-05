import React, {PureComponent,Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import styles from './styles'
import {
    Button 
} from '@components/NDLayout'
import {goRNPage} from '@utils/CNNBridge'
import { formatDate } from '@utils/index'
import i18n from '@i18n'
import FastImage from 'react-native-fast-image';


class SubComment extends PureComponent{
    render(){
        const info = this.props.info
        return(
            <View style={styles.sub_comment}>
            {
                info.map((item,index)=>
                    <View key={index} style={styles.sub_box}>
                        <Text style={styles.sub_user_name}>{item.user.name||''}:
                            <Text style={styles.sub_content}>{item.content}</Text>
                        </Text>
                    </View>
                )
            }
            </View>
        )
    }
}

export default class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            like_count: Number(props.info.like_count)||0,
            isLiked: props.info.like,
            user: props.user,
            liking: false
        }
    }
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if(nextProps.info.like!==this.state.isLiked ){
            this.setState({
                isLiked: nextProps.info.like,
                like_count: Number(nextProps.info.like_count)||0
            })
        }
    }

    clickComment = (info,index) => {
        this.props.clickComment(info,index)
    }

    //讨论点赞
    likeClick = (id) => {
        if(this.state.liking) return false
        let {user,index} = this.props
        if(!user.isLogin){
            goRNPage({
                moduleName: 'stark_login',
            })
            return
        }
        let { isLiked, like_count} = this.state
        //先更改页面的状态
        let count = isLiked ? like_count - 1 : like_count + 1
        this.setState({
            liking: true,
            isLiked: !isLiked,
            like_count: count
        },() => {
            if(!isLiked){
                this.props.like_discuss(id,count,index)
            } else {
                this.props.cancel_like_discuss(id,count,index)
            }
            this.setState({
                liking: false
            })
        })

    }
    deleteClick = (id,index) => {
        this.props.deleteDiscuss(id,index)
    }
    viewAll = (discuss_id,index) => {
        // this.props.navigation.navigate('DiscussDetail',{id:discuss_id})
        goRNPage({
            moduleName: 'stark_market_discuss_detail',
            params: {
                id: discuss_id,
                index,
                pairs: this.props.pairs
            }
        })
    }
    render() {
        const {index,info,user,hideBottomBorder} = this.props;
        const {isLiked,like_count,liking} = this.state;
        return (
            <View style={[styles.discuss_item,hideBottomBorder?{borderBottomWidth:0}:{}]}>
                <View style={styles.avatar_box}>
                    <FastImage 
                        style={styles.avatar}
                        resizeMode='cover'
                        onError={this.onError}
                        source={info.user && info.user.avatar ? {uri: info.user.avatar} : require('@images/avatar_default.png')}/>
                </View>
                <View style={styles.content_box}>
                    <Text style={styles.user_name}>{info.user && info.user.name ? info.user.name : ''}</Text>
                    <Text style={styles.created_at}>{formatDate(info.created_at)}</Text>
                    <TouchableOpacity 
                        disabled={this.props.hideDiscussDetail}
                        activeOpacity={1}
                        style={styles.dis_content} 
                        onPress={()=>this.viewAll(info.id,this.props.index)}>
                        <Text style={styles.dis_content}>{info.content}</Text>
                    </TouchableOpacity>
                    {
                        this.props.hideAction ? null
                        :   <View style={styles.action}>
                                <Button style={[styles.action_button,this.props.action_button_style||{}]} onPress={()=>this.clickComment(info,index)}>
                                    <Image
                                        source={require('@images/icon_comment_small.png')} 
                                        style={styles.action_icon}
                                    />
                                    <Text style={styles.action_text}>{i18n.t('page_market_detail.reply_discuss')}</Text>
                                </Button>
                                <Button style={[styles.action_button,this.props.action_button_style||{},styles.action_button_center]} onPress={()=>this.likeClick(info.id)} disabled={liking}>
                                    <Image
                                        onLoad={this._onLoadEnd}
                                        source={isLiked ? require('@images/icon_liked_small.png')
                                            :require('@images/icon_like_small.png')}
                                        style={[styles.action_icon,styles.icon_like]}
                                    />
                                    <Text style={styles.action_text}>{like_count>=0?like_count:0}</Text>
                                </Button>
                                {
                                    user.user_id == info.user.id && !this.props.hideDeleteIcon
                                    ?   <Button style={[styles.action_button,styles.action_button_center,styles.action_button_last]} onPress={()=>this.deleteClick(info.id,this.props.index)}>
                                            <Image
                                                style={styles.action_icon}
                                                source={require('@images/icon_delete_black.png')}
                                            />                                    
                                        </Button>
                                    :   <Button style={[styles.action_button,styles.action_button_center,styles.action_button_last]} disabled={true}/>
                                }
                            </View>
                    }
                    {
                        !info.reply_count || this.props.hideSubComment
                        ?    null
                        :   <SubComment info={(info.replies||[]).slice(0,2)} />
                    }
                    <View style={styles.view_all}>
                    {
                        this.props.showViewAll && info.reply_count > 2 ?    
                            <Button 
                                style={styles.view_all_btn}
                                onPress={()=>this.viewAll(info.id,this.props.index)}>
                                <Text style={styles.view_all_text}>{i18n.t('page_market_detail.view_all_replies')}({info.reply_count})</Text>
                            </Button>
                        :   null
                    }
                    </View>
                </View>
            </View>
        )
    }
}
