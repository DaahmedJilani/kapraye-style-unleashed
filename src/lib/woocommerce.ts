
// Re-export everything from the modular WooCommerce files for backward compatibility
export * from './woocommerce/types';
export * from './woocommerce/config';
export * from './woocommerce/api';
export { wcApi as default } from './woocommerce/config';
