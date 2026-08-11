export type SubmitState = 'idle' | 'success' | 'error';

export type SharedLoginFields = {
  readonly email: string;
  readonly password: string;
};
