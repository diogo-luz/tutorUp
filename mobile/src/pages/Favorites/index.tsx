import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import styles from './styles'

function Favorites() {
  const [classes, setClasses] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

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
  
  return (
    <View style={styles.container}>
      <PageHeader title="Tutors Favoritos" />

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
              show={favorites.includes(teacher.id)}
            />
          )
        } )}
      </ScrollView>
    </View>
  );
}

export default Favorites;