import { INft } from 'elrond/nft';
import { useQuery, UseQueryOptions } from 'react-query';
import { useSession } from '~/hooks/store/sessions';
import { elrondHttpRequest } from '~/utils/request';

export const useGetNfts = (queryOptions: UseQueryOptions<Array<INft>, Error, Array<INft>, Array<string | null>> = {}) => {
  const { addressId, setNfts } = useSession();

  return useQuery(
    [addressId],
    () => elrondHttpRequest<INft[]>(`accounts/${addressId}/nfts`, { params: { from: 0, size: 200 }, method: 'GET' }),
    {
      ...queryOptions,
      onSuccess: (data) => {
        setNfts(data);

        queryOptions?.onSuccess?.(data);
      },
      enabled: !!addressId,
    },
  );
};
