import { updatePot } from "@/services/pot";
import { useNavigate, useParams } from "react-router-dom";
import { usePots } from "@/services/usePot";
import PotForm from "./components/PotForm";

const PotEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: pots } = usePots();
  const pot = pots?.find((p: any) => p.id === id);

  if (!pot) return <div>Loading...</div>;

  return (
    <PotForm
      initialData={pot}
      submitLabel="Update"
      onSubmit={async (data) => {
        await updatePot(id!, data);
        navigate(-1);
      }}
    />
  );
};

export default PotEditPage;