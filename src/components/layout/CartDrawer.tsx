"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Drawer, Button } from "@heroui/react";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function CartDrawer() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { items, removeItem, increment, decrement, setCartTriggerRef } = useCartStore();

  useEffect(() => {
    setCartTriggerRef(triggerRef);
  }, [setCartTriggerRef]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Drawer>
      <Button ref={triggerRef} variant="ghost" isIconOnly aria-label="Cart" className="relative">
    <ShoppingCart size={18} />
    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold leading-none text-accent-foreground">
      {itemCount}
    </span>
  </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="right" className="fixed inset-y-0 right-0 left-auto h-full w-full max-w-sm">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>Your Cart</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body className="space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-12 text-center">
                  <ShoppingCart className="text-foreground/40" size={28} />
                  <p className="text-sm text-foreground/60">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.productId} className="flex gap-3 border-b border-border pb-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-foreground/60">${item.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => decrement(item.productId)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-border hover:bg-surface-secondary"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => increment(item.productId)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-border hover:bg-surface-secondary"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="ml-auto text-danger hover:opacity-70"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Drawer.Body>
            {items.length > 0 && (
              <Drawer.Footer className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm font-medium text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button variant="primary" fullWidth isDisabled>
                  Checkout (coming soon)
                </Button>
              </Drawer.Footer>
            )}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}