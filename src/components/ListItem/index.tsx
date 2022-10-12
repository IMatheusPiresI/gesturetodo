import React, {useEffect} from 'react';
import * as S from './styles';

import {Dimensions, StyleSheet} from 'react-native';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Task} from '../../@types';

type ListItemProps = {
  task: Task;
  onDismiss: (task: Task) => void;
};

export const ListItem: React.FC<ListItemProps> = ({task, onDismiss}) => {
  const translateX = useSharedValue(0);
  const animationInit = useSharedValue(130);
  const itemHeight = useSharedValue(65);
  const {width} = Dimensions.get('window');
  const TRANSLATE_X_TRASHOLD = -width * 0.3;

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },

    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_TRASHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-width);
        itemHeight.value = withTiming(0, undefined, isFinished => {
          if (isFinished && onDismiss) return runOnJS(onDismiss)(task);
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const reanimatedIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, TRANSLATE_X_TRASHOLD], [0, 1]),
    };
  });

  const reanimatedTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      opacity: interpolate(
        translateX.value,
        [TRANSLATE_X_TRASHOLD, -width],
        [1, 0],
      ),
    };
  });

  const reanimatedShowContainerStyle = useAnimatedStyle(() => ({
    transform: [{translateY: animationInit.value}],
    opacity: interpolate(animationInit.value, [130, 0], [0, 1]),
  }));

  useEffect(() => {
    animationInit.value = withTiming(0, {duration: 700});
  }, []);

  return (
    <S.Container
      style={[reanimatedShowContainerStyle, reanimatedTaskContainerStyle]}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <S.AnimatedView style={[reanimatedStyle, styles.shadow]}>
          <S.Title>{task.title}</S.Title>
        </S.AnimatedView>
      </PanGestureHandler>
      <S.IconContainer style={reanimatedIconContainerStyle}>
        <IconFontAwesome5 name="trash-alt" size={60 * 0.4} color={'red'} />
      </S.IconContainer>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
