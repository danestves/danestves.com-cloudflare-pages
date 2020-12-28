import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03 (YYYY-MM-DD), compliant with ISO 8601 standard for representation of dates using the Gregorian calendar. */
  Date: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the date-timeformat outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representationof dates and times using the Gregorian calendar. */
  DateTime: any
  Hex: any
  /** Raw JSON value */
  Json: any
  /** The Long scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any
  RGBAHue: any
  RGBATransparency: any
  /** Slate-compatible RichText AST */
  RichTextAST: any
}

export type Aggregate = {
  __typename?: 'Aggregate'
  count: Scalars['Int']
}

/** Asset system model */
export type Asset = Node & {
  __typename?: 'Asset'
  /** System stage field */
  stage: Stage
  /** System Locale field */
  locale: Locale
  /** Get the other localizations for this document */
  localizations: Array<Asset>
  /** Get the document in other stages */
  documentInStages: Array<Asset>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  /** The file handle */
  handle: Scalars['String']
  /** The file name */
  fileName: Scalars['String']
  /** The height of the file */
  height?: Maybe<Scalars['Float']>
  /** The file width */
  width?: Maybe<Scalars['Float']>
  /** The file size */
  size?: Maybe<Scalars['Float']>
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']>
  coverImagePost: Array<Post>
  seoImage: Array<Seo>
  coverPortfolio: Array<Portfolio>
  /** List of Asset versions */
  history: Array<Version>
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String']
}

/** Asset system model */
export type AssetLocalizationsArgs = {
  locales?: Array<Locale>
  includeCurrent?: Scalars['Boolean']
}

/** Asset system model */
export type AssetDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation
}

/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation
}

/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation
}

/** Asset system model */
export type AssetCoverImagePostArgs = {
  where?: Maybe<PostWhereInput>
  orderBy?: Maybe<PostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

/** Asset system model */
export type AssetSeoImageArgs = {
  where?: Maybe<SeoWhereInput>
  orderBy?: Maybe<SeoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

/** Asset system model */
export type AssetCoverPortfolioArgs = {
  where?: Maybe<PortfolioWhereInput>
  orderBy?: Maybe<PortfolioOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

/** Asset system model */
export type AssetUrlArgs = {
  transformation?: Maybe<AssetTransformationInput>
}

export type AssetConnectInput = {
  /** Document to connect */
  where: AssetWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<AssetEdge>
  aggregate: Aggregate
}

export type AssetCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  coverImagePost?: Maybe<PostCreateManyInlineInput>
  seoImage?: Maybe<SeoCreateManyInlineInput>
  coverPortfolio?: Maybe<PortfolioCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<AssetCreateLocalizationsInput>
}

export type AssetCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput
  locale: Locale
}

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<AssetCreateLocalizationInput>>
}

export type AssetCreateManyInlineInput = {
  /** Create and connect multiple existing Asset documents */
  create?: Maybe<Array<AssetCreateInput>>
  /** Connect multiple existing Asset documents */
  connect?: Maybe<Array<AssetWhereUniqueInput>>
}

export type AssetCreateOneInlineInput = {
  /** Create and connect one Asset document */
  create?: Maybe<AssetCreateInput>
  /** Connect one existing Asset document */
  connect?: Maybe<AssetWhereUniqueInput>
}

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge'
  /** The item at the end of the edge. */
  node: Asset
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AssetWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AssetWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AssetWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  coverImagePost_every?: Maybe<PostWhereInput>
  coverImagePost_some?: Maybe<PostWhereInput>
  coverImagePost_none?: Maybe<PostWhereInput>
  seoImage_every?: Maybe<SeoWhereInput>
  seoImage_some?: Maybe<SeoWhereInput>
  seoImage_none?: Maybe<SeoWhereInput>
  coverPortfolio_every?: Maybe<PortfolioWhereInput>
  coverPortfolio_some?: Maybe<PortfolioWhereInput>
  coverPortfolio_none?: Maybe<PortfolioWhereInput>
}

export enum AssetOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
}

/** Transformations for Assets */
export type AssetTransformationInput = {
  image?: Maybe<ImageTransformationInput>
  document?: Maybe<DocumentTransformationInput>
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: Maybe<Scalars['Boolean']>
}

export type AssetUpdateInput = {
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  coverImagePost?: Maybe<PostUpdateManyInlineInput>
  seoImage?: Maybe<SeoUpdateManyInlineInput>
  coverPortfolio?: Maybe<PortfolioUpdateManyInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<AssetUpdateLocalizationsInput>
}

export type AssetUpdateLocalizationDataInput = {
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type AssetUpdateLocalizationInput = {
  data: AssetUpdateLocalizationDataInput
  locale: Locale
}

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<AssetCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<AssetUpdateLocalizationInput>>
  upsert?: Maybe<Array<AssetUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<Locale>>
}

export type AssetUpdateManyInlineInput = {
  /** Create and connect multiple Asset documents */
  create?: Maybe<Array<AssetCreateInput>>
  /** Connect multiple existing Asset documents */
  connect?: Maybe<Array<AssetConnectInput>>
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: Maybe<Array<AssetWhereUniqueInput>>
  /** Update multiple Asset documents */
  update?: Maybe<Array<AssetUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Asset documents */
  upsert?: Maybe<Array<AssetUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Asset documents */
  disconnect?: Maybe<Array<AssetWhereUniqueInput>>
  /** Delete multiple Asset documents */
  delete?: Maybe<Array<AssetWhereUniqueInput>>
}

export type AssetUpdateManyInput = {
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  /** Optional updates to localizations */
  localizations?: Maybe<AssetUpdateManyLocalizationsInput>
}

export type AssetUpdateManyLocalizationDataInput = {
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type AssetUpdateManyLocalizationInput = {
  data: AssetUpdateManyLocalizationDataInput
  locale: Locale
}

export type AssetUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: Maybe<Array<AssetUpdateManyLocalizationInput>>
}

export type AssetUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: AssetWhereInput
  /** Update many input */
  data: AssetUpdateManyInput
}

export type AssetUpdateOneInlineInput = {
  /** Create and connect one Asset document */
  create?: Maybe<AssetCreateInput>
  /** Update single Asset document */
  update?: Maybe<AssetUpdateWithNestedWhereUniqueInput>
  /** Upsert single Asset document */
  upsert?: Maybe<AssetUpsertWithNestedWhereUniqueInput>
  /** Connect existing Asset document */
  connect?: Maybe<AssetWhereUniqueInput>
  /** Disconnect currently connected Asset document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Asset document */
  delete?: Maybe<Scalars['Boolean']>
}

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: AssetWhereUniqueInput
  /** Document to update */
  data: AssetUpdateInput
}

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  create: AssetCreateInput
  /** Update document if it exists */
  update: AssetUpdateInput
}

export type AssetUpsertLocalizationInput = {
  update: AssetUpdateLocalizationDataInput
  create: AssetCreateLocalizationDataInput
  locale: Locale
}

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: AssetWhereUniqueInput
  /** Upsert data */
  data: AssetUpsertInput
}

/** Identifies documents */
export type AssetWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AssetWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AssetWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AssetWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  handle?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  handle_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  handle_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  handle_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  handle_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  handle_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  handle_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  handle_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  handle_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  handle_not_ends_with?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  fileName_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  fileName_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  fileName_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  fileName_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  fileName_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  fileName_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  fileName_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  fileName_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  fileName_not_ends_with?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  height_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  height_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  height_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  height_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  height_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  height_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  height_gte?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  width_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  width_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  width_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  width_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  width_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  width_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  width_gte?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  size_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  size_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  size_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  size_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  size_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  size_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  size_gte?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  mimeType_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  mimeType_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  mimeType_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  mimeType_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  mimeType_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  mimeType_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  mimeType_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  mimeType_not_ends_with?: Maybe<Scalars['String']>
  coverImagePost_every?: Maybe<PostWhereInput>
  coverImagePost_some?: Maybe<PostWhereInput>
  coverImagePost_none?: Maybe<PostWhereInput>
  seoImage_every?: Maybe<SeoWhereInput>
  seoImage_some?: Maybe<SeoWhereInput>
  seoImage_none?: Maybe<SeoWhereInput>
  coverPortfolio_every?: Maybe<PortfolioWhereInput>
  coverPortfolio_some?: Maybe<PortfolioWhereInput>
  coverPortfolio_none?: Maybe<PortfolioWhereInput>
}

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type BatchPayload = {
  __typename?: 'BatchPayload'
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long']
}

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  __typename?: 'Color'
  hex: Scalars['Hex']
  rgba: Rgba
  css: Scalars['String']
}

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: Maybe<Scalars['Hex']>
  rgba?: Maybe<RgbaInput>
}

export type ConnectPositionInput = {
  /** Connect document after specified document */
  after?: Maybe<Scalars['ID']>
  /** Connect document before specified document */
  before?: Maybe<Scalars['ID']>
  /** Connect document at first position */
  start?: Maybe<Scalars['Boolean']>
  /** Connect document at last position */
  end?: Maybe<Scalars['Boolean']>
}

