export type Day = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export type Role = "NURSE" | "AUX";

// Keep extras optional for other screens; table only highlights MORNING/NOON
export type Shift = "MORNING" | "NOON" | "OFF" | "VACATION" | "NIGHT";

export type ScheduleCell = {
  userId: string;
  username: string;
  role: Role;
  day: Day;
  shift: Shift;
  inCharge?: boolean; // nurse in charge for that day+shift
};

export type ScheduleWeek = {
  weekOf: string; // e.g. "2025-08-24"
  cells: ScheduleCell[];
};
