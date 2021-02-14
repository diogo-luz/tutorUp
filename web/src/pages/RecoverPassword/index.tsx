import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useHistory, Link, useParams } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../components/InputFloatLabel';

import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import { ResetPassPage, LogoContent, ResetPassContent } from './styles';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

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

  const { addToast } = useToast();

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
  const handleSubmit: SubmitHandler<FormData> = async data => {
    try {
      // Remove all previous errors
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string()
          .min(6, 'No mínimo 6 caracteres')
          .required('Senha obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      api.patch('/recover-password', {
        token: params.token,
        password: data.password,
      });

      // disparar um toast
      addToast({
        type: 'success',
        title: 'Senha alterada com sucesso',
        description: 'Já pode começar a utilizar a sua conta com a nova senha',
      });

      history.push('/');
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
            Redefinição de senha
            <span>
              Agora só tem de criar uma nova senha e poderá aceder novamente à
              sua conta.
            </span>
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