export enum DocumentFileTypes {
  Jpg = 'jpg',
  Odp = 'odp',
  Ods = 'ods',
  Odt = 'odt',
  Png = 'png',
  Svg = 'svg',
  Txt = 'txt',
  Webp = 'webp',
  Docx = 'docx',
  Pdf = 'pdf',
  Html = 'html',
  Doc = 'doc',
  Xlsx = 'xlsx',
  Xls = 'xls',
  Pptx = 'pptx',
  Ppt = 'ppt',
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   */
  format?: Maybe<DocumentFileTypes>
}

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: Maybe<DocumentOutputInput>
}

export type DocumentVersion = {
  __typename?: 'DocumentVersion'
  id: Scalars['ID']
  stage: Stage
  revision: Scalars['Int']
  createdAt: Scalars['DateTime']
  data?: Maybe<Scalars['Json']>
}

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
  Crop = 'crop',
  /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
  Scale = 'scale',
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
  Max = 'max',
}

export type ImageResizeInput = {
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: Maybe<Scalars['Int']>
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: Maybe<Scalars['Int']>
  /** The default value for the fit parameter is fit:clip. */
  fit?: Maybe<ImageFit>
}

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  resize?: Maybe<ImageResizeInput>
}

/** Locale system enumeration */
export enum Locale {
  /** System locale */
  EsVe = 'es_VE',
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  __typename?: 'Location'
  latitude: Scalars['Float']
  longitude: Scalars['Float']
  distance: Scalars['Float']
}

/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput
}

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  latitude: Scalars['Float']
  longitude: Scalars['Float']
}

export type Mutation = {
  __typename?: 'Mutation'
  /**
   * Create one asset
   * @deprecated Asset mutations will be overhauled soon
   */
  createAsset?: Maybe<Asset>
  /** Update one asset */
  updateAsset?: Maybe<Asset>
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<Asset>
  /** Upsert one asset */
  upsertAsset?: Maybe<Asset>
  /** Publish one asset */
  publishAsset?: Maybe<Asset>
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAsset?: Maybe<Asset>
  /** Update many Asset documents */
  updateManyAssetsConnection: AssetConnection
  /** Delete many Asset documents, return deleted documents */
  deleteManyAssetsConnection: AssetConnection
  /** Publish many Asset documents */
  publishManyAssetsConnection: AssetConnection
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAssetsConnection: AssetConnection
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  updateManyAssets: BatchPayload
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  deleteManyAssets: BatchPayload
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  publishManyAssets: BatchPayload
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  unpublishManyAssets: BatchPayload
  /** Create one page */
  createPage?: Maybe<Page>
  /** Update one page */
  updatePage?: Maybe<Page>
  /** Delete one page from _all_ existing stages. Returns deleted document. */
  deletePage?: Maybe<Page>
  /** Upsert one page */
  upsertPage?: Maybe<Page>
  /** Publish one page */
  publishPage?: Maybe<Page>
  /** Unpublish one page from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishPage?: Maybe<Page>
  /** Update many Page documents */
  updateManyPagesConnection: PageConnection
  /** Delete many Page documents, return deleted documents */
  deleteManyPagesConnection: PageConnection
  /** Publish many Page documents */
  publishManyPagesConnection: PageConnection
  /** Find many Page documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyPagesConnection: PageConnection
  /**
   * Update many pages
   * @deprecated Please use the new paginated many mutation (updateManyPagesConnection)
   */
  updateManyPages: BatchPayload
  /**
   * Delete many Page documents
   * @deprecated Please use the new paginated many mutation (deleteManyPagesConnection)
   */
  deleteManyPages: BatchPayload
  /**
   * Publish many Page documents
   * @deprecated Please use the new paginated many mutation (publishManyPagesConnection)
   */
  publishManyPages: BatchPayload
  /**
   * Unpublish many Page documents
   * @deprecated Please use the new paginated many mutation (unpublishManyPagesConnection)
   */
  unpublishManyPages: BatchPayload
  /** Create one portfolio */
  createPortfolio?: Maybe<Portfolio>
  /** Update one portfolio */
  updatePortfolio?: Maybe<Portfolio>
  /** Delete one portfolio from _all_ existing stages. Returns deleted document. */
  deletePortfolio?: Maybe<Portfolio>
  /** Upsert one portfolio */
  upsertPortfolio?: Maybe<Portfolio>
  /** Publish one portfolio */
  publishPortfolio?: Maybe<Portfolio>
  /** Unpublish one portfolio from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishPortfolio?: Maybe<Portfolio>
  /** Update many Portfolio documents */
  updateManyPortfoliosConnection: PortfolioConnection
  /** Delete many Portfolio documents, return deleted documents */
  deleteManyPortfoliosConnection: PortfolioConnection
  /** Publish many Portfolio documents */
  publishManyPortfoliosConnection: PortfolioConnection
  /** Find many Portfolio documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyPortfoliosConnection: PortfolioConnection
  /**
   * Update many portfolios
   * @deprecated Please use the new paginated many mutation (updateManyPortfoliosConnection)
   */
  updateManyPortfolios: BatchPayload
  /**
   * Delete many Portfolio documents
   * @deprecated Please use the new paginated many mutation (deleteManyPortfoliosConnection)
   */
  deleteManyPortfolios: BatchPayload
  /**
   * Publish many Portfolio documents
   * @deprecated Please use the new paginated many mutation (publishManyPortfoliosConnection)
   */
  publishManyPortfolios: BatchPayload
  /**
   * Unpublish many Portfolio documents
   * @deprecated Please use the new paginated many mutation (unpublishManyPortfoliosConnection)
   */
  unpublishManyPortfolios: BatchPayload
  /** Create one post */
  createPost?: Maybe<Post>
  /** Update one post */
  updatePost?: Maybe<Post>
  /** Delete one post from _all_ existing stages. Returns deleted document. */
  deletePost?: Maybe<Post>
  /** Upsert one post */
  upsertPost?: Maybe<Post>
  /** Publish one post */
  publishPost?: Maybe<Post>
  /** Unpublish one post from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishPost?: Maybe<Post>
  /** Update many Post documents */
  updateManyPostsConnection: PostConnection
  /** Delete many Post documents, return deleted documents */
  deleteManyPostsConnection: PostConnection
  /** Publish many Post documents */
  publishManyPostsConnection: PostConnection
  /** Find many Post documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyPostsConnection: PostConnection
  /**
   * Update many posts
   * @deprecated Please use the new paginated many mutation (updateManyPostsConnection)
   */
  updateManyPosts: BatchPayload
  /**
   * Delete many Post documents
   * @deprecated Please use the new paginated many mutation (deleteManyPostsConnection)
   */
  deleteManyPosts: BatchPayload
  /**
   * Publish many Post documents
   * @deprecated Please use the new paginated many mutation (publishManyPostsConnection)
   */
  publishManyPosts: BatchPayload
  /**
   * Unpublish many Post documents
   * @deprecated Please use the new paginated many mutation (unpublishManyPostsConnection)
   */
  unpublishManyPosts: BatchPayload
  /** Create one seo */
  createSeo?: Maybe<Seo>
  /** Update one seo */
  updateSeo?: Maybe<Seo>
  /** Delete one seo from _all_ existing stages. Returns deleted document. */
  deleteSeo?: Maybe<Seo>
  /** Upsert one seo */
  upsertSeo?: Maybe<Seo>
  /** Publish one seo */
  publishSeo?: Maybe<Seo>
  /** Unpublish one seo from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishSeo?: Maybe<Seo>
  /** Update many Seo documents */
  updateManySeosConnection: SeoConnection
  /** Delete many Seo documents, return deleted documents */
  deleteManySeosConnection: SeoConnection
  /** Publish many Seo documents */
  publishManySeosConnection: SeoConnection
  /** Find many Seo documents that match criteria in specified stage and unpublish from target stages */
  unpublishManySeosConnection: SeoConnection
  /**
   * Update many seos
   * @deprecated Please use the new paginated many mutation (updateManySeosConnection)
   */
  updateManySeos: BatchPayload
  /**
   * Delete many Seo documents
   * @deprecated Please use the new paginated many mutation (deleteManySeosConnection)
   */
  deleteManySeos: BatchPayload
  /**
   * Publish many Seo documents
   * @deprecated Please use the new paginated many mutation (publishManySeosConnection)
   */
  publishManySeos: BatchPayload
  /**
   * Unpublish many Seo documents
   * @deprecated Please use the new paginated many mutation (unpublishManySeosConnection)
   */
  unpublishManySeos: BatchPayload
}

export type MutationCreateAssetArgs = {
  data: AssetCreateInput
}

export type MutationUpdateAssetArgs = {
  where: AssetWhereUniqueInput
  data: AssetUpdateInput
}

export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput
}

export type MutationUpsertAssetArgs = {
  where: AssetWhereUniqueInput
  upsert: AssetUpsertInput
}

export type MutationPublishAssetArgs = {
  where: AssetWhereUniqueInput
  locales?: Maybe<Array<Locale>>
  publishBase?: Maybe<Scalars['Boolean']>
  withDefaultLocale?: Maybe<Scalars['Boolean']>
  to?: Array<Stage>
}

