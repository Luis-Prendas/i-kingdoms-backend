import { Request, Response } from 'express';
import { Attribute } from '../../entities/attribute';
import AppDataSource from '../../data-source';

export const findAllAttributes = async (req: Request, res: Response) => {
  try {
    const attributeRepository = AppDataSource.getRepository(Attribute);
    const attributes = await attributeRepository.find();

    return res.status(200).json(attributes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los atributos', error });
  }
}

export const createAttribute = async (req: Request, res: Response) => {
  try {
    const { attri_name, up_attri_name, min_attri_name, up_min_attri_name } = req.body;

    const attribute = new Attribute(attri_name, up_attri_name, min_attri_name, up_min_attri_name);

    const attributeRepository = AppDataSource.getRepository(Attribute);
    const savedAttribute = await attributeRepository.save(attribute);

    return res.status(201).json(savedAttribute);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el atributo', error });
  }
};
