export interface Root {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
  
  export interface Rating {
    rate: number;
    count: number;
  }

  export interface AuthResponse {
    token: string;
  }

  export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
}

export interface CartUser{
    userId:number;
    cart:{
      productId: number | null;
      quantity: number | null;
    }[]
}

export interface CategoryWithProducts {
  category: string;
  products: Root[];
}