export type MutationUnpublishAssetArgs = {
  where: AssetWhereUniqueInput
  from?: Array<Stage>
  locales?: Maybe<Array<Locale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type MutationUpdateManyAssetsConnectionArgs = {
  where?: Maybe<AssetManyWhereInput>
  data: AssetUpdateManyInput
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationDeleteManyAssetsConnectionArgs = {
  where?: Maybe<AssetManyWhereInput>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationPublishManyAssetsConnectionArgs = {
  where?: Maybe<AssetManyWhereInput>
  from?: Maybe<Stage>
  to?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
  locales?: Maybe<Array<Locale>>
  publishBase?: Maybe<Scalars['Boolean']>
  withDefaultLocale?: Maybe<Scalars['Boolean']>
}

export type MutationUnpublishManyAssetsConnectionArgs = {
  where?: Maybe<AssetManyWhereInput>
  stage?: Maybe<Stage>
  from?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
  locales?: Maybe<Array<Locale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type MutationUpdateManyAssetsArgs = {
  where?: Maybe<AssetManyWhereInput>
  data: AssetUpdateManyInput
}

export type MutationDeleteManyAssetsArgs = {
  where?: Maybe<AssetManyWhereInput>
}

export type MutationPublishManyAssetsArgs = {
  where?: Maybe<AssetManyWhereInput>
  to?: Array<Stage>
  locales?: Maybe<Array<Locale>>
  publishBase?: Maybe<Scalars['Boolean']>
  withDefaultLocale?: Maybe<Scalars['Boolean']>
}

export type MutationUnpublishManyAssetsArgs = {
  where?: Maybe<AssetManyWhereInput>
  from?: Array<Stage>
  locales?: Maybe<Array<Locale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type MutationCreatePageArgs = {
  data: PageCreateInput
}

export type MutationUpdatePageArgs = {
  where: PageWhereUniqueInput
  data: PageUpdateInput
}

export type MutationDeletePageArgs = {
  where: PageWhereUniqueInput
}

export type MutationUpsertPageArgs = {
  where: PageWhereUniqueInput
  upsert: PageUpsertInput
}

export type MutationPublishPageArgs = {
  where: PageWhereUniqueInput
  locales?: Maybe<Array<Locale>>
  publishBase?: Maybe<Scalars['Boolean']>
  withDefaultLocale?: Maybe<Scalars['Boolean']>
  to?: Array<Stage>
}

export type MutationUnpublishPageArgs = {
  where: PageWhereUniqueInput
  from?: Array<Stage>
  locales?: Maybe<Array<Locale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type MutationUpdateManyPagesConnectionArgs = {
  where?: Maybe<PageManyWhereInput>
  data: PageUpdateManyInput
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationDeleteManyPagesConnectionArgs = {
  where?: Maybe<PageManyWhereInput>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationPublishManyPagesConnectionArgs = {
  where?: Maybe<PageManyWhereInput>
  from?: Maybe<Stage>
  to?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
  locales?: Maybe<Array<Locale>>
  publishBase?: Maybe<Scalars['Boolean']>
  withDefaultLocale?: Maybe<Scalars['Boolean']>
}

export type MutationUnpublishManyPagesConnectionArgs = {
  where?: Maybe<PageManyWhereInput>
  stage?: Maybe<Stage>
  from?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
  locales?: Maybe<Array<Locale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type MutationUpdateManyPagesArgs = {
  where?: Maybe<PageManyWhereInput>
  data: PageUpdateManyInput
}

export type MutationDeleteManyPagesArgs = {
  where?: Maybe<PageManyWhereInput>
}

export type MutationPublishManyPagesArgs = {
  where?: Maybe<PageManyWhereInput>
  to?: Array<Stage>
  locales?: Maybe<Array<Locale>>
  publishBase?: Maybe<Scalars['Boolean']>
  withDefaultLocale?: Maybe<Scalars['Boolean']>
}

export type MutationUnpublishManyPagesArgs = {
  where?: Maybe<PageManyWhereInput>
  from?: Array<Stage>
  locales?: Maybe<Array<Locale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type MutationCreatePortfolioArgs = {
  data: PortfolioCreateInput
}

export type MutationUpdatePortfolioArgs = {
  where: PortfolioWhereUniqueInput
  data: PortfolioUpdateInput
}

export type MutationDeletePortfolioArgs = {
  where: PortfolioWhereUniqueInput
}

export type MutationUpsertPortfolioArgs = {
  where: PortfolioWhereUniqueInput
  upsert: PortfolioUpsertInput
}

export type MutationPublishPortfolioArgs = {
  where: PortfolioWhereUniqueInput
  to?: Array<Stage>
}

export type MutationUnpublishPortfolioArgs = {
  where: PortfolioWhereUniqueInput
  from?: Array<Stage>
}

export type MutationUpdateManyPortfoliosConnectionArgs = {
  where?: Maybe<PortfolioManyWhereInput>
  data: PortfolioUpdateManyInput
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationDeleteManyPortfoliosConnectionArgs = {
  where?: Maybe<PortfolioManyWhereInput>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationPublishManyPortfoliosConnectionArgs = {
  where?: Maybe<PortfolioManyWhereInput>
  from?: Maybe<Stage>
  to?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationUnpublishManyPortfoliosConnectionArgs = {
  where?: Maybe<PortfolioManyWhereInput>
  stage?: Maybe<Stage>
  from?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationUpdateManyPortfoliosArgs = {
  where?: Maybe<PortfolioManyWhereInput>
  data: PortfolioUpdateManyInput
}

export type MutationDeleteManyPortfoliosArgs = {
  where?: Maybe<PortfolioManyWhereInput>
}

export type MutationPublishManyPortfoliosArgs = {
  where?: Maybe<PortfolioManyWhereInput>
  to?: Array<Stage>
}

export type MutationUnpublishManyPortfoliosArgs = {
  where?: Maybe<PortfolioManyWhereInput>
  from?: Array<Stage>
}

export type MutationCreatePostArgs = {
  data: PostCreateInput
}

export type MutationUpdatePostArgs = {
  where: PostWhereUniqueInput
  data: PostUpdateInput
}

export type MutationDeletePostArgs = {
  where: PostWhereUniqueInput
}

export type MutationUpsertPostArgs = {
  where: PostWhereUniqueInput
  upsert: PostUpsertInput
}

export type MutationPublishPostArgs = {
  where: PostWhereUniqueInput
  to?: Array<Stage>
}

export type MutationUnpublishPostArgs = {
  where: PostWhereUniqueInput
  from?: Array<Stage>
}

export type MutationUpdateManyPostsConnectionArgs = {
  where?: Maybe<PostManyWhereInput>
  data: PostUpdateManyInput
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationDeleteManyPostsConnectionArgs = {
  where?: Maybe<PostManyWhereInput>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationPublishManyPostsConnectionArgs = {
  where?: Maybe<PostManyWhereInput>
  from?: Maybe<Stage>
  to?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationUnpublishManyPostsConnectionArgs = {
  where?: Maybe<PostManyWhereInput>
  stage?: Maybe<Stage>
  from?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationUpdateManyPostsArgs = {
  where?: Maybe<PostManyWhereInput>
  data: PostUpdateManyInput
}

export type MutationDeleteManyPostsArgs = {
  where?: Maybe<PostManyWhereInput>
}

export type MutationPublishManyPostsArgs = {
  where?: Maybe<PostManyWhereInput>
  to?: Array<Stage>
}

export type MutationUnpublishManyPostsArgs = {
  where?: Maybe<PostManyWhereInput>
  from?: Array<Stage>
}

export type MutationCreateSeoArgs = {
  data: SeoCreateInput
}

export type MutationUpdateSeoArgs = {
  where: SeoWhereUniqueInput
  data: SeoUpdateInput
}

export type MutationDeleteSeoArgs = {
  where: SeoWhereUniqueInput
}

export type MutationUpsertSeoArgs = {
  where: SeoWhereUniqueInput
  upsert: SeoUpsertInput
}

export type MutationPublishSeoArgs = {
  where: SeoWhereUniqueInput
  to?: Array<Stage>
}

export type MutationUnpublishSeoArgs = {
  where: SeoWhereUniqueInput
  from?: Array<Stage>
}

export type MutationUpdateManySeosConnectionArgs = {
  where?: Maybe<SeoManyWhereInput>
  data: SeoUpdateManyInput
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationDeleteManySeosConnectionArgs = {
  where?: Maybe<SeoManyWhereInput>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationPublishManySeosConnectionArgs = {
  where?: Maybe<SeoManyWhereInput>
  from?: Maybe<Stage>
  to?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationUnpublishManySeosConnectionArgs = {
  where?: Maybe<SeoManyWhereInput>
  stage?: Maybe<Stage>
  from?: Array<Stage>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['ID']>
  after?: Maybe<Scalars['ID']>
}

export type MutationUpdateManySeosArgs = {
  where?: Maybe<SeoManyWhereInput>
  data: SeoUpdateManyInput
}

export type MutationDeleteManySeosArgs = {
  where?: Maybe<SeoManyWhereInput>
}

export type MutationPublishManySeosArgs = {
  where?: Maybe<SeoManyWhereInput>
  to?: Array<Stage>
}

export type MutationUnpublishManySeosArgs = {
  where?: Maybe<SeoManyWhereInput>
  from?: Array<Stage>
}

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID']
  /** The Stage of an object */
  stage: Stage
}

export type Page = Node & {
  __typename?: 'Page'
  /** System stage field */
  stage: Stage
  /** System Locale field */
  locale: Locale
  /** Get the other localizations for this document */
  localizations: Array<Page>
  /** Get the document in other stages */
  documentInStages: Array<Page>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  /** What is the title of your page? */
  title: Scalars['String']
  /** Enter the slug for this page, such as about, blog, or contact */
  slug: Scalars['String']
  /** Enter a short description to be used as a subtitle */
  subtitle?: Maybe<Scalars['String']>
  /** Display */
  content?: Maybe<Scalars['String']>
  /** Relate an SEO model to this page */
  seo?: Maybe<Seo>
  color?: Maybe<Color>
  /** List of Page versions */
  history: Array<Version>
}

export type PageLocalizationsArgs = {
  locales?: Array<Locale>
  includeCurrent?: Scalars['Boolean']
}

export type PageDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type PageCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation
}

export type PageUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation
}

export type PagePublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation
}

export type PageSeoArgs = {
  locales?: Maybe<Array<Locale>>
}

export type PageHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type PageConnectInput = {
  /** Document to connect */
  where: PageWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type PageConnection = {
  __typename?: 'PageConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<PageEdge>
  aggregate: Aggregate
}

export type PageCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  slug: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  /** content input for default locale (es_VE) */
  content?: Maybe<Scalars['String']>
  seo?: Maybe<SeoCreateOneInlineInput>
  color?: Maybe<ColorInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<PageCreateLocalizationsInput>
}

export type PageCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  content?: Maybe<Scalars['String']>
}

export type PageCreateLocalizationInput = {
  /** Localization input */
  data: PageCreateLocalizationDataInput
  locale: Locale
}

export type PageCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<PageCreateLocalizationInput>>
}

export type PageCreateManyInlineInput = {
  /** Create and connect multiple existing Page documents */
  create?: Maybe<Array<PageCreateInput>>
  /** Connect multiple existing Page documents */
  connect?: Maybe<Array<PageWhereUniqueInput>>
}

export type PageCreateOneInlineInput = {
  /** Create and connect one Page document */
  create?: Maybe<PageCreateInput>
  /** Connect one existing Page document */
  connect?: Maybe<PageWhereUniqueInput>
}

/** An edge in a connection. */
export type PageEdge = {
  __typename?: 'PageEdge'
  /** The item at the end of the edge. */
  node: Page
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>
  /** Number of items in the current page. */
  pageSize?: Maybe<Scalars['Int']>
}

/** Identifies documents */
export type PageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<PageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<PageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<PageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  slug_not_ends_with?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  subtitle_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  subtitle_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  subtitle_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  subtitle_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  subtitle_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  subtitle_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  subtitle_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  subtitle_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  subtitle_not_ends_with?: Maybe<Scalars['String']>
  seo?: Maybe<SeoWhereInput>
}

export enum PageOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
}

export type PageUpdateInput = {
  title?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  /** content input for default locale (es_VE) */
  content?: Maybe<Scalars['String']>
  seo?: Maybe<SeoUpdateOneInlineInput>
  color?: Maybe<ColorInput>
  /** Manage document localizations */
  localizations?: Maybe<PageUpdateLocalizationsInput>
}

export type PageUpdateLocalizationDataInput = {
  content?: Maybe<Scalars['String']>
}

export type PageUpdateLocalizationInput = {
  data: PageUpdateLocalizationDataInput
  locale: Locale
}

export type PageUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<PageCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<PageUpdateLocalizationInput>>
  upsert?: Maybe<Array<PageUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<Locale>>
}

export type PageUpdateManyInlineInput = {
  /** Create and connect multiple Page documents */
  create?: Maybe<Array<PageCreateInput>>
  /** Connect multiple existing Page documents */
  connect?: Maybe<Array<PageConnectInput>>
  /** Override currently-connected documents with multiple existing Page documents */
  set?: Maybe<Array<PageWhereUniqueInput>>
  /** Update multiple Page documents */
  update?: Maybe<Array<PageUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Page documents */
  upsert?: Maybe<Array<PageUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Page documents */
  disconnect?: Maybe<Array<PageWhereUniqueInput>>
  /** Delete multiple Page documents */
  delete?: Maybe<Array<PageWhereUniqueInput>>
}

export type PageUpdateManyInput = {
  title?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  /** content input for default locale (es_VE) */
  content?: Maybe<Scalars['String']>
  color?: Maybe<ColorInput>
  /** Optional updates to localizations */
  localizations?: Maybe<PageUpdateManyLocalizationsInput>
}

export type PageUpdateManyLocalizationDataInput = {
  content?: Maybe<Scalars['String']>
}

export type PageUpdateManyLocalizationInput = {
  data: PageUpdateManyLocalizationDataInput
  locale: Locale
}

export type PageUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: Maybe<Array<PageUpdateManyLocalizationInput>>
}

export type PageUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: PageWhereInput
  /** Update many input */
  data: PageUpdateManyInput
}

export type PageUpdateOneInlineInput = {
  /** Create and connect one Page document */
  create?: Maybe<PageCreateInput>
  /** Update single Page document */
  update?: Maybe<PageUpdateWithNestedWhereUniqueInput>
  /** Upsert single Page document */
  upsert?: Maybe<PageUpsertWithNestedWhereUniqueInput>
  /** Connect existing Page document */
  connect?: Maybe<PageWhereUniqueInput>
  /** Disconnect currently connected Page document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Page document */
  delete?: Maybe<Scalars['Boolean']>
}

export type PageUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: PageWhereUniqueInput
  /** Document to update */
  data: PageUpdateInput
}

export type PageUpsertInput = {
  /** Create document if it didn't exist */
  create: PageCreateInput
  /** Update document if it exists */
  update: PageUpdateInput
}

export type PageUpsertLocalizationInput = {
  update: PageUpdateLocalizationDataInput
  create: PageCreateLocalizationDataInput
  locale: Locale
}

export type PageUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: PageWhereUniqueInput
  /** Upsert data */
  data: PageUpsertInput
}

/** Identifies documents */
export type PageWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<PageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<PageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<PageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  slug_not_ends_with?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  subtitle_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  subtitle_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  subtitle_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  subtitle_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  subtitle_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  subtitle_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  subtitle_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  subtitle_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  subtitle_not_ends_with?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  content_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  content_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  content_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  content_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  content_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  content_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  content_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  content_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  content_not_ends_with?: Maybe<Scalars['String']>
  seo?: Maybe<SeoWhereInput>
}

/** References Page record uniquely */
export type PageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['String']>
}

export type Portfolio = Node & {
  __typename?: 'Portfolio'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<Portfolio>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  slug: Scalars['String']
  content: Scalars['String']
  cover: Asset
  external_url: Scalars['String']
  industry: Scalars['String']
  technologies: Array<Scalars['String']>
  seo?: Maybe<Seo>
  /** List of Portfolio versions */
  history: Array<Version>
}

export type PortfolioDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type PortfolioCoverArgs = {
  locales?: Maybe<Array<Locale>>
}

export type PortfolioSeoArgs = {
  locales?: Maybe<Array<Locale>>
}

export type PortfolioHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type PortfolioConnectInput = {
  /** Document to connect */
  where: PortfolioWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type PortfolioConnection = {
  __typename?: 'PortfolioConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<PortfolioEdge>
  aggregate: Aggregate
}

export type PortfolioCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  slug: Scalars['String']
  content: Scalars['String']
  cover: AssetCreateOneInlineInput
  external_url: Scalars['String']
  industry: Scalars['String']
  technologies: Array<Scalars['String']>
  seo?: Maybe<SeoCreateOneInlineInput>
}

export type PortfolioCreateManyInlineInput = {
  /** Create and connect multiple existing Portfolio documents */
  create?: Maybe<Array<PortfolioCreateInput>>
  /** Connect multiple existing Portfolio documents */
  connect?: Maybe<Array<PortfolioWhereUniqueInput>>
}

export type PortfolioCreateOneInlineInput = {
  /** Create and connect one Portfolio document */
  create?: Maybe<PortfolioCreateInput>
  /** Connect one existing Portfolio document */
  connect?: Maybe<PortfolioWhereUniqueInput>
}

/** An edge in a connection. */
export type PortfolioEdge = {
  __typename?: 'PortfolioEdge'
  /** The item at the end of the edge. */
  node: Portfolio
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type PortfolioManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<PortfolioWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<PortfolioWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<PortfolioWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  slug_not_ends_with?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  content_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  content_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  content_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  content_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  content_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  content_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  content_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  content_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  content_not_ends_with?: Maybe<Scalars['String']>
  cover?: Maybe<AssetWhereInput>
  external_url?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  external_url_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  external_url_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  external_url_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  external_url_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  external_url_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  external_url_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  external_url_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  external_url_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  external_url_not_ends_with?: Maybe<Scalars['String']>
  industry?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  industry_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  industry_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  industry_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  industry_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  industry_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  industry_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  industry_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  industry_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  industry_not_ends_with?: Maybe<Scalars['String']>
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  technologies?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  technologies_not?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains *all* items provided to the filter */
  technologies_contains_all?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains at least one item provided to the filter */
  technologies_contains_some?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contain any of the items provided to the filter */
  technologies_contains_none?: Maybe<Array<Scalars['String']>>
  seo?: Maybe<SeoWhereInput>
}

export enum PortfolioOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
  ExternalUrlAsc = 'external_url_ASC',
  ExternalUrlDesc = 'external_url_DESC',
  IndustryAsc = 'industry_ASC',
  IndustryDesc = 'industry_DESC',
  TechnologiesAsc = 'technologies_ASC',
  TechnologiesDesc = 'technologies_DESC',
}

export type PortfolioUpdateInput = {
  title?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  cover?: Maybe<AssetUpdateOneInlineInput>
  external_url?: Maybe<Scalars['String']>
  industry?: Maybe<Scalars['String']>
  technologies?: Maybe<Array<Scalars['String']>>
  seo?: Maybe<SeoUpdateOneInlineInput>
}

export type PortfolioUpdateManyInlineInput = {
  /** Create and connect multiple Portfolio documents */
  create?: Maybe<Array<PortfolioCreateInput>>
  /** Connect multiple existing Portfolio documents */
  connect?: Maybe<Array<PortfolioConnectInput>>
  /** Override currently-connected documents with multiple existing Portfolio documents */
  set?: Maybe<Array<PortfolioWhereUniqueInput>>
  /** Update multiple Portfolio documents */
  update?: Maybe<Array<PortfolioUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Portfolio documents */
  upsert?: Maybe<Array<PortfolioUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Portfolio documents */
  disconnect?: Maybe<Array<PortfolioWhereUniqueInput>>
  /** Delete multiple Portfolio documents */
  delete?: Maybe<Array<PortfolioWhereUniqueInput>>
}

export type PortfolioUpdateManyInput = {
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  external_url?: Maybe<Scalars['String']>
  industry?: Maybe<Scalars['String']>
  technologies?: Maybe<Array<Scalars['String']>>
}

export type PortfolioUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: PortfolioWhereInput
  /** Update many input */
  data: PortfolioUpdateManyInput
}

export type PortfolioUpdateOneInlineInput = {
  /** Create and connect one Portfolio document */
  create?: Maybe<PortfolioCreateInput>
  /** Update single Portfolio document */
  update?: Maybe<PortfolioUpdateWithNestedWhereUniqueInput>
  /** Upsert single Portfolio document */
  upsert?: Maybe<PortfolioUpsertWithNestedWhereUniqueInput>
  /** Connect existing Portfolio document */
  connect?: Maybe<PortfolioWhereUniqueInput>
  /** Disconnect currently connected Portfolio document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Portfolio document */
  delete?: Maybe<Scalars['Boolean']>
}

export type PortfolioUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: PortfolioWhereUniqueInput
  /** Document to update */
  data: PortfolioUpdateInput
}

export type PortfolioUpsertInput = {
  /** Create document if it didn't exist */
  create: PortfolioCreateInput
  /** Update document if it exists */
  update: PortfolioUpdateInput
}

export type PortfolioUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: PortfolioWhereUniqueInput
  /** Upsert data */
  data: PortfolioUpsertInput
}

/** Identifies documents */
export type PortfolioWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<PortfolioWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<PortfolioWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<PortfolioWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  slug_not_ends_with?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  content_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  content_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  content_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  content_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  content_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  content_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  content_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  content_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  content_not_ends_with?: Maybe<Scalars['String']>
  cover?: Maybe<AssetWhereInput>
  external_url?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  external_url_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  external_url_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  external_url_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  external_url_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  external_url_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  external_url_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  external_url_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  external_url_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  external_url_not_ends_with?: Maybe<Scalars['String']>
  industry?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  industry_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  industry_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  industry_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  industry_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  industry_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  industry_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  industry_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  industry_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  industry_not_ends_with?: Maybe<Scalars['String']>
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  technologies?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  technologies_not?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains *all* items provided to the filter */
  technologies_contains_all?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains at least one item provided to the filter */
  technologies_contains_some?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contain any of the items provided to the filter */
  technologies_contains_none?: Maybe<Array<Scalars['String']>>
  seo?: Maybe<SeoWhereInput>
}

/** References Portfolio record uniquely */
export type PortfolioWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['String']>
}

