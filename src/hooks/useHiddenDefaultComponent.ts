import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useHiddenDefaultComponent = () => {
  const pathname = usePathname();
  const hiddenRoutes = new Set(["/editor"]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(hiddenRoutes.has(pathname));
  }, [pathname]);

  return hidden;
};
