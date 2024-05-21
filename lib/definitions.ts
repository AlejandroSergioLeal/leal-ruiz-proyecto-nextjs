export interface ProductCard{
    //id: number;
    name: string;
    description: string;
    imageUrl : string;
    price: number;
}

export interface ProductReelProps {
    title: string
}

export interface Product {
    name: string;
    artist: string;
    price: number;
    image: string;
  }

export interface CarouselSizeProps{
    products: Product[];
}  