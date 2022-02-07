import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INft } from 'elrond/nft';
import styled from 'styled-components';
import GridLayout from '~/components/common/GridLayout';
import NftView from '~/components/common/NftView';
import ErdInput from '~/components/ErdInput';
import NFTDraggableList from '~/components/NFTDraggableList';
import { useInitApp } from '~/hooks/init';
import { useSession } from '~/hooks/store/sessions';

const TitleContainer = styled.span`
  background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function Index() {
  const { isInit } = useSession();
  useInitApp();

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="p-4 bg-white rounded">
          <TitleContainer className="flex items-center font-bold">NFT Augment</TitleContainer>
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
          <GridLayout<INft> className="w-4/5" itemToRender={(nft) => <NftView nft={nft} />} />
        </div>
      )}
      <div className="md:hidden">{`Not usable on a mobile device sorry ;)`}</div>
    </div>
  );
}
