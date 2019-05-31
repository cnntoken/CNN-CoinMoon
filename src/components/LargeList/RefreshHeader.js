import React from "react";
import {
    RefreshHeader,
    // HeaderStatus,
} from "react-native-spring-scrollview/RefreshHeader";
import {
    ActivityIndicator,
    //   Animated,
    View,
    StyleSheet,
    Text
} from "react-native";

// "waiting": 准备状态：视图还没有碰边
// "pulling": 下拉状态：视图已经碰到边缘，但是还没有达到组件的高度，此时松手不具备刷新的条件
// "pullingEnough": 下拉足够态：视图已经达到组件的高度，但是用户还没有松手，松手即可进入刷新态
// "pullingCancel": 下拉取消态: 当用户下拉经历过下拉足够态，但是又往上拉，达不到刷新的高度，则进入此状态，如果用户不松手，重新下拉可再次进入下拉足够态
// "refreshing": 刷新态：已经触发onRefresh，此时正在刷新中
// "rebound": 回弹态: 已经刷新完成，正在往回弹的状态

export default class NormalHeader extends RefreshHeader {
    static height = 80;

    static style = "stickyContent";

    _renderIcon() {
        return <ActivityIndicator size="small" color="#888888" />;
        // const s = this.state.status;
        // if (s === "refreshing" || s === "rebound") {
        //   return <ActivityIndicator color={"gray"}/>;
        // }
        // const { maxHeight, offset } = this.props;
        // return (
        //   <Animated.Image
        //     source={require("./Customize/res/arrow.png")}
        //     style={{
        //       transform: [
        //         {
        //           rotate: offset.interpolate({
        //             inputRange: [-maxHeight - 1 - 10, -maxHeight - 10, -50, -49],
        //             outputRange: ["180deg", "180deg", "0deg", "0deg"]
        //           })
        //         }
        //       ]
        //     }}
        //   />
        // );
    }

    renderContent() {
        return null;
    }

    getTitle() {
        const s = this.state.status;
        if (s === "pulling" || s === "waiting") {
            return "Pull down to refresh";
        } else if (s === "pullingEnough") {
            return "Release to refresh";
        } else if (s === "refreshing") {
            return "Refreshing ...";
        } else if (s === "pullingCancel") {
            return "Give up refreshing";
        } else if (s === "rebound") {
            return "Refresh completed";
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this._renderIcon()}
                <View style={styles.rContainer}>
                    <Text style={styles.text}>
                        {this.getTitle()}
                    </Text>
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