// Mock customer reviews data
// In production, this would come from a database

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  helpful: number;
  verified: boolean;
}

// Sample reviews that can be used for any product
const sampleReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    date: '2024-10-05',
    title: 'Exceeded expectations!',
    text: 'Absolutely love this product. High quality, arrived quickly, and the packaging was 100% recyclable. This is exactly what I was looking for to reduce my plastic waste. Will definitely be ordering again!',
    helpful: 247,
    verified: true,
  },
  {
    id: '2',
    author: 'James L.',
    rating: 5,
    date: '2024-09-28',
    title: 'Perfect sustainable choice',
    text: 'Been using this for a few weeks now and I\'m really impressed. The quality is exceptional, and knowing it\'s made ethically gives me peace of mind. Worth every penny.',
    helpful: 189,
    verified: true,
  },
  {
    id: '3',
    author: 'Emma T.',
    rating: 4,
    date: '2024-09-15',
    title: 'Great product, minor issue',
    text: 'Love the product itself - it\'s well-made and looks beautiful. Shipping took a bit longer than expected, but customer service was helpful. Minor wear mark on packaging but contents were perfect.',
    helpful: 124,
    verified: true,
  },
  {
    id: '4',
    author: 'David K.',
    rating: 5,
    date: '2024-08-30',
    title: 'Best purchase I\'ve made',
    text: 'I\'ve been trying to go zero-waste and this has been a game-changer. The craftsmanship is outstanding, and I love supporting a company that actually cares about sustainability.',
    helpful: 312,
    verified: true,
  },
  {
    id: '5',
    author: 'Lisa P.',
    rating: 4,
    date: '2024-08-12',
    title: 'Exactly what I needed',
    text: 'High quality product that delivers on its promises. My only minor complaint is the price point, but the durability means it will last for years, so it\'s actually a great investment.',
    helpful: 156,
    verified: true,
  },
  {
    id: '6',
    author: 'Michael R.',
    rating: 5,
    date: '2024-07-28',
    title: 'Outstanding quality and values',
    text: 'I\'m impressed by both the product quality and the company\'s commitment to sustainability. This is what responsible business looks like. Highly recommend to anyone serious about reducing their environmental impact.',
    helpful: 198,
    verified: true,
  },
  {
    id: '7',
    author: 'Rachel H.',
    rating: 3,
    date: '2024-07-10',
    title: 'Good but not perfect',
    text: 'The product works well and is sustainable, which is great. However, it\'s a bit smaller than I expected based on the photos. Still satisfied overall, just wished the dimensions were clearer in the listing.',
    helpful: 87,
    verified: true,
  },
  {
    id: '8',
    author: 'Tom B.',
    rating: 5,
    date: '2024-06-22',
    title: 'Finally found an ethical alternative',
    text: 'Was looking for a sustainable replacement for my old plastic version. This exceeded all my expectations. Beautiful design, excellent quality, and I feel good about my purchase.',
    helpful: 203,
    verified: true,
  },
];

export function getReviewsForProduct(): Review[] {
  // In production, this would filter reviews by product ID
  // For now, return sample reviews for all products
  return sampleReviews;
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}
