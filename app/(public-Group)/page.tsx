import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

export default async function HomePage() {
  const user = await getMe();
  return (
    <div>
      Hello Nextjs from JIM
      <Button> new btn</Button>
    </div>
  );
}
