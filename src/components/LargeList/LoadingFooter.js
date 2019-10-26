import React from "react";
import {
    LoadingFooter,
    // FooterStatus,
} from "react-native-spring-scrollview/LoadingFooter";
import {
    ActivityIndicator,
    // Animated,
    View,
    StyleSheet,
    Text
} from "react-native";
import i18n from '@i18n';


// "waiting": 准备状态：视图还没有碰边
// "dragging": 上拉状态：视图已经碰到边缘，但是还没有达到组件的高度，此时松手不具备加载的条件
// "draggingEnough": 上拉足够态：视图已经达到组件的高度，但是用户还没有松手，松手即可进入加载态
// "draggingCancel": 上拉取消态: 当用户上拉经历过上拉足够态，但是又往下拉，达不到加载的高度，则进入此状态，如果用户不松手，重新上拉可再次进入上拉足够态
// "loading": 加载态：onLoading，此时正在加载中
// "rebound": 回弹态: 已经加载完成，正在往回弹的状态
// "allLoaded": 数据加载完成态，此状态下不会触发刷新，该状态由allLoaded属性控制

export default class NormalFooter extends LoadingFooter {
    static height = 60;

    static style = "stickyContent";

    _renderIcon() {
        return <ActivityIndicator size="small" color="#888888" />;
        // const s = this.state.status;
        // if (s === "loading" || s === "cancelLoading" || s === "rebound") {
        //     return <ActivityIndicator color={"gray"} />;
        // }
        // const { maxHeight, offset, bottomOffset } = this.props;
        // return (
        //     <Animated.Image
        //         source={require("./Customize/res/arrow.png")}
        //         style={{
        //             transform: [
        //                 {
        //                     rotate: offset.interpolate({
        //                         inputRange: [
        //                             bottomOffset - 1 + 45,
        //                             bottomOffset + 45,
        //                             bottomOffset + maxHeight,
        //                             bottomOffset + maxHeight + 1
        //                         ],
        //                         outputRange: ["180deg", "180deg", "0deg", "0deg"]
        //                     })
        //                 }
        //             ]
        //         }}
        //     />
        // );
    }

    renderContent() {
        return null;
    }

    getTitle() {
        const s = this.state.status;
        // if (s === "dragging" || s === "waiting") {
        //     return "Drag up to load";
        // } else if (s === "draggingEnough") {
        //     return "Release to load";
        // } else if (s === "loading") {
        //     return "Loading ...";
        // } else if (s === "draggingCancel") {
        //     return "Give up loading";
        // } else if (s === "rebound") {
        //     return "Load completed";
        // } else if (s === "allLoaded") {
        //     return "No more data";
        // }
        if(s === 'loading'){
            return i18n.t('list_loading')
        } else if(s === 'allLoaded'){
            return i18n.t('list_nomore_tip')
        }
    }
    render() {
        if (this.state.status === "allLoaded")
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>{this.getTitle()}</Text>
                </View>
            );
        return (
            <View style={styles.container}>
                {this._renderIcon()}
                <View style={styles.rContainer}>
                    <Text style={styles.text}>{this.getTitle()}</Text>
                    {this.renderContent()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    rContainer: {
        marginLeft: 20
    },
    text: {
        color: "#666",
        fontSize: 15,
        marginVertical: 5,
        textAlign: "center",
        width: 140
    }
});