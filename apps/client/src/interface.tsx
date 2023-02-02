export interface IItem {
  id?: string;
  name: string;
  purchaseDate: Date | string;
  expiryDate: Date | string;
  storedIn: string;
  quantity: string;
  trashed: Boolean;
}

export interface ICategory {
  id?: string;
  name: string;
  dateCreated: Date | string;
  pantryDays: number;
  fridgeDays: number;
  freezerDays: number;
  Items?: IItem[];
}

export interface IUser {
  id?: string;
  password: string;
  name: string;
  image?: string;
  email: string;
  //supposed to be date value but it's causing alot of errors on console, to fix in future
  dateJoined: Date | string;
  Items?: IItem[];
  Categories?: ICategory[];
}

export interface IGoogleUser {
  aud: string;
  azp: string;
  email: string;
  email_verified: Boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: number;
}

export interface IToken {
  id: string;
  password: string;
  name: string;
  image: string;
  email: string;
  dateJoined: string;
  iat: number;
  exp: number;
}
