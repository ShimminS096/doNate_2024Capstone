import { useParams, useSearchParams } from "react-router-dom";

const BeneficiaryDetailPage = () => {
   const params = useParams();
  // const { params, setParams } = useSearchParams();
  // console.log(params.get("value"));

  return <div>{params.id}번 Beneficiary</div>;
};

export default BeneficiaryDetailPage;
