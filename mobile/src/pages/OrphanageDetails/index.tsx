import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator, Linking } from 'react-native';

import api from '../../services/api';
import mapMarker from '../../assets/images/map-marker.png';

import {
  Container,
  ImagesContainer,
  Image,
  DetailsContainer,
  Title,
  Description,
  MapContainer,
  Map,
  RoutesContainer,
  RoutesText,
  Separator,
  ScheduleContainer,
  ScheduleItem,
  ScheduleText,
  ContactButton,
  ContactButtonText,
} from './styles';

interface OrphanageParams {
  id: number;
}

interface OrphanageData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    path: string;
  }>;
}

const OrphanageDetails: React.FC = () => {
  const route = useRoute();

  const { id } = route.params as OrphanageParams;

  const [orphanage, setOrphanage] = useState<OrphanageData>();

  const handleNavigationToGoogleMaps = useCallback(() => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`,
    );
  }, []);

  useEffect(() => {
    api.get(`orphanages/${id}`).then(response => {
      setOrphanage(response.data);
    });
  }, [id]);

  if (!orphanage) {
    return <ActivityIndicator size="large" color="#ff6690" />;
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(image => (
            <Image
              source={{
                uri: image.path,
              }}
            />
          ))}
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>{orphanage.name}</Title>
        <Description>{orphanage.about}</Description>

        <MapContainer>
          <Map
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarker}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </Map>

          <RoutesContainer onPress={handleNavigationToGoogleMaps}>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <ScheduleItem color="blue">
            <Feather name="clock" size={40} color="#2AB5D1" />
            <ScheduleText color="blue">{orphanage.opening_hours}</ScheduleText>
          </ScheduleItem>
          {orphanage.open_on_weekends ? (
            <ScheduleItem color="green">
              <Feather name="info" size={40} color="#39CC83" />
              <ScheduleText color="green">Atendemos fim de semana</ScheduleText>
            </ScheduleItem>
          ) : (
            <ScheduleItem color="red">
              <Feather name="info" size={40} color="#ff6690" />
              <ScheduleText color="red">
                Não atendemos fim de semana
              </ScheduleText>
            </ScheduleItem>
          )}
        </ScheduleContainer>

        <ContactButton onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
      </DetailsContainer>
    </Container>
  );
};

export default OrphanageDetails;
