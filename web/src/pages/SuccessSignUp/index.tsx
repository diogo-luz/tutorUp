import React from 'react';
import { Link } from 'react-router-dom';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import { SuccessPage, SuccessContent } from './styles';

const SuccessResetPassword: React.FC = () => {
  return (
    <SuccessPage>
      <SuccessContent>
        <img src={successIcon} alt="Sucesso" />
        <h1>Registo concluído</h1>
        <p>
          Agora você faz parte da plataforma da TutorUp. Tenha uma ótima
          experiência.
        </p>

        <Link to={{ pathname: '/' }}>Voltar ao login</Link>
      </SuccessContent>
    </SuccessPage>
  );
};

export default SuccessResetPassword;
