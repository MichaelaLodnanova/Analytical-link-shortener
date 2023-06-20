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

  const [link1, link2, link3] = await Promise.all([
    client.link.upsert({
      where: {
        id: 'seed_link_1',
      },
      update: {},
      create: {
        id: 'seed_link_1',
        url: 'https://www.google.com',
        isAdvertisementEnabled: true,
        shortId: 'google',
        createdById: user.id,
      },
    }),
    client.link.upsert({
      where: {
        id: 'seed_link_2',
      },
      update: {},
      create: {
        id: 'seed_link_2',
        url: 'https://www.facebook.com',
        isAdvertisementEnabled: false,
        shortId: 'facebook',
        createdById: user.id,
      },
    }),
    client.link.upsert({
      where: {
        id: 'seed_link_3',
      },
      update: {},
      create: {
        id: 'seed_link_3',
        url: 'https://www.twitter.com',
        isAdvertisementEnabled: true,
        shortId: 'twitter',
        createdById: user.id,
      },
    }),
  ]);
  console.log({ link1, link2, link3 });

  const [ad1] = await Promise.all([
    client.advertisement.upsert({
      where: {
        id: 'seed_advert_1',
      },
      update: {},
      create: {
        id: 'seed_advert_1',
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
      client.linkStatistics.upsert({
        where: {
          id: 'seed_link_stat_1',
        },
        update: {},
        create: {
          id: 'seed_link_stat_1',
          linkId: link1.id,
          language: 'en',
          region: 'US',
        },
      }),
      client.linkStatistics.upsert({
        where: {
          id: 'seed_link_stat_2',
        },
        update: {},
        create: {
          id: 'seed_link_stat_2',
          linkId: link2.id,
          language: 'en',
          region: 'US',
        },
      }),
      client.linkStatistics.upsert({
        where: {
          id: 'seed_link_stat_3',
        },
        update: {},
        create: {
          id: 'seed_link_stat_3',
          linkId: link3.id,
          language: 'en',
          region: 'US',
        },
      }),
      client.linkStatistics.upsert({
        where: {
          id: 'seed_link_stat_4',
        },
        update: {},
        create: {
          id: 'seed_link_stat_4',
          linkId: link1.id,
          language: 'cs',
          region: 'CZ',
        },
      }),
      client.linkStatistics.upsert({
        where: {
          id: 'seed_link_stat_5',
        },
        update: {},
        create: {
          id: 'seed_link_stat_5',
          linkId: link1.id,
          language: 'cs',
          region: 'CZ',
        },
      }),
      client.linkStatistics.upsert({
        where: {
          id: 'seed_link_stat_6',
        },
        update: {},
        create: {
          id: 'seed_link_stat_6',
          linkId: link1.id,
          language: 'sk',
          region: 'SK',
        },
      }),
      client.linkStatistics.upsert({
        where: {
          id: 'seed_link_stat_7',
        },
        update: {},
        create: {
          id: 'seed_link_stat_7',
          linkId: link3.id,
          language: 'sk',
          region: 'SK',
        },
      }),
      client.linkStatistics.upsert({
        where: {
          id: 'seed_link_stat_8',
        },
        update: {},
        create: {
          id: 'seed_link_stat_8',
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

  // Generate 100 advertisement statistics with random region, language, createdAt and clickedAt, skippedAt (which can be null)
  for (let i = 0; i < 10000; i++) {
    const linkId = i % 2 === 0 ? link1.id : link2.id;
    const region = ['CZ', 'SK', 'HU', 'DE', 'US'][
      Math.floor(Math.random() * 5)
    ];
    const language = ['cs', 'sk', 'hu', 'de', 'en', 'sl'][
      Math.floor(Math.random() * 6)
    ];
    // randomize createdAt and clickedAt/skipped at from last year
    const createdAt = addSeconds(
      addMinutes(new Date(), -Math.floor(Math.random() * 525600)),
      Math.floor(Math.random() * 60 * 60 * 24)
    );
    const clickedAt = Math.random() > 0.5 ? addSeconds(createdAt, 30) : null;
    const skippedAt = clickedAt == null ? addSeconds(createdAt, 40) : null;

    await client.advertisementStatistics.upsert({
      where: {
        id: `seed_advert_stat_${i}`,
      },
      update: {},
      create: {
        id: `seed_advert_stat_${i}`,
        linkId,
        region,
        language,
        advertisementId: ad1.id,
        createdAt,
        clickedAt,
        skippedAt,
      },
    });

    if (i % 1000 == 0) {
      console.log(i);
    }
  }

  console.log('');
  console.log('DB READY! 🔥');
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
