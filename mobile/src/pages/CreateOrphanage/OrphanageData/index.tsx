import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Switch } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import api from '../../../services/api';

import {
  Container,
  Title,
  Label,
  Input,
  PreviewImagesContainer,
  PreviewImage,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
} from './styles';

interface OrphanageParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageData: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as OrphanageParams;

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingInHours, setOpeningInHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  // const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', openingInHours);
    data.append('open_on_weekends', String(openOnWeekends));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    previewImages.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.png`,
        type: 'image/png',
        uri: image,
      } as any);
    });

    await api.post('orphanages', data);

    navigation.navigate('OrphanagesMap');
  }

  // const handleCreateOrphanage = useCallback(async () => {
  //   const { latitude, longitude } = params.position;

  //   const data = new FormData();

  //   data.append('name', name);
  //   data.append('about', about);
  //   data.append('instructions', instructions);
  //   data.append('opening_in_hours', openingInHours);
  //   data.append('open_on_weekends', String(openOnWeekends));
  //   data.append('latitude', String(latitude));
  //   data.append('longitude', String(longitude));

  //   previewImages.forEach((image, index) => {
  //     data.append('images', {
  //       name: `image_${index}.png`,
  //       type: 'image/png',
  //       uri: image,
  //     } as any);
  //   });

  //   await api.post('orphanages', data);

  //   navigation.navigate('OrphanageMap');
  // }, []);

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Precisamos desse acesso');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setPreviewImages([...previewImages, image]);
  }

  // const handleSelectImages = useCallback(async () => {
  //   const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

  //   if (status !== 'granted') {
  //     alert('Precisamos desse acesso');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //   });

  //   if (result.cancelled) {
  //     return;
  //   }

  //   const { uri: image } = result;

  //   setPreviewImages([...previewImages, image]);
  // }, []);

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>Dados</Title>

      <Label>Nome</Label>
      <Input value={name} onChangeText={setName} />

      <Label>Sobre</Label>
      <Input
        style={{ height: 110 }}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      {/* <Label>Whatsapp</Label>
      <Input value={name} onChangeText={setName} /> */}

      <Label>Fotos</Label>

      <PreviewImagesContainer>
        {previewImages.map(previewImage => (
          <PreviewImage key={previewImage} source={{ uri: previewImage }} />
        ))}
      </PreviewImagesContainer>

      <ImagesInput onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <Title>Visitação</Title>

      <Label>Instruções</Label>
      <Input
        style={{ height: 110 }}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Label>Horario de visitas</Label>
      <Input value={openingInHours} onChangeText={setOpeningInHours} />

      <SwitchContainer>
        <Label>Atende final de semana?</Label>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={openOnWeekends}
          onValueChange={setOpenOnWeekends}
        />
      </SwitchContainer>

      <NextButton onPress={handleCreateOrphanage}>
        <NextButtonText>Cadastrar</NextButtonText>
      </NextButton>
    </Container>
  );
};

export default OrphanageData;
