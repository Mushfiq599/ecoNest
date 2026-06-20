"use client";

import { useState } from "react";
import { Input, TextField, Skeleton, Card, Button } from "@heroui/react";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import { useAdminProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useAdminProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useAdminProducts({ search: debouncedSearch });
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-foreground/70">Manage the product catalog.</p>
        </div>

        <ProductFormModal
          mode="create"
          isPending={createProduct.isPending}
          trigger={
            <Button variant="primary">
              <Plus size={16} className="mr-1" /> Add Product
            </Button>
          }
          onSubmit={(values, close) => {
            createProduct.mutate({ ...values, images: values.images ? [values.images] : [] }, { onSuccess: close });
          }}
        />
      </div>

      <TextField className="mt-6 w-64" aria-label="Search products">
        <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </TextField>

      <Card variant="default" className="mt-4">
        <Card.Content className="overflow-x-auto p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}
            </div>
          ) : !data || data.data.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Search className="text-foreground/40" size={28} />
              <p className="text-sm text-foreground/60">No products found</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/60">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Eco-Score</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((p) => (
                  <tr key={p._id} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-3 text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-surface-secondary">
                          {p.images[0] && <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />}
                        </div>
                        <span className="line-clamp-1">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-foreground/70">{p.category}</td>
                    <td className="px-4 py-3 text-foreground/70">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-foreground/70">{p.ecoScore}</td>
                    <td className="px-4 py-3 text-foreground/70">{p.stock}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <ProductFormModal
                          mode="edit"
                          product={p}
                          isPending={updateProduct.isPending}
                          trigger={<Button variant="ghost" size="sm">Edit</Button>}
                          onSubmit={(values, close) => {
                            updateProduct.mutate(
                              { id: p._id, payload: { ...values, images: values.images ? [values.images] : [] } },
                              { onSuccess: close }
                            );
                          }}
                        />
                        <ConfirmDeleteModal
                          itemName={p.name}
                          isPending={deleteProduct.isPending}
                          onConfirm={(close) => deleteProduct.mutate(p._id, { onSuccess: close })}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}