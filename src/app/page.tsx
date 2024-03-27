import Main from '@/components/atoms/main';
import NoteEditor from '@/components/molecules/note-editor';
import NoteList from '@/components/molecules/note-list';

export default async function Page() {
  return (
    <Main>
      <NoteEditor />
      <NoteList />
    </Main>
  );
}
