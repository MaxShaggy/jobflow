import { Column } from "./Column";

interface ColumnProps {
  id: string;
  title: string;
}

interface ApplicationProps {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "applications" | "follow-up" | "interview" | "rejected" | "offer";
}

const columns: ColumnProps[] = [
  { id: "applications", title: "Applications" },
  { id: "follow-up", title: "Follow-up" },
  { id: "interview", title: "Interview" },
  { id: "rejected", title: "Rejected" },
  { id: "offer", title: "Offer" },
]

const applications: ApplicationProps[] = [
  {
    id: "1",
    company: "MacPaw",
    position: "Junior Front-end Engineer",
    date: "06.08",
    status: "applications",
  },
  {
    id: "2",
    company: "Solvexus",
    position: "React Developer",
    date: "30.07",
    status: "follow-up",
  },
  {
    id: "3",
    company: "IDEAL",
    position: "JavaScript Frontend Developer",
    date: "28.07",
    status: "applications",
  },
  {
    id: "4",
    company: "Axels",
    position: "Junior Frontend React Developer",
    date: "28.07",
    status: "applications",
  },
];

export function Board() {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto board-scrollbar  h-full min-h-0">
      {
        columns.map(col => (
          <Column key={col.id} title={ col.title} />
        ))
      }
    </div>
  )
}