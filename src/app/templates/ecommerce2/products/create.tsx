"use client";
import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, ArrowLeft, X } from "lucide-react";
import Image from "next/image";

function ProductDetailsCard() {
  return (
    <Card>
      <CardHeader><div className="font-semibold">Informações básicas</div></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Título</label>
          <Input id="name" name="name" placeholder="Ex.: Camiseta Drop 07" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label htmlFor="sku" className="text-sm font-medium">SKU</label>
            <Input id="sku" name="sku" placeholder="HC-001" />
          </div>
          <div>
            <label htmlFor="barcode" className="text-sm font-medium">Código de barras</label>
            <Input id="barcode" name="barcode" placeholder="000123456789" />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium">Descrição</label>
          <Input id="description" name="description" placeholder="Resumo para a vitrine" />
          <p className="text-sm text-muted-foreground">Descreva os diferenciais do drop.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductImagesCard() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const dropped = Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...dropped]);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selected = Array.from(event.target.files).filter((file) => file.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeAt = (index: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <Card>
      <CardHeader><div className="font-semibold">Imagens do produto</div></CardHeader>
      <CardContent>
        <div
          className="file-upload-zone"
          data-dragging={dragging}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {files.length === 0 ? (
            <>
              <div className="file-upload-zone__icon-wrapper">
                <Upload className="file-upload-zone__icon" />
              </div>
              <div className="file-upload-zone__text">Arraste e solte as imagens</div>
              <div className="file-upload-zone__hint">PNG ou JPG até 5MB</div>
              <Input ref={inputRef} type="file" multiple className="sr-only" onChange={handleSelect} />
              <Button type="button" variant="outline" className="mt-4" onClick={() => inputRef.current?.click()}>
                Selecionar arquivos
              </Button>
            </>
          ) : (
            <div className="flex flex-wrap gap-3">
              {files.map((file, index) => (
                <div key={`${file.name}-${index}`} className="relative h-28 w-28 overflow-hidden rounded-xl border border-gray-200">
                  <Image src={URL.createObjectURL(file)} alt={file.name} width={112} height={112} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeAt(index)}
                    className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
                    aria-label="Remover imagem"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <Button type="button" variant="outline" className="h-28 w-28" onClick={() => inputRef.current?.click()}>
                <Upload className="mx-auto" />
              </Button>
              <Input ref={inputRef} type="file" multiple className="sr-only" onChange={handleSelect} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProductVariantsCard() {
  return (
    <Card>
      <CardHeader><div className="font-semibold">Variantes</div></CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">Cadastre tamanhos e cores após publicar o produto.</div>
      </CardContent>
    </Card>
  );
}

function ProductPricingCard() {
  return (
    <Card>
      <CardHeader><div className="font-semibold">Preços</div></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="price" className="text-sm font-medium">Preço base</label>
          <Input id="price" name="price" type="number" placeholder="R$" />
        </div>
        <div>
          <label htmlFor="discountedPrice" className="text-sm font-medium">Preço promocional</label>
          <Input id="discountedPrice" name="discountedPrice" type="number" placeholder="Opcional" />
        </div>
        <div className="text-sm text-muted-foreground">Acrescente regras de desconto no painel de promoções.</div>
      </CardContent>
    </Card>
  );
}

function ProductStatusCard() {
  return (
    <Card>
      <CardHeader><div className="font-semibold">Status</div></CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">Publicado, rascunho ou em revisão (em breve).</div>
      </CardContent>
    </Card>
  );
}

function ProductCategoryCard() {
  return (
    <Card>
      <CardHeader><div className="font-semibold">Categoria</div></CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">Selecione a coleção principal do drop.</div>
      </CardContent>
    </Card>
  );
}

export default function CreateProductPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <form>
        <div className="mb-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/templates/ecommerce2/admin/products">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Novo produto</h1>
              <p className="text-sm text-muted-foreground">Cadastre o próximo drop com imagens, preços e descrição completa.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Descartar</Button>
            <Button variant="outline">Salvar rascunho</Button>
            <Button type="submit">Publicar</Button>
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

