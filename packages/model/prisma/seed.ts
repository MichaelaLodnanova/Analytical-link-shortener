import { client } from 'model';

async function main() {
  const jdoe = await client.user.upsert({
    where: { email: 'jdoe@sniplyt.io' },
    update: {},
    create: {
      email: 'jdoe@sniplyt.io',
      username: 'jdoe',
      passwordHash:
        '$argon2id$v=19$m=65536,t=3,p=4$hALQKDPNr3UeG3ZaTOSNrQ$HCnvJOYSsYgPp7N/+Ccq2LHlIjm49+UetnKIa+3HeqA', // 123456789
      role: 'ADMIN',
    },
  });
  const advertiser = await client.user.upsert({
    where: { email: 'advertiser@sniplyt.io' },
    update: {},
    create: {
      email: 'advertiser@sniplyt.io',
      username: 'advertiser',
      passwordHash:
        '$argon2id$v=19$m=65536,t=3,p=4$hALQKDPNr3UeG3ZaTOSNrQ$HCnvJOYSsYgPp7N/+Ccq2LHlIjm49+UetnKIa+3HeqA', // 123456789
      role: 'ADVERTISER',
    },
  });
  const user = await client.user.upsert({
    where: { email: 'user@sniplyt.io' },
    update: {},
    create: {
      email: 'user@sniplyt.io',
      username: 'user',
      passwordHash:
        '$argon2id$v=19$m=65536,t=3,p=4$hALQKDPNr3UeG3ZaTOSNrQ$HCnvJOYSsYgPp7N/+Ccq2LHlIjm49+UetnKIa+3HeqA', // 123456789
      role: 'USER',
    },
  });
  console.log({ jdoe, advertiser, user });
}
main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
