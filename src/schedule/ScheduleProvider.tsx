import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ScheduleRequest, ScheduleWeek } from "./types";

const STORAGE = { weeks: "sched_weeks_v1", requests: "sched_requests_v1" };
const uuid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

type Ctx = {
  weeks: ScheduleWeek[];
  requests: ScheduleRequest[];
  addRequest: (r: Omit<ScheduleRequest, "id" | "status" | "createdAt">) => void;
};

const Ctx = createContext<Ctx>(null as any);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [weeks, setWeeks] = useState<ScheduleWeek[]>(mockWeeks());
  const [requests, setRequests] = useState<ScheduleRequest[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [w, r] = await Promise.all([
          AsyncStorage.getItem(STORAGE.weeks),
          AsyncStorage.getItem(STORAGE.requests),
        ]);
        if (w) setWeeks(JSON.parse(w));
        if (r) setRequests(JSON.parse(r));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE.weeks, JSON.stringify(weeks)).catch(() => {});
  }, [weeks]);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE.requests, JSON.stringify(requests)).catch(
      () => {}
    );
  }, [requests]);

  const addRequest: Ctx["addRequest"] = (r) => {
    setRequests((prev) => [
      {
        ...r,
        id: uuid(),
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const value = useMemo(
    () => ({ weeks, requests, addRequest }),
    [weeks, requests]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useSchedule = () => useContext(Ctx);

// ── Mock weekly data (replace later) ──
function mockWeeks(): ScheduleWeek[] {
  const weekOf = startOfWeekISO(new Date()); // Sunday
  return [
    {
      weekOf,
      cells: [
        { userId: "u1", username: "reem.abed", day: "SUN", shift: "MORNING" },
        { userId: "u1", username: "reem.abed", day: "THU", shift: "NOON" },
        { userId: "u2", username: "abu.rana", day: "MON", shift: "MORNING" },
      ],
    },
  ];
}
export function startOfWeekISO(d: Date) {
  const day = d.getDay(); // 0=Sun
  const diff = d.getDate() - day; // go back to Sunday
  const sunday = new Date(d);
  sunday.setDate(diff);
  sunday.setHours(0, 0, 0, 0);
  return sunday.toISOString().slice(0, 10);
}
