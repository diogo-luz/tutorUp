/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';

import { SubmitHandler } from '@unform/core';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import { ListPage, SearchTeacher, List, Pages } from './styles';
import smile from '../../assets/images/icons/smile.svg';

interface FormData {
  subject: string;
  week_day: number;
  time: string;
}

interface Data {
  value: number | string;
  label: string;
}

interface Subject {
  id: number | string;
  subject: string;
}

const TeacherList: React.FC = () => {
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

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

  useEffect(() => {
    async function loadClasses(): Promise<void> {
      const response = await api.get('classes', {
        params: {
          page,
        },
      });

      setClasses(response.data.Teachers);
      setCount(response.data.count);
    }

    loadClasses();
  }, [page]);

  const searchTeachers: SubmitHandler<FormData> = async ({
    subject,
    week_day,
    time,
  }) => {
    const response = await api.get('/classes', {
      params: {
        page: 1,
        subject,
        week_day,
        time,
      },
    });

    setClasses(response.data.Teachers);
    setCount(response.data.count);
  };

  function handlePageCounter(pageNumber: number): void {
    setPage(pageNumber);
  }

  function getCount(counterNumber: number): number {
    return Math.ceil(counterNumber / 8);
  }

  return (
    <ListPage>
      <PageHeader
        title="Estes são os tutors disponíveis."
        Message={() => (
          <div className="message">
            <img src={smile} alt="smile" />
            <span>Nós temos {count} tutors</span>
          </div>
        )}
      >
        <SearchTeacher onSubmit={searchTeachers}>
          <Select name="subject" label="Disciplina" options={subjects} />
          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input type="time" name="time" label="Horário" />

          <button type="submit">Procurar</button>
        </SearchTeacher>
      </PageHeader>

      <List>
        {classes.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </List>
      <Pages
        count={getCount(count)}
        page={page}
        size="large"
        onChange={(event, page) => handlePageCounter(page)}
      />
    </ListPage>
  );
};

export default TeacherList;
