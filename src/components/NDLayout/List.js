import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { 
    View,
    ViewPropTypes,
    Text,
    StyleSheet,
    // Dimensions,
    // Platform,
    // PixelRatio,
} from "react-native";
import Spinner from './Spinner'

export default class List extends PureComponent {
    static propTypes = {
        style: ViewPropTypes.style,
        renderItem: PropTypes.func,
        dataSource: PropTypes.array,
        noDataText: PropTypes.func,
        rowKey: PropTypes.string,
        loading: PropTypes.bool,
    }
    static defaultProps = {
        style: {},
        renderItem: (item,index)=>(<Text key={index}>{item}</Text>),
        dataSource: ['item1','item2','item3'],
        noDataText: ()=><Text>no data!</Text>,
        loading: false,
    }
    render() {
        const {style,renderItem,dataSource,noDataText,rowKey,loading} = this.props
        return (
            <View style={[styles.listBox,style]}>
                {!loading&&!dataSource.length&&<View style={styles.listExtra}>{noDataText()}</View>}
                {loading&&<View style={styles.listExtra}>{<Spinner />}</View>}
                {
                    dataSource.map((item,index)=>(<View key={rowKey&&item[rowKey]||index}>
                        {renderItem(item)}
                    </View>))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listBox: {
        position: 'relative',
        minHeight: 300,
        flex: 1,
    },
    listExtra: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 99,
        // backgroundColor: '#ccc',
    }
})