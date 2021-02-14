import React, { useEffect, useRef } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../components/InputFloatLabel';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import { ResetPassPage, LogoContent, ResetPassContent } from './styles';

import api from '../../services/api';

interface RouteParams {
  token: string;
}

interface FormData {
  password: string;
}

const RecoverPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const params = useParams<RouteParams>();

  useEffect(() => {
    api
      .get(`/recover-password/${params.token}`)
      .then(data => {
        if (data.data.message !== 'valid token') {
          history.push('/');
        }
      })
      .catch(error => {
        console.log(error);
      });
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit: SubmitHandler<FormData> = data => {
    api.patch('/recover-password', {
      token: params.token,
      password: data.password,
    });
    history.push('/');
  };

  return (
    <ResetPassPage>
      <header>
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
      </header>

      <LogoContent>
        <div className="logo">
          <img src={logoImg} alt="TutorUp" />
          <span>A sua plataforma de estudos online</span>
        </div>
      </LogoContent>

      <ResetPassContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>
            Recuperar a sua senha
            <span>Já esta quase para recuperar !</span>
          </h1>

          <div className="inputs">
            <Input label="Password" name="password" type="password" />
          </div>

          <button
            className="submit-button"
            type="submit"
            onClick={() => handleSubmit}
          >
            Confirmar
          </button>
        </Form>
      </ResetPassContent>
    </ResetPassPage>
  );
};
export default RecoverPassword;
