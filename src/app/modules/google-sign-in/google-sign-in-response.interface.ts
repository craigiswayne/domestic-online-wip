export interface GoogleSignInResponse {
  clientId: string;
  credential: string;
  select_by: 'btn_confirm_add_session' | 'auto';
}
