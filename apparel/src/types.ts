export interface Product {
    id: number;
    import type React from 'react';
    name: string;
    type: 'Top' | 'Bottoms';
    description: string;
    price: number;
    image: string;
    virtualPrice: number;
    virtualLink: string;
    virtualOnly?: boolean;
    stripeLink?: string;
    stripeBuyButtonId?: string;
    stripePublishableKey?: string;
    details?: ProductDetails;
  }

  export interface ProductDetails {
    features: string[];
    fabric: string[];
    process: string[];
    care: string[];
    moreInfo: string[];
    sizeGuide: {
        headers: string[];
        rows: (string | number)[][];
    };
    modelImages: string[];
  }

  export interface CartItem extends Product {
    quantity: number;
  }

  export interface WikiTopic {
    id: string;
    title: string;
    icon: React.ReactElement;
    category: string;
    content: React.ReactElement;
  }

  declare global {
    namespace JSX {
      interface IntrinsicElements {
        'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          'buy-button-id': string;
          'publishable-key': string;
        };
      }
    }
  }

  export {};
