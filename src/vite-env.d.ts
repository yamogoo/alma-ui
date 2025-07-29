/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  /* * * Package.json * * */

  readonly APP_VERSION: string;
  readonly APP_AUTHOR_NAME: string;
  readonly APP_AUTHOR_FULL_NAME: string;
  readonly APP_AUTHOR_EMAIL: string;
  readonly APP_AUTHOR_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
