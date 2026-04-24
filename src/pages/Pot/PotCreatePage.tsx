import { createPot } from "@/services/pot";
import { useNavigate } from "react-router-dom";
import PotForm from "./components/PotForm";

const PotCreatePage = () => {
  const navigate = useNavigate();

  return (
    <PotForm
      submitLabel="Simpan"
      onSubmit={async (data) => {
        await createPot(data);
        navigate(-1);
      }}
    />
  );
};

export default PotCreatePage;