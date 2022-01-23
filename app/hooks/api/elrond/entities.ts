import { INft } from 'elrond/nft';
import { useQuery, UseQueryOptions } from 'react-query';
import { elrondHttpRequest } from '~/utils/request';

export const useGetNfts = (addressId: string | null, queryOptions?: UseQueryOptions<INft[], Error, INft[], Array<string | null>>) => {
  return useQuery(
    [addressId],
    () => elrondHttpRequest<INft[]>(`accounts/${addressId}/nfts`, { params: { from: 0, size: 200 }, method: 'GET' }),
    queryOptions,
  );
};
