import React, {Component} from 'react';
import {
    View,
    Image, 
    Text,
} from 'react-native';
import styles from './styles'
import {
    Button 
} from '@components/NDLayout'
import {goRNPage} from '@utils/CNNBridge'
import { formatDate } from '@utils/index'

class SubComment extends Component{
    render(){
        const info = this.props.info
        return(
            <View style={styles.sub_comment}>
            {
                info.map((item,index)=>
                    <View key={index} style={styles.sub_box}>
                        <View style={styles.left_box}>
                            <Text style={styles.sub_user_name}>{item.user.name}</Text>
                            <Text style={styles.sub_created_at}>{formatDate(item.created_at)}</Text>
                        </View>
                        <View style={styles.right_box}>
                            <Text style={styles.sub_content}>{item.content}</Text>
                        </View>
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
            isLiked: props.info.like
        }
    }

    clickComment = (info) => {
        this.props.clickComment(info)
    }

    //讨论点赞
    likeClick = (id) => {
        let {user} = this.props
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
            isLiked: !isLiked,
            like_count: count
        },() => {
            if(!isLiked){
                this.props.like_discuss(id)
            } else {
                this.props.cancel_like_discuss(id)
            }
        })

    }
    deleteClick = (id,index) => {
        this.props.deleteDiscuss(id,index)
    }
    viewAll = (discuss_id) => {
        this.props.navigation.navigate('DiscussDetail',{id:discuss_id})
    }
    render() {
        const {info,user} = this.props;
        const {isLiked,like_count} = this.state;
        return (
            <View style={styles.discuss_item}>
                <View style={styles.avatar_box}>
                    <Image 
                        style={styles.avatar}
                        resizeMode='cover'
                        onError={this.onError}
                        source={info.user && info.user.avatar ? {uri: info.user.avatar} : require('@images/avatar_default.png')}/>
                </View>
                <View style={styles.content_box}>
                    <Text style={styles.user_name}>{info.user && info.user.name ? info.user.name : '--'}</Text>
                    <Text style={styles.created_at}>{formatDate(info.created_at)}</Text>
                    <Text style={styles.dis_content}>{info.content}</Text>
                    {
                        this.props.hideAction ? null
                        :   <View style={styles.action}>
                                <Button style={styles.action_button} onPress={()=>this.clickComment(info)}>
                                    <Image
                                        source={require('@images/icon_comment_small.png')} 
                                        style={styles.action_icon}
                                    />
                                    <Text style={styles.action_text}>回复评论</Text>
                                </Button>
                                <Button style={[styles.action_button,styles.action_button_center]} onPress={()=>this.likeClick(info.id)}>
                                    <Image
                                        source={isLiked ? require('@images/icon_liked_small.png')
                                            :require('@images/icon_like_small.png')}
                                        style={[styles.action_icon,styles.icon_like]}
                                    />
                                    <Text style={styles.action_text}>{like_count}</Text>
                                </Button>
                                {
                                    user.user_id == info.user.id && !this.props.hideDeleteIcon
                                    ?   <Button style={[styles.action_button,styles.action_button_center]} onPress={()=>this.deleteClick(info.id,this.props.index)}>
                                            <Image
                                                style={styles.action_icon}
                                                source={require('@images/icon_delete_black.png')}
                                            />                                    
                                        </Button>
                                    :   null
                                }
                            </View>
                    }
                    {
                        !info.reply_count || this.props.hideSubComment
                        ?    null
                        :   <SubComment info={info.replies} />
                    }
                    <View style={styles.view_all}>
                    {
                        this.props.showViewAll && info.reply_count ?    
                            <Button 
                                style={styles.view_all_btn}
                                onPress={()=>this.viewAll(info.id)}>
                                <Text style={styles.view_all_text}>查看全部回复({info.reply_count})</Text>
                            </Button>
                        :   null
                    }
                    </View>
                </View>
            </View>
        )
    }
}
