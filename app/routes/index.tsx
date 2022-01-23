import { useEffect, useState } from 'react';
import { useGetNfts } from '~/hooks/api/elrond/entities';
import { FileType } from '~/typings/enums/elrond';
import { getElementInParam } from '~/utils/url';

export default function Index() {
  const [addressId, setAddressId] = useState<string | null>(null);

  const { data } = useGetNfts(addressId, { enabled: !!addressId });

  useEffect(() => {
    const addressId = getElementInParam('addressId');

    if (addressId) {
      setAddressId(addressId as string);
    }
  }, []);

  return (
    <div className="m-4 flex flex-col gap-8">
      <form
        className="flex gap-4"
        onSubmit={(event) => {
          event.preventDefault();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (event.target as any)[0].value;

          setAddressId(value);

          location.replace(`?addressId=${value}`);
        }}
      >
        <input
          placeholder="ERD Address"
          className="w-full md:w-[300px] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
          type="text"
          id="addressId"
          name="addressId"
          required
        />
        <input className="p-2 rounded bg-blue-400 text-white cursor-pointer" type="submit" value="Send" />
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {data
          ?.map((nft) => {
            if (nft.media.length > 0) {
              const media = nft.media[0];

              if (media.fileType === FileType.ImageJPEG || media.fileType === FileType.ImagePNG) {
                return (
                  <img
                    key={nft.identifier}
                    className="w-100 h-100 rounded bg-gradient-to-r from-cyan-500 to-blue-500"
                    src={media.thumbnailUrl}
                  />
                );
              }

              if (media.fileType === FileType.VideoMp4) {
                return (
                  <video
                    key={nft.identifier}
                    className="w-100 h-100 rounded bg-gradient-to-r from-cyan-500 to-blue-500"
                    autoPlay
                    loop
                  >
                    <source src={media.url} type="video/mp4" />
                  </video>
                );
              }
            }
          })
          .filter((nft) => !!nft)}
      </div>
    </div>
  );
}
