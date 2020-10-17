import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_views';

class OrphanagesController {
    async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;

        const orphanageRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images,
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });


        const orphanage = orphanageRepository.create(data);

        await orphanageRepository.save(orphanage);

        return response.status(201).json(orphanage);
    }

    async index(request: Request, response: Response): Promise<Response> {
        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find({relations: ['images']});

        return response.json(orphanageView.renderMany(orphanages));
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { orphanage_id } = request.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail({ where: {
            id: orphanage_id,
        }, relations: ['images']});

        return response.json(orphanageView.render(orphanage));
    }
}

export default OrphanagesController;