import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';

function TeacherList() {
  const [classes, setClasses] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    async function loadFavorites(): Promise<void> {
      const response = await api.get('favorites');

      if (response) {
        const favoritedTeachers = response.data;
        const favoriteTeacherIds = favoritedTeachers.map((teacher: any) => {
          return teacher.teacher_id;
        })

        setFavorites(favoriteTeacherIds);
      }
    }

    loadFavorites();
  }, []);

  useEffect(() => {
    async function loadClasses(): Promise<void> {
      const response = await api.get('classes');

      setClasses(response.data.Teachers);
    }

    loadClasses();
  }, []);

  function handleToggleFilterVisibility() {
    setIsFilterVisible(!isFilterVisible);
  }

  async function handleFilterSubmit() {
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setClasses(response.data.Teachers);
    setIsFilterVisible(false);
  }
  
  return (
    <View style={styles.container}>
      <PageHeader 
        title="Tutors Disponíveis" 
        headerRight={(
          // <BorderlessButton onPress={handleToggleFilterVisibility}>
          //   <Feather name="filter" size={20} color="#fff" />
          // </BorderlessButton>
          <TouchableOpacity
            onPress={handleToggleFilterVisibility}
            style={styles.filterContainer}
          >
            <Feather name="filter" size={20} color="#04D361" />
            <Text style={styles.filterText}>
              Filtrar por dia, hora e disciplina
            </Text>
          </TouchableOpacity>
        )}
      >
        {/* { isFilterVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Disciplina</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={text => setSubject(text)}
                placeholder="Disciplina"
                placeholderTextColor='#c1bccc'
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da Semana</Text>
                  <TextInput
                    style={styles.input}
                    value={week_day}
                    onChangeText={text => setWeekDay(text)}
                    placeholder="Dia"
                    placeholderTextColor='#c1bccc'
                  />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={text => setTime(text)}
                    placeholder="Hora"
                    placeholderTextColor='#c1bccc'
                  />
                </View>
              </View>

              <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
            </View>
        )} */}

            {isFilterVisible && (
              <View style={styles.searchForm}>
                <Text style={styles.label}>Disciplina</Text>
                <Select
                  selectedValue={subject}
                  items={[
                    {value: '', label: 'Selecionar'},
                    { value: 'Português', label: 'Português' },
                    { value: 'Matemática', label: 'Matemática' },
                    { value: 'Geografia', label: 'Geografia' },
                    { value: 'História', label: 'História' },
                    { value: 'Química', label: 'Química' },
                    { value: 'Física', label: 'Física' },
                    { value: 'Biologia', label: 'Biologia' },
                    { value: 'Inglês', label: 'Inglês' },
                  ]}
                  onValueChange={async (value) => {
                    setSubject(value);                 
                  }}
                />

                <View style={styles.inputGroup}>
                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Dia</Text>
                    <Select
                      selectedValue={week_day}
                      items={[
                        { value: '', label: 'Selecionar' },
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' },
                      ]}
                      onValueChange={(value) => setWeekDay(value)}
                    />
                  </View>

                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Hora</Text>
                    <Select
                      selectedValue={time}
                      items={[
                        { value: '', label: 'Selecionar' },
                        { value: '01:00', label: '01:00' },
                        { value: '02:00', label: '02:00' },
                        { value: '03:00', label: '03:00' },
                        { value: '04:00', label: '04:00' },
                        { value: '05:00', label: '05:00' },
                        { value: '06:00', label: '06:00' },
                        { value: '07:00', label: '07:00' },
                        { value: '08:00', label: '08:00' },
                        { value: '09:00', label: '09:00' },
                        { value: '10:00', label: '10:00' },
                        { value: '11:00', label: '11:00' },
                        { value: '12:00', label: '12:00' },
                        { value: '13:00', label: '13:00' },
                        { value: '14:00', label: '14:00' },
                        { value: '15:00', label: '15:00' },
                        { value: '16:00', label: '16:00' },
                        { value: '17:00', label: '17:00' },
                        { value: '18:00', label: '18:00' },
                        { value: '19:00', label: '19:00' },
                        { value: '20:00', label: '20:00' },
                        { value: '21:00', label: '21:00' },
                        { value: '22:00', label: '22:00' },
                        { value: '23:00', label: '23:00' },
                        { value: '00:00', label: '00:00' },
                      ]}
                      onValueChange={(value) => setTime(value)}
                    />  
                  </View>
                  
                </View>
                <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Filtrar</Text>
                </RectButton>
              </View>
            )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {classes.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher?.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        } )}
      </ScrollView>
    </View>
  );
}

export default TeacherList;