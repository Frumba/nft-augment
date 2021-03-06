import { faCamera, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INft } from 'elrond/nft';
import { useRef } from 'react';
import styled from 'styled-components';
import GridLayout from '~/components/common/GridLayout';
import NftView from '~/components/common/NftView';
import ErdInput from '~/components/ErdInput';
import NFTDraggableList from '~/components/NFTDraggableList';
import { useInitApp } from '~/hooks/init';
import { useSession } from '~/hooks/store/sessions';
import { useScreenshot } from '~/hooks/utils/useScreenshot';

const TitleContainer = styled.span`
  background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function Index() {
  const ref = useRef<HTMLDivElement>(null);
  const { isInit } = useSession();
  useInitApp();

  const [image, takeScreenshot] = useScreenshot();
  const getImage = async () => {
    const dataUrl = await takeScreenshot(ref.current);

    if (dataUrl) {
      const link = document.createElement('a');
      link.download = 'my-image-name.png';
      link.href = dataUrl;
      link.click();
    }
  };

  console.log(image);

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="p-4 bg-white rounded">
            <TitleContainer className="flex items-center font-bold">NFT Augment</TitleContainer>
          </div>
          <div
            className="cursor-pointer px-5 py-3 bg-white rounded-full flex items-center justify-center"
            onClick={async () => {
              getImage();
            }}
          >
            <FontAwesomeIcon className="text-gray-600" icon={faCamera} />
          </div>
        </div>
        <ErdInput />
      </div>
      {!isInit ? (
        <FontAwesomeIcon className="animate-spin text-xl text-white self-center" icon={faCircleNotch} />
      ) : (
        <div className="hidden md:flex flex-1 gap-4">
          <div className="w-1/5 h-full relative">
            <NFTDraggableList className="overflow-y-auto absolute inset-0" />
          </div>
          <div className="flex w-4/5" ref={ref}>
            <GridLayout<INft> className="flex-1" itemToRender={(nft) => <NftView nft={nft} />} />
          </div>
        </div>
      )}
      <div className="md:hidden">{`Not usable on a mobile device sorry ;)`}</div>
    </div>
  );
}
