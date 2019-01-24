import React from 'react';
import {Animated, Platform, StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

const ios = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
// from native-base
const isIphoneX = ios && (height === 812 || width === 812);
const iphoneXTopInset = 24;
const initToolbarHeight = ios ? 46 : 56;

const paddingTop = ios ? 18 : 0;
const topInset = isIphoneX ? iphoneXTopInset : 0;

const toolbarHeight = initToolbarHeight + topInset + paddingTop + 30;

export default class Header extends React.PureComponent {

    constructor(props) {
        super(props);
        this.headerHeight = props.headerMaxHeight;
        this.state = {
            scrollOffset: new Animated.Value(0),
            left: 0,
            bottom: 0,
        };
    }

    onScroll = e => {
        if (this.props.disabled) {
            return;
        }
        // console.log(e.nativeEvent.contentOffset.y);
        this.state.scrollOffset.setValue(e.nativeEvent.contentOffset.y);
    };

    // onBackLayout = (e) => {
    //     const layout = e.nativeEvent.layout;
    //     const bottom = toolbarHeight - layout.y - layout.height - paddingTop - topInset;
    //     this.setState({bottom: bottom, left: e.nativeEvent.layout.x})
    // };

    // _getFontSize = () => {
    //     const {scrollOffset} = this.state;
    //     const backFontSize = this.props.backTextStyle.fontSize || Header.defaultProps.backTextStyle.fontSize;
    //     const titleFontSize = this.props.titleStyle.fontSize || Header.defaultProps.titleStyle.fontSize;
    //     return scrollOffset.interpolate({
    //         inputRange: [0, this.headerHeight - toolbarHeight],
    //         outputRange: [titleFontSize, backFontSize],
    //         extrapolate: 'clamp',
    //     });
    // }

    // _getLeft = () => {
    //     const {scrollOffset} = this.state;
    //     const left = this.props.titleStyle.left || Header.defaultProps.titleStyle.left;
    //     return scrollOffset.interpolate({
    //         inputRange: [0, this.headerHeight - toolbarHeight],
    //         outputRange: [left, this.state.left],
    //         extrapolate: 'clamp',
    //     });
    // }

    _getHeight = () => {
        const {scrollOffset} = this.state;
        return scrollOffset.interpolate({
            inputRange: [0, this.headerHeight - toolbarHeight],
            outputRange: [this.headerHeight, toolbarHeight],
            extrapolate: 'clamp',
        })
    };

    _blankHeight = () => {
        const {scrollOffset} = this.state;
        return scrollOffset.interpolate({
            inputRange: [0, this.headerHeight - toolbarHeight],
            outputRange: [15, 0],
            extrapolate: 'clamp',
        })
    };

    _getBottom = () => {
        const {scrollOffset} = this.state;
        // const bottom = this.props.titleStyle.bottom || Header.defaultProps.titleStyle.bottom;
        const bottom = 0;
        return scrollOffset.interpolate({
            inputRange: [0, this.headerHeight - toolbarHeight],
            outputRange: [bottom, this.state.bottom],
            extrapolate: 'clamp',
        });
    };

    _getOpacity = () => {
        const {scrollOffset} = this.state;
        return scrollOffset.interpolate({
            inputRange: [0, this.headerHeight - toolbarHeight],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

    };

    _disOpacity = () => {
        const {scrollOffset} = this.state;
        // return this.props.backText ? scrollOffset.interpolate({
        //     inputRange: [0, this.headerHeight - toolbarHeight],
        //     outputRange: [1, 0],
        //     extrapolate: 'clamp',
        // }) : 0

        return scrollOffset.interpolate({
            inputRange: [0, this.headerHeight - toolbarHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
    };

    // _getImageOpacity = () => {
    //     const {scrollOffset} = this.state;
    //     return this.props.imageSource ? scrollOffset.interpolate({
    //         inputRange: [0, this.headerHeight - toolbarHeight],
    //         outputRange: [1, 0],
    //         extrapolate: 'clamp',
    //     }) : 0
    // };

    render() {
        const {imageSource, toolbarColor, titleStyle, onBackPress, backStyle, backTextStyle} = this.props;
        // const height = this._getHeight();
        const height = this._getHeight();
        // const left = this._getLeft();
        const bottom = this._getBottom();
        const opacity = this._getOpacity();
        const display = this._disOpacity();
        const blankHeight = this._blankHeight();
        // const fontSize = this._getFontSize();
        // const imageOpacity = this._getImageOpacity();

        // console.log(opacity);

        const headerStyle = this.props.noBorder ? undefined : {borderBottomWidth: 1, borderColor: '#a7a6ab'};

        return (
            <Animated.View
                style={[
                    styles.header,
                    headerStyle,
                    {
                        height: height,
                        // backgroundColor: '#408EF5',
                        // backgroundColor: 'transpant',
                        // background: 'linear-gradient(#000000 50%, #333 50%)'
                        // borderBottomWidth: 10,
                        // borderColor: '#eee'
                    },
                ]}>

                <View style={styles.toolbarContainer}>
                    <View style={styles.statusBar}/>
                    <View style={styles.toolbar}>
                        <Animated.View style={{
                            opacity: display,
                            marginLeft: 16,
                            marginTop: 16,
                            // position: 'absolute',
                            // top: 15,
                            // left: 0,
                            // right: 0,
                            // zIndex: 3456
                            // backgroundColor:'#fff'
                        }}>
                            {this.props.renderLeft && this.props.renderLeft()}
                        </Animated.View>
                        <View style={styles.flexView}/>
                        {this.props.renderRight && this.props.renderRight()}
                    </View>
                </View>

                <Animated.View style={{
                    // opacity: display,
                    // marginLeft: 16,
                    // marginTop: 16,
                    height: blankHeight,
                    width: width,
                    // position: 'absolute',
                    // top: 15,
                    // left: 0,
                    // right: 0,
                    // zIndex: 3456
                    backgroundColor: '#408EF5'
                }}/>

                <Animated.View style={{
                    // position: 'absolute',
                    // left: 0,
                    // zIndex: 999,
                    // borderTopWidth:10,
                    // borderColor:'#408EF5',
                    // bottom: bottom,
                    marginBottom: bottom,
                    opacity: opacity,
                    // display: !opacity ? 'none' : 'flex',
                    // fontSize,
                    // backgroundColor: '#fff',
                    width: width,
                    // paddingBottom:20,
                    // marginTop: 100
                }}>
                    {this.props.title && this.props.title()}

                </Animated.View>

                {this.props.renderOthers && this.props.renderOthers()}

            </Animated.View>


        );
    }
}

const styles = StyleSheet.create({
    toolbarContainer: {
        height: toolbarHeight,
        backgroundColor: '#408EF5',
        // position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // zIndex: 1000
    },
    statusBar: {
        height: topInset + paddingTop,
        // borderBottomWidth: 1,
        // borderColor: '#eee'
    },
    toolbar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'#333'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    titleButton: {
        flexDirection: 'row',
    },
    flexView: {
        flex: 1,
        backgroundColor: "#fff"
    },
});


Header.defaultProps = {
    backText: '',
    title: '',
    renderLeft: undefined,
    renderRight: undefined,
    backStyle: {marginLeft: 10},
    backTextStyle: {fontSize: 16},
    // titleStyle: {fontSize: 20, left: 0, bottom: 0},
    toolbarColor: '#FFF',
    headerMaxHeight: 223,
    disabled: false,
    imageSource: undefined,
};
