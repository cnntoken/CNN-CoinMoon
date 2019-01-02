import React, {Component} from 'react';
import styles from './styles';
import {View,Text,Button} from 'native-base';
// import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

  
class ViewControl extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    render() {
        const { onSubmit } = this.props;
        return (
            <View style={styles.doneBox}>
                <View style={styles.doneTextBox}>
                    <Text style={styles.doneText}>注册成功! </Text>
                    {/* <TouchableOpacity><Text style={[styles.doneText,styles.highlight]}>开始浏览</Text></TouchableOpacity> */}
                </View>
                <View>
                    <Button style={[styles.btn,styles.doneBtn]} onPress={onSubmit}>
                        <Text>去登录</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

export default ViewControl;
