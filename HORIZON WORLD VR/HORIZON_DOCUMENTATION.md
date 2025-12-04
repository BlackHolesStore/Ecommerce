# Horizon Worlds Development Documentation
## Pizza Express VR - Complete Reference Guide

This documentation covers everything you need to know about developing for Meta Horizon Worlds, including optimization, APIs, and best practices.

---

## 🎯 Capacity Limits (check Build Menu > Capacity)

| Capacity Type | Description | Tips |
|---------------|-------------|------|
| **Object Capacity** | Max objects in world | Cubes use less than faceted cylinders! |
| **Simulation & Animation** | Dynamics, physics, triggers, text, VFX | Keep physics objects minimal |
| **Geometric Complexity** | Detail level of objects | Use simpler shapes |
| **Sound Complexity** | Only affects recorded audio (Sound Recorder Gizmo) | Use sparingly |
| **Players** | More players = less capacity for everything else! | See table below |

### Player Count Impact
| Players | Simulation Capacity Used |
|---------|-------------------------|
| 8 | Reasonable capacity |
| 32 | 74% simulation capacity GONE! |

---

## 🏗️ Building Tips

- Use **FEWER objects** with **SIMPLER shapes**
- **Group related objects** together
- Use **Asset Library objects** (already optimized)
- **Ungroup library assets** to extract useful parts
- **Save reusable objects** to Personal Assets

---

## 💡 Lighting Optimization

| Light Type | Limit | Notes |
|------------|-------|-------|
| **Dynamic Lights** | MAX 20 per world! | Use sparingly |
| **Static Glow** | Unlimited! | Paint > Texture > Glow |
| **Environment Gizmo** | 1 per world | Set once, handles sky/sun/fog |

### Static Glow Trick
- Can make invisible (Visible=off, Light&Shadow=on)
- Great for ambient lighting without capacity cost

---

## 🎮 Physics Optimization

- Physics objects cost **more capacity** than static
- Use `Interactive > Grabbable` **only when needed**
- Prefer `Animated` over `Physics` when possible
- **Pause world** (Scripts panel > Stop) while building

### Physics Materials (9 Types)
| Material | Behavior | Use Case |
|----------|----------|----------|
| `default` | Standard | General objects |
| `feather` | Light, floaty | Leaves, paper |
| `hardwood` | Solid, no bounce | Furniture |
| `ice` | Slippery | Ice surfaces |
| `metal` | Heavy, clangy | Metal objects |
| `rubberball` | Bouncy | Balls, toys |
| `softwood` | Light wood | Crates, boxes |
| `superball` | Super bouncy | Super bouncy balls |
| `superice` | Extra slippery | Extreme ice |

---

## 📜 Scripting Optimization

```typescript
// ✅ DO: Cache entity references in preStart()
preStart() {
  this.myEntity = this.world.findEntity('MyEntity');
  this.myTrigger = this.world.findEntity('MyTrigger') as TriggerGizmo;
}

// ❌ DON'T: Look up entities every frame
tick(dt: number) {
  const entity = this.world.findEntity('MyEntity'); // SLOW!
}
```

### Best Practices
- Use `preStart()` for event listeners (runs before simulation)
- Use `start()` for initialization (runs after simulation)
- Cache entity references in `preStart()`, don't look up every frame
- Use `this.async.setTimeout()` instead of busy loops
- Batch similar operations together
- Use `console.log()` sparingly in production
- Set `DEBUG_MODE = false` in production

---

## ⏱️ Component Lifecycle

```
1. CONSTRUCTOR     → Component instance created
2. preStart()      → Set up event listeners BEFORE simulation starts
   ├─ Connect CodeBlockEvents (OnGrabStart, OnPlayerEnter, etc.)
   ├─ Cache entity references
   └─ Initialize data structures
3. start()         → Initialize gameplay AFTER simulation is running
   ├─ Safe to interact with other entities
   └─ Start timers and game loops
4. RUNTIME         → tick() called every frame via World.onUpdate
5. CLEANUP         → Disconnect events when entity destroyed
```

---

## 🎯 World Class API

