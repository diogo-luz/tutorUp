import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../components/InputFloatLabel';

import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import { ResetPassPage, LogoContent, ResetPassContent } from './styles';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface FormData {
  name: string;
  email: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit: SubmitHandler<FormData> = async data => {
    try {
      // Remove all previous errors
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Introduza um endereço de email válido')
          .required('E-mail obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      // validation passed
      const response = await api.post(`/reset-password`, { email: data.email });

      if (response.status !== 201) {
        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na recuperação',
          description:
            'Ocorreu um erro ao efetuar a recuperação da sua conta, colocou um email válido?',
        });

        return;
      }

      history.push('/reset-password-success');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      // disparar um toast
      addToast({
        type: 'error',
        title: 'Erro na recuperação',
        description:
          'Ocorreu um erro ao efetuar a recuperação da sua conta, tente novamente.',
      });
    }
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
