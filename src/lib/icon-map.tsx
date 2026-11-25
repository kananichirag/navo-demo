import type { CSSProperties } from "react";
import { Baby, Ribbon, Shirt, Sparkles, User } from "lucide-react";

type IconProps = {
  className?: string;
  style?: CSSProperties;
};

export function renderCategoryIcon(name: string, className?: string, style?: CSSProperties) {
  const props: IconProps & { "aria-hidden": true } = { className, style, "aria-hidden": true };

  switch (name) {
    case "Ribbon":
      return <Ribbon {...props} />;
    case "Shirt":
      return <Shirt {...props} />;
    case "User":
      return <User {...props} />;
    case "Baby":
      return <Baby {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}
