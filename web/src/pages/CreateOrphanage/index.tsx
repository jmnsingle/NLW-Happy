import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';

import api from '../../services/api';

import SideBar from '../../components/SideBar';
import mapIcon from '../../utils/mapIcon';

import {
  Container,
  InputBlock,
  ConfirmButton,
  ContainerButtonSelect,
  ButtonSelect,
} from './styles';

const CreateOrphanage: React.FC = () => {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingInHours, setOpeningInHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent): void {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>): any {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', openingInHours);
    data.append('open_on_weekends', String(openOnWeekends));

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/orphanages-map');
  }

  return (
    <Container>
      <SideBar />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-19.7412748, -47.9515105]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <InputBlock>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => (
                  <div>
                    <img key={image} src={image} alt={name} />
                    <button type="button">X</button>
                  </div>
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                type="file"
                name="new-image"
                id="image[]"
                onChange={handleSelectImages}
              />
            </InputBlock>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <InputBlock>
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={openingInHours}
                onChange={e => setOpeningInHours(e.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <ContainerButtonSelect>
                <ButtonSelect
                  type="button"
                  onClick={() => setOpenOnWeekends(true)}
                  active={openOnWeekends}
                >
                  Sim
                </ButtonSelect>
                <ButtonSelect
                  type="button"
                  onClick={() => setOpenOnWeekends(false)}
                  active={!openOnWeekends}
                  dontOpen
                >
                  Não
                </ButtonSelect>
              </ContainerButtonSelect>
            </InputBlock>
          </fieldset>

          <ConfirmButton type="submit">Confirmar</ConfirmButton>
        </form>
      </main>
    </Container>
  );
};

export default CreateOrphanage;
// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
