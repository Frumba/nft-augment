import { INft } from 'elrond/nft';
import { useQuery } from 'react-query';
import { useSession } from '~/hooks/store/sessions';
import { elrondHttpRequest } from '~/utils/request';

export const useGetNfts = () => {
  const { addressId, setNfts } = useSession();

  return useQuery(
    [addressId],
    () => elrondHttpRequest<INft[]>(`accounts/${addressId}/nfts`, { params: { from: 0, size: 200 }, method: 'GET' }),
    {
      onSuccess: (data) => {
        setNfts(data);
      },
      enabled: !!addressId,
    },
  );
};
