/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  /* * * Package.json * * */

  readonly APP_VERSION: string;
  readonly APP_AUTHOR_NAME: string;
  readonly APP_AUTHOR_FULL_NAME: string;
  readonly APP_AUTHOR_EMAIL: string;
  readonly APP_AUTHOR_URL: string;

  /* * * Environment Variables * * */
  readonly VITE_API_URL: string;

  /* * * Config * * */
  readonly VITE_APP_DEFAULT_THEME: string;
  readonly VITE_APP_DEFAULT_PROTO_THEME: string;
  readonly VITE_APP_DEFAULT_LOCALE: string;

  /* * * Editor Layout * * */
  readonly VITE_DEFAULT_IS_NAVIGATOR_SHOWN: string;
  readonly VITE_DEFAULT_NAVIGATOR_WIDTH: string;
  readonly VITE_DEFAULT_NAVIGATOR_MIN_WIDTH: string;
  readonly VITE_DEFAULT_NAVIGATOR_MAX_WIDTH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
