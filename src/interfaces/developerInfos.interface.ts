import { QueryResult } from "pg";

interface DeveloperInfos {
  id: number;
  developerSince: Date;
  preferredOs: "Windows" | "Linux" | "MacOS";
  developerId: number;
}

type DeveloperInfosCreate = Omit<DeveloperInfos, "id" | "developerId">;
type DeveloperInfosResult = QueryResult<DeveloperInfos>;

interface DevInfo {
  developerId: number;
  developerName: string;
  developerEmail: string;
  developerInfoDeveloperSince: Date | null;
  developerInfoPreferredOS: "Windows" | "Linux" | "MacOS" | null;
}

export { DeveloperInfos, DeveloperInfosCreate, DeveloperInfosResult, DevInfo };
