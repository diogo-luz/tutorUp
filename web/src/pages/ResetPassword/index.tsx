import React, { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../components/InputFloatLabel';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import { ResetPassPage, LogoContent, ResetPassContent } from './styles';

interface FormData {
  name: string;
  email: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit: SubmitHandler<FormData> = data => {
    history.push('/reset-password-success');
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
            Esqueceu-se da sua senha?
            <span>Não se preocupe, vamos tratar disso.</span>
          </h1>

          <div className="inputs">
            <Input label="E-mail" name="email" type="email" />
          </div>

          <button
            className="submit-button"
            type="submit"
            onClick={() => handleSubmit}
          >
            Enviar
          </button>
        </Form>
      </ResetPassContent>
    </ResetPassPage>
  );
};

export default ResetPassword;
