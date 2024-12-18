import React from "react";

type Props = {
  imageUrl: string;
  caption: string;
};

const ImageCard: React.FC<Props> = ({ imageUrl, caption }) => {
  return (
    <figure className="w-full overflow-hidden rounded-base border-2 border-border dark:border-darkBorder bg-main font-base shadow-light dark:shadow-dark">
      <img className="w-full aspect-[4/3]" src={imageUrl} alt="image" />
      <figcaption className="border-t-2 text-text border-border dark:border-darkBorder p-4">
        {caption}
      </figcaption>
    </figure>
  );
};

export default ImageCard;
