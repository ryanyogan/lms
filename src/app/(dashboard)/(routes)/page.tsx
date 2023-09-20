import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div>
      This is a protected page
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
