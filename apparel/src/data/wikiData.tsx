import React from 'react';
import {
    InfoIcon, BlackholeIcon, PawIcon, FlagIcon, UsersIcon, HomeIcon,
    CatIcon, SwordIcon, MoonIcon, StationIcon, CarIcon, NewsIcon, ShirtIcon,
    PizzaIcon, BagelIcon, SnowflakeIcon
} from '../components/IconComponents';
import { WikiTopic } from '../types';

const ApparelTable: React.FC = () => {
    const items = [
        { name: "Shh... They're Listening T-Shirt", type: 'Top', price: 350 },
        { name: 'Just Shoot Bro Premium Hoodie', type: 'Top', price: 500 },
        { name: 'Live From Earth Alien Broadcast Tee', type: 'Top', price: 350 },
        { name: '"Vibes Don\'t Lie" Graphic Tee', type: 'Top', price: 300 },
        { name: 'Urban Patchwork Cargo Pants', type: 'Bottoms', price: 400 },
        { name: 'Handknit Landscape Sweater', type: 'Top', price: 500 },
        { name: 'Alien Founding Father Zip Hoodie', type: 'Top', price: 500 },
        { name: 'CLASSIFIED: New Alien Citizen Hoodie', type: 'Top', price: 500 },
    ];

    return (
        React.createElement('div', { className: 'overflow-x-auto' },
            React.createElement('table', { className: 'w-full text-left border-collapse' },
                React.createElement('thead', null,
                    React.createElement('tr', { className: 'border-b border-slate-700' },
                        React.createElement('th', { className: 'p-2' }, 'Item Name'),
                        React.createElement('th', { className: 'p-2' }, 'Type'),
                        React.createElement('th', { className: 'p-2 text-right' }, 'Price (Meta Credits)')
                    )
                ),
                React.createElement('tbody', null,
                    items.map((item, index) =>
                        React.createElement('tr', { key: index, className: 'border-b border-slate-800' },
                            React.createElement('td', { className: 'p-2 font-semibold' }, item.name),
                            React.createElement('td', { className: 'p-2' }, item.type),
                            React.createElement('td', { className: 'p-2 text-right font-mono' }, `♦ ${item.price}`)
                        )
                    )
                )
            )
        )
    );
};

export const WIKI_DATA: WikiTopic[] = [
  {
    id: 'welcome',
    title: 'Welcome to the Universe',
    icon: React.createElement(InfoIcon),
    category: 'Core Concepts',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'Welcome to Blackholes Store'),
      React.createElement('p', null, "This wiki is your official guide to the vast, chaotic, and ever-evolving universe of Blackholes Store. Here, black holes are not just cosmic voids; they are portals, trading hubs, power sources, and the very fabric of our galaxy."),
      React.createElement('p', null, "Whether you're a new traveler taking your first steps out of the Central Hub or a seasoned Faction Commander plotting your next planetary conquest, this guide contains everything you need to know. Learn about the Cosmo-Critters you can train, the Factions vying for control, the strange secrets of The Moon, and the truth behind the Dystopian News Network."),
      React.createElement('h3', null, 'How to Navigate'),
      React.createElement('p', null, 'Use the sidebar to the left to explore different topics. The wiki is divided into categories to help you find information quickly:'),
      React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Core Concepts:'), ' The fundamental rules and lore of the universe.'),
          React.createElement('li', null, React.createElement('strong', null, 'Locations:'), ' Detailed information on the key zones you can visit.'),
          React.createElement('li', null, React.createElement('strong', null, 'Key Figures:'), " Bios on the important NPCs you'll meet."),
          React.createElement('li', null, React.createElement('strong', null, 'Gameplay Mechanics:'), ' In-depth explanations of major game systems.'),
          React.createElement('li', null, React.createElement('strong', null, 'Commerce:'), ' Information about in-world purchases and the economy.')
      ),
      React.createElement('p', null, 'The universe is player-driven. Your actions—the planets you build, the news you spread, the battles you win—will shape the future. Now go forth, and leave your mark on the cosmos.')
    ),
  },
  {
    id: 'blackholes',
    title: 'About Blackholes',
    icon: React.createElement(BlackholeIcon),
    category: 'Core Concepts',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'The Nature of Blackholes'),
      React.createElement('p', null, 'In this universe, Blackholes are the central mechanic. They are sentient, often chaotic entities that bend reality. They function as gateways to all major zones, serve as epicenters for trade, and are the primary source of immense power.'),
      React.createElement('h3', null, 'Functions of a Blackhole:'),
      React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Portals:'), ' Each major zone, like Kitty World (PAW-X) or Battle World (WAR-9), is accessed by entering a specific Blackhole.'),
          React.createElement('li', null, React.createElement('strong', null, 'Stores & Markets:'), ' Many Blackholes host fluctuating black markets where players can trade rare resources, contraband technology, and even Cosmo-Critter DNA.'),
          React.createElement('li', null, React.createElement('strong', null, 'Power Source:'), ' Factions fight to control Blackholes to harvest ', React.createElement('strong', null, 'Singularity Cores'), ', a potent energy source needed for mega-structures and advanced technology.')
      ),
      React.createElement('p', null, 'Controlling a Blackhole means controlling trade routes, access to worlds, and a source of incredible power, making them the ultimate prize in faction warfare.')
    ),
  },
   {
    id: 'cosmo_critters',
    title: 'Cosmo-Critters',
    icon: React.createElement(PawIcon),
    category: 'Core Concepts',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'Your Cosmic Companion'),
      React.createElement('p', null, "Cosmo-Critters are alien pets that players adopt and train. The journey begins by inputting your real-life pet's species (cat, dog, hamster, snake, etc.), which transforms into a unique cosmic version with species-based traits."),
      React.createElement('h3', null, 'The Dual Paths'),
      React.createElement('p', null, 'At creation, you choose a primary path for your Critter, though you can switch later at a cost. Specialization is key to unlocking the most powerful forms and abilities.'),
      React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Battle Path:'), ' Focuses on combat stats (Attack, Defense) and elemental abilities. These Critters are essential for fighting in Battle World arenas, defending territories, and participating in faction wars. They can evolve into fearsome forms like Starfire Cats or Lava Hounds.'),
          React.createElement('li', null, React.createElement('strong', null, 'Fashion Path:'), " Focuses on Charm, Style, and social skills. These Critters compete in Kitty World's runway shows, where players are judged on creativity and flair. They evolve into elegant forms like Nebula Poodles and are key to social influence.")
      ),
      React.createElement('h3', null, 'Evolution'),
      React.createElement('p', null, 'Through care, training, and achievements, your Cosmo-Critter will evolve into rare and powerful cosmic forms. These evolutions are not just cosmetic; they unlock new abilities for both battle and fashion.')
    ),
  },
  {
    id: 'factions',
    title: 'Factions',
    icon: React.createElement(FlagIcon),
    category: 'Core Concepts',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'Choose Your Allegiance'),
      React.createElement('p', null, 'The galaxy is dominated by three major factions, each with its own philosophy and goals. Your choice of faction will define your objectives, allies, and enemies.'),
      React.createElement('h3', null, 'The Major Factions:'),
      React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Stellar Syndicate:'), ' The capitalists of the cosmos. They focus on trade, diplomacy, and building massive commercial hubs. Their goal is to monetize the universe and control the economy.'),
          React.createElement('li', null, React.createElement('strong', null, 'Celestial Wardens:'), ' The preservers. They are eco-conscious explorers dedicated to studying and protecting cosmic biodiversity. They seek to "heal" unstable Blackholes and fight against exploitation.'),
          React.createElement('li', null, React.createElement('strong', null, 'Void Marauders:'), ' The anarchists. They thrive on chaos, combat, and raiding. Their goal is to seize power through force, controlling planets and resources through sheer might.')
      ),
      React.createElement('h3', null, 'Leadership & Influence'),
      React.createElement('p', null, 'Players can rise through the ranks by earning influence points. Becoming a Faction Commander allows you to set faction-wide objectives and lead your allies in the grand struggle for galactic domination.')
    ),
  },
  {
    id: 'hub',
    title: 'The Central Hub',
    icon: React.createElement(HomeIcon),
    category: 'Locations',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'The Nexus of the Universe'),
      React.createElement('p', null, 'All players begin their journey in the Central Hub. This neon-lit nexus is the true social, economic, and political heart of the universe. It is a sprawling metropolis filled with faction embassies, guild charters, and grand leaderboards tracking galactic achievements. Players can walk around listening to spatial music, use the public transport system to travel to other parts of the universe, or use the many portals to jump to other worlds.'),
      React.createElement('h3', null, 'Key Features:'),
       React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Faction Embassies:'), ' Each of the three major factions maintains a grand embassy here where players can join up, receive faction-specific quests, and coordinate with allies.'),
          React.createElement('li', null, React.createElement('strong', null, 'Guild Charters:'), ' Find like-minded players and form a guild to collaborate on quests, share resources, and participate in faction wars.'),
          React.createElement('li', null, React.createElement('strong', null, 'Galactic Leaderboards:'), ' Check your standing in the galaxy. Leaderboards track top Battle Champions, Fashionistas, and the most influential Factions.'),
          React.createElement('li', null, React.createElement('strong', null, 'Stellar Stitch\'s Emporium:'), ' The main commercial outlet for all in-world apparel. The NPC Stellar Stitch sells everything from faction uniforms to exclusive gear for the various mini-games.'),
          React.createElement('li', null, React.createElement('strong', null, 'Selfie Station:'), ' Located on the outskirts of the Hub, this is the perfect spot to take a snapshot with the legendary Cosmic Chicken, a glowing static landmark that serves as a universal reference point.')
      )
    ),
  },
  {
    id: 'kitty_world',
    title: 'Kitty World',
    icon: React.createElement(CatIcon),
    category: 'Locations',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'The Heart of Fashion & Adoption'),
      React.createElement('p', null, 'Accessed via the Blackhole ', React.createElement('strong', null, 'PAW-X'), ', Kitty World is a pastel-colored, low-gravity paradise dedicated to Cosmo-Critter wellness, creativity, and fashion. It is the primary zone for players on the ', React.createElement('strong', null, 'Fashion Path'), '.'),
      React.createElement('h3', null, 'Key Activities:'),
      React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Runway Competitions:'), ' The main event. Players dress their Cosmo-Critters in the latest fashions and compete on a grand runway. Shows are judged by the NPC ', React.createElement('strong', null, 'Gala Glitch'), ' and audience votes.'),
          React.createElement('li', null, React.createElement('strong', null, 'Adoption Center:'), ' Want a new companion? Or need to find a good home for one of your Critters? The Adoption Center facilitates a dynamic, player-driven market for adopting and putting Critters up for adoption.'),
          React.createElement('li', null, React.createElement('strong', null, 'Fashion Boutiques:'), ' The NPC ', React.createElement('strong', null, 'Purrfessor Meow'), ' runs a boutique selling exclusive outfits, accessories, and matching gear for your Critter.')
      ),
       React.createElement('p', {className: 'italic text-slate-500 mt-4'}, "Rumor has it, a rare, indestructible Kitty Void Plush is hidden somewhere in the universe for the most dedicated explorers to find...")
    ),
  },
  {
    id: 'battle_world',
    title: 'Battle World',
    icon: React.createElement(SwordIcon),
    category: 'Locations',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'The Arena of Chaos'),
      React.createElement('p', null, React.createElement('strong', null, 'WAR-9'), ' is the Blackhole that leads to Battle World, a war-torn, lava-spewing planet dedicated to combat. It is the home of players on the ', React.createElement('strong', null, 'Battle Path'), '.'),
      React.createElement('h3', null, 'Key Activities:'),
      React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Ring of Combat:'), ' The core gameplay loop. Two players pit their Critters against each other in a frantic arena. The rules are simple: the last Critter standing in the ring wins. Players whose Critters are knocked out of the ring lose.'),
          React.createElement('li', null, React.createElement('strong', null, 'Kaiju Sieges:'), ' Evolved Cosmo-Critters can be deployed as giant "Kaiju" to siege enemy faction bases or fight massive NPC monsters.'),
          React.createElement('li', null, React.createElement('strong', null, 'The War Quartermaster:'), ' An NPC vendor who sells tactical items to give you an edge in battle. Purchase Stamina Potions to replenish your Critter\'s energy, Elemental Ores to temporarily enchant their attacks with fire or ice, and Spiked Armor for a defensive boost.')
      )
    ),
  },
  {
    id: 'the_moon',
    title: 'The Moon',
    icon: React.createElement(MoonIcon),
    category: 'Locations',
    content: React.createElement(React.Fragment, null,
        React.createElement('blockquote', null, `You flick your wrist. A holographic map springs from your watch, projecting a 3D model of the lunar surface. Your plot of land glows invitingly. Time to build.`),
        React.createElement('h2', null, 'Your Lunar Homestead'),
        React.createElement('p', null, "The Moon is every player's personal home base. Here, you're not just a visitor; you're an architect, a tycoon, and a survivor. Build your dream villa, manage your resources, and defend it from the harsh lunar environment."),
        React.createElement('h3', null, 'Plot Acquisition & Zones'),
        React.createElement('p', null, 'The Moon is divided into distinct zones, each with unique risks and rewards:'),
        React.createElement('ul', null,
            React.createElement('li', null, React.createElement('strong', null, 'The Serenity Sea:'), ' Prime, expensive real estate with stunning Earth views and a low risk of meteor strikes. A tourist hotspot, perfect for showing off your architectural prowess.'),
            React.createElement('li', null, React.createElement('strong', null, 'The Rusted Warrens:'), ' Cheap, high-risk plots in the shadow of the old, abandoned Spaceport. Meteor showers are frequent, but resources are rumored to be plentiful for those willing to risk it.'),
            React.createElement('li', null, React.createElement('strong', null, 'The Crystal Canyons:'), ' Mid-tier plots with moderate risk, known for their beautiful, glowing mineral formations.')
        ),
        React.createElement('h3', null, 'The Build Process & Shard Economy'),
        React.createElement('p', null, 'Construction is a gamified process that requires planning and resources. The primary in-game currency for building is ', React.createElement('strong', null, 'Shards'), '.'),
        React.createElement('ol', null,
          React.createElement('li', null, React.createElement('strong', null, 'Foundation & Framing:'), ' Spend Shards on basic materials like concrete and lumber to lay the groundwork for your home.'),
          React.createElement('li', null, React.createElement('strong', null, 'Brickwork & Materials:'), ' Choose your exterior. Standard bricks are cheap, but vulnerable...'),
          React.createElement('li', null, React.createElement('strong', null, 'Self-Healing Bricks:'), ' For a premium Shard cost, you can build with bio-engineered, self-healing bricks. When a meteor hits and cracks your wall, these bricks automatically repair themselves. Cheaper builds will require costly manual repairs after each impact.'),
          React.createElement('li', null, React.createElement('strong', null, 'Automation:'), ' Tired of waiting for timers? Purchase advanced robotic builders to lay bricks at incredible speeds. You can even buy a fleet of them to construct massive projects in record time.')
        ),
        React.createElement('h3', { style: { marginTop: '1.5em' } }, "A Home for Your Critter"),
        React.createElement('p', null, "A house isn't a home without a friend. As you design your lunar sanctuary, don't forget to incorporate a dedicated space for your Cosmo-Critter. Whether it's a high-tech training room, a stylish lounge, or a cozy nook with a view of the stars, building a special area for your companion is essential for their well-being and happiness."),
        React.createElement('h3', { style: { marginTop: '1.5em' } }, 'The Bricklayer Conspiracy'),
        React.createElement('p', null, "The Rusted Warrens are home to a disgruntled group of former bricklayers, displaced by automation after the old lunar Spaceport was shut down. They believe the constant meteor showers are not natural, but a conspiracy by corporations to sell more self-healing bricks. They offer risky quests and spread dissent, adding a cyberpunk, District 9-style narrative to the lunar experience.")
    ),
  },
  {
    id: 'spaceport',
    title: 'The SpacePort',
    icon: React.createElement(StationIcon),
    category: 'Locations',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'The Ghost Station'),
      React.createElement('p', null, "Once the crown jewel of intergalactic travel, the SpacePort is now a colossal, abandoned relic drifting in orbit. Its corridors are silent, its hangars empty, and its power systems flicker on emergency reserves. It is a place of mystery and secrets, not commerce."),
      React.createElement('h3', null, 'The Undercroft: A Secret Broadcast'),
      React.createElement('p', null, "The only signs of life emanate from the undercroft, a gritty network of forgotten service tunnels. Deep within this derelict maze, two rogue podcasters have established the secret headquarters of the ", React.createElement('strong', null, 'Dystopian News Network (DNN)'), ". From here, they broadcast their conspiracies and propaganda across the universe, their voices echoing through the ghost station. Players drawn to mystery and information warfare will find this location central to their quests.")
    ),
  },
  {
    id: 'pizza_express',
    title: 'Pizza Express',
    icon: React.createElement(PizzaIcon),
    category: 'Locations',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'Galactic Job Simulator: Pizza Pilot'),
      React.createElement('p', null, "Step into the shoes of a Pizza Express delivery pilot! This high-octane job simulation has you building pizzas, wearing the official crew uniform, doing store chores, and blasting off to make deliveries. Complete orders successfully to earn Shards and unlock exclusive Pizza Express-themed gear."),
    ),
  },
  {
    id: 'tegusbagel',
    title: 'TegusBagel',
    icon: React.createElement(BagelIcon),
    category: 'Locations',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'Galactic Job Simulator: Bagel Boss'),
      React.createElement('p', null, "Welcome to the most chaotic bagel shop in the cosmos, run by Tegus, a time-traveler who fell in love with the classic New York bagel during a trip to the year 2000 and decided to bring the craft to the stars."),
      React.createElement('p', null, "In this mini-game, you'll learn the art of the cosmic bagel. Make the dough, add exotic flavored toppings, toast them to perfection (but don't burn them!), and build complex sandwiches for impatient customers. Hand out the right order to get big tips in Shards and unlock unique TegusBagel apparel.")
    ),
  },
  {
    id: 'snowy_mountains',
    title: 'Snowy Mountains',
    icon: React.createElement(SnowflakeIcon),
    category: 'Locations',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'Extreme VR Snowboarding'),
      React.createElement('p', null, "Shred the cosmic powder in the Snowy Mountains, a thrilling extreme snowboarding experience with a classic arcade feel, rebuilt for VR. Master tricks, compete in high-speed races down treacherous slopes, and customize your setup. You can buy cool new boards and exclusive snowboarding gear to dominate the mountains."),
      React.createElement('h3', null, 'How to Get There'),
      React.createElement('p', null, 'The portal to the Snowy Mountains is located in the Central Hub. To get there, find the Selfie Station on the outskirts, pass the giant tarantula tank, head left, and you\'ll find the portal right in front of the bus stop.'),
    ),
  },
  {
    id: 'npcs',
    title: 'Key Figures (NPCs)',
    icon: React.createElement(UsersIcon),
    category: 'Key Figures',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'The Inhabitants of the Void'),
      React.createElement('p', null, 'The universe is populated by unique Non-Player Characters (NPCs) who are locked to their zones. They provide quests, services, and bring the world to life.'),
      React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Romb:'), " The stranded storyteller in the Central Hub. He missed the last flight out of the Old Spaceport and now serves as the universe's encyclopedia, sharing lore and game info with anyone who asks."),
          React.createElement('li', null, React.createElement('strong', null, 'Void Buddy:'), ' The friendly greeter at the spawn point who guides new players through their first steps in the universe.'),
          React.createElement('li', null, React.createElement('strong', null, 'Stellar Stitch:'), ' The proprietor of the apparel emporium in the Central Hub. She sells the latest galactic fashion for players.'),
          React.createElement('li', null, React.createElement('strong', null, 'Purrfessor Meow:'), ' The go-to vendor in Kitty World for matching pet gear and fashion-related upgrades.'),
          React.createElement('li', null, React.createElement('strong', null, 'Gala Glitch:'), ' The enigmatic and stylish judge of the Kitty World runway competitions.'),
          React.createElement('li', null, React.createElement('strong', null, 'The Voice:'), " A disembodied, narrative voice that guides the player's journey. It can warn you of danger, compliment a great achievement, or subtly motivate you to try a new activity or make an in-game purchase. You can choose to listen to it... or not.")
      ),
      React.createElement('h3', { style: { marginTop: '1.5em' } }, 'Coming Soon: Artificial Intelligent Players (AIPs)'),
      React.createElement('p', null, "The future of interaction is coming. All NPCs (with the exception of The Voice) are scheduled for an upgrade to become Artificial Intelligent Players. Powered by generative AI, these characters will remember your past conversations, develop unique personalities, and offer dynamic, unscripted interactions. Prepare for a universe that truly feels alive.")
    ),
  },
  {
    id: 'apparel',
    title: 'Apparel & IWP',
    icon: React.createElement(ShirtIcon),
    category: 'Commerce',
    content: React.createElement(React.Fragment, null,
        React.createElement('h2', null, 'In-World Purchases (IWP)'),
        React.createElement('p', null, "Players can purchase a variety of cosmetic items in Blackholes Store using Meta Credits. These are known as In-World Purchases (IWP) or In-World Items (IWI). Below is a list of currently available apparel sold by Stellar Stitch in the Central Hub."),
        React.createElement(ApparelTable),
        React.createElement('h3', { style: { marginTop: '1.5em' } }, 'Gear for Every Job'),
        React.createElement('p', null, "The Central Hub is your one-stop shop for all gameplay-related apparel. Whether you need a Pizza Express uniform, a TegusBagel branded apron, or high-tech snowboarding gear for the Snowy Mountains, you'll find it at Stellar Stitch's Emporium. Each experience in the universe has its own line of exclusive gear that can be purchased here, so you can always look the part for your next adventure or cosmic job.")
    ),
  },
  {
    id: 'vehicles',
    title: 'Vehicles',
    icon: React.createElement(CarIcon),
    category: 'Gameplay Mechanics',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'Personal Vehicles & Racing'),
      React.createElement('p', null, 'Traverse the vast distances between Blackholes or compete in high-speed races with a variety of customizable vehicles. The Galactic Grand Prix is a major competitive event.'),
      React.createElement('h3', null, 'Vehicle Types:'),
      React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Solar Chargers:'), ' Fast bikes that recharge in starlight but are slower in shadows.'),
          React.createElement('li', null, React.createElement('strong', null, 'Mag-Lev Hoverboards:'), ' Glide over hazardous terrain but are vulnerable to magnetic storms.'),
          React.createElement('li', null, React.createElement('strong', null, 'Void Rippers:'), ' Flying cars perfect for aerial races and planetary sieges, but they require rare fuel.')
      ),
      React.createElement('p', null, 'Races feature cosmic power-ups like Black Hole Traps and Stellar Nitro boosts.'),
      React.createElement('h2', { style: { marginTop: '1.5em' } }, 'Public Transport: The Time-Stream Metro'),
      React.createElement('p', null, "Not every journey requires a personal vehicle. The universe is connected by the Time-Stream Metro, a public transport system with a unique origin. These floating subway cars are the repurposed shells of the very vehicle Tegus the bagel-maker used to travel through time. Now, they operate on autonomous, scheduled routes between major destinations."),
      React.createElement('p', null, "Players can hop on for free, but be sure to check the schedule and route map before you board, or you might end up on an express trip to the wrong side of the galaxy. It's a convenient and immersive way to travel and see the sights.")
    ),
  },
  {
    id: 'dnn',
    title: 'Dystopian News Network',
    icon: React.createElement(NewsIcon),
    category: 'Gameplay Mechanics',
    content: React.createElement(React.Fragment, null,
      React.createElement('h2', null, 'Control the Narrative'),
      React.createElement('p', null, "The Dystopian News Network (DNN), run from a secret headquarters in the undercroft of the abandoned SpacePort, is a powerful tool for information warfare. This AI-managed media empire broadcasts player feats, faction drama, and a healthy dose of propaganda."),
      React.createElement('h3', null, 'Player Interaction:'),
      React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'Submit Stories:'), " Players can submit \"tips\" or fabricated stories to the DNN to slander rivals or to boost their own faction's reputation. A successful propaganda campaign can sway neutral planets or even debuff an enemy faction's morale."),
          React.createElement('li', null, React.createElement('strong', null, 'Live Coverage:'), ' The DNN provides biased, real-time commentary on major events like Live Sieges in Battle World, painting factions as heroes or villains depending on who controls the narrative.'),
          React.createElement('li', null, React.createElement('strong', null, 'News-Tied Quests:'), ' Investigate conspiracies broadcast by the DNN or take on missions to uncover (or cover up) the truth.')
      ),
      React.createElement('p', null, 'In Blackholes Store, truth is a commodity, and the DNN is its biggest marketplace.')
    ),
  },
];