/**
 * @link https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
 */
export interface GoogleCredentialResponse {
  clientId: string;
  credential: string;
  select_by: 'btn_confirm_add_session' | 'auto';
}