The `World` class is THE central API for Meta Horizon Worlds!

```typescript
// Access via: this.world (in Component scripts)

// Find entities
const entity = this.world.findEntity('EntityName');
const entities = this.world.findEntities('Pattern*');

// Get players
const players = this.world.getPlayers();
const localPlayer = this.world.getLocalPlayer();

// Game loop (THE proper way!)
World.onUpdate.connect(({ deltaTime }) => {
  // Your game logic here
});

// Spawn assets
const spawned = await this.world.spawnAsset(asset, position, rotation, scale);

// Delete spawned assets
await this.world.deleteAsset(entity);
```

---

## 💾 Persistent Storage

### Per-Player Storage
```typescript
// Save player data
this.world.persistentStorage.setPlayerVariable(player, 'score', 100);
this.world.persistentStorage.setPlayerVariable(player, 'name', 'PlayerOne');

// Load player data
const score = this.world.persistentStorage.getPlayerVariable<number>(player, 'score');
const name = this.world.persistentStorage.getPlayerVariable<string>(player, 'name');
```

### World-Wide Storage
```typescript
// World counters (fast, synchronous)
const totalVisits = this.world.persistentStorageWorld.getWorldCounter('visits');

// Increment counter
await this.world.persistentStorageWorld.incrementWorldCounterAsync('visits', 1);

// World variables (async)
await this.world.persistentStorageWorld.setWorldVariableAcrossAllInstancesAsync('settings', {
  difficulty: 'hard'
});
```

---

## 🏆 Leaderboards

```typescript
// Submit score
this.world.leaderboards.setScoreForPlayer(
  'fastest_delivery',  // leaderboard name
  player,              // player
  15.5,               // score
  true                // override existing?
);
```

---

## 📱 Mobile & Web Support

### Platform Detection
```typescript
const platform: PlayerPlatform = player.platform; // 'vr' | 'desktop' | 'mobile'

if (platform === 'vr') {
  // VR-specific code
} else if (platform === 'mobile') {
  // Mobile-specific code
}
```

### Grabbable Entity (Mobile-Enhanced)
```typescript
// Set interaction mode
grabbable.interactionMode = EntityInteractionMode.Grabbable;

// Configure for mobile
grabbable.avatarPose = AvatarPose.OneHandedInteraction;
grabbable.crosshairType = CrosshairType.Dot;

// Add action icons (mobile UI buttons)
grabbable.actionIcons = [
  { type: ActionIconType.Grab, label: 'Pick Up' },
  { type: ActionIconType.Use, label: 'Use Item' }
];

// Configure throwing
grabbable.throwConfig = {
  enabled: true,
  velocityMultiplier: 1.5,
  aimAssistEnabled: true
};
```

### Avatar Poses
| Pose | Description | Use Case |
|------|-------------|----------|
| `TwoHandedInteraction` | Both hands on object | Large objects |
| `OneHandedInteraction` | One hand | Pizza boxes, tools |
| `Handheld` | Held at side | Weapons, tools |
| `TwoHandedCarry` | Carrying with both hands | Heavy objects |

### Crosshair Types (Mobile)
| Type | Description |
|------|-------------|
| `Dot` | Simple dot |
| `Cross` | Crosshair |
| `Circle` | Circle outline |
| `None` | Hidden |

---

## 🎬 Gizmos Reference

### Trigger Gizmo
Invisible zones that detect collisions.

```typescript
const trigger = this.world.findEntity('MyTrigger') as TriggerGizmo;

// Events
trigger.onPlayerEnter.connect(({ player }) => {
  console.log(`${player.name} entered!`);
});

trigger.onPlayerExit.connect(({ player }) => {
  console.log(`${player.name} left!`);
});
```

### Raycast Gizmo
Shoots invisible ray for hit detection.

```typescript
const raycast = this.world.findEntity('MyRaycast') as RaycastGizmo;

const result = raycast.fire();
if (result.didHit) {
  console.log(`Hit at ${result.hitPoint}`);
}
```

### UI Gizmo
Custom UI panels in world.

