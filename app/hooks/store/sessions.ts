import { INft, INftGroup } from 'elrond/nft';
import create from 'zustand';

type StoreProps = {
  isInit?: boolean;
  setIsInit: (isInit: boolean) => void;
  addressId: string | null;
  nftGroups: INftGroup[];
  setAddressId: (addressId: string) => void;
  setNfts: (nfts: INft[]) => void;
};

export const useSession = create<StoreProps>((set) => {
  return {
    addressId: null,
    isInit: false,
    nftGroups: [],
    setAddressId: (addressId: string) => {
      set({ addressId, nftGroups: [] });
    },
    setIsInit: (isInit: boolean) => {
      set({ isInit });
    },
    setNfts: (nfts: INft[]) => {
      const nftGroups = nfts.reduce<INftGroup[]>((acc, nft) => {
        const group = acc.find((group) => group.title === nft.collection.split('-')[0]);

        if (group) {
          group.nfts.push(nft);
        } else {
          acc.push({ title: nft.collection.split('-')[0], nfts: [nft] });
        }
        return acc;
      }, []);

      set({ nftGroups });
    },
  };
});
