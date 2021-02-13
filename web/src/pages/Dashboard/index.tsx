import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import logoutIcon from '../../assets/images/icons/logout.svg';

import { LandingPage, LandingContent, Footer, Content } from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [totalConnections, setTotalConnections] = useState(0);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function getConnections(): Promise<void> {
      const { data } = await api.get('/connections');
      const response = await api.get('/users');

      setAvatar(response.data.avatar);
      setTotalConnections(data.total);
    }

    getConnections();
  }, []);

  const handleLogOut = useCallback(() => {
    signOut();

    window.location.reload(false);
  }, [signOut]);

  return (
    <LandingPage>
      <header>
        <Link to="/profile" id="user">
          <img
            src={
              avatar ||
              `https://avatars.dicebear.com/api/initials/${user?.name}.svg`
            }
            alt="Avatar do utilizador"
          />
          {user?.name}
        </Link>
        <button type="button" onClick={handleLogOut}>
          <img src={logoutIcon} alt="Sair" />
        </button>
      </header>

      <LandingContent>
        <div className="logo-container">
          <img src={logoImg} alt="TutorUp" />
          <h2>A sua plataforma de estudos online.</h2>
        </div>

        <img src={landingImg} alt="Plataforma de estudos" />
      </LandingContent>

      <Footer>
        <Content>
          <div className="welcome">
            <span>Seja bem-vindo.</span>
            <h1>O que deseja fazer?</h1>
          </div>

          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Dar aulas" />
              Dar aulas
            </Link>
          </div>

          <div className="total-connections">
            <span>
              Total de {totalConnections} conexões realizadas
              <img src={purpleHeartIcon} alt="Coração Roxo" />
            </span>
          </div>
        </Content>
      </Footer>
    </LandingPage>
  );
};

export default Dashboard;
