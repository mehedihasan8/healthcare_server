import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../../shared/prisma";

const insertIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  const interverTime = 30;
  const schedules = [];

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addHours(
        `${format(currentDate, "yyyy-MM-dd")}`,
        Number(startTime.split(":")[0])
      )
    );

    const endDateTime = new Date(
      addHours(
        `${format(currentDate, "yyyy-MM-dd")}`,
        Number(endTime.split(":")[0])
      )
    );

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, interverTime),
      };
      const result = await prisma.schedule.create({
        data: scheduleData,
      });
      schedules.push(result);
      startDateTime.setMinutes(startDateTime.getMinutes() + interverTime);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return schedules;
};
export const schedulesService = {
  insertIntoDB,
};
