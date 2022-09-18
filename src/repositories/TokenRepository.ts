import dataSource from "../data-source";
import { RefreshToken } from "../models/RefreshToken";

export const TokenRepository = dataSource.getRepository(RefreshToken);
