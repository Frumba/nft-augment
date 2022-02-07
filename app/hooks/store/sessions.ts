import { INft, INftGroup } from 'elrond/nft';
import create from 'zustand';

type StoreProps = {
  addressId: string | null;
  nftGroups: INftGroup[];
  setAddressId: (addressId: string) => void;
  setNfts: (nfts: INft[]) => void;
};

export const useSession = create<StoreProps>((set) => {
  return {
    addressId: null,
    nftGroups: [],
    setAddressId: (addressId: string) => {
      set({ addressId, nftGroups: [] });
    },
    setNfts: (nfts: INft[]) => {
      const nftGroups = nfts.reduce<INftGroup[]>((acc, nft) => {
        const group = acc.find((group) => group.title === nft.collection);
        if (group) {
          group.nfts.push(nft);
        } else {
          acc.push({ title: nft.collection, nfts: [nft] });
        }
        return acc;
      }, []);

      set({ nftGroups });
    },
  };
});
