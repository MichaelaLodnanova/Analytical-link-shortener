import { client } from 'model';
import addSeconds from 'date-fns/addSeconds';
import { addMinutes } from 'date-fns';

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

  await client.link.deleteMany({
    where: {
      createdById: user.id,
      url: {
        in: [
          'https://www.google.com',
          'https://www.facebook.com',
          'https://www.twitter.com',
        ],
      },
    },
  });

  const [link1, link2, link3] = await Promise.all([
    client.link.create({
      data: {
        url: 'https://www.google.com',
        isAdvertisementEnabled: true,
        shortId: 'google',
        createdById: user.id,
      },
    }),
    client.link.create({
      data: {
        url: 'https://www.facebook.com',
        isAdvertisementEnabled: false,
        shortId: 'facebook',
        createdById: user.id,
      },
    }),
    client.link.create({
      data: {
        url: 'https://www.twitter.com',
        isAdvertisementEnabled: true,
        shortId: 'twitter',
        createdById: user.id,
      },
    }),
  ]);
  console.log({ link1, link2, link3 });

  const [ad1] = await Promise.all([
    client.advertisement.create({
      data: {
        title: 'Our great AD!',
        adUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        forwardUrl: 'https://youtube.com',
        createdById: advertiser.id,
      },
    }),
  ]);
  console.log({ ad1 });

  const [click1, click2, click3, click4, click5, click6, click7, click8] =
    await Promise.all([
      client.linkStatistics.create({
        data: {
          linkId: link1.id,
          language: 'en',
          region: 'US',
        },
      }),
      client.linkStatistics.create({
        data: {
          linkId: link2.id,
          language: 'en',
          region: 'US',
        },
      }),
      client.linkStatistics.create({
        data: {
          linkId: link3.id,
          language: 'en',
          region: 'US',
        },
      }),
      client.linkStatistics.create({
        data: {
          linkId: link1.id,
          language: 'cs',
          region: 'CZ',
        },
      }),
      client.linkStatistics.create({
        data: {
          linkId: link1.id,
          language: 'cs',
          region: 'CZ',
        },
      }),
      client.linkStatistics.create({
        data: {
          linkId: link1.id,
          language: 'sk',
          region: 'SK',
        },
      }),
      client.linkStatistics.create({
        data: {
          linkId: link3.id,
          language: 'sk',
          region: 'SK',
        },
      }),
      client.linkStatistics.create({
        data: {
          linkId: link3.id,
          language: 'hu',
          region: 'HU',
        },
      }),
    ]);

  console.log({
    click1,
    click2,
    click3,
    click4,
    click5,
    click6,
    click7,
    click8,
  });

  const [adStat1, adStat2, adStat3, adStat4, adStat5, adStat6, adStat7] =
    await Promise.all([
      client.advertisementStatistics.create({
        data: {
          linkId: link1.id,
          advertisementId: ad1.id,
          clickedAt: addSeconds(new Date(), 5),
        },
      }),
      client.advertisementStatistics.create({
        data: {
          linkId: link1.id,
          advertisementId: ad1.id,
          clickedAt: addMinutes(addSeconds(new Date(), 10), 5),
          createdAt: addMinutes(new Date(), 5),
        },
      }),
      client.advertisementStatistics.create({
        data: {
          linkId: link1.id,
          advertisementId: ad1.id,
          skippedAt: addMinutes(addSeconds(new Date(), 10), 10),
          createdAt: addMinutes(new Date(), 10),
        },
      }),
      client.advertisementStatistics.create({
        data: {
          linkId: link1.id,
          advertisementId: ad1.id,
          clickedAt: addMinutes(addSeconds(new Date(), 10), 15),
          createdAt: addMinutes(new Date(), 15),
        },
      }),
      client.advertisementStatistics.create({
        data: {
          linkId: link1.id,
          advertisementId: ad1.id,
          skippedAt: addMinutes(addSeconds(new Date(), 10), 20),
          createdAt: addMinutes(new Date(), 20),
        },
      }),
      client.advertisementStatistics.create({
        data: {
          linkId: link1.id,
          advertisementId: ad1.id,
          clickedAt: addMinutes(addSeconds(new Date(), 10), 25),
          createdAt: addMinutes(new Date(), 25),
        },
      }),
      client.advertisementStatistics.create({
        data: {
          linkId: link1.id,
          advertisementId: ad1.id,
          skippedAt: addMinutes(addSeconds(new Date(), 10), 30),
          createdAt: addMinutes(new Date(), 30),
        },
      }),
    ]);

  console.log({
    adStat1,
    adStat2,
    adStat3,
    adStat4,
    adStat5,
    adStat6,
    adStat7,
  });
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
