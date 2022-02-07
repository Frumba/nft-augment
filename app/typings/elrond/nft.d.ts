declare module 'elrond/nft' {
  import { FileType } from '~/typings/enums/elrond';

  export interface INftGroup {
    title: string;
    nfts: INft[];
  }

  export interface INft {
    identifier: string;
    collection: string;
    attributes: string;
    nonce: number;
    type: Type;
    name: string;
    creator: string;
    royalties: number;
    uris: string[];
    url: string;
    media: Media[];
    isWhitelistedStorage: boolean;
    metadata: Metadata;
    balance?: string;
    ticker: string;
    tags?: string[];
  }

  export interface Media {
    url: string;
    fileSize: number;
    fileType: FileType;
    originalUrl: string;
    thumbnailUrl: string;
  }

  export interface Metadata {
    name?: string;
    image?: string;
    description?: string;
    attributes?: Attribute[];
    edition?: number;
  }

  export interface Attribute {
    key?: Key;
    value: string;
    trait_type: string;
  }

  export enum Key {
    Value = 'value',
  }

  export enum Type {
    NonFungibleESDT = 'NonFungibleESDT',
    SemiFungibleESDT = 'SemiFungibleESDT',
  }
}
