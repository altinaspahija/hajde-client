import React from 'react';
import { Platform, View } from 'react-native';
import { useTheme } from '@/hooks';
import { NoContentBody, NoContentFooter, NoContentTitle } from '@/components';

export const SPLASH_DURATION = Platform.select({ android: 4000, ios: 3000 });

const SplashAnimation = ({
  navigation,
  route,
  footerNotice = 'Do e dëshironit këtë shërbim?',      
  footerTitle = 'Së shpejti'
}) => {
  const { title, titleDescription, bodyTitle, image } = route?.params;
 const { Layout } = useTheme();
  return (
    <View style={[Layout.fill]}>
        <NoContentTitle navigation={navigation} title={title} titleDescription={titleDescription} />
        <NoContentBody bodyTitle={bodyTitle} bodyImage={image} />
        <NoContentFooter title={title} footerNotice={footerNotice} footerTitle={footerTitle} />
    </View>
  );
};

export default SplashAnimation;
