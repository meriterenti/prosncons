export enum TypeEnum {pros = "pros", cons = "cons"}
export enum ActionEnum {remove = "remove", add = "add"}

export interface HandleChangeProps {
  type: TypeEnum;
  action: ActionEnum;
  value?: string;
}

export interface UserCredentialProps {
  userId?: string;
  groupId?: string;
}

export interface ListDataProps {
  pros?: string[];
  cons?: string[];
}
