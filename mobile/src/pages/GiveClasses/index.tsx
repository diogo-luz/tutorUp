import React from 'react';
import { Linking } from 'react-native';

import {
  Container,
  Background,
  Title,
  Description,
  Button,
  WebButton,
  TextButton,
} from './styles';

import giveClassesBg from '../../assets/images/background.png';
import { useNavigation } from '@react-navigation/native';

const GiveClasses: React.FC = () => {
  const navigation = useNavigation();

  function handleAcess() {
    navigation.goBack();
  }

  function handleLinkToWeb() {
    Linking.openURL('https://google.pt');
  }

  return (
    <Container>
      <Background resizeMode="contain" source={giveClassesBg}>
        <Title>Quer ser um tutor?</Title>
        <Description>
          Para começar, deve efetuar o seu registo na nossa plataforma web.
        </Description>
      </Background>

      <WebButton onPress={handleLinkToWeb}>
        <TextButton>Ir para versão web</TextButton>
      </WebButton>

      <Button onPress={handleAcess}>
        <TextButton>Voltar</TextButton>
      </Button>

    </Container>
  );
};

export default GiveClasses;