export type Post = Node & {
  __typename?: 'Post'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<Post>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  /** Name your blog post! */
  title: Scalars['String']
  /** Select a slug for this blog post, such as post-1, post-2, etc. */
  slug: Scalars['String']
  /** What is the published date you would like to show for this post? */
  date: Scalars['Date']
  /** Add a short excerpt to summarize this post */
  excerpt?: Maybe<Scalars['String']>
  /** Write your blog post! */
  content: Scalars['String']
  /** Upload or select a cover image to set as your Featured Image */
  coverImage: Asset
  /** Add any relevant tags to this blog post */
  tags: Array<Scalars['String']>
  /** Attach an SEO model to this post */
  seo?: Maybe<Seo>
  /** List of Post versions */
  history: Array<Version>
}

export type PostDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type PostCoverImageArgs = {
  locales?: Maybe<Array<Locale>>
}

export type PostSeoArgs = {
  locales?: Maybe<Array<Locale>>
}

export type PostHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type PostConnectInput = {
  /** Document to connect */
  where: PostWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type PostConnection = {
  __typename?: 'PostConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<PostEdge>
  aggregate: Aggregate
}

export type PostCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  slug: Scalars['String']
  date: Scalars['Date']
  excerpt?: Maybe<Scalars['String']>
  content: Scalars['String']
  coverImage: AssetCreateOneInlineInput
  tags?: Maybe<Array<Scalars['String']>>
  seo?: Maybe<SeoCreateOneInlineInput>
}

export type PostCreateManyInlineInput = {
  /** Create and connect multiple existing Post documents */
  create?: Maybe<Array<PostCreateInput>>
  /** Connect multiple existing Post documents */
  connect?: Maybe<Array<PostWhereUniqueInput>>
}

export type PostCreateOneInlineInput = {
  /** Create and connect one Post document */
  create?: Maybe<PostCreateInput>
  /** Connect one existing Post document */
  connect?: Maybe<PostWhereUniqueInput>
}

/** An edge in a connection. */
export type PostEdge = {
  __typename?: 'PostEdge'
  /** The item at the end of the edge. */
  node: Post
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type PostManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<PostWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<PostWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<PostWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  slug_not_ends_with?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['Date']>
  /** All values that are not equal to given value. */
  date_not?: Maybe<Scalars['Date']>
  /** All values that are contained in given list. */
  date_in?: Maybe<Array<Scalars['Date']>>
  /** All values that are not contained in given list. */
  date_not_in?: Maybe<Array<Scalars['Date']>>
  /** All values less than the given value. */
  date_lt?: Maybe<Scalars['Date']>
  /** All values less than or equal the given value. */
  date_lte?: Maybe<Scalars['Date']>
  /** All values greater than the given value. */
  date_gt?: Maybe<Scalars['Date']>
  /** All values greater than or equal the given value. */
  date_gte?: Maybe<Scalars['Date']>
  excerpt?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  excerpt_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  excerpt_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  excerpt_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  excerpt_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  excerpt_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  excerpt_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  excerpt_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  excerpt_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  excerpt_not_ends_with?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  content_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  content_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  content_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  content_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  content_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  content_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  content_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  content_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  content_not_ends_with?: Maybe<Scalars['String']>
  coverImage?: Maybe<AssetWhereInput>
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  tags?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  tags_not?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains *all* items provided to the filter */
  tags_contains_all?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains at least one item provided to the filter */
  tags_contains_some?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contain any of the items provided to the filter */
  tags_contains_none?: Maybe<Array<Scalars['String']>>
  seo?: Maybe<SeoWhereInput>
}

export enum PostOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  ExcerptAsc = 'excerpt_ASC',
  ExcerptDesc = 'excerpt_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
  TagsAsc = 'tags_ASC',
  TagsDesc = 'tags_DESC',
}

export type PostUpdateInput = {
  title?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['Date']>
  excerpt?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  coverImage?: Maybe<AssetUpdateOneInlineInput>
  tags?: Maybe<Array<Scalars['String']>>
  seo?: Maybe<SeoUpdateOneInlineInput>
}

export type PostUpdateManyInlineInput = {
  /** Create and connect multiple Post documents */
  create?: Maybe<Array<PostCreateInput>>
  /** Connect multiple existing Post documents */
  connect?: Maybe<Array<PostConnectInput>>
  /** Override currently-connected documents with multiple existing Post documents */
  set?: Maybe<Array<PostWhereUniqueInput>>
  /** Update multiple Post documents */
  update?: Maybe<Array<PostUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Post documents */
  upsert?: Maybe<Array<PostUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Post documents */
  disconnect?: Maybe<Array<PostWhereUniqueInput>>
  /** Delete multiple Post documents */
  delete?: Maybe<Array<PostWhereUniqueInput>>
}

export type PostUpdateManyInput = {
  title?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['Date']>
  excerpt?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Scalars['String']>>
}

export type PostUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: PostWhereInput
  /** Update many input */
  data: PostUpdateManyInput
}

export type PostUpdateOneInlineInput = {
  /** Create and connect one Post document */
  create?: Maybe<PostCreateInput>
  /** Update single Post document */
  update?: Maybe<PostUpdateWithNestedWhereUniqueInput>
  /** Upsert single Post document */
  upsert?: Maybe<PostUpsertWithNestedWhereUniqueInput>
  /** Connect existing Post document */
  connect?: Maybe<PostWhereUniqueInput>
  /** Disconnect currently connected Post document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Post document */
  delete?: Maybe<Scalars['Boolean']>
}

