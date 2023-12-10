import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  classname?: string;
  title?: string;
  description?: string;
  icon?: JSX.Element;
};

const QuickAction = ({ classname, title, description, icon }: Props) => {
  return (
    <Card
      className={cn(
        classname,
        "w-full max-w-sm cursor-pointer transition-all duration-300 hover:shadow-lg",
      )}
    >
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>{title ?? ""}</CardTitle>
          <CardDescription>{description ?? ""}</CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          {icon ?? <PlusIcon className="text-red-600" size={48} />}
        </CardContent>
      </div>
    </Card>
  );
};

export default QuickAction;
