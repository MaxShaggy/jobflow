"use client"

import { useApplications } from "@/components/Common/ApplicationsProvider";
import {
  getTotalApplications,
  getStatusCounts,
  getRejectionRate,
  getAverageApplicationsPerDay,
  getApplicationsLast7Days,
  getAverageApplicationsLast7Days,
  getApplicationsLast30Days,
  getAverageApplicationsLast30Days,
} from "@/lib/stats";

export function Statistics() {
  const { applications } = useApplications();

  const total = getTotalApplications(applications);
  const statusCounts = getStatusCounts(applications);
  const rejectionRate = getRejectionRate(applications);
  const avgPerDay = getAverageApplicationsPerDay(applications);
  const last7Days = getApplicationsLast7Days(applications);
  const avgLast7Days = getAverageApplicationsLast7Days(applications);
  const last30Days = getApplicationsLast30Days(applications);
  const avgLast30Days = getAverageApplicationsLast30Days(applications);

  return (
    <div className="px-4">
      <section className="mb-8 max-w-lg">
        <h2 className="mb-4 text-accent-cyan/90">General Stats</h2>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
          <dt className="text-contrast/70">Total applications</dt>
          <dd>{total}</dd>

          <dt className="text-contrast/70">Applications</dt>
          <dd>{statusCounts.applications}</dd>

          <dt className="text-contrast/70">Follow-up</dt>
          <dd>{statusCounts["follow-up"]}</dd>

          <dt className="text-contrast/70">Interview</dt>
          <dd>{statusCounts.interview}</dd>

          <dt className="text-contrast/70">Rejected</dt>
          <dd>{statusCounts.rejected}</dd>

          <dt className="text-contrast/70">Offer</dt>
          <dd>{statusCounts.offer}</dd>

          <dt className="text-contrast/70">Rejection rate</dt>
          <dd>{rejectionRate}%</dd>

          <dt className="text-contrast/70">Applications (last 30 days)</dt>
          <dd>{last30Days}</dd>

          <dt className="text-contrast/70">Applications (last 7 days)</dt>
          <dd>{last7Days}</dd>
        </dl>
      </section>

      <section className="max-w-lg">
        <h2 className="mb-4 text-accent-cyan/90">Average Per Day</h2>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
          <dt className="text-contrast/70">Average per day (all time)</dt>
          <dd>{avgPerDay}</dd>

          <dt className="text-contrast/70">Average per day (last 7 days)</dt>
          <dd>{avgLast7Days}</dd>

          <dt className="text-contrast/70">Average per day (last 30 days)</dt>
          <dd>{avgLast30Days}</dd>
        </dl>
      </section>
    </div>
  );
}