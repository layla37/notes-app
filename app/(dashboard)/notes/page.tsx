import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.noteEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return entries;
};

const NotesPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-10 bg-zinc-400/10">
      <h2 className="text-3xl mb-8">Notes </h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard entry={entry} key={entry.id} />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
