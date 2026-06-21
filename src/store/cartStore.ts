import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  cartTriggerRef: React.RefObject<HTMLButtonElement | null> | null;
  setCartTriggerRef: (ref: React.RefObject<HTMLButtonElement | null>) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  openCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartTriggerRef: null,
      setCartTriggerRef: (ref) => set({ cartTriggerRef: ref }),
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
        get().openCart();
      },
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      increment: (productId) =>
        set((state) => ({
          items: state.items.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i)),
        })),
      decrement: (productId) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        })),
      openCart: () => get().cartTriggerRef?.current?.click(),
    }),
    {
      name: "econest-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);