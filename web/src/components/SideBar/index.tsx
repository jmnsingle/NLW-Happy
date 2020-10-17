import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarker from '../../assets/images/logo-marker.svg';

import { Container } from './styles';

const SideBar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <Container>
      <img src={mapMarker} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </Container>
  );
};

export default SideBar;
