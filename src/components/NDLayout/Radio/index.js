import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { 
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
 } from "react-native";

/**
 * 自定义单选组件
 * @param {string|number|boolean} value - 当前选中的值
 * @param {array} options - 选项 [{name:'',value:''}]
 * @param {func} onChange - 选项改变时触发，返回选中的值
 */
export default class NdRadio extends PureComponent{
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        options: PropTypes.arrayOf(PropTypes.object),
        onChange: PropTypes.func,
    }
    static defaultProps = {
        value: '',
        options: [],
        onChange: ()=>{},
    }
    onChange = (value)=>{
        // console.log(value)
        this.props.onChange(value)
    }
    render(){
        const {value,options} = this.props
        return (<View value={value||''} style={styles.box}>
            {options.map((item,index)=>(<TouchableWithoutFeedback key={index} onPress={()=>this.onChange(item.value)}>
                <View style={styles.item} >
                    <View 
                        style={styles.prefix}
                    >
                        {item.value === value?
                        <View style={styles.conter}></View>
                        :
                        null}
                    </View>
                    <Text style={[styles.name,item.value === value&&styles.active_name]}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>))}
        </View>)
    }
}

const styles = StyleSheet.create({
    active_name: {
        color: '#408EF5'
    },
    box: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    conter: {
        backgroundColor:'#408EF5',
        borderRadius:4,
        height:8,
        width:8,
    },
    item: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginRight: 76,
    },
    name: {
        color: '#333',
        marginLeft: 8,
    },
    prefix: {
        alignItems:'center',
        borderColor:'#408EF5',
        borderRadius:8,
        borderWidth:2,
        height:16,
        justifyContent:'center',
        width:16,
    }
})