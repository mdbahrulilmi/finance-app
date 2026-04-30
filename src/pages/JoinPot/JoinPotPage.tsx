import { joinPot } from "@/services/joinPot";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JoinPotPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const doJoin = async () => {
      if (!id) return;

      try {
        await joinPot(id);
      } catch (err) {
        alert("Gagal join pot");
      } finally {
        navigate(`/pot`, { replace: true });
        window.location.reload();
      }
    };

    doJoin();
  }, [id]);

  return <></>;
};

export default JoinPotPage;