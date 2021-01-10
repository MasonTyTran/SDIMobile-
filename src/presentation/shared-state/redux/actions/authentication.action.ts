import {Credential, SignInResult} from '@domain';
import {createAction} from '@reduxjs/toolkit';

export const signIn = createAction<Credential>('authentication/singIn');
export const signInBegin = createAction('authentication/signInBegin');
export const signInSuccess = createAction<SignInResult>(
  'authentication/signInSuccess',
);
export const signInFailed = createAction('authentication/signInFailed');

export const signInLocally = createAction('authentication/signInLocally');
export const signInLocallySuccess = createAction<SignInResult>(
  'authentication/signInLocallySuccess',
);
export const signInLocallyFailed = createAction(
  'authentication/signInLocallyFailed',
);
export const signOut = createAction('authentication/signOut');
export const signOutSuccess = createAction('authentication/signOutSuccess');
export const signOutFailed = createAction('authentication/signOutFailed');

export type SignInAction = ReturnType<typeof signIn>;
export type SignInBegin = ReturnType<typeof signInBegin>;
export type SignInSuccess = ReturnType<typeof signInSuccess>;
export type SignInFailed = ReturnType<typeof signInFailed>;

export type SignInLocally = ReturnType<typeof signInLocally>;
export type SignInLocallySuccess = ReturnType<typeof signInLocallySuccess>;
export type SignInLocallyFailed = ReturnType<typeof signInLocallyFailed>;

export type SignOutAction = ReturnType<typeof signOut>;
export type SignOutSuccessAction = ReturnType<typeof signOutSuccess>;
export type SignOutFailedAction = ReturnType<typeof signOutFailed>;

export type AuthenticationEpicActions =
  | SignInAction
  | SignInBegin
  | SignInSuccess
  | SignInFailed
  | SignInLocally
  | SignInLocallySuccess
  | SignInLocallyFailed
  | SignOutAction
  | SignOutSuccessAction
  | SignOutFailedAction;
