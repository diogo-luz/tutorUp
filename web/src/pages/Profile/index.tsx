import React, { useRef, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';

import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import { UserData, useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';

import {
  ProfilePage,
  BG,
  ProfileContent,
  AvatarFieldset,
  FormFields,
  FormFooter,
} from './styles';

interface FormData {
  name: string;
  lastname: string;
  email: string;
  bio: string;
  whatsapp: string;
  subject: string;
  schedule: object;
  cost: number;
  avatar: string;
}

interface ScheduleItem {
  id: number;
  week_day: number;
  from: string;
  to: string;
}

const label_week_day = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
];

interface Data {
  value: number | string;
  label: string;
}

interface Subject {
  id: number | string;
  subject: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [subjects, setSubjects] = useState<Array<Data>>([]);

  useEffect(() => {
    async function getSubjects(): Promise<void> {
      const response = await api.get('/subjects');

      const allSubjects = await response.data.map(
        ({ id: value, subject: label }: Subject) => ({ value, label }),
      );

      setSubjects(allSubjects);
    }

    getSubjects();
  }, []);

  const [userData, setUserData] = useState({} as UserData);
  const [scheduleItems, setScheduleItems] = useState<Array<ScheduleItem>>([
    {
      id: 0,
      week_day: 0,
      from: '',
      to: '',
    },
  ]);

  useEffect(() => {
    async function getUserData(): Promise<void> {
      const response = await api.get('/users');

      setUserData(response.data);
      if (response.data.schedule) {
        setScheduleItems(response.data.schedule);
      }

      formRef.current?.setData({
        cost: response.data?.cost,
        subject: response.data?.subject_id,
        name: response.data?.name.split(' ')[0],
        lastname: response.data?.name.split(' ')[1],
        email: response.data?.email,
        whatsapp: response.data?.whatsapp,
        bio: response.data?.bio,
        avatar: response.data?.avatar,
      });
    }

    getUserData();
  }, [user]);

  const handleSubmit: SubmitHandler<FormData> = async data => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        lastname: Yup.string(),
        whatsapp: Yup.string(),
        email: Yup.string(),
        avatar: Yup.string(),
        bio: Yup.string().max(255),
        subject: Yup.string(),
        cost: Yup.number(),
        schedule: Yup.array().of(
          Yup.object().shape({
            week_day: Yup.number(),
            from: Yup.string(),
            to: Yup.string(),
          }),
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { bio, avatar, email, name, lastname, whatsapp } = data;

      const response = await api.put('/users', {
        name: `${name} ${lastname}`,
        email,
        whatsapp,
        bio,
        avatar,
      });

      updateUser(response.data.user);

      if (userData.subject) {
        const { subject, cost, schedule } = data;

        await api.put('/classes', {
          subject,
          cost,
          schedule,
        });
      }

      // disparar um toast
      addToast({
        type: 'success',
        title: 'Perfil atualizado com sucesso',
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
        title: 'Erro ao atualizar',
        description:
          'Ocorreu um erro ao atualizar o seu perfil, tente novamente.',
      });
    }
  };

  function addNewScheduleItem(): void {
    setScheduleItems([...scheduleItems, {} as ScheduleItem]);
  }

  function removeScheduleItem(index: number): void {
    const array = [...scheduleItems];
    array.splice(index, 1);

    setScheduleItems(array);
  }

  return (
    <ProfilePage>
      <PageHeader>
        <BG />
      </PageHeader>

      <ProfileContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <AvatarFieldset>
            <img
              src={
                userData?.avatar ||
                `https://avatars.dicebear.com/api/initials/${userData?.name}.svg`
              }
              alt="avatar"
            />
            <h1>{userData?.name}</h1>
            <span>{userData.subject}</span>
          </AvatarFieldset>

          <FormFields>
            <fieldset>
              <legend>Os seus dados</legend>
              <div className="fields">
                <Input name="name" label="Nome" />
                <Input name="lastname" label="Sobrenome" />
              </div>

              <div className="contactfields">
                <Input
                  className="email"
                  type="email"
                  name="email"
                  label="E-mail"
                />
                <Input name="whatsapp" label="Whatsapp" />
              </div>

              <Input
                className="avatar"
                type="text"
                name="avatar"
                label="URL do avatar"
              />
              <Textarea name="bio" label="Biografia" />
            </fieldset>

            {!userData.subject ? (
              ''
            ) : (
              <>
                <fieldset>
                  <legend>Sobre as aulas</legend>

                  <div className="subjectfields">
                    <Select
                      name="subject"
                      value={userData.subject}
                      label="Disciplina"
                      options={subjects}
                    />

                    <Input name="cost" label="Custo (valor hora)" />
                  </div>
                </fieldset>

                <fieldset>
                  <legend>
                    Horários disponíveis
                    <button type="button" onClick={addNewScheduleItem}>
                      + Novo horário
                    </button>
                  </legend>
                  {scheduleItems.map((schedule, index) => (
                    <div key={schedule.id} className="schedule-item">
                      <Select
                        name={`schedule[${index}].week_day`}
                        label="Dia da semana"
                        value={String(schedule.week_day)}
                        options={[
                          { value: 0, label: label_week_day[0] },
                          { value: 1, label: label_week_day[1] },
                          { value: 2, label: label_week_day[2] },
                          { value: 3, label: label_week_day[3] },
                          { value: 4, label: label_week_day[4] },
                          { value: 5, label: label_week_day[5] },
                          { value: 6, label: label_week_day[6] },
                        ]}
                      />
                      <Input
                        name={`schedule[${index}].from`}
                        value={schedule.from}
                        label="Das"
                        type="time"
                      />
                      <Input
                        value={schedule.to}
                        name={`schedule[${index}].to`}
                        label="Até"
                        type="time"
                      />

                      <button
                        onClick={() => removeScheduleItem(index)}
                        type="button"
                      >
                        Excluir horário
                      </button>
                    </div>
                  ))}
                </fieldset>
              </>
            )}

            <FormFooter>
              <p>
                <img src={warningIcon} alt="Aviso importante" />
                Importante! <br />
                Preencha todos os dados corretamente
              </p>
              <button type="submit">Guardar registo</button>
            </FormFooter>
          </FormFields>
        </Form>
      </ProfileContent>
    </ProfilePage>
  );
};

export default Profile;
