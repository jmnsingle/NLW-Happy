import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

import mapMarker from '../../assets/images/logo-marker.svg';
import mapIcon from '../../utils/mapIcon';

import 'leaflet/dist/leaflet.css';

import { PageMap, CreateOrphanage } from './styles';
import api from '../../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <PageMap>
      <aside>
        <header>
          <img src={mapMarker} alt="Happy" />

          <h2>Escolha um orfanato nmo mapa</h2>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </header>

        <footer>
          <strong>Uberaba</strong>
          <span>Minas Gerais</span>
        </footer>

        <CreateOrphanage to="/orphanages/create">
          <FiPlus size={32} color="#fff" />
        </CreateOrphanage>
      </aside>

      <Map
        center={[-19.7412748, -47.9515105]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            position={[orphanage.latitude, orphanage.longitude]}
            icon={mapIcon}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              <p>{orphanage.name}</p>

              <Link to={`/orphanage/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>
    </PageMap>
  );
};

export default OrphanagesMap;
