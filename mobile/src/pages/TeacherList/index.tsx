import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';

function TeacherList() {
  const [classes, setClasses] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

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
    setIsFiltersVisible(!isFiltersVisible);
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
    setIsFiltersVisible(false);
  }
  
  return (
    <View style={styles.container}>
      <PageHeader 
        title="Tutors Disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFilterVisibility}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        { isFiltersVisible && (
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