export type PostUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: PostWhereUniqueInput
  /** Document to update */
  data: PostUpdateInput
}

export type PostUpsertInput = {
  /** Create document if it didn't exist */
  create: PostCreateInput
  /** Update document if it exists */
  update: PostUpdateInput
}

export type PostUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: PostWhereUniqueInput
  /** Upsert data */
  data: PostUpsertInput
}

/** Identifies documents */
export type PostWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<PostWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<PostWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<PostWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  slug_not_ends_with?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['Date']>
  /** All values that are not equal to given value. */
  date_not?: Maybe<Scalars['Date']>
  /** All values that are contained in given list. */
  date_in?: Maybe<Array<Scalars['Date']>>
  /** All values that are not contained in given list. */
  date_not_in?: Maybe<Array<Scalars['Date']>>
  /** All values less than the given value. */
  date_lt?: Maybe<Scalars['Date']>
  /** All values less than or equal the given value. */
  date_lte?: Maybe<Scalars['Date']>
  /** All values greater than the given value. */
  date_gt?: Maybe<Scalars['Date']>
  /** All values greater than or equal the given value. */
  date_gte?: Maybe<Scalars['Date']>
  excerpt?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  excerpt_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  excerpt_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  excerpt_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  excerpt_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  excerpt_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  excerpt_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  excerpt_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  excerpt_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  excerpt_not_ends_with?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  content_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  content_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  content_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  content_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  content_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  content_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  content_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  content_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  content_not_ends_with?: Maybe<Scalars['String']>
  coverImage?: Maybe<AssetWhereInput>
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  tags?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  tags_not?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains *all* items provided to the filter */
  tags_contains_all?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains at least one item provided to the filter */
  tags_contains_some?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contain any of the items provided to the filter */
  tags_contains_none?: Maybe<Array<Scalars['String']>>
  seo?: Maybe<SeoWhereInput>
}

/** References Post record uniquely */
export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['String']>
}

export type PublishLocaleInput = {
  /** Locales to publish */
  locale: Locale
  /** Stages to publish selected locales to */
  stages: Array<Stage>
}

export type Query = {
  __typename?: 'Query'
  /** Fetches an object given its ID */
  node?: Maybe<Node>
  /** Retrieve multiple assets */
  assets: Array<Asset>
  /** Retrieve a single asset */
  asset?: Maybe<Asset>
  /** Retrieve multiple assets using the Relay connection interface */
  assetsConnection: AssetConnection
  /** Retrieve document version */
  assetVersion?: Maybe<DocumentVersion>
  /** Retrieve multiple pages */
  pages: Array<Page>
  /** Retrieve a single page */
  page?: Maybe<Page>
  /** Retrieve multiple pages using the Relay connection interface */
  pagesConnection: PageConnection
  /** Retrieve document version */
  pageVersion?: Maybe<DocumentVersion>
  /** Retrieve multiple portfolios */
  portfolios: Array<Portfolio>
  /** Retrieve a single portfolio */
  portfolio?: Maybe<Portfolio>
  /** Retrieve multiple portfolios using the Relay connection interface */
  portfoliosConnection: PortfolioConnection
  /** Retrieve document version */
  portfolioVersion?: Maybe<DocumentVersion>
  /** Retrieve multiple posts */
  posts: Array<Post>
  /** Retrieve a single post */
  post?: Maybe<Post>
  /** Retrieve multiple posts using the Relay connection interface */
  postsConnection: PostConnection
  /** Retrieve document version */
  postVersion?: Maybe<DocumentVersion>
  /** Retrieve multiple seos */
  seos: Array<Seo>
  /** Retrieve a single seo */
  seo?: Maybe<Seo>
  /** Retrieve multiple seos using the Relay connection interface */
  seosConnection: SeoConnection
  /** Retrieve document version */
  seoVersion?: Maybe<DocumentVersion>
}

