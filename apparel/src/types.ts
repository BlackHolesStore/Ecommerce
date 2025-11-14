export interface Product {
    id: number;
    name: string;
    type: 'Top' | 'Bottoms';
    description: string;
    price: number;
    image: string;
    virtualPrice: number;
    virtualLink: string;
    virtualOnly?: boolean;
    stripeLink?: string;
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
