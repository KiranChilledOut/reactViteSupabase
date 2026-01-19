import { create } from 'zustand'
import type { IUser } from '../interfaces'

interface UserState {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useUserStore;
export type { UserState as IUserGlobalStore };

// users-store.ts
// import { create } from "zustand";
// import { IUser } from "../interfaces";

// const usersGlobalStore = create((set) => ({
//     user: null,
//     setUser: (user: IUser | null) => set({ user }),
// }));

// export default usersGlobalStore;

// export interface IUsersGlobalStore {
//     user: IUser | null;
//     setUser: (user: IUser | null) => void;