export type QueryNodeArgs = {
  id: Scalars['ID']
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryAssetsArgs = {
  where?: Maybe<AssetWhereInput>
  orderBy?: Maybe<AssetOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryAssetArgs = {
  where: AssetWhereUniqueInput
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryAssetsConnectionArgs = {
  where?: Maybe<AssetWhereInput>
  orderBy?: Maybe<AssetOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryAssetVersionArgs = {
  where: VersionWhereInput
}

export type QueryPagesArgs = {
  where?: Maybe<PageWhereInput>
  orderBy?: Maybe<PageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryPageArgs = {
  where: PageWhereUniqueInput
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryPagesConnectionArgs = {
  where?: Maybe<PageWhereInput>
  orderBy?: Maybe<PageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryPageVersionArgs = {
  where: VersionWhereInput
}

export type QueryPortfoliosArgs = {
  where?: Maybe<PortfolioWhereInput>
  orderBy?: Maybe<PortfolioOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryPortfolioArgs = {
  where: PortfolioWhereUniqueInput
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryPortfoliosConnectionArgs = {
  where?: Maybe<PortfolioWhereInput>
  orderBy?: Maybe<PortfolioOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryPortfolioVersionArgs = {
  where: VersionWhereInput
}

export type QueryPostsArgs = {
  where?: Maybe<PostWhereInput>
  orderBy?: Maybe<PostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryPostArgs = {
  where: PostWhereUniqueInput
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryPostsConnectionArgs = {
  where?: Maybe<PostWhereInput>
  orderBy?: Maybe<PostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryPostVersionArgs = {
  where: VersionWhereInput
}

export type QuerySeosArgs = {
  where?: Maybe<SeoWhereInput>
  orderBy?: Maybe<SeoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QuerySeoArgs = {
  where: SeoWhereUniqueInput
  stage?: Stage
  locales?: Array<Locale>
}

export type QuerySeosConnectionArgs = {
  where?: Maybe<SeoWhereInput>
  orderBy?: Maybe<SeoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QuerySeoVersionArgs = {
  where: VersionWhereInput
}

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  __typename?: 'RGBA'
  r: Scalars['RGBAHue']
  g: Scalars['RGBAHue']
  b: Scalars['RGBAHue']
  a: Scalars['RGBATransparency']
}

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  r: Scalars['RGBAHue']
  g: Scalars['RGBAHue']
  b: Scalars['RGBAHue']
  a: Scalars['RGBATransparency']
}

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  __typename?: 'RichText'
  /** Returns AST representation */
  raw: Scalars['RichTextAST']
  /** Returns HTMl representation */
  html: Scalars['String']
  /** Returns Markdown representation */
  markdown: Scalars['String']
  /** Returns plain-text contents of RichText */
  text: Scalars['String']
}

export type Seo = Node & {
  __typename?: 'Seo'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<Seo>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  /** Create a custom meta title */
  title: Scalars['String']
  /** Create a custom meta description */
  description: Scalars['String']
  /** Select your focus keywords */
  keywords: Array<Scalars['String']>
  /** Select a custom OG image (the most common size is usually 1280x720) */
  image?: Maybe<Asset>
  /** What pages and blog posts would this SEO apply to? */
  parent?: Maybe<SeoParent>
  portfolio?: Maybe<Portfolio>
  /** List of Seo versions */
  history: Array<Version>
}

export type SeoDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type SeoImageArgs = {
  locales?: Maybe<Array<Locale>>
}

export type SeoParentArgs = {
  locales?: Maybe<Array<Locale>>
}

export type SeoPortfolioArgs = {
  locales?: Maybe<Array<Locale>>
}

export type SeoHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type SeoConnectInput = {
  /** Document to connect */
  where: SeoWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type SeoConnection = {
  __typename?: 'SeoConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<SeoEdge>
  aggregate: Aggregate
}

export type SeoCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  description: Scalars['String']
  keywords?: Maybe<Array<Scalars['String']>>
  image?: Maybe<AssetCreateOneInlineInput>
  parent?: Maybe<SeoParentCreateOneInlineInput>
  portfolio?: Maybe<PortfolioCreateOneInlineInput>
}

export type SeoCreateManyInlineInput = {
  /** Create and connect multiple existing Seo documents */
  create?: Maybe<Array<SeoCreateInput>>
  /** Connect multiple existing Seo documents */
  connect?: Maybe<Array<SeoWhereUniqueInput>>
}

export type SeoCreateOneInlineInput = {
  /** Create and connect one Seo document */
  create?: Maybe<SeoCreateInput>
  /** Connect one existing Seo document */
  connect?: Maybe<SeoWhereUniqueInput>
}

/** An edge in a connection. */
export type SeoEdge = {
  __typename?: 'SeoEdge'
  /** The item at the end of the edge. */
  node: Seo
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type SeoManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<SeoWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<SeoWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<SeoWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  description_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  description_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  description_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  description_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  description_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  description_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  description_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  description_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  description_not_ends_with?: Maybe<Scalars['String']>
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  keywords?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  keywords_not?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains *all* items provided to the filter */
  keywords_contains_all?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains at least one item provided to the filter */
  keywords_contains_some?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contain any of the items provided to the filter */
  keywords_contains_none?: Maybe<Array<Scalars['String']>>
  image?: Maybe<AssetWhereInput>
  portfolio?: Maybe<PortfolioWhereInput>
}

export enum SeoOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  KeywordsAsc = 'keywords_ASC',
  KeywordsDesc = 'keywords_DESC',
}

export type SeoParent = Page | Post

export type SeoParentConnectInput = {
  Page?: Maybe<PageConnectInput>
  Post?: Maybe<PostConnectInput>
}

export type SeoParentCreateInput = {
  Page?: Maybe<PageCreateInput>
  Post?: Maybe<PostCreateInput>
}

export type SeoParentCreateManyInlineInput = {
  /** Create and connect multiple existing SeoParent documents */
  create?: Maybe<Array<SeoParentCreateInput>>
  /** Connect multiple existing SeoParent documents */
  connect?: Maybe<Array<SeoParentWhereUniqueInput>>
}

export type SeoParentCreateOneInlineInput = {
  /** Create and connect one SeoParent document */
  create?: Maybe<SeoParentCreateInput>
  /** Connect one existing SeoParent document */
  connect?: Maybe<SeoParentWhereUniqueInput>
}

export type SeoParentUpdateInput = {
  Page?: Maybe<PageUpdateInput>
  Post?: Maybe<PostUpdateInput>
}

export type SeoParentUpdateManyInlineInput = {
  /** Create and connect multiple SeoParent documents */
  create?: Maybe<Array<SeoParentCreateInput>>
  /** Connect multiple existing SeoParent documents */
  connect?: Maybe<Array<SeoParentConnectInput>>
  /** Override currently-connected documents with multiple existing SeoParent documents */
  set?: Maybe<Array<SeoParentWhereUniqueInput>>
  /** Update multiple SeoParent documents */
  update?: Maybe<Array<SeoParentUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple SeoParent documents */
  upsert?: Maybe<Array<SeoParentUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple SeoParent documents */
  disconnect?: Maybe<Array<SeoParentWhereUniqueInput>>
  /** Delete multiple SeoParent documents */
  delete?: Maybe<Array<SeoParentWhereUniqueInput>>
}

export type SeoParentUpdateManyWithNestedWhereInput = {
  Page?: Maybe<PageUpdateManyWithNestedWhereInput>
  Post?: Maybe<PostUpdateManyWithNestedWhereInput>
}

export type SeoParentUpdateOneInlineInput = {
  /** Create and connect one SeoParent document */
  create?: Maybe<SeoParentCreateInput>
  /** Update single SeoParent document */
  update?: Maybe<SeoParentUpdateWithNestedWhereUniqueInput>
  /** Upsert single SeoParent document */
  upsert?: Maybe<SeoParentUpsertWithNestedWhereUniqueInput>
  /** Connect existing SeoParent document */
  connect?: Maybe<SeoParentWhereUniqueInput>
  /** Disconnect currently connected SeoParent document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected SeoParent document */
  delete?: Maybe<Scalars['Boolean']>
}

export type SeoParentUpdateWithNestedWhereUniqueInput = {
  Page?: Maybe<PageUpdateWithNestedWhereUniqueInput>
  Post?: Maybe<PostUpdateWithNestedWhereUniqueInput>
}

export type SeoParentUpsertWithNestedWhereUniqueInput = {
  Page?: Maybe<PageUpsertWithNestedWhereUniqueInput>
  Post?: Maybe<PostUpsertWithNestedWhereUniqueInput>
}

export type SeoParentWhereInput = {
  Page?: Maybe<PageWhereInput>
  Post?: Maybe<PostWhereInput>
}

export type SeoParentWhereUniqueInput = {
  Page?: Maybe<PageWhereUniqueInput>
  Post?: Maybe<PostWhereUniqueInput>
}

export type SeoUpdateInput = {
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  keywords?: Maybe<Array<Scalars['String']>>
  image?: Maybe<AssetUpdateOneInlineInput>
  parent?: Maybe<SeoParentUpdateOneInlineInput>
  portfolio?: Maybe<PortfolioUpdateOneInlineInput>
}

export type SeoUpdateManyInlineInput = {
  /** Create and connect multiple Seo documents */
  create?: Maybe<Array<SeoCreateInput>>
  /** Connect multiple existing Seo documents */
  connect?: Maybe<Array<SeoConnectInput>>
  /** Override currently-connected documents with multiple existing Seo documents */
  set?: Maybe<Array<SeoWhereUniqueInput>>
  /** Update multiple Seo documents */
  update?: Maybe<Array<SeoUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Seo documents */
  upsert?: Maybe<Array<SeoUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Seo documents */
  disconnect?: Maybe<Array<SeoWhereUniqueInput>>
  /** Delete multiple Seo documents */
  delete?: Maybe<Array<SeoWhereUniqueInput>>
}

export type SeoUpdateManyInput = {
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  keywords?: Maybe<Array<Scalars['String']>>
}

export type SeoUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: SeoWhereInput
  /** Update many input */
  data: SeoUpdateManyInput
}

export type SeoUpdateOneInlineInput = {
  /** Create and connect one Seo document */
  create?: Maybe<SeoCreateInput>
  /** Update single Seo document */
  update?: Maybe<SeoUpdateWithNestedWhereUniqueInput>
  /** Upsert single Seo document */
  upsert?: Maybe<SeoUpsertWithNestedWhereUniqueInput>
  /** Connect existing Seo document */
  connect?: Maybe<SeoWhereUniqueInput>
  /** Disconnect currently connected Seo document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Seo document */
  delete?: Maybe<Scalars['Boolean']>
}

export type SeoUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: SeoWhereUniqueInput
  /** Document to update */
  data: SeoUpdateInput
}

export type SeoUpsertInput = {
  /** Create document if it didn't exist */
  create: SeoCreateInput
  /** Update document if it exists */
  update: SeoUpdateInput
}

export type SeoUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: SeoWhereUniqueInput
  /** Upsert data */
  data: SeoUpsertInput
}

/** Identifies documents */
export type SeoWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<SeoWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<SeoWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<SeoWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  description_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  description_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  description_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  description_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  description_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  description_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  description_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  description_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  description_not_ends_with?: Maybe<Scalars['String']>
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  keywords?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  keywords_not?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains *all* items provided to the filter */
  keywords_contains_all?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array contains at least one item provided to the filter */
  keywords_contains_some?: Maybe<Array<Scalars['String']>>
  /** Matches if the field array does not contain any of the items provided to the filter */
  keywords_contains_none?: Maybe<Array<Scalars['String']>>
  image?: Maybe<AssetWhereInput>
  portfolio?: Maybe<PortfolioWhereInput>
}

/** References Seo record uniquely */
export type SeoWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

/** Stage system enumeration */
export enum Stage {
  /** The Published stage is where you can publish your content to. */
  Published = 'PUBLISHED',
  /** The Draft is the default stage for all your content. */
  Draft = 'DRAFT',
}

export enum SystemDateTimeFieldVariation {
  Base = 'BASE',
  Localization = 'LOCALIZATION',
  Combined = 'COMBINED',
}

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: Locale
  /** Stages to unpublish selected locales from */
  stages: Array<Stage>
}

/** System User Kind */
export enum UserKind {
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC',
  Webhook = 'WEBHOOK',
}

export type Version = {
  __typename?: 'Version'
  id: Scalars['ID']
  stage: Stage
  revision: Scalars['Int']
  createdAt: Scalars['DateTime']
}

export type VersionWhereInput = {
  id: Scalars['ID']
  stage: Stage
  revision: Scalars['Int']
}

export enum _FilterKind {
  Search = 'search',
  And = 'AND',
  Or = 'OR',
  Not = 'NOT',
  Eq = 'eq',
  EqNot = 'eq_not',
  In = 'in',
  NotIn = 'not_in',
  Lt = 'lt',
  Lte = 'lte',
  Gt = 'gt',
  Gte = 'gte',
  Contains = 'contains',
  NotContains = 'not_contains',
  StartsWith = 'starts_with',
  NotStartsWith = 'not_starts_with',
  EndsWith = 'ends_with',
  NotEndsWith = 'not_ends_with',
  ContainsAll = 'contains_all',
  ContainsSome = 'contains_some',
  ContainsNone = 'contains_none',
  RelationalSingle = 'relational_single',
  RelationalEvery = 'relational_every',
  RelationalSome = 'relational_some',
  RelationalNone = 'relational_none',
}

export enum _MutationInputFieldKind {
  Scalar = 'scalar',
  RichText = 'richText',
  Enum = 'enum',
  Relation = 'relation',
  Union = 'union',
  Virtual = 'virtual',
}

export enum _MutationKind {
  Create = 'create',
  Publish = 'publish',
  Unpublish = 'unpublish',
  Update = 'update',
  Upsert = 'upsert',
  Delete = 'delete',
  UpdateMany = 'updateMany',
  PublishMany = 'publishMany',
  UnpublishMany = 'unpublishMany',
  DeleteMany = 'deleteMany',
}

export enum _OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum _RelationInputCardinality {
  One = 'one',
  Many = 'many',
}

export enum _RelationInputKind {
  Create = 'create',
  Update = 'update',
}

export enum _RelationKind {
  Regular = 'regular',
  Union = 'union',
}

export enum _SystemDateTimeFieldVariation {
  Base = 'base',
  Localization = 'localization',
  Combined = 'combined',
}

export type PortfolioQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type PortfolioQuery = { __typename?: 'Query' } & {
  portfolio?: Maybe<
    { __typename?: 'Portfolio' } & Pick<
      Portfolio,
      'id' | 'title' | 'industry' | 'technologies' | 'external_url' | 'content'
    > & {
        seo?: Maybe<
          { __typename?: 'Seo' } & Pick<Seo, 'title' | 'description'> & {
              image?: Maybe<{ __typename?: 'Asset' } & Pick<Asset, 'url' | 'width' | 'height'>>
            }
        >
        cover: { __typename?: 'Asset' } & Pick<Asset, 'handle' | 'width' | 'height'>
      }
  >
}

export type PortfolioSlugsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>
}>

export type PortfolioSlugsQuery = { __typename?: 'Query' } & {
  portfolios: Array<{ __typename?: 'Portfolio' } & Pick<Portfolio, 'slug'>>
}

export type PortfoliosQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
}>

export type PortfoliosQuery = { __typename?: 'Query' } & {
  portfolios: { __typename?: 'PortfolioConnection' } & {
    edges: Array<
      { __typename?: 'PortfolioEdge' } & Pick<PortfolioEdge, 'cursor'> & {
          node: { __typename?: 'Portfolio' } & Pick<
            Portfolio,
            'id' | 'title' | 'slug' | 'content'
          > & { cover: { __typename?: 'Asset' } & Pick<Asset, 'handle' | 'width' | 'height'> }
        }
    >
    pageInfo: { __typename?: 'PageInfo' } & Pick<
      PageInfo,
      'hasNextPage' | 'startCursor' | 'endCursor'
    >
  }
  count: { __typename?: 'PortfolioConnection' } & {
    aggregate: { __typename?: 'Aggregate' } & Pick<Aggregate, 'count'>
  }
}

export type PostQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type PostQuery = { __typename?: 'Query' } & {
  post?: Maybe<
    { __typename?: 'Post' } & Pick<
      Post,
      'id' | 'title' | 'tags' | 'publishedAt' | 'updatedAt' | 'content'
    > & {
        seo?: Maybe<{ __typename?: 'Seo' } & Pick<Seo, 'title' | 'description'>>
        coverImage: { __typename?: 'Asset' } & Pick<Asset, 'handle' | 'width' | 'height'>
      }
  >
}

export type PostSlugsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>
}>

export type PostSlugsQuery = { __typename?: 'Query' } & {
  posts: Array<{ __typename?: 'Post' } & Pick<Post, 'slug'>>
}

export type PostsQueryVariables = Exact<{ [key: string]: never }>

export type PostsQuery = { __typename?: 'Query' } & {
  featuredPost: Array<
    { __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'date'> & {
        coverImage: { __typename?: 'Asset' } & Pick<Asset, 'handle' | 'width' | 'height'>
      }
  >
  posts: Array<
    { __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'date'> & {
        coverImage: { __typename?: 'Asset' } & Pick<Asset, 'handle' | 'width' | 'height'>
      }
  >
}

export const PortfolioDocument = gql`
  query portfolio($slug: String!) {
    portfolio(where: { slug: $slug }) {
      seo {
        title
        description
        image {
          url
          width
          height
        }
      }
      id
      title
      cover {
        handle
        width
        height
      }
      industry
      technologies
      external_url
      content
    }
  }
`

/**
 * __usePortfolioQuery__
 *
 * To run a query within a React component, call `usePortfolioQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfolioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfolioQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePortfolioQuery(
  baseOptions: Apollo.QueryHookOptions<PortfolioQuery, PortfolioQueryVariables>
) {
  return Apollo.useQuery<PortfolioQuery, PortfolioQueryVariables>(PortfolioDocument, baseOptions)
}
export function usePortfolioLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PortfolioQuery, PortfolioQueryVariables>
) {
  return Apollo.useLazyQuery<PortfolioQuery, PortfolioQueryVariables>(
    PortfolioDocument,
    baseOptions
  )
}
export type PortfolioQueryHookResult = ReturnType<typeof usePortfolioQuery>
export type PortfolioLazyQueryHookResult = ReturnType<typeof usePortfolioLazyQuery>
export type PortfolioQueryResult = Apollo.QueryResult<PortfolioQuery, PortfolioQueryVariables>
export const PortfolioSlugsDocument = gql`
  query portfolioSlugs($first: Int) {
    portfolios(first: $first, orderBy: createdAt_ASC) {
      slug
    }
  }
`

/**
 * __usePortfolioSlugsQuery__
 *
 * To run a query within a React component, call `usePortfolioSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfolioSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfolioSlugsQuery({
 *   variables: {
 *      first: // value for 'first'
 *   },
 * });
 */
export function usePortfolioSlugsQuery(
  baseOptions?: Apollo.QueryHookOptions<PortfolioSlugsQuery, PortfolioSlugsQueryVariables>
) {
  return Apollo.useQuery<PortfolioSlugsQuery, PortfolioSlugsQueryVariables>(
    PortfolioSlugsDocument,
    baseOptions
  )
}
export function usePortfolioSlugsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PortfolioSlugsQuery, PortfolioSlugsQueryVariables>
) {
  return Apollo.useLazyQuery<PortfolioSlugsQuery, PortfolioSlugsQueryVariables>(
    PortfolioSlugsDocument,
    baseOptions
  )
}
export type PortfolioSlugsQueryHookResult = ReturnType<typeof usePortfolioSlugsQuery>
export type PortfolioSlugsLazyQueryHookResult = ReturnType<typeof usePortfolioSlugsLazyQuery>
export type PortfolioSlugsQueryResult = Apollo.QueryResult<
  PortfolioSlugsQuery,
  PortfolioSlugsQueryVariables
>
export const PortfoliosDocument = gql`
  query portfolios($first: Int, $skip: Int, $after: String) {
    portfolios: portfoliosConnection(
      first: $first
      skip: $skip
      after: $after
      orderBy: updatedAt_DESC
    ) {
      edges {
        node {
          id
          title
          slug
          cover {
            handle
            width
            height
          }
          content
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
    count: portfoliosConnection {
      aggregate {
        count
      }
    }
  }
`

/**
 * __usePortfoliosQuery__
 *
 * To run a query within a React component, call `usePortfoliosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfoliosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfoliosQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      after: // value for 'after'
 *   },
 * });
 */
export function usePortfoliosQuery(
  baseOptions?: Apollo.QueryHookOptions<PortfoliosQuery, PortfoliosQueryVariables>
) {
  return Apollo.useQuery<PortfoliosQuery, PortfoliosQueryVariables>(PortfoliosDocument, baseOptions)
}
export function usePortfoliosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PortfoliosQuery, PortfoliosQueryVariables>
) {
  return Apollo.useLazyQuery<PortfoliosQuery, PortfoliosQueryVariables>(
    PortfoliosDocument,
    baseOptions
  )
}
export type PortfoliosQueryHookResult = ReturnType<typeof usePortfoliosQuery>
export type PortfoliosLazyQueryHookResult = ReturnType<typeof usePortfoliosLazyQuery>
export type PortfoliosQueryResult = Apollo.QueryResult<PortfoliosQuery, PortfoliosQueryVariables>
export const PostDocument = gql`
  query post($slug: String!) {
    post(where: { slug: $slug }, stage: PUBLISHED) {
      seo {
        title
        description
      }
      id
      title
      tags
      publishedAt
      updatedAt
      coverImage {
        handle
        width
        height
      }
      content
    }
  }
`

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions)
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions)
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>
export const PostSlugsDocument = gql`
  query postSlugs($first: Int) {
    posts(first: $first, orderBy: createdAt_ASC) {
      slug
    }
  }
`

/**
 * __usePostSlugsQuery__
 *
 * To run a query within a React component, call `usePostSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostSlugsQuery({
 *   variables: {
 *      first: // value for 'first'
 *   },
 * });
 */
export function usePostSlugsQuery(
  baseOptions?: Apollo.QueryHookOptions<PostSlugsQuery, PostSlugsQueryVariables>
) {
  return Apollo.useQuery<PostSlugsQuery, PostSlugsQueryVariables>(PostSlugsDocument, baseOptions)
}
export function usePostSlugsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostSlugsQuery, PostSlugsQueryVariables>
) {
  return Apollo.useLazyQuery<PostSlugsQuery, PostSlugsQueryVariables>(
    PostSlugsDocument,
    baseOptions
  )
}
export type PostSlugsQueryHookResult = ReturnType<typeof usePostSlugsQuery>
export type PostSlugsLazyQueryHookResult = ReturnType<typeof usePostSlugsLazyQuery>
export type PostSlugsQueryResult = Apollo.QueryResult<PostSlugsQuery, PostSlugsQueryVariables>
export const PostsDocument = gql`
  query posts {
    featuredPost: posts(orderBy: createdAt_DESC, first: 1) {
      id
      title
      slug
      excerpt
      coverImage {
        handle
        width
        height
      }
      date
    }
    posts(orderBy: createdAt_DESC, skip: 1) {
      id
      title
      slug
      excerpt
      coverImage {
        handle
        width
        height
      }
      date
    }
  }
`

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions)
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions)
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>
