import Link from "next/link";
import type { Product } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils/currency";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      {product.imageUrl && (
        <div className="aspect-video w-full overflow-hidden border-b bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg leading-snug">
          <Link
            href={`/products/${product.slug}`}
            className="hover:underline"
          >
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-sm font-medium text-primary">
          {formatPrice(Number(product.price))}
        </p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
    </Card>
  );
}
