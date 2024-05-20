import { prisma } from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";

const createAppointment = async (user: IAuthUser, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  console.log("appointment create!", patientData);
  console.log("payload !", payload);
};
export const appointmentService = {
  createAppointment,
};
