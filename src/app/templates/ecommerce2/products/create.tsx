"use client";
import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, ArrowLeft } from "lucide-react";
import Image from "next/image";

function ProductDetailsCard() {
  return (
    <Card>
  <CardHeader><div className="font-semibold">Product Details</div></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input id="name" name="name" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label htmlFor="sku" className="text-sm font-medium">SKU</label>
            <Input id="sku" name="sku" />
          </div>
          <div>
            <label htmlFor="barcode" className="text-sm font-medium">Barcode</label>
            <Input id="barcode" name="barcode" />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium">Description (Optional)</label>
          <Input id="description" name="description" />
          <p className="text-sm text-muted-foreground">
            Set a description to the product for better visibility.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductImagesCard() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    setFiles(prev => [...prev, ...dropped]);
  }
  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
    setFiles(prev => [...prev, ...selected]);
  }
  return (
    <Card>
  <CardHeader><div className="font-semibold">Product Images</div></CardHeader>
      <CardContent>
        <div
          className="file-upload-zone"
          data-dragging={dragging}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {files.length === 0 ? (
            <>
              <div className="file-upload-zone__icon-wrapper">
                <Upload className="file-upload-zone__icon" />
              </div>
              <div className="file-upload-zone__text">Drop your images here</div>
              <div className="file-upload-zone__hint">PNG, JPG up to 5MB each</div>
              <Input ref={inputRef} type="file" multiple className="sr-only" onChange={handleSelect} />
              <Button type="button" variant="outline" className="mt-4" onClick={() => inputRef.current?.click()}>Select images</Button>
            </>
          ) : (
            <div className="flex flex-wrap gap-2">
              {files.map((file, i) => (
                <div key={i} className="relative h-24 w-24 rounded-lg overflow-hidden border">
                  <Image src={URL.createObjectURL(file)} alt={file.name} width={96} height={96} className="object-cover w-full h-full" />
                </div>
              ))}
              <Input ref={inputRef} type="file" multiple className="sr-only" onChange={handleSelect} />
              <Button type="button" variant="outline" className="h-24 w-24" onClick={() => inputRef.current?.click()}><Upload className="mx-auto" /></Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProductVariantsCard() {
  // Estrutura inicial, pode ser expandida depois
  return (
    <Card>
  <CardHeader><div className="font-semibold">Variants</div></CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-sm">Add color, size or other options after criar produto.</div>
      </CardContent>
    </Card>
  );
}

function ProductPricingCard() {
  return (
    <Card>
  <CardHeader><div className="font-semibold">Pricing</div></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="price" className="text-sm font-medium">Base Price</label>
          <Input id="price" name="price" type="number" />
        </div>
        <div>
          <label htmlFor="discountedPrice" className="text-sm font-medium">Discounted Price</label>
          <Input id="discountedPrice" name="discountedPrice" type="number" />
        </div>
        <div className="text-sm text-muted-foreground">More pricing options coming soon.</div>
      </CardContent>
    </Card>
  );
}

function ProductStatusCard() {
  return (
    <Card>
  <CardHeader><div className="font-semibold">Status</div></CardHeader>
      <CardContent>
    <div className="text-sm text-muted-foreground">Select status (coming soon)</div>
      </CardContent>
    </Card>
  );
}

function ProductCategoryCard() {
  return (
    <Card>
  <CardHeader><div className="font-semibold">Category</div></CardHeader>
      <CardContent>
    <div className="text-sm text-muted-foreground">Choose category (coming soon)</div>
      </CardContent>
    </Card>
  );
}

export default function CreateProductPage() {
  // const { control, handleSubmit } = useForm(); // pronto para integração
  return (
    <div className="mx-auto max-w-[1200px]">
      <form>
        {/* Header */}
        <div className="mb-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/templates/ecommerce2/products">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Add Product</h1>
          </div>
          <div className="flex gap-2">
      <Button variant="outline">Discard</Button>
            <Button variant="outline">Save Draft</Button>
            <Button type="submit">Publish</Button>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-6">
          <div className="space-y-4 lg:col-span-4">
            <ProductDetailsCard />
            <ProductImagesCard />
            <ProductVariantsCard />
          </div>
          <div className="space-y-4 lg:col-span-2">
            <ProductPricingCard />
            <ProductStatusCard />
            <ProductCategoryCard />
          </div>
        </div>
      </form>
    </div>
  );
}
