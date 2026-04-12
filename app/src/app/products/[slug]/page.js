import dbConnect from '@/lib/mongodb';
import Product from '@/server/models/Product';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

async function getProduct(slug) {
  await dbConnect();
  const product = await Product.findOne({ slug });
  return product ? JSON.parse(JSON.stringify(product)) : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | Theesma Sports Arsenal`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Theesma Sports`,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
