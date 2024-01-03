import { useState } from "react";
import { Input, Textarea, Select, SelectItem, Button } from "@nextui-org/react";
import { type WorkoutPlan, DayOfWeek } from "@prisma/client";
import dayjs from "dayjs";
import { ZodError, z } from "zod";
import { toast } from "sonner";

const DayOfWeekEnum = z.nativeEnum(DayOfWeek);
type DayOfWeekEnum = z.infer<typeof DayOfWeekEnum>;

const WorkoutPlanSchema = z.object({
  name: z.string().min(5),
  description: z.string().optional(),
  day_of_week: DayOfWeekEnum,
});

const NewWorkoutPlan = () => {
  const [err, setErr] = useState<Record<string, string>>();
  const [data, setData] = useState<
    Omit<WorkoutPlan, "user_id" | "workout_plan_id" | "exercises">
  >({
    name: "",
    description: "",
    day_of_week: dayjs()
      .day(dayjs().day())
      .format("dddd")
      .toUpperCase() as DayOfWeek,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >,
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleValidation = () => {
    try {
      WorkoutPlanSchema.parse(data);
      setErr({});
    } catch (err) {
      if (err instanceof ZodError) {
        const issues: Record<string, string> = {};
        err.issues.forEach((issue) => {
          const path = issue.path[0]!;
          issues[path] = issue.message;
        });

        setErr(issues);
      } else {
        toast.error("An unexpected error has occured");
      }
    }
  };

  return (
    <form
      className="flex flex-col space-y-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input
        name="name"
        label="Name"
        size="sm"
        variant="bordered"
        isRequired
        onChange={(e) => {
          handleChange(e);
          handleValidation();
        }}
        isInvalid={!!err?.name}
        errorMessage={err?.name}
      />
      <Textarea
        name="description"
        label="Description"
        variant="bordered"
        onChange={(e) => {
          handleChange(e);
          handleValidation();
        }}
        isInvalid={!!err?.description}
        errorMessage={err?.description}
      />
      <Select
        name="day_of_week"
        label="Select Day"
        variant="bordered"
        defaultSelectedKeys={[data.day_of_week]}
        onChange={(e) => {
          handleChange(e);
          handleValidation();
        }}
        isRequired
        isInvalid={!!err?.day_of_week}
        errorMessage={err?.day_of_week}
      >
        {Object.values(DayOfWeek).map((day) => (
          <SelectItem key={day} value={day}>
            {day.charAt(0) + day.toLowerCase().slice(1)}
          </SelectItem>
        ))}
      </Select>

      <Button className="rounded-md bg-red-600 text-white" type="submit">
        Next
      </Button>
    </form>
  );
};

export default NewWorkoutPlan;
