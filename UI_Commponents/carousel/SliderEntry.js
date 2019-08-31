import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,ImageBackground ,Share} from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../../css/styles';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration,title,price }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ImageBackground
              source={{ uri: illustration }}
            //   containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
            //   style={styles.image}
            style={{width:'120%',height:'150%',}}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            >
                     <View style={styles.sliderContainer} >
                    <TouchableOpacity style={styles.shareTouchableStyle} 
                     onPress={() => {
                        Share.share({
                            message: `You've clicked '${title}'`,

                        })
                    }}>
                     <Image
                            source={require('../../assets/images/share.png')}
                            style={styles.shareIconstyle}

                        />
                        </TouchableOpacity>
                        <View style={styles.sliderTitleContainerStyle}>
                     <Text style={styles.sliderTitleTextStyle}>{title}</Text>
  </View>
  
  

 </View>

            </ImageBackground>
        ) : (
            <Image
            source={{ uri: illustration }}
            style={styles.image}
          />
        );
    }

    render () {
        const { data: { title }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <View
              activeOpacity={1}
              style={styles.slideInnerContainer}
              
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
               
            </View>
        );
    }
}