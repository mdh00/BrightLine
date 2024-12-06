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

export const getServiceById = async (req, res, next) => {
  try{
    const serviceId = req.params.id;

    const service = await Service.findById(serviceId)

    if (service === null) {
      throw new NotFoundError("Service not found");
    }
    console.log("Service:", service);
    return res.status(200).json(service);
  } catch (error) {
    next(error);
  }
}

export const deleteService = async (req, res, next) => {
  try{
    const serviceId = req.params.id;
    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (deletedService === null) {
      throw new NotFoundError("Service not found");
    }
    return res.status(200).json({
      message: "Service deleted successfully",
      service: deletedService,
    });
  } catch (error) {
    next(error);
  }
}