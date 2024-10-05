// File: app/dashboard/empty-state.tsx
import { Ghost } from "lucide-react";

const EmptyState: React.FC = () => (
  <div className="mt-16 flex flex-col items-center gap-2">
    <Ghost size={64} className="text-zinc-800" />
    <h3 className="font-semibold text-xl">Pretty empty around here</h3>
    <p>Let&apos;s upload your first file</p>
  </div>
);

export default EmptyState;
