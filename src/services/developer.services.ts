import format from "pg-format";
import { Developer,DeveloperCreate, DeveloperResult, DeveloperUpdate } from "../interfaces/developer.interface";
import { DeveloperInfosCreate, DeveloperInfosResult, DeveloperInfos, DevInfo} from "../interfaces/developerInfos.interface";
import { client } from "../database/database";

const create = async (payload: DeveloperCreate): Promise<Developer> => {
  const queryFormat: string = format(
    'INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );
  const query: DeveloperResult = await client.query(queryFormat);

  return query.rows[0];
};

const retrieve = async (devId: string): Promise<DevInfo> => {
  const query: DeveloperResult = await client.query(
    'SELECT * FROM "developers" WHERE "id" = $1',
    [devId]
  );
  const queryInfos: DeveloperInfosResult = await client.query(
    'SELECT * FROM "developerInfos" WHERE "developerId" = $1',
    [devId]
  );
  const dev = { ...query.rows[0] };
  const infos = { ...queryInfos.rows[0] };

  const Result: DevInfo = {
    developerId: dev.id,
    developerName: dev.name,
    developerEmail: dev.email,
    developerInfoDeveloperSince: infos.developerSince || null,
    developerInfoPreferredOS: infos.preferredOs || null,
  };

  return Result;
};

const destroy = async (devId: string): Promise<void> => {
  await client.query('DELETE FROM "developers" WHERE "id" = $1', [devId]);
};

const update = async (payload: DeveloperUpdate, devId: string): Promise<Developer> => {
  const queryFormat: string = format(
    'UPDATE "developers" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );
  const query: DeveloperResult = await client.query(queryFormat,[devId]);

  return query.rows[0];
};

const createInfos = async (payload: DeveloperInfosCreate): Promise<DeveloperInfos> => {
  const queryFormat: string = format(
    'INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: DeveloperInfosResult = await client.query(queryFormat);

  return query.rows[0];
};

export default { create, retrieve, destroy, update, createInfos }