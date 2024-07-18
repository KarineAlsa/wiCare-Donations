import AddDonationUseCase from "../Application/UseCase/AddDonationUseCase"
import GetDonationsUseCase from "../Application/UseCase/GetAllDonationsUseCase"

import DonationMySQLRepository from "./Repository/DonationsRepositoryMySQL"


import {JWTS} from "./Service/JWT"
import {Crypt} from "./Service/EncryptService"
import { S3StorageService } from './Service/S3Storage';
import { Integrity } from "./Service/IntegrityService";

export const JWT = new JWTS();
export const CryptService = new Crypt();
export const S3Storage = new S3StorageService()
export const IntegrityService = new Integrity()

import AddDonationController from "../Infrastructure/Controller/AddDonationController"
import GetDonationsController from "./Controller/GetDonationsController"

export const MySqlDonationRepository = new DonationMySQLRepository();
export const mysqldonation = MySqlDonationRepository

export const addDonationUseCase = new AddDonationUseCase(mysqldonation);
export const getDonationsUseCase = new GetDonationsUseCase(mysqldonation);

export const addDonationController = new AddDonationController(addDonationUseCase);
export const getDonationsController = new GetDonationsController(getDonationsUseCase);