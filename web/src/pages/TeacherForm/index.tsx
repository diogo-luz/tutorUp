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
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import warningIcon from '../../assets/images/icons/warning.svg';
import rocket from '../../assets/images/icons/rocket.svg';

import { TeacherFormPage, PageContent, FormFields, FormFooter } from './styles';

interface ScheduleItem {
  id: number;
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

interface Data {
  value: number | string;
  label: string;
}

interface Subject {
  id: number | string;
  subject: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();
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

      if (response.data.schedule) {
        setScheduleItems(response.data.schedule);
      }

      formRef.current?.setData({
        whatsapp: response.data?.whatsapp,
        bio: response.data?.bio,
        subject: response.data?.subject_id,
        cost: response.data?.cost,
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
              <legend>Sobre as aulas</legend>

              <div className="subjectfields">
                <Select name="subject" label="Disciplina" options={subjects} />

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
