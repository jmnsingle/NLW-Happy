import React, { useCallback, useEffect, useState, use } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import mapMarker from '../../assets/images/map-marker.png';

import {
  Container,
  CalloutContainer,
  CalloutText,
  CreateOrphanageButton,
  Footer,
  FooterText,
  Map,
} from './styles';

interface OrphanageData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<OrphanageData[]>([]);

  const handleNavigationToOrphanageDetails = useCallback(
    (orphanage_id: number) => {
      navigation.navigate('OrphanageDetails', { id: orphanage_id });
    },
    [],
  );

  const handleNavigationToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, []);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      // console.log(response.data);
      setOrphanages(response.data);
    });
  });

  if (!orphanages) {
    return <ActivityIndicator size="large" color="#ff6690" />;
  }

  return (
    <Container>
      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -19.7412748,
          longitude: -47.9515105,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{ x: 2.7, y: 0.8 }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigationToOrphanageDetails(orphanage.id)}
            >
              <CalloutContainer>
                <CalloutText>{orphanage.name}</CalloutText>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </Map>

      <Footer>
        <FooterText>{`${orphanages.length} orphanatos encontrados`}</FooterText>

        <CreateOrphanageButton onPress={handleNavigationToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </CreateOrphanageButton>
      </Footer>
    </Container>
  );
};

export default OrphanagesMap;
