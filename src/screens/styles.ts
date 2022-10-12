import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 50px 0;
  align-items: center;
  background-color: #e1e1e1;
`;

export const ContainerCreateTask = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin: 30px 0;
  padding: 0 20px;
`;

export const InputTask = styled.TextInput`
  width: 75%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 20px;

  border-width: 1px;
  border-color: #c1c1c1;
`;

export const ButtonAddTask = styled(TouchableOpacity)`
  width: 20%;
  background-color: #fff;

  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const Title = styled.Text`
  font-size: 38px;
  width: 100%;
  padding: 0 20px;
  color: #0008;
`;

export const ButtonTitle = styled.Text`
  width: 100%;
  padding: 0 20px;
  color: #000;
`;
