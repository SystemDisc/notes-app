import Main from '@/components/atoms/main';
import NoteList from '@/components/molecules/note-list';
import Image from "next/image";

export default async function Page() {
  return (
    <Main>
      <NoteList />
    </Main>
  );
}
