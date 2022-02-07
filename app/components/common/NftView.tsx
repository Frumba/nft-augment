import { INft } from 'elrond/nft';
import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { FileType } from '~/typings/enums/elrond';

const baseStyle = css`
height: 100%;
  min-width: 100%;
  left: 50%;
  position: relative;
  transform: translateX(-50%);
  object-fit: cover;
`;

const ImageContainer = styled.img`
  ${baseStyle}
`;

const VideoContainer = styled.video`
  ${baseStyle}
`;

interface IProps extends HTMLAttributes<unknown> {
  nft: INft;
}

const NftView = ({ className, nft, ...elementProps }: IProps) => {
  const media = nft.media[0];

  if (media.fileType === FileType.ImageJPEG || media.fileType === FileType.ImagePNG) {
    return (
      <ImageContainer
        {...elementProps}
        key={nft.identifier}
        className={`${className} w-100 h-100 rounded bg-gradient-to-r from-cyan-500 to-blue-500`}
        src={media.thumbnailUrl}
      />
    );
  }

  if (media.fileType === FileType.VideoMp4) {
    return (
      <VideoContainer
        {...elementProps}
        key={nft.identifier}
        className={`${className} w-100 h-100 rounded bg-gradient-to-r from-cyan-500 to-blue-500`}
        autoPlay
        loop
      >
        <source src={media.url} type="video/mp4" />
      </VideoContainer>
    );
  }

  return null;
};

export default NftView;
