/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_ID: string;
  readonly VITE_API_URL_TEMPLATE_SIGN_UP: string;
  readonly VITE_API_URL_TEMPLATE_SIGN_IN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
