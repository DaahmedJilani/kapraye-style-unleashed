
import axios from 'axios';

// WooCommerce REST API configuration with new credentials
export const WC_BASE_URL = 'https://store.kaprayé.com/wp-json/wc/v3';
export const WC_CONSUMER_KEY = 'ck_ad536de44bfc15c000fa4ce51647b1e7e21a83eb';
export const WC_CONSUMER_SECRET = 'cs_156ba96ec1c534485fa3e9820327aa1e9e557d19';

// Create axios instance with WooCommerce auth
export const wcApi = axios.create({
  baseURL: WC_BASE_URL,
  auth: {
    username: WC_CONSUMER_KEY,
    password: WC_CONSUMER_SECRET,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export default wcApi;
