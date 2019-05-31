import React, {Component} from 'react';
import {
    View,
} from "react-native";

import styles from './style';

class Report extends Component {

    constructor(props) {
        super(props);
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
