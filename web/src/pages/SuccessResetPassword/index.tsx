import React from 'react';
import { Link } from 'react-router-dom';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import { SuccessPage, SuccessContent } from './styles';

const SuccessResetPassword: React.FC = () => {
  return (
    <SuccessPage>
      <SuccessContent>
        <img src={successIcon} alt="Sucesso" />
        <h1>Redefinição enviada!</h1>
        <p>
          Boa, agora é só aguardar pelo e-mail que lhe foi enviado para
          redefinir a sua senha e aproveitar a plataforma.
        </p>

        <Link to={{ pathname: '/' }}>Voltar ao login</Link>
      </SuccessContent>
    </SuccessPage>
  );
};

export default SuccessResetPassword;
