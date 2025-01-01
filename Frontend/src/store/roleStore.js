import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRoleStore = create(
  persist((set) => ({
    id: null,
    role: null, // Default role is null
    userName: null,
    setRole: (role) => set({ role: role }),
    setId: (id) => set({ id: id }),
    setUserName: (name) => set({ userName: name }),
    clearRole: () => set({ role: null }),
    clearId: () => set({ id: null }),
  })),
);
