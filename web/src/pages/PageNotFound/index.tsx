import React from 'react';
import { Link } from 'react-router-dom';

import notFoundIcon from '../../assets/images/icons/not-found-icon.svg';

import { SuccessPage, SuccessContent } from './styles';

const PageNotFound: React.FC = () => {
  return (
    <SuccessPage>
      <SuccessContent>
        <img src={notFoundIcon} alt="Not Found" />
        <h1>404: Não Encontrado</h1>
        <p>
          Oops. Não encontrámos aquilo que procuras! De certeza que estás no
          sítio certo?
        </p>

        <Link to={{ pathname: '/' }}>Voltar</Link>
      </SuccessContent>
    </SuccessPage>
  );
};

export default PageNotFound;
