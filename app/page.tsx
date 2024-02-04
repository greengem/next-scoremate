import { BoardGamesList } from "@/data/BoardGamesList";
import { GameInstanceList } from "@/data/GameInstanceList";
import { UsersList } from "@/data/UsersList";
import FormRecordGame from "@/forms/FormRecordGame";
import PageHeading from "@/ui/PageHeading";
import Link from "next/link";
import { Suspense } from "react";

function SectionTitle({ title } : { title: string }) {
  return (
    <h3 className="text-2xl mb-2 font-semibold">{title}</h3>
  )
}

function Card({ children } : { children: React.ReactNode }) {
  return (
    <div className="rounded-xl shadow-xl bg-zinc-200 p-5 mb-5">{children}</div>
  )
}

export default function HomePage() {
  return (
    <>
      <PageHeading title="Home" />
      {/*}
      <FormRecordGame />

      <Card>
        <SectionTitle title="All Board Games" />
        <ul>
          <Suspense fallback={<li>Loading Board Games</li>}>
            <BoardGamesList />
          </Suspense>
        </ul>
      </Card>

      <Card>
        <SectionTitle title="All Users" />
        <ul>
          <Suspense fallback={<li>Loading Users</li>}>
            <UsersList />
          </Suspense>
        </ul>
      </Card>

      <Card>
        <SectionTitle title="History" />
        <ul>
          <Suspense fallback={<li>Loading Game Instances</li>}>
            <GameInstanceList />
          </Suspense>
        </ul>
      </Card>
    
  */}
      <Link href='/play'>/play</Link>
    </>
  );
}
