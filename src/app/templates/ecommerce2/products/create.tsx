"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Upload, ArrowLeft } from "lucide-react";

function ProductDetailsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" name="sku" />
          </div>
          <div>
            <Label htmlFor="barcode">Barcode</Label>
            <Input id="barcode" name="barcode" />
          </div>
        </div>
        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea id="description" name="description" />
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
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
      </CardHeader>
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
                  <img src={URL.createObjectURL(file)} alt={file.name} className="object-cover w-full h-full" />
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
      <CardHeader>
        <CardTitle>Variants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-sm">Add color, size or other options after criar produto.</div>
      </CardContent>
    </Card>
  );
}

function ProductPricingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="price">Base Price</Label>
          <Input id="price" name="price" type="number" />
        </div>
        <div>
          <Label htmlFor="discountedPrice">Discounted Price</Label>
          <Input id="discountedPrice" name="discountedPrice" type="number" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="chargeTax" />
          <label htmlFor="chargeTax">Charge tax on this product</label>
        </div>
        <hr />
        <div className="flex items-center space-x-2">
          <Switch id="inStock" defaultChecked />
          <Label htmlFor="inStock">In stock</Label>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductStatusCard() {
  return (
    <Card>
      <CardHeader><CardTitle>Status</CardTitle></CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

function ProductCategoryCard() {
  return (
    <Card>
      <CardHeader><CardTitle>Category</CardTitle></CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="shoes">Shoes</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
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
              <a href="/templates/ecommerce2/products">
                <ArrowLeft className="size-4" />
              </a>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Add Product</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Discard</Button>
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
