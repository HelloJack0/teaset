// ModalIndicatorView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, Dimensions, Image, TouchableOpacity} from 'react-native';

import Theme from 'teaset/themes/Theme';
import Overlay from '../Overlay/Overlay';
var {width, height} = Dimensions.get("window");

export default class ModalIndicatorView extends Overlay.View {

  static propTypes = {
    ...Overlay.View.propTypes,
    text: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    position: PropTypes.oneOf(['top', 'bottom', 'center']),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'large']), PropTypes.number]),
    color: PropTypes.string,
  };

  static defaultProps = {
    ...Overlay.View.defaultProps,
    modal: true,
    position: 'center',
    size: 'large',
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      text: props.text,
    });
  }

  get text() {
    return this.state.text;
  }

  set text(value) {
    this.setState({text: value});
  }

  buildStyle() {
    let {style, position} = this.props;
    style = [{
      paddingLeft: Theme.miScreenPaddingLeft,
      paddingRight: Theme.miScreenPaddingRight,
      paddingTop: Theme.miScreenPaddingTop,
      paddingBottom: Theme.miScreenPaddingBottom,
      justifyContent: position === 'top' ? 'flex-start' : (position === 'bottom' ? 'flex-end' : 'center'),
      alignItems: 'center',
    }].concat(super.buildStyle());
    return style;
  }

  renderContent() {
    let {size, color, cancelShow} = this.props;
    let {text} = this.state;
    return (
      <View style={{alignItems: 'center',height:height/2,width:width,justifyContent:'center'}}>
        <View style={{width:width/4}}>
          {
            cancelShow && <TouchableOpacity style={{width:20,height:20,position:'absolute',top:5,right:5}}
                            onPress={ cancelShow } >
              <Image style={{width:20,height:20,tintColor:Theme.toastIconTintColor}} source={require('../../icons/fail.png')} />
            </TouchableOpacity>
          }
          <ActivityIndicator size={size} color={color || Theme.miIndicatorColor} />
        </View>
        {React.isValidElement(text) ? text :
          <Text style={{color: Theme.miTextColor, fontSize: Theme.miFontSize, paddingTop: Theme.miTextPaddingTop}}>
            {text}
          </Text>
        }
      </View>
    );
  }

}
