import { create } from 'zustand';

interface ISearchStore {
  search: string;
  setSearch: (search: string) => void;
  enableSearch: boolean;
  setEnableSearch: (enableSearch: boolean) => void;
}

const searchStore = create<ISearchStore>((set) => ({
  search: '',
  setSearch: (search: string) => set({ search }),
  enableSearch: false,
  setEnableSearch: (enableSearch: boolean) => set({ enableSearch }),
}));

export default searchStore;
