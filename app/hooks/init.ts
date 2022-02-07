import { useGetNfts } from '~/hooks/api/elrond/nft';

export const useInitApp = () => {
  useGetNfts();
};
