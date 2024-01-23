/// <reference types="vite/client" />
/// <reference types="@emotion/react/types/css-prop" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_KAKAO_REST_API_KEY: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_REDIRECT_URL: string;
  readonly VITE_GOOGLE_ANALYTICS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
