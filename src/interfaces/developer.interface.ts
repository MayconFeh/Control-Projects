import { QueryResult } from "pg";

interface Developer {
  id: number;
  name: string;
  email: string;
}

type DeveloperCreate = Omit<Developer, "id">;
type DeveloperUpdate = Partial<DeveloperCreate>;
type DeveloperRetrive = Array<Developer>;
type DeveloperResult = QueryResult<Developer>;

export {
  Developer,
  DeveloperCreate,
  DeveloperUpdate,
  DeveloperRetrive,
  DeveloperResult
};
