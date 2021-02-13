import React from 'react';
import { Link } from 'react-router-dom';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import { SuccessPage, SuccessContent } from './styles';

const SuccessClasses: React.FC = () => {
  return (
    <SuccessPage>
      <SuccessContent>
        <img src={successIcon} alt="Sucesso" />
        <h1>Registo guardado!</h1>
        <p>
          Tudo pronto, a sua ficha já está na nossa lista de tutors. Agora é só
          ficar de atento ao seu WhatsApp.
        </p>

        <Link to={{ pathname: '/study' }}>Aceder à lista</Link>
      </SuccessContent>
    </SuccessPage>
  );
};

export default SuccessClasses;
