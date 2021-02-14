import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavouriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import defaultAvatar from '../../assets/images/default-avatar.png';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
  schedule: Array<{
    id: number;
    week_day: number;
    from: string;
    to: string;
  }>;
}

interface DayProps {
  name: string;
  value: number;
  schedule: Array<{
    id: number;
    week_day: number;
    from: string;
    to: string;
  }>;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
  show?: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited, show = true }) => {
  {if(!show){
    return null;
  }}
  
  const [isFavorite, setIsFavorite] = useState(favorited);

  function handleLinkToWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+351${teacher.whatsapp}`)
  }

  async function handleToggleFavorite() {
    if (isFavorite) {
      // remover dos favoritos
      await api.delete(`favorites/${teacher.id}`);

      setIsFavorite(false);
    } else {
      // adicionar aos favoritos
      await api.post('favorites', {
        teacher_id: teacher.id,
      });

      setIsFavorite(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={ teacher.avatar ? { uri: teacher.avatar } : defaultAvatar }
        />
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{teacher.name}</Text>
        <Text style={styles.subject}>{teacher.subject}</Text>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>{teacher.cost} €</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton, 
              isFavorite ? styles.favorited : {},
            ]}
          >
            { isFavorite 
              ? <Image source={unFavouriteIcon} /> 
              : <Image source={heartOutlineIcon} />}
          </RectButton>

          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contacto</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;