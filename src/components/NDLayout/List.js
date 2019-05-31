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


export default class List extends PureComponent {
    static propTypes = {
        style: ViewPropTypes.style,
        renderItem: PropTypes.func,
        dataSource: PropTypes.array,
        noDataText: PropTypes.func,
        rowKey: PropTypes.string,
    }
    static defaultProps = {
        style: {},
        renderItem: (item,index)=>(<Text key={index}>{item}</Text>),
        dataSource: ['item1','item2','item3'],
        noDataText: ()=><Text>no data!</Text>,
    }
    render() {
        const {style,renderItem,dataSource,noDataText,rowKey} = this.props
        if(!dataSource.length){
            return (<View style={styles.listBox}>{noDataText()}</View>)
        }
        return (
            <View style={style}>
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
        justifyContent: 'center',
        alignItems: 'center',
    }
})