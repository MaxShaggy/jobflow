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
        <h2 className="mb-4 text-cyan-400/90">General Stats</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <span className="text-white/70">Total applications</span>
          <span>{total}</span>

          <span className="text-white/70">Applications</span>
          <span>{statusCounts.applications}</span>

          <span className="text-white/70">Follow-up</span>
          <span>{statusCounts["follow-up"]}</span>

          <span className="text-white/70">Interview</span>
          <span>{statusCounts.interview}</span>

          <span className="text-white/70">Rejected</span>
          <span>{statusCounts.rejected}</span>

          <span className="text-white/70">Offer</span>
          <span>{statusCounts.offer}</span>

          <span className="text-white/70">Rejection rate</span>
          <span>{rejectionRate}%</span>

          <span className="text-white/70">Applications (last 30 days)</span>
          <span>{last30Days}</span>

          <span className="text-white/70">Applications (last 7 days)</span>
          <span>{last7Days}</span>
        </div>
      </section>

      <section className="max-w-lg">
        <h2 className="mb-4 text-cyan-400/90">Average Per Day</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <span className="text-white/70">Average per day (all time)</span>
          <span>{avgPerDay}</span>

          <span className="text-white/70">Average per day (last 7 days)</span>
          <span>{avgLast7Days}</span>

          <span className="text-white/70">Average per day (last 30 days)</span>
          <span>{avgLast30Days}</span>
        </div>
      </section>
    </div>
  )
}