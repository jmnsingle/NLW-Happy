import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { MapEvent, Marker } from 'react-native-maps';

import mapMarker from '../../../assets/images/map-marker.png';

import { Container, Map, NextButton, NextButtonText } from './styles';

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const handleNextStep = useCallback(() => {
    navigation.navigate('OrphanageData', { position });
  }, []);

  const handleSelectPosition = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }, []);

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -19.7412748,
          longitude: -47.9515105,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarker}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </Map>

      <NextButton
        enabled={position.latitude !== 0}
        onPress={handleNextStep}
        disable={position.latitude === 0}
      >
        <NextButtonText>Próximo</NextButtonText>
      </NextButton>
    </Container>
  );
};

export default SelectMapPosition;
