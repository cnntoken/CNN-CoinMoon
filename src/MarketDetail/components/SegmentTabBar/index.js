import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
const PhoneWidth = Dimensions.get('window').width;
const Button = (props) => {
    return (
        <TouchableOpacity {...props} activeOpacity={0.95}>
            {props.children}
        </TouchableOpacity>
    )
};
export default class SegmentTabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderTab(name, page, isTabActive, onPressHandler) {
        const textColor = isTabActive ? '#408EF5' : '#333';
        const borderStyle = isTabActive ? {borderBottomColor:'#408EF5',borderBottomWidth:3} : {}
        return <Button
            style={{flex: 1, height: 50,...borderStyle}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab]}>
                <Text style={[{color: textColor,fontSize: 18}]}>
                    {name}
                </Text>
            </View>
        </Button>;
    }

    render() {
        return (
            <View style={styles.tabWrap}>
                <View style={[styles.tabBarBox,this.props.tabs.length===1?styles.singleTabBarBox:{}]}>
                    <View style={ {flexDirection: 'row'}}>
                        {this.props.tabs.map((name, page) => {
                            const isTabActive = this.props.activeTab === page;
                            const renderTab = this.props.renderTab || this.renderTab;
                            return renderTab(name, page, isTabActive, this.props.goToPage);
                        })}
                    </View>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    tabWrap: {
        paddingLeft: 15,
        width: PhoneWidth,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6'
    },
    tabBarBox: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: PhoneWidth/2
    },
    singleTabBarBox:{
        width: PhoneWidth/4
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});