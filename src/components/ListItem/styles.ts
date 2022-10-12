import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled(Animated.View)``;
export const AnimatedView = styled(Animated.View)`
  flex: 1;
  background-color: #fff;
  width: 100%;
  padding: 0px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  z-index: 2;

  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  width: 100%;
  padding: 0 20px;
  color: #0008;
`;

export const IconContainer = styled(Animated.View)`
  width: 55px;
  height: 55px;
  position: absolute;
  right: 5%;

  align-items: center;
  justify-content: center;
`;
