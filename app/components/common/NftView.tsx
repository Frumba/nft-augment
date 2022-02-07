import { INft } from 'elrond/nft';
import { HTMLAttributes } from 'react';
import { FileType } from '~/typings/enums/elrond';

interface IProps extends HTMLAttributes<unknown> {
  nft: INft;
}

const NftView = ({ className, nft, ...elementProps }: IProps) => {
  const media = nft.media[0];

  if (media.fileType === FileType.ImageJPEG || media.fileType === FileType.ImagePNG) {
    return (
      <img
        {...elementProps}
        key={nft.identifier}
        className={`${className} w-100 h-100 rounded bg-gradient-to-r from-cyan-500 to-blue-500`}
        src={media.thumbnailUrl}
      />
    );
  }

  if (media.fileType === FileType.VideoMp4) {
    return (
      <video
        {...elementProps}
        key={nft.identifier}
        className={`${className} w-100 h-100 rounded bg-gradient-to-r from-cyan-500 to-blue-500`}
        autoPlay
        loop
      >
        <source src={media.url} type="video/mp4" />
      </video>
    );
  }

  return null;
};

export default NftView;
