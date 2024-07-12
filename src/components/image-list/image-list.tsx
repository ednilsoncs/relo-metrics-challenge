import {FC} from 'react';
import './styles.css';

interface IImageList {
  list: {id: number; url: string}[];
}

const ImageList: FC<IImageList> = ({list}) => {
  return (
    <ul className="queue-list">
      {list.map(image => {
        return (
          <li key={image.id} className="queue-item">
            <img
              width="100px"
              height="100px"
              src={image.url}
              alt="Queue item"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageList;
