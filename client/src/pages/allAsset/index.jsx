import { useParams } from 'react-router-dom';

const AllAsset = () => {
  const { ID } = useParams();
  return <div> Management/{ID}</div>;
};

export default AllAsset;
