import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import NewWorkoutPlan from "./NewWorkoutPlan";

const steps = ["Workout Plan", "Exercise", "Summary"];

const QuickCreate = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-xl font-bold">Quick Create</h1>
      <Breadcrumbs>
        {steps.map((step, index) => (
          <BreadcrumbItem
            onClick={() => setPage(index)}
            isCurrent={index === page}
          >
            {step}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>

      {page === 0 && <NewWorkoutPlan />}
    </div>
  );
};

export default QuickCreate;
