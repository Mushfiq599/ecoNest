"use client";

import { useState } from "react";
import { Modal, Button, TextField, Label, Input, TextArea, Select, ListBox } from "@heroui/react";
import { Product, ProductCategory } from "@/types";

const categories: ProductCategory[] = ["home", "fashion", "food", "transport"];

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  ecoScore: number;
  stock: number;
  images: string;
}

export function ProductFormModal({
  mode,
  product,
  isPending,
  onSubmit,
  trigger,
}: {
  mode: "create" | "edit";
  product?: Product;
  isPending?: boolean;
  onSubmit: (values: ProductFormValues, close: () => void) => void;
  trigger: React.ReactNode;
}) {
  const [values, setValues] = useState<ProductFormValues>({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    category: product?.category ?? "home",
    ecoScore: product?.ecoScore ?? 50,
    stock: product?.stock ?? 0,
    images: product?.images?.[0] ?? "",
  });

  return (
    <Modal>
      {trigger}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            {({ close }) => (
              <>
                <Modal.Header>
                  <Modal.Heading>{mode === "create" ? "Add Product" : "Edit Product"}</Modal.Heading>
                </Modal.Header>
                <Modal.Body className="space-y-4">
                  <TextField>
                    <Label>Name</Label>
                    <Input value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} />
                  </TextField>

                  <TextField>
                    <Label>Description</Label>
                    <TextArea
                      value={values.description}
                      onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
                    />
                  </TextField>

                  <div className="grid grid-cols-2 gap-4">
                    <TextField>
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        value={String(values.price)}
                        onChange={(e) => setValues((v) => ({ ...v, price: Number(e.target.value) }))}
                      />
                    </TextField>
                    <TextField>
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={String(values.stock)}
                        onChange={(e) => setValues((v) => ({ ...v, stock: Number(e.target.value) }))}
                      />
                    </TextField>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      selectedKey={values.category}
                      onSelectionChange={(key) => setValues((v) => ({ ...v, category: key as ProductCategory }))}
                    >
                      <Label>Category</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {categories.map((c) => (
                            <ListBox.Item key={c} id={c} textValue={c}>
                              {c}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    <TextField>
                      <Label>Eco-Score (0–100)</Label>
                      <Input
                        type="number"
                        value={String(values.ecoScore)}
                        onChange={(e) => setValues((v) => ({ ...v, ecoScore: Number(e.target.value) }))}
                      />
                    </TextField>
                  </div>

                  <TextField>
                    <Label>Image URL</Label>
                    <Input
                      value={values.images}
                      onChange={(e) => setValues((v) => ({ ...v, images: e.target.value }))}
                      placeholder="https://..."
                    />
                  </TextField>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="ghost" onPress={close}>Cancel</Button>
                  <Button variant="primary" isPending={isPending} onPress={() => onSubmit(values, close)}>
                    {mode === "create" ? "Create" : "Save Changes"}
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}