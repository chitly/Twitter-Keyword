import GCloud from '@google-cloud/bigquery';

import Config from './config';

export const getBigQueryClient = () => {
  const { BigQuery } = GCloud;
  const { CredentialsFile, ProjectId } = Config;
  return new BigQuery({
    keyFilename: CredentialsFile,
    projectId: ProjectId,
  });
};
