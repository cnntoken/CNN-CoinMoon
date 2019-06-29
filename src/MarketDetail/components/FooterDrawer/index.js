import React, {Component} from 'react'
import {
    View,
    Text,
    Modal
} from 'react-native';
import {
    Button,
} from '@components/NDLayout'
import styles from './styles'
import i18n from '@i18n'
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
                                <Button onPress={this.handleDelete} style={styles.delete_btn}><Text style={styles.delete_text}>{i18n.t('page_market_detail.delete_reply')}</Text></Button>
                                <Button style={styles.cancle_btn} onPress={this.cancleDelete}><Text>{i18n.t('page_market_detail.cancel_delete')}</Text></Button>
                            </View>
                        </View>
                </Modal>
        );
    }

}