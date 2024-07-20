import AddDonationUseCase from "../Application/UseCase/AddDonationUseCase"
import GetDonationsUseCase from "../Application/UseCase/GetAllDonationsUseCase"
import ConfirmDonationUseCase from "../Application/UseCase/ConfirmDonationUseCase"
import GetAssociationDonationsConfirmedUseCase from "../Application/UseCase/GetAssociationDonationsConfirmedUseCase"
import GetAssociationDonationsPendingsUseCase from "../Application/UseCase/GetAssociationDonationsPendingsUseCase"
import RankingDonationsUseCase from "../Application/UseCase/RankingDonationsUseCase"

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
import ConfirmDonationController from "./Controller/ConfirmDonationController"
import GetAssociationDonationsConfirmedController from "./Controller/GetAssociationsDonationsConfirmedController"
import GetAssociationDonationsPendingsController from "./Controller/GetAssociationDonationsPendingsController"
import RankingDonationsController from "./Controller/RankingDonationsController"

export const MySqlDonationRepository = new DonationMySQLRepository();
export const mysqldonation = MySqlDonationRepository

export const addDonationUseCase = new AddDonationUseCase(mysqldonation);
export const getDonationsUseCase = new GetDonationsUseCase(mysqldonation);
export const confirmDonationUseCase = new ConfirmDonationUseCase(mysqldonation);
export const getAssociationDonationsConfirmedUseCase = new GetAssociationDonationsConfirmedUseCase(mysqldonation);
export const getAssociationDonationsPendingsUseCase = new GetAssociationDonationsPendingsUseCase(mysqldonation);
export const rankingDonationsUseCase = new RankingDonationsUseCase(mysqldonation);

export const addDonationController = new AddDonationController(addDonationUseCase);
export const getDonationsController = new GetDonationsController(getDonationsUseCase);
export const confirmDonationController = new ConfirmDonationController(confirmDonationUseCase);
export const getAssociationDonationsConfirmedController = new GetAssociationDonationsConfirmedController(getAssociationDonationsConfirmedUseCase);
export const getAssociationDonationsPendingsController = new GetAssociationDonationsPendingsController(getAssociationDonationsPendingsUseCase);
export const rankingDonationsController = new RankingDonationsController(rankingDonationsUseCase);