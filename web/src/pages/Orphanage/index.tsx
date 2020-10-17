import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import SideBar from '../../components/SideBar';
import mapIcon from '../../utils/mapIcon';

import {
  Container,
  OrphanageDetails,
  Images,
  Button,
  OrphanageDetailsContent,
  ContactButton,
  MapContainer,
  OpenDetails,
  Hour,
  OpenOnWeekends,
} from './styles';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    path: string;
    id: number;
  }>;
}

interface OrphanagesPrams {
  id: string;
}

const Orphanage: React.FC = () => {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { id } = useParams<OrphanagesPrams>();

  useEffect(() => {
    api.get(`orphanages/${id}`).then(response => {
      console.log(response.data);
      setOrphanage(response.data);
    });
  }, [id]);

  if (!orphanage) {
    return <p>Carregando ...</p>;
  }

  return (
    <Container>
      <SideBar />

      <main>
        <OrphanageDetails>
          <img
            src={orphanage.images[activeImageIndex].path}
            alt={orphanage.name}
          />

          <Images>
            {orphanage.images.map((image, index) => (
              <Button
                key={image.id}
                active={activeImageIndex === index}
                type="button"
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image.path} alt={orphanage.name} />
              </Button>
            ))}
          </Images>

          <OrphanageDetailsContent>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <MapContainer>
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[-27.2092052, -49.6401092]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </MapContainer>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <OpenDetails>
              <Hour>
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </Hour>
              {orphanage.open_on_weekends ? (
                <OpenOnWeekends open>
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </OpenOnWeekends>
              ) : (
                <OpenOnWeekends>
                  <FiInfo size={32} color="#ff6690" />
                  Não atendemos <br />
                  fim de semana
                </OpenOnWeekends>
              )}
            </OpenDetails>

            {/* <ContactButton type="button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </ContactButton> */}
          </OrphanageDetailsContent>
        </OrphanageDetails>
      </main>
    </Container>
  );
};

export default Orphanage;
