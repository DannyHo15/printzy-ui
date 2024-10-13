import optionsService from "@/api/options";
import { useState, useEffect } from "react";

const useOptions = (id?: string) => {
  const [options, setOption] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOption = async () => {
      try {
        setLoading(true);
        let result: any;
        if (id) {
          result = await optionsService.getListByProductId(id);
        } else {
          result = await optionsService.getList();
        }

        setOption(result?.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOption();
  }, [id]);

  return options;
};

export default useOptions;
