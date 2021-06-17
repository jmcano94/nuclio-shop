import Commerce from '@chec/commerce.js';

const REACT_APP_CHEC_PUBLIC_KEY = 'pk_184625ed86f36703d7d233bcf6d519a4f9398f20048ec';

export const commerce = new Commerce(REACT_APP_CHEC_PUBLIC_KEY, true);
export default {
  commerce,
};
