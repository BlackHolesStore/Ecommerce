document.addEventListener('DOMContentLoaded', () => {
  const wikiLauncher = document.getElementById('wikiLauncher');
  const wikiPanel = document.getElementById('wikiPanel');
  const closeWiki = document.getElementById('closeWiki');
  const wikiContent = document.getElementById('wikiContent');

  const wikiData = {
    'Central Hub': {
      title: 'Central Hub',
      content: 'The bustling center of the virtual universe, connecting all worlds. It is the main social and trading hub where players start their journey.',
      url: 'https://horizon.meta.com/world/1348781343028385'
    },
    'Kitty World': {
      title: 'Kitty World',
      content: 'A world dedicated to cute and cuddly creatures. Players can adopt, raise, and accessorize their virtual pets here.',
      url: 'https://horizon.meta.com/world/1348781343028385'
    },
    'The Moon': {
        title: 'The Moon',
        content: 'A low-gravity environment where players can build, explore, and engage in lunar races. It offers a unique physics-based experience.',
        url: 'https://horizon.meta.com/world/the-moon'
    },
    'Battle World': {
        title: 'Battle World',
        content: 'An action-packed world where players can engage in PvP combat, team battles, and tournaments. It is the ultimate test of skill and strategy.'
    },
    'Old Spaceport': {
        title: 'Old Spaceport',
        content: 'A derelict space station, rumored to be haunted. It is a place of mystery and secrets, not commerce.'
    },
    'Snowy Mountains': {
        title: 'Snowy Mountains',
        content: 'A winter wonderland for snowboarding and other snow-based activities. It features a variety of slopes and challenges for all skill levels.',
        url: 'https://horizon.meta.com/world/snowy-mountains'
    },
    'Pizza Express VR': {
        title: 'Pizza Express VR',
        content: '🍕 Drone Pizza Delivery Game! Carry pizzas carefully, fly drones through the city, and deliver to customers. Earn tips, unlock ranks, and collect badges!',
        url: 'pizza-express-vr/index.html'
    },
    'Tegus Bagel VR': {
        title: 'Tegus Bagel VR',
        content: 'A virtual reality bagel-making and serving game. Players can create their own bagels and serve them to customers in a bustling cafe.',
        url: 'https://horizon.meta.com/world/tegus-bagel-vr'
    },
    'Selfie Station': {
        title: 'Selfie Station',
        content: 'A place to take selfies with a variety of virtual backgrounds and props. It is a popular spot for social gatherings and events.',
        url: 'https://horizon.meta.com/world/selfie-station'
    },
    'Tarantula Tank': {
        title: 'Tarantula Tank',
        content: 'A virtual terrarium where players can interact with a variety of tarantulas. It is a great place to learn about these fascinating creatures.',
        url: 'https://horizon.meta.com/world/tarantula-tank'
    }
  };

  function openWiki(topic) {
    const topicData = wikiData[topic];
    if (topicData) {
      wikiContent.innerHTML = `
        <div class="wiki-topic">
          <h3>${topicData.title}</h3>
          <p>${topicData.content}</p>
        </div>
      `;
    }
    wikiPanel.classList.add('open');
  }

  function closeWikiPanel() {
    wikiPanel.classList.remove('open');
  }

  function showConstructionMessage(worldName) {
    alert(`${worldName} is currently under construction! 🚧\n\nCheck back soon for cosmic adventures!`);
  }

  if (wikiLauncher) {
    wikiLauncher.addEventListener('click', () => {
        openWiki('Central Hub');
    });
  }

  if (closeWiki) {
    closeWiki.addEventListener('click', closeWikiPanel);
  }

  document.querySelectorAll('.world-zone').forEach(zone => {
    zone.addEventListener('click', (event) => {
      let worldName = event.currentTarget.querySelector('.world-name')?.textContent;
      if (!worldName && event.currentTarget.id === 'selfie-station') {
        worldName = 'Selfie Station';
      }
      if (!worldName && event.currentTarget.id === 'tarantula-tank') {
        worldName = 'Tarantula Tank';
      }
      const topicData = wikiData[worldName];
      const isUnderConstruction = event.currentTarget.querySelector('.construction-badge');

      if (isUnderConstruction) {
        showConstructionMessage(worldName);
      } else if (topicData) {
        if(topicData.url){
            window.open(topicData.url, '_blank');
        } else {
            openWiki(worldName);
        }
      }
    });
  });

  document.querySelectorAll('.portal-standalone').forEach(portal => {
    portal.addEventListener('click', (event) => {
        const portalLabel = event.currentTarget.querySelector('.portal-label').textContent;
        const topicData = wikiData[portalLabel];
        if (topicData && topicData.url) {
            window.open(topicData.url, '_blank');
        }
    });
  });
});
