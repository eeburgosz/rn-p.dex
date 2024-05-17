import React, { useContext } from 'react';
import { StyleProp, Image, ImageStyle } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
  style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({ style }: Props) => {
  const { isDark } = useContext(ThemeContext);
  const pokeballImage = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  return (
    <Image
      source={pokeballImage}
      style={[
        {
          width: 300,
          height: 300,
          opacity: 0.3,
        },
        style,
      ]}
    />
  );
};