```typescript
const ui = this.world.findEntity('MyUI') as UIGizmo;

ui.setContent(
  View({
    children: [
      Text({ text: 'Hello World!' }),
      Pressable({
        onPress: () => console.log('Clicked!'),
        children: Text({ text: 'Click Me' })
      })
    ]
  })
);
```

### Particle FX Gizmo
Visual particle effects.

```typescript
const particles = this.world.findEntity('MyParticles') as ParticleFXGizmo;
particles.play();
particles.stop();
particles.setLoop(true);
```

### Spawn Point Gizmo
Player entry locations.

```typescript
const spawn = this.world.findEntity('MySpawn') as SpawnPointGizmo;
spawn.teleportPlayer(player);
```

---

## 🎮 In-World Purchases (IWP)

### Setup Steps
1. Create items in Horizon Worlds Hub → Commerce
2. Set item type (Consumable vs Durable)
3. Place IWP Seller Gizmo in world
4. Connect script to handle purchases

### Item Types
| Type | Description | Example |
|------|-------------|---------|
| **Consumable** | Can be used up, can own multiple | Power-ups, passes |
| **Durable** | Permanent, own once forever | Wearables, skins |

### Script Integration
```typescript
// Check if player owns item
const hasItem = sellerGizmo.playerOwnsItem(player, 'sku_insurance_card');

// Confirm consumption (REQUIRED for consumables!)
sellerGizmo.consumeItemForPlayer(player, 'sku_insurance_card');
```

---

## 🎁 Daily Rewards System

```typescript
// Check if player can claim
const canClaim = await this.dailyRewards.canClaimToday(player);

// Get current streak
const streak = await this.dailyRewards.getStreak(player);

// Claim reward
const rewardDay = await this.dailyRewards.claimDailyReward(player);
if (rewardDay !== null) {
  const reward = DAILY_REWARDS[rewardDay - 1];
  console.log(`Claimed ${reward.name}!`);
}
```

---

## 🔧 Performance Constants

```typescript
// HUD update interval (ms) - 100-200ms is good balance
const HUD_UPDATE_INTERVAL = 100;

// Save interval (ms) - don't save every frame!
const SAVE_INTERVAL = 5000;

// Max dynamic lights in world
const MAX_DYNAMIC_LIGHTS = 15;

// Debug logging - SET TO FALSE IN PRODUCTION!
const DEBUG_MODE = false;
```

---

## 📋 Quick Reference Cards

### Entity Types
| Type | Interface | Notes |
|------|-----------|-------|
| Basic Entity | `Entity` | Base type |
| Trigger | `TriggerGizmo` | Collision detection |
| Raycast | `RaycastGizmo` | Hit detection |
| UI | `UIGizmo` | Custom UI panels |
| Particles | `ParticleFXGizmo` | Visual effects |
| Audio | `AudioSource` | Sound playback |
| Light | `DynamicLightGizmo` | Real-time lights |
| Trail | `TrailFXGizmo` | Motion trails |
| Spawn | `SpawnPointGizmo` | Player entry |
| Door | `DoorGizmo` | World links |

### Event Types
| Event | Trigger | Data |
|-------|---------|------|
| `OnPlayerEnterWorld` | Player joins | `player` |
| `OnPlayerExitWorld` | Player leaves | `player` |
| `OnGrabStart` | Object grabbed | `isRightHand`, `player` |
| `OnGrabEnd` | Object released | `isRightHand`, `player` |
| `OnPlayerEnterTrigger` | Player enters zone | `player` |
| `OnPlayerExitTrigger` | Player exits zone | `player` |
| `OnCollisionEnter` | Physics collision | Collision data |

---

## 📚 Additional Resources

- [Meta Horizon Worlds Documentation](https://developer.oculus.com/documentation/horizon-worlds/)
- [Horizon Worlds Scripting Reference](https://developer.oculus.com/documentation/horizon-worlds/scripting/)
- [Meta Quest Developer Hub](https://developer.oculus.com/)

---

*This documentation is for Pizza Express VR - a Meta Horizon Worlds game.*
*Original concept & world-building: Alejandro Samid*
