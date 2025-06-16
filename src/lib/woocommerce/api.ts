
import axios from 'axios';
import { wcApi, WC_BASE_URL } from './config';
import type { WCProduct, WCCategory, WCOrder } from './types';

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
