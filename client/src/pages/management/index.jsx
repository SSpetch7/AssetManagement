import { useParams } from "react-router-dom";

const Management = () => {
  const { ID } = useParams();
  return <div> Management/{ID}</div>;
};

export default Management;
