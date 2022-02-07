import { useGetNfts } from '~/hooks/api/elrond/nft';
import { useSession } from '~/hooks/store/sessions';

export const useInitApp = () => {
  const { setIsInit } = useSession();

  useGetNfts({
    onSuccess: () => {
      setIsInit(true);
    },
  });
};
