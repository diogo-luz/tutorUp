import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../components/InputFloatLabel';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import { SignUpPage, LogoContent, SignUpContent } from './styles';

import api from '../../services/api';

interface FormData {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit: SubmitHandler<FormData> = async data => {
    try {
      // Remove all previous errors
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().min(3).required('Nome obrigatório'),
        lastname: Yup.string().min(3).required('Sobrenome obrigatório'),
        email: Yup.string().email().required('E-mail obrigatório'),
        password: Yup.string()
          .min(6, 'No mínimo 6 caracteres')
          .required('Senha obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      // validation passed

      const { name, lastname, email, password } = data;

      await api.post('/users', {
        name: `${name} ${lastname}`,
        email,
        password,
      });

      history.push('/signup-success');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      // disparar um toast
      addToast({
        type: 'error',
        title: 'Erro no registo',
        description:
          'Ocorreu um erro ao efetuar o seu registo, tente novamente.',
      });
    }
  };

  return (
    <SignUpPage>
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
      <SignUpContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>
            Registo
            <span>Preencha os dados abaixo para começar.</span>
          </h1>

          <div className="inputs">
            <Input label="Nome" name="name" type="text" />
            <Input label="Sobrenome" name="lastname" type="text" />
            <Input label="E-mail" name="email" type="email" />
            <Input label="Senha" name="password" type="password" />
          </div>

          <button className="submit-button" type="submit">
            Concluir registo
          </button>
        </Form>
      </SignUpContent>
    </SignUpPage>
  );
};

export default SignUp;
