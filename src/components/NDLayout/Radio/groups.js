import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { 
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    PixelRatio,
 } from "react-native";

/**
 * 自定义单选组件
 * @param {string|number|boolean} value - 当前选中的值
 * @param {array} options - 选项 [{name:{main:'',sub:''},value:''}]
 * @param {func} onChange - 选项改变时触发，返回选中的值
 * @param {func} renderChild - 选项渲染函数，返回选项
 */
export default class NdRadioGroup extends PureComponent{

    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        options: PropTypes.arrayOf(PropTypes.object),
        onChange: PropTypes.func,
        renderChild: PropTypes.func,
    }
    static defaultProps = {
        value: '',
        options: [],
        onChange: ()=>{},
        renderChild: null,
    }
    onChange = (value)=>{
        // console.log(value)
        this.props.onChange(value)
    }
    render(){
        const {value,options,renderChild} = this.props
        return (<View value={value||''} style={styles.box}>
            {options.map((item,index)=>(<TouchableOpacity style={{flex:1}} key={index} onPress={()=>this.onChange(item.value)}>
                {renderChild&&typeof renderChild === 'function'?renderChild(item,value):
                <View style={[styles.item,item.value === value&&styles.item_active]} >
                    <Text style={[styles.name_main,item.value === value&&styles.name_active]}>{item.name.main}</Text>
                    <Text style={[styles.name_sub,item.value === value&&styles.name_active]}>{item.name.sub}</Text>
                </View>}
            </TouchableOpacity>))}
        </View>)
    }
}

const styles = StyleSheet.create({
    box: {
        alignItems:'center',
        borderColor: '#408EF5',
        borderRadius: 8,
        borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
        flexDirection:'row',
        justifyContent:'flex-start',
        overflow: 'hidden',
    },
    conter: {
        backgroundColor:'#408EF5',
        borderRadius:4,
        height:8,
        width:8,
    },
    item: {
        alignItems:'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    item_active: {
        backgroundColor: '#408EF5',
    },
    name_active: {
        color: '#fff',
    },
    name_main: {
        color: '#408EF5',
        fontSize: 14,
    },
    name_sub: {
        color: '#408EF5',
        fontSize: 10,
    },
})