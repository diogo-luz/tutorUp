/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import { useToast } from '../../hooks/toast';
import { UserData, useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import warningIcon from '../../assets/images/icons/warning.svg';
import rocket from '../../assets/images/icons/rocket.svg';

import { TeacherFormPage, PageContent, FormFields, FormFooter } from './styles';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

interface FormData {
  bio: string;
  whatsapp: string;
  subject: string;
  cost: number;
  schedule: object;
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

const TeacherForm: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [userData, setUserData] = useState({} as UserData);
  const [scheduleItems, setScheduleItems] = useState<Array<ScheduleItem>>([
    {
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
        whatsapp: response.data?.whatsapp,
        bio: response.data?.bio,
      });
    }

    getUserData();
  }, [user]);

  const handleSubmit: SubmitHandler<FormData> = async data => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        whatsapp: Yup.string().required(),
        bio: Yup.string().max(255).required(),
        subject: Yup.string().required(),
        cost: Yup.number().required('Deve fornecer um preço para as aulas'),
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

      const { whatsapp, bio } = data;

      await api.put('/users', {
        whatsapp,
        bio,
      });

      const { subject, cost, schedule } = data;

      await api.post('/classes', {
        subject,
        cost,
        schedule,
      });

      history.push('/give-classes-success');
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
          'Ocorreu um erro ao atualizar os seus horários, tente novamente.',
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
    <TeacherFormPage>
      <PageHeader
        title="Que incrível! Você quer dar aulas."
        description="O primeiro passo é preencher este formulário de inscrição"
        Message={() => (
          <div className="message">
            <img src={rocket} alt="foguete" />
            <span>Prepare-se vai ser o máximo</span>
          </div>
        )}
      />

      <PageContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormFields>
            <fieldset>
              <legend>Os seus dados</legend>
              <Input name="whatsapp" label="Whatsapp" />

              <Textarea name="bio" label="Biografia" />
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>

              <div className="subjectfields">
                <Select
                  name="subject"
                  label="Disciplina"
                  options={[
                    { value: 'Artes', label: 'Artes' },
                    { value: 'História', label: 'História' },
                    { value: 'Português', label: 'Português' },
                    { value: 'Inglês', label: 'Inglês' },
                    { value: 'Geografia', label: 'Geografia' },
                    { value: 'Matemática', label: 'Matemática' },
                    { value: 'Física', label: 'Física' },
                    { value: 'Química', label: 'Química' },
                    { value: 'Biologia', label: 'Biologia' },
                    { value: 'Filosofia', label: 'Filosofia' },
                  ]}
                />

                <Input name="cost" label="Custo (valor/hora)" />
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
                <div key={index} className="schedule-item">
                  <Select
                    name={`schedule[${index}].week_day`}
                    label="Dia da semana"
                    value={schedule.week_day}
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
      </PageContent>
    </TeacherFormPage>
  );
};

export default TeacherForm;
