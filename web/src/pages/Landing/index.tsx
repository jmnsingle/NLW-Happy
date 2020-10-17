import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import logo from '../../assets/images/logo.svg';

import { PageLanding, ContentWhraper, Location, EnterApp } from './styles';

const Landing: React.FC = () => {
  return (
    <PageLanding>
      <ContentWhraper>
        <img src={logo} alt="Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Location>
          <strong>Uberaba</strong>
          <span>Minas Gerais</span>
        </Location>
        <EnterApp to="/orphanages-map">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />{' '}
        </EnterApp>
      </ContentWhraper>
    </PageLanding>
  );
};

export default Landing;
