import { addHours, addMinutes, format } from "date-fns";

const insertIntoDB = (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  const interverTime = 30;

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

    console.log(startDateTime);
    console.log(endDateTime);

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, interverTime),
      };
      console.log(scheduleData);
    }
  }
};
export const schedulesService = {
  insertIntoDB,
};
