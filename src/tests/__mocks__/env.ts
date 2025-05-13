interface EnvConfig {
  API_URL_ID: string;
  API_URL_TEMPLATE_SIGN_UP: string;
  API_URL_TEMPLATE_SIGN_IN: string;
  API_URL_TEMPLATE_GET_COACH_LIST: string;
  API_URL_TEMPLATE_GIVE_FEEDBACKS: string;
  API_URL_TEMPLATE_GET_BOOKED_WORKOUTS: string;
  API_URL_TEMPLATE_CANCEL_WORKOUT: string;
}

export const env: EnvConfig = {
  API_URL_ID: 'test-id',
  API_URL_TEMPLATE_SIGN_UP: '/api/auth/sign-up',
  API_URL_TEMPLATE_SIGN_IN: '/api/auth/sign-in',
  API_URL_TEMPLATE_GET_COACH_LIST: '/api/coaches',
  API_URL_TEMPLATE_GIVE_FEEDBACKS: '/api/feedbacks',
  API_URL_TEMPLATE_GET_BOOKED_WORKOUTS: '/api/workouts',
  API_URL_TEMPLATE_CANCEL_WORKOUT: '/api/workouts/cancel',
};

export const getApiUrl = (template: keyof Omit<EnvConfig, 'API_URL_ID'>): string => {
  return `https://${env.API_URL_ID}${env[template]}`;
}; 