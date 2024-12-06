import Service from "../persistence/Entities/services.js";
import { ServiceDTO } from "./dto/services.js";
import ValidationError from "../domain/errors/validation-error.js";
import NotFoundError from "../domain/errors/not-found-error.js";

export const getAllServices = async (req, res, next) => {
  try{
    const allservices = await Service.find();
    return res.status(200).json(allservices);
  } catch (error) {
    next(error);
  }

};

export const createService = async (req, res, next) => {
  try{
    const service = ServiceDTO.safeParse(req.body);
    if(!service.success){
      throw new ValidationError(job.error);
    }
    const createService = await Service.create(service.data);
    return res.status(201).json({
      message: "Service created successfully",
      service: createService,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
