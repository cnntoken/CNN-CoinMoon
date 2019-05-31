import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native';
import {
    Button,
    Footer
} from '@components/NDLayout'
import styles from './styles'
export default class SegmentTabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleDelete = () => {
        this.props.confirmDelete()
    }
    cancleDelete = () => {
        this.props.hideDeleteModal()
    }

    render() {
        return (
                <Modal
                    style={styles.footer_drawer}
                    visible={this.props.showDeleteModal}
                    transparent={true}
                   >
                        <View style={styles.btn_box}>
                            <View style={{height:118,backgroundColor:'#fff'}}>
                                <Button onPress={this.handleDelete} style={styles.delete_btn}><Text style={styles.delete_text}>删除评论</Text></Button>
                                <Button style={styles.cancle_btn} onPress={this.cancleDelete}><Text>取消</Text></Button>
                            </View>
                        </View>
                </Modal>
        );
    }

}