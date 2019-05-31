import React, {Component} from 'react';
import {
    View,
    Button,
    TouchableOpacity
} from "react-native";
import styles from './style';

class Report extends Component {

    constructor(props) {
        super(props);
    }
    handlePress = () => {
        let {sort_dir} = this.props
        let dir = sort_dir ? (sort_dir==='desc'?'asc':'desc') : 'desc'
        this.props.onPress(dir)
    }

    render() {
        const selected = this.props.sort_dir ? (this.props.sort_dir === 'desc' ? 'up_selected' : 'down_selected') : null
        return(
            <View style={styles.box} >
                <View style={[selected==='down_selected'?styles[selected]:styles.down]}></View>
                <View style={[selected==='up_selected'?styles[selected]:styles.up]}></View>
            </View>
        )
    }
}

export default Report;
