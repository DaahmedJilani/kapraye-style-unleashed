import axios from 'axios';

// WooCommerce REST API configuration with new credentials
const WC_BASE_URL = 'https://store.kaprayé.com/wp-json/wc/v3';
const WC_CONSUMER_KEY = 'ck_ad536de44bfc15c000fa4ce51647b1e7e21a83eb';
const WC_CONSUMER_SECRET = 'cs_156ba96ec1c534485fa3e9820327aa1e9e557d19';

// Create axios instance with WooCommerce auth
const wcApi = axios.create({
  baseURL: WC_BASE_URL,
  auth: {
    username: WC_CONSUMER_KEY,
    password: WC_CONSUMER_SECRET,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_to: string | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: WCCategory[];
  tags: WCTag[];
  images: WCImage[];
  attributes: WCAttribute[];
  default_attributes: any[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: any[];
  stock_status: string;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WCImage | null;
  menu_order: number;
  count: number;
}

export interface WCTag {
  id: number;
  name: string;
  slug: string;
}

export interface WCImage {
  id: number;
  date_created: string;
  date_modified: string;
  src: string;
  name: string;
  alt: string;
}

export interface WCAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WCCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  sku: string;
  permalink: string;
  images: WCImage[];
  price: number;
  line_price: number;
  variation: any[];
}

export interface WCCart {
  coupons: any[];
  shipping_rates: any[];
  shipping_address: any;
  billing_address: any;
  items: WCCartItem[];
  items_count: number;
  items_weight: number;
  cross_sells: any[];
  needs_payment: boolean;
  needs_shipping: boolean;
  has_calculated_shipping: boolean;
  fees: any[];
  totals: {
    subtotal: string;
    subtotal_tax: string;
    fee_total: string;
    fee_tax: string;
    discount_total: string;
    discount_tax: string;
    shipping_total: string;
    shipping_tax: string;
    total: string;
    total_tax: string;
  };
  errors: any[];
}

export interface WCOrder {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: WCAddress;
  shipping: WCAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: string | null;
  date_paid: string | null;
  cart_hash: string;
  number: string;
  meta_data: any[];
  line_items: WCLineItem[];
  tax_lines: any[];
  shipping_lines: any[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
}

export interface WCAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface WCLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: any[];
  sku: string;
  price: number;
  image: WCImage;
}

// Enhanced API functions with better error handling
export const woocommerceApi = {
  // Products
  async getProducts(params?: {
    per_page?: number;
    page?: number;
    search?: string;
    category?: string;
    featured?: boolean;
    on_sale?: boolean;
    orderby?: string;
    order?: string;
    min_price?: number;
    max_price?: number;
  }): Promise<WCProduct[]> {
    try {
      const response = await wcApi.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products from WooCommerce');
    }
  },

  async getProduct(id: number): Promise<WCProduct> {
    try {
      const response = await wcApi.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error(`Failed to fetch product ${id} from WooCommerce`);
    }
  },

  async getProductBySlug(slug: string): Promise<WCProduct> {
    try {
      const response = await wcApi.get('/products', {
        params: { slug }
      });
      if (response.data.length === 0) {
        throw new Error('Product not found');
      }
      return response.data[0];
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      throw new Error(`Failed to fetch product ${slug} from WooCommerce`);
    }
  },

  // Categories
  async getCategories(): Promise<WCCategory[]> {
    try {
      const response = await wcApi.get('/products/categories', {
        params: { per_page: 100 }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories from WooCommerce');
    }
  },

  async getCategory(id: number): Promise<WCCategory> {
    try {
      const response = await wcApi.get(`/products/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error(`Failed to fetch category ${id} from WooCommerce`);
    }
  },

  // Orders
  async createOrder(orderData: Partial<WCOrder>): Promise<WCOrder> {
    try {
      const response = await wcApi.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order in WooCommerce');
    }
  },

  async getOrder(id: number): Promise<WCOrder> {
    try {
      const response = await wcApi.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new Error(`Failed to fetch order ${id} from WooCommerce`);
    }
  },

  async getCustomerOrders(customerId: number): Promise<WCOrder[]> {
    try {
      const response = await wcApi.get('/orders', {
        params: { customer: customerId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      throw new Error(`Failed to fetch orders for customer ${customerId} from WooCommerce`);
    }
  },

  // Search
  async searchProducts(query: string): Promise<WCProduct[]> {
    try {
      const response = await wcApi.get('/products', {
        params: { search: query, per_page: 20 }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products in WooCommerce');
    }
  },

  // Cart functionality (using WooCommerce Store API)
  async createCart(): Promise<any> {
    try {
      // Using WooCommerce Store API for cart management
      const response = await axios.post(`${WC_BASE_URL.replace('/wc/v3', '/wc/store/v1')}/cart`);
      return response.data;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw new Error('Failed to create cart in WooCommerce');
    }
  },

  async addToCart(productId: number, quantity: number = 1, variationId?: number): Promise<any> {
    try {
      const cartData = {
        id: productId,
        quantity: quantity,
        ...(variationId && { variation_id: variationId })
      };
      
      const response = await axios.post(
        `${WC_BASE_URL.replace('/wc/v3', '/wc/store/v1')}/cart/add-item`,
        cartData
      );
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Failed to add item to cart in WooCommerce');
    }
  },

  async getCart(): Promise<any> {
    try {
      const response = await axios.get(`${WC_BASE_URL.replace('/wc/v3', '/wc/store/v1')}/cart`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw new Error('Failed to fetch cart from WooCommerce');
    }
  }
};

export default wcApi;
