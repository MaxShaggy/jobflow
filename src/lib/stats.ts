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

  return Math.trunc(rejectionRate);
}

function parseAppDate(dateStr: string): Date {
  const parts = dateStr.split(".");

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  return new Date(year, month - 1, day);
}


export function getAverageApplicationsPerDay(applications: ApplicationProps[]): number {
  const dates = applications.map((app) => parseAppDate(app.date));
  const datesMS = dates.map((date) => date.getTime());
  const minMS = Math.min(...datesMS);
  const maxMS = Math.max(...datesMS);
  const countOfDays = Math.max((maxMS - minMS) / (1000 * 60 * 60 * 24), 1);
  const averageApplicationsPerDay = applications.length / countOfDays;

  return Math.round(averageApplicationsPerDay * 10) / 10;
}

export function getApplicationsLast7Days(applications: ApplicationProps[]): number {
  const todayMS = new Date().getTime();
  const sevenDaysAgoMS = todayMS - 7 * 24 * 60 * 60 * 1000;
  const recentApplications = applications.filter((app) => parseAppDate(app.date).getTime() > sevenDaysAgoMS);

  return recentApplications.length;
}

export function getAverageApplicationsLast7Days(applications: ApplicationProps[]): number {
  const averageApplicationsLast7Days = getApplicationsLast7Days(applications) / 7;

  return Math.round(averageApplicationsLast7Days * 10) / 10;
}

export function getApplicationsLast30Days(applications: ApplicationProps[]): number {
  const todayMS = new Date().getTime();
  const thirtyDaysAgoMS  = todayMS - 30 * 24 * 60 * 60 * 1000;
  const recentApplications = applications.filter((app) => parseAppDate(app.date).getTime() > thirtyDaysAgoMS );

  return recentApplications.length;
}

export function getAverageApplicationsLast30Days(applications: ApplicationProps[]): number {
  const averageApplicationsLast30Days = getApplicationsLast30Days(applications) / 30;

  return Math.round(averageApplicationsLast30Days * 10) / 10;
}