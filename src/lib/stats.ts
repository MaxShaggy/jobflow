import { ApplicationProps } from "@/components/Layout/Board";

export function getTotalApplications(applications: ApplicationProps[]): number {
  return applications.length;
}

export function getStatusCounts(applications: ApplicationProps[]) {
  const countOfApplications = applications.filter(
    (app) => app.status === "applications"
  ).length;
  const countOfFollowUp = applications.filter(
    (app) => app.status === "follow-up"
  ).length;
  const countOfInterview = applications.filter(
    (app) => app.status === "interview"
  ).length;
  const countOfRejected = applications.filter(
    (app) => app.status === "rejected"
  ).length;
  const countOfOffer = applications.filter(
    (app) => app.status === "offer"
  ).length;

  return {
    applications: countOfApplications,
    "follow-up": countOfFollowUp,
    interview: countOfInterview,
    rejected: countOfRejected,
    offer: countOfOffer,
  };
}

export function getRejectionRate(applications: ApplicationProps[]) {
  const countOfRejected = applications.filter(
    (app) => app.status === "rejected"
  ).length;
  const total = applications.length;
  const rejectionRate = (countOfRejected / total) * 100;

  return rejectionRate;
}

function parseAppDate(dateStr: string): Date {
  const parts = dateStr.split(".");

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  return new Date(year, month - 1, day);
}
