import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from '../../hooks/auth';

import defaultAvatar from '../../assets/images/default-avatar.png';
import logo from '../../assets/images/logo.png';
import goBackIcon from '../../assets/images/icons/goBackWhite.png';
import attentionIcon from '../../assets/images/icons/attention.png';
import backgroundImage from '../../assets/images/profileBackground.png';

import InputForm from '../../components/InputForm';
import Button from '../../components/Button';

import styles from './styles';
import api from '../../services/api';

const Profile = () => {
  const { goBack, navigate } = useNavigation();
  const { user, updateUser } = useAuth();

  const [firstName, setFirstName] = useState(user?.name.split(' ')[0]);
  const [lastName, setLastName] = useState(user?.name.split(' ')[1]);
  const [email, setEmail] = useState(user?.email);
  const [bio, setBio] = useState(user?.bio);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp);

  const emailRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const whatsappRef = useRef<TextInput>(null);

  const navigateBack = useCallback(() => {
    goBack();
  }, []);

  const handleSubmit = useCallback(async () => {
    const updatedUser = { bio, avatar, email, name: `${firstName} ${lastName}`, whatsapp };

    const response = await api.put('users', updatedUser);

    updateUser(response.data.user);

    navigate('Landing');
  }, [firstName, lastName, email]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack}>
          <Image source={goBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <Image source={logo} resizeMode={'contain'} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.container}>
            <View style={styles.banner}>
              <ImageBackground
                source={backgroundImage}
                style={styles.background}
                resizeMode="contain"
              >
                <View style={{ height: 175 }}>
                  <Image
                    style={styles.avatar}
                    source={
                      user?.avatar ? { uri: user.avatar } : defaultAvatar
                    }
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.userName}>
                  {user?.name}
                </Text>
              </ImageBackground>
            </View>

            <View style={styles.content}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.card}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 25,
                  backgroundColor: '#EBEBF5',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              >
                <View style={styles.form}>
                  <Text style={styles.formTitle}>Os seus dados</Text>

                  <InputForm
                    name="firstName"
                    value={firstName}
                    label="Nome"
                    returnKeyType="next"
                    onSubmitEditing={() => lastNameRef.current?.focus()}
                    onChangeText={(value) => setFirstName(value)}
                  />

                  <InputForm
                    ref={lastNameRef}
                    value={lastName}
                    name="lastName"
                    label="Sobrenome"
                    returnKeyType="next"
                    onSubmitEditing={() => whatsappRef.current?.focus()}
                    onChangeText={(value) => setLastName(value)}
                  />

                  <InputForm
                    ref={whatsappRef}
                    value={whatsapp}
                    name="whatsapp"
                    label="Whatsapp"
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                    onChangeText={(value) => setWhatsapp(value)}
                  />

                  <InputForm
                    ref={emailRef}
                    value={email}
                    autoCorrect={false}
                    autoCapitalize="none"
                    name="email"
                    label="E-mail"
                    onSubmitEditing={handleSubmit}
                    onChangeText={(value) => setEmail(value)}
                  />
                </View>

                <View style={styles.footer}>
                  <Button title="Guardar alterações" onPress={handleSubmit} />
                  <View style={styles.warningContainer}>
                    <Image source={attentionIcon} style={{ marginRight: 10 }} />
                    <View>
                      <Text style={styles.warningTitle}>Importante!</Text>
                      <Text style={styles.warningDescription}>
                        Preencha todos os dados corretamente
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Profile;
