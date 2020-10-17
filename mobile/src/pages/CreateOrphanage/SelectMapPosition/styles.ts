import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

interface ButtonProps {
  disable?: boolean;
}

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const Map = styled(MapView)`
  width: ${width}px;
  height: ${height}px;
`;

export const NextButton = styled(RectButton)<ButtonProps>`
  background-color: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 56px;

  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 40px;

  opacity: ${props => (props.enabled ? 1 : 0.6)};
`;

export const NextButtonText = styled.Text`
  font-family: Nunito_800ExtraBold;
  font-size: 16px;
  color: #fff;
`;
