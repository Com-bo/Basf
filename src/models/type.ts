export enum DataType {
  'CDS' = 'CDS',
  'SharePoint' = 'SharePoint',
  'SQL' = 'SQL',
}

export interface IFilter {
  type?: string;
  value?: any;
  format?: string;
  properties: string[];
}

export enum WFStatus {
  Starting = 'Starting',
  Cancelled = 'Cancelled',
  ReturnToRequester = 'Return to Requester',
  Drafted = 'Drafted',
  Revoke = 'Revoke',
  Deleted = 'Deleted',
  Termination = 'Termination',
  Completed = 'Completed',
}
