import { BackgroundResponse, BackgroundLists } from './index.d';
declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";

export interface GetAuthTokenResult {
  /**
   * Optional.
   * A list of OAuth2 scopes granted to the extension.
   */
  grantedScopes?: string[]
  /**
   * Optional.
   * The specific token associated with the request.
   */
  token?: string
}

export interface BackgroundResponse {
  err: boolean,
  dat: unknown
}

export type BackgroundEvents = {
  func: 'getEvents',
  dat?: gapi.client.calendar.EventsListParameters
}

export type BackgroundLists = {
  func: 'getList',
  dat?: gapi.client.calendar.CalendarList
}

export type BackgroundCreateEvent = {
  func: 'createEvent',
  dat: gapi.client.calendar.EventsInsertParameters
}

export type BackgroundSend = "hi" | BackgroundEvents | BackgroundLists | BackgroundCreateEvent