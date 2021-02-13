import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  LandingImg,
  Title,
  TitleBold,
  ButtonContainer,
  Button,
  ButtonText,
  TotalText,
} from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => {
  const navigation = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    async function getConnections() {
      try {
        const { data } = await api.get('/connections');
        setTotalConnections(data.total);
      } catch {
        setTotalConnections(6969);
      }
    }

    getConnections();
  }, []);

  function handleGiveClasses() {
    navigation.navigate('GiveClasses');
  }

  function handleStudy() {
    navigation.navigate('Study');
  }

  return (
    <Container>
      <LandingImg source={landingImg} />
      <Title>
        Seja bem-vindo, {'\n'}
        <TitleBold>O que deseja fazer?</TitleBold>
      </Title>
      <ButtonContainer>
        <Button onPress={handleStudy} color="#9871F5">
          <Image source={studyIcon} />
          <ButtonText>Estudar</ButtonText>
        </Button>

        <Button onPress={handleGiveClasses} color="#04D361">
          <Image source={giveClassesIcon} />
          <ButtonText>Dar aulas</ButtonText>
        </Button>
      </ButtonContainer>

      <TotalText>
        Total de {totalConnections} conexões realizadas {'  '}
        <Image source={heartIcon} />
      </TotalText>
    </Container>
  );
};

export default Landing;
