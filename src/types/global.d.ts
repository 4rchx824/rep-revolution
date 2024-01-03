import { DayOfWeek } from "@prisma/client";
import { z } from "zod";

const DayOfWeekEnum = z.nativeEnum(DayOfWeek);
type DayOfWeekEnum = z.infer<typeof DayOfWeekEnum>;

export const WorkoutPlanSchema = z.object({
  name: z.string().min(5),
  description: z.string().optional(),
  day_of_week: DayOfWeekEnum,
});
