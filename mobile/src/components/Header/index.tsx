import React, { useCallback } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
  showCancelButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showCancelButton = true }) => {
  const navigation = useNavigation();

  const handleNavigateToHomePage = useCallback(() => {
    navigation.navigate('OrphanageMap');
  }, []);

  return (
    <Container>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Title>{title}</Title>

      {showCancelButton ? (
        <BorderlessButton onPress={handleNavigateToHomePage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </Container>
  );
};

export default Header;
