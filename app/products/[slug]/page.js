import Product from '@/server/models/Product';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

async function getProduct(slug) {
  const product = await Product.findOne({ slug });
  return product;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: 'Product Not Found' };

  const fullDescription = product.description || '';
  const shortDescription = fullDescription.slice(0, 160);
  const imageUrl = product.images?.[0] || product.image || '/img/gear.png';

  return {
    title: `${product.name} | Theesma Sports Arsenal`,
    description: shortDescription,
    keywords: [...(product.category ? [product.category] : []), "Theesma Sports", "Professional Gear", "Tournament Proven"],
    openGraph: {
      title: `${product.name} | Built for Performance`,
      description: shortDescription,
      url: `https://theesmasports.com/products/${slug}`,
      siteName: "Theesma Sports",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: shortDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://theesmasports.com/products/${slug}`,
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
