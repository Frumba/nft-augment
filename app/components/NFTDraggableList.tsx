import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import styled from 'styled-components';
import NftView from '~/components/common/NftView';
import { useSession } from '~/hooks/store/sessions';

const AccordionItemButtonStyled = styled(AccordionItemButton)`
  [aria-expanded='true'] {
    background-color: blue;
  }
`;

interface IProps {
  className?: string;
}

const NFTDraggableList = ({ className }: IProps) => {
  const { nftGroups } = useSession();

  return (
    <Accordion className={className} allowMultipleExpanded allowZeroExpanded>
      {nftGroups.map((nftGroup) => {
        return (
          <AccordionItem key={nftGroup.title}>
            <AccordionItemHeading>
              <AccordionItemButtonStyled className="p-4 bg-blue-300">{nftGroup.title}</AccordionItemButtonStyled>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="my-4 flex flex-col gap-4">
                {nftGroup.nfts.map((nft) => {
                  return (
                    <NftView
                      className="droppable-element"
                      draggable={true}
                      unselectable="on"
                      // this is a hack for firefox
                      // Firefox requires some kind of initialization
                      // which we can do by adding this attribute
                      // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                      onDragStart={(e) => e.dataTransfer.setData('data', JSON.stringify(nft))}
                      key={nft.identifier}
                      nft={nft}
                    />
                  );
                })}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default NFTDraggableList;
