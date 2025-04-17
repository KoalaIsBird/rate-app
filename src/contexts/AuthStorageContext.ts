import { createContext } from "react";
import AuthStorage from "../utils/authStorage";
import { UniqueDirectiveNamesRule } from "graphql";

export const AuthStorageContext = createContext<AuthStorage | undefined>(undefined)