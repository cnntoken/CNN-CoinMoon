import React, {PureComponent} from 'react';

import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({

    btn: {minWidth:50,alignSelf:'stretch',alignItems:'center',display:'flex',justifyContent:'center'},
    btnLeft:{paddingLeft:16,alignItems:'flex-start'},
    btnRight:{paddingRight:16,alignItems:'flex-end'},
    titleView:{flex:1, alignItems:'center', justifyContent:'center'},
    title: { fontWeight: '500',color: '#fff',fontSize: 18, flex: 1},
    header:{height: Platform.OS === 'ios' ? 44 : 56, backgroundColor: '#3575F6', flexDirection: 'row', alignItems: 'center'}
})


const TouchButton = (props={})=>{
    const {onPress,children,...rest} = props;
    if(onPress){
        return <TouchableOpacity onPress={onPress} {...rest}>{children}</TouchableOpacity>
    }else{
        return <View {...rest}>{children}</View>
    }
}
export default class CustomHeader extends PureComponent{
    render (){
        const {leftView,rightView,titleView,style={}} = this.props;
        return (<View style={[styles.header,style]}>
                    <TouchButton onPress={this.props.onLeftClick} style={[styles.btn,styles.btnLeft]}>
                        {leftView}
                    </TouchButton>
                    <View style={styles.titleView}>
                        {typeof titleView === 'string' ? <Text style={styles.title}>{titleView}</Text> : titleView}
                    </View>
                    <TouchButton onPress={this.props.onRightClick} style={[styles.btn,styles.btnRight]}>
                        {rightView}
                    </TouchButton>
                </View>)
    }
}