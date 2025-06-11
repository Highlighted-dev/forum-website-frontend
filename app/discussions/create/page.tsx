import { auth } from "@/auth";
import { DiscussionEditor } from "@/components/editor/DiscussionEditor";

export default async function CreatePage() {
  const session = await auth();
  return (
    <div className="container mt-6">
      <DiscussionEditor title="" content="" session={session} />
    </div>
  );
}
