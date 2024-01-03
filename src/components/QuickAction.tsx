import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type FC } from "react";
import { Button } from "@nextui-org/react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  title?: string;
  description?: string;
  icon?: JSX.Element;
  onClick: () => void;
}

const QuickAction = forwardRef<HTMLButtonElement, Props>(
  ({ className, title, description, icon, onClick }: Props) => {
    return (
      <Button
        className={cn(
          className,
          "flex h-full w-full max-w-sm border bg-white transition-all",
        )}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle className="flex">{title ?? ""}</CardTitle>
            <CardDescription>{description ?? ""}</CardDescription>
          </CardHeader>
          <CardContent className="py-0">
            {icon ?? <PlusIcon className="text-red-600" size={48} />}
          </CardContent>
        </div>
      </Button>
    );
  },
);

export default QuickAction;
