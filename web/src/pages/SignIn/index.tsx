import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../components/InputFloatLabel';
import Checkbox from './components/Checkbox';

import { SignInCredentials, useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/images/logo.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import { LoginPage, LogoContent, LoginContent, Footer } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInCredentials) => {
      try {
        // Remove all previous errors
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Introduza um endereço de email válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        // validation passed
        await signIn(data);

        history.push('dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao efetuar o seu login, verifique as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <LoginPage>
      <LogoContent>
        <div className="logo">
          <img src={logoImg} alt="TutorUp" />
          <span>A sua plataforma de estudos online</span>
        </div>
      </LogoContent>

      <LoginContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Efetuar login</h1>

          <div className="inputs">
            <Input label="E-mail" name="email" type="email" />
            <Input label="Senha" name="password" type="password" />
          </div>

          <div className="login-options">
            <Checkbox
              name="checkbox"
              options={[{ id: 'yes', value: 'yes', label: 'Lembrar-me' }]}
            />
            <Link to="/reset-password">Esqueci-me da minha senha</Link>
          </div>

          <button className="submit-button" type="submit">
            Entrar
          </button>
        </Form>

        <Footer>
          <span>
            <p>Não tem conta?</p>
            <Link to="/signup">Registe-se</Link>
          </span>

          <span>
            É grátis <img src={purpleHeartIcon} alt="Coração roxo" />
          </span>
        </Footer>
      </LoginContent>
    </LoginPage>
  );
};

export default SignIn;
