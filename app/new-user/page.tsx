import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });

  // if user is not yet in db
  if (!match) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0]?.emailAddress,
      },
    });
  }

  // if user already exists in db
  redirect('/notes');
};

const NewUser = async () => {
  await createNewUser();
  return <div>...loading</div>;
};

export default NewUser;
