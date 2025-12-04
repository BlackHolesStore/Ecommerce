# 🍕 From Three.js to Meta Horizon Worlds
## A Community Tutorial by Pizza Express VR

> *"I'm just a regular person building the future, learning with all these new tools we have in our hands. Building from dreams I have – a vision for the future. Everything I've created comes from 8 months of playing around and learning with the community resources that Meta provides, YouTube videos, and experimenting whenever I have free time. I'm constantly building and constructing systems to build faster and better."*
>
> — Alejandro Samid, Creator of Pizza Express VR

---

## 🌟 What This Tutorial Is

This is **everything we learned** converting a WebXR/Three.js game into a native Meta Horizon Worlds experience. It's a cheat sheet, a foundation, and a gift to the community.

**Pizza Express VR** started as a dream – a drone pizza delivery simulation built in Three.js. Now it runs natively in Horizon Worlds, and this tutorial shows you how to do the same with YOUR game.

**Use this project as YOUR foundation.** Fork it. Modify it. Build YOUR delivery game on top of it. The drone simulation system, the scoring, the progression – it's all here for you.

---

## 📚 Table of Contents

1. [The Journey: Three.js → TypeScript → Horizon](#the-journey)
2. [Core Concept Translations](#core-concept-translations)
3. [The Complete Type Mapping Cheat Sheet](#type-mapping-cheat-sheet)
4. [Game Loop Translation](#game-loop-translation)
5. [Physics & Interaction](#physics--interaction)
6. [Mobile & Multi-Platform](#mobile--multi-platform)
7. [Persistent Data & Leaderboards](#persistent-data--leaderboards)
8. [Audio & Visual Effects](#audio--visual-effects)
9. [Common Gotchas & Solutions](#common-gotchas--solutions)
10. [Building Your Own Delivery Game](#build-your-own)

---

<a name="the-journey"></a>
## 🚀 The Journey: Three.js → TypeScript → Horizon

### Where We Started

```
Original Stack:
├── React + Three.js (react-three-fiber)
├── WebXR for VR support
├── JavaScript/TypeScript
├── Browser-based
└── ~15,000 lines of code
```

### Where We Ended Up

```
Horizon Worlds Stack:
├── Native Horizon TypeScript
├── Built-in VR + Mobile + Desktop support
├── Horizon Scripting API
├── Runs on Quest natively
└── ~7,000 lines (cleaner, optimized)
```

### The Key Insight

**You don't have to rebuild from scratch!**

Most of your game logic – the math, the state machines, the scoring systems – translates directly. What changes is HOW you interact with the world:

| Three.js | Horizon Worlds |
|----------|----------------|
| `scene.add(mesh)` | Drag object into world |
| `new THREE.Mesh()` | Pre-built gizmos & assets |
| `requestAnimationFrame` | `World.onUpdate` |
| `raycaster.intersectObjects` | `RaycastGizmo.fire()` |
| Custom physics | Built-in physics system |

---

<a name="core-concept-translations"></a>
## 🔄 Core Concept Translations

### 1. Scene Setup

**Three.js:**
```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
```

**Horizon Worlds:**
```typescript
// No code needed! The world IS the scene.
// Camera follows the player automatically.
// Just drag objects into your world in the editor.
```

### 2. Creating Objects

**Three.js:**
```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

**Horizon Worlds:**
```typescript
// Option 1: Place objects in World Builder (drag & drop)
// Option 2: Spawn from code
const spawned = await this.world.spawnAsset(
  this.props.cubePrefab,  // Pre-made asset
  new Vector3(0, 1, 0),   // Position
  new Quaternion()        // Rotation
);
```

### 3. Finding Objects

**Three.js:**
```javascript
const player = scene.getObjectByName('player');
```

**Horizon Worlds:**
```typescript
const player = this.world.findEntity('player');
// Returns Entity | undefined
```

### 4. Transform Manipulation

**Three.js:**
```javascript
mesh.position.set(1, 2, 3);
mesh.rotation.set(0, Math.PI, 0);
mesh.scale.set(2, 2, 2);
```

**Horizon Worlds:**
```typescript
entity.position.set(new Vector3(1, 2, 3));
entity.rotation.set(new Quaternion().setFromEuler(new Euler(0, Math.PI, 0)));
entity.scale.set(new Vector3(2, 2, 2));
```

---

<a name="type-mapping-cheat-sheet"></a>
## 📋 The Complete Type Mapping Cheat Sheet

### Math Classes

| Three.js | Horizon Worlds | Notes |
|----------|----------------|-------|
| `THREE.Vector3` | `Vector3` | Same API! |
| `THREE.Quaternion` | `Quaternion` | Same API! |
| `THREE.Euler` | `Euler` | Same API! |
| `THREE.Matrix4` | N/A | Use position/rotation/scale |
| `THREE.MathUtils` | `Math` | Standard JS Math |

### Object Types

| Three.js | Horizon Worlds | Notes |
|----------|----------------|-------|
| `THREE.Object3D` | `Object3D` | Base class |
| `THREE.Mesh` | `Entity` | With visual |
| `THREE.Group` | `Entity` (with children) | Use hierarchy |
| `THREE.Scene` | `World` | The root |
| `THREE.Camera` | Player's head | Automatic |

### Geometry & Materials

| Three.js | Horizon Worlds | Notes |
|----------|----------------|-------|
| `THREE.BoxGeometry` | Cube primitive | In World Builder |
| `THREE.SphereGeometry` | Sphere primitive | In World Builder |
| `THREE.MeshStandardMaterial` | Surface properties | Paint tool |
| Textures | Asset Library textures | Import or use built-in |

### Lights

| Three.js | Horizon Worlds | Notes |
|----------|----------------|-------|
| `THREE.AmbientLight` | Environment Gizmo | Global lighting |
| `THREE.DirectionalLight` | Environment Gizmo | Sun/moon |
| `THREE.PointLight` | Dynamic Light Gizmo | MAX 20! |
| `THREE.SpotLight` | Dynamic Light Gizmo | MAX 20! |

### Audio

| Three.js | Horizon Worlds | Notes |
|----------|----------------|-------|
| `THREE.AudioListener` | Built-in | Automatic |
| `THREE.PositionalAudio` | `AudioSource` | Spatial audio |
| `THREE.AudioLoader` | Asset Library | Import sounds |

### Physics

| Three.js + Cannon.js/Rapier | Horizon Worlds | Notes |
|-----------------------------|----------------|-------|
| `CANNON.Body` | Entity + Physics | Properties panel |
| `CANNON.Sphere/Box` | Colliders | Built-in |
| `body.applyForce()` | `physics.addForce()` | Service |
| Gravity | Physics Material | Per-object |
| Constraints | Grouping | Parent-child |

---

<a name="game-loop-translation"></a>
## 🔁 Game Loop Translation

### Three.js Game Loop

```javascript
function animate() {
  requestAnimationFrame(animate);
  
  const delta = clock.getDelta();
  
  // Update game logic
  updatePlayer(delta);
  updateEnemies(delta);
  updatePhysics(delta);
  
  // Render
  renderer.render(scene, camera);
}
animate();
```

### Horizon Worlds Game Loop

```typescript
export class MyGame {
  private updateConnection?: { disconnect(): void };
  
  start(): void {
    // Connect to the game loop
    this.updateConnection = World.onUpdate.connect(({ deltaTime }) => {
      this.tick(deltaTime);
    });
  }
  
  private tick(dt: number): void {
    // Update game logic (rendering is automatic!)
    this.updatePlayer(dt);
    this.updateEnemies(dt);
    // Physics is also automatic!
  }
  
  onShutdown(): void {
    // Clean up
    this.updateConnection?.disconnect();
  }
}
```

### Key Differences

| Aspect | Three.js | Horizon |
|--------|----------|---------|
| Loop trigger | `requestAnimationFrame` | `World.onUpdate` |
| Delta time | `clock.getDelta()` | Passed as parameter |
| Rendering | Manual `renderer.render()` | Automatic |
| Physics | Manual or library | Automatic |
| Cleanup | Window events | `onShutdown()` |

---

<a name="physics--interaction"></a>
## ⚛️ Physics & Interaction

### Making Objects Grabbable

**Three.js + WebXR:**
```javascript
// Complex controller tracking, raycasting, grip detection...
const controller = renderer.xr.getController(0);
controller.addEventListener('selectstart', onGrab);
// ... 100+ lines of grab logic
```

**Horizon Worlds:**
```typescript
// 1. In World Builder: Set object to "Interactive > Grabbable"
// 2. In script:
const grabbable = entity as HZ.GrabbableEntity;

// Listen for grabs
this.connectCodeBlockEvent(entity, CodeBlockEvents.OnGrabStart, (isRight, player) => {
  console.log(`${player.name} grabbed with ${isRight ? 'right' : 'left'} hand!`);
});
```

### Physics Materials

Instead of configuring mass, friction, restitution manually:

```typescript
// Three.js + Cannon.js
const material = new CANNON.Material('rubber');
material.friction = 0.9;
material.restitution = 0.8;
```

**Horizon:**
```
Just select from dropdown in Properties panel:
- Default (balanced)
- Feather (floaty)
- Rubberball (bouncy)
- Ice (slippery)
- Metal (heavy)
- Superball (super bouncy)
```

### Collision Detection

**Three.js:**
```javascript
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(scene.children);
```

**Horizon Worlds:**
```typescript
// Option 1: Trigger Gizmo (area detection)
triggerGizmo.onPlayerEnter.connect(({ player }) => {
  console.log(`${player.name} entered the zone!`);
});

// Option 2: Raycast Gizmo (line detection)
const hit = raycastGizmo.fire();
if (hit.didHit) {
  console.log(`Hit at ${hit.hitPoint}`);
}
```

---

<a name="mobile--multi-platform"></a>
## 📱 Mobile & Multi-Platform

### One Codebase, Three Platforms

Horizon automatically handles VR, Desktop, and Mobile. But you can customize:

```typescript
// Detect platform
const platform = player.platform; // 'vr' | 'desktop' | 'mobile'

if (platform === 'vr') {
  // Full motion controls
  this.enableHaptics(player);
  session.hudFollowsHead = true;
  
} else if (platform === 'mobile') {
  // Touch-friendly controls
  session.simplifiedGrab = true;
  this.showTouchControls(player);
  
  // Configure grabbables for mobile
  const pizzaBox = this.grabbablePizzaBox as HZ.GrabbableEntity;
  pizzaBox.avatarPose = 'OneHandedInteraction';
  pizzaBox.crosshairType = 'dot';
  pizzaBox.primaryActionIcon = 'pickup';
  
} else {
  // Desktop - mouse & keyboard
  session.simplifiedGrab = true;
  this.showKeyboardHints(player);
}
```

### Mobile-Specific Features

```typescript
// Action icons (buttons on screen)
grabbable.primaryActionIcon = 'fire';      // Main action
grabbable.secondaryActionIcon = 'reload';  // Secondary
grabbable.tertiaryActionIcon = 'drop';     // Third option

// Aim assist for mobile players
HZ.AimAssist.enable({
  targetEntity: targetZone,
  strength: 0.5,
  maxAngle: 15,
  falloffDistance: 20
});

// Trigger avatar animations
HZ.triggerGripAnimation(player, 'Fire');

// Programmatic throwing (for gestures)
HZ.throwHeldItem(player, {
  speed: 10,
  pitch: 15,
  handedness: 'right'
});
```

---

<a name="persistent-data--leaderboards"></a>
## 💾 Persistent Data & Leaderboards

### Player Data (Per-Player)

**Three.js (localStorage/server):**
```javascript
localStorage.setItem('playerScore', JSON.stringify(score));
const saved = JSON.parse(localStorage.getItem('playerScore'));
```

**Horizon Worlds:**
```typescript
// Save
this.world.persistentStorage.setPlayerVariable(player, 'score', 1000);
this.world.persistentStorage.setPlayerVariable(player, 'badges', ['first_flight', 'speed_demon']);

// Load
const score = this.world.persistentStorage.getPlayerVariable<number>(player, 'score');
const badges = this.world.persistentStorage.getPlayerVariable<string[]>(player, 'badges');
```

### World Data (Shared Across All Players)

```typescript
// Counters (fast, atomic)
const totalPizzas = this.world.persistentStorageWorld.getWorldCounter('total_pizzas');
await this.world.persistentStorageWorld.incrementWorldCounterAsync('total_pizzas', 1);

// Variables (for complex data)
await this.world.persistentStorageWorld.setWorldVariableAcrossAllInstancesAsync(
  'world_record',
  { time: 12.5, player: 'SpeedyGonzales' }
);
```

### Leaderboards

```typescript
// Submit score
this.world.leaderboards.setScoreForPlayer(
  'fastest_delivery',  // Leaderboard name
  player,              // Who
  15.5,               // Score (lower is better for time)
  true                // Override existing?
);

// Display: Just place a Leaderboard Gizmo in your world!
```

---

<a name="audio--visual-effects"></a>
## 🎵 Audio & Visual Effects

### Audio Translation

**Three.js:**
```javascript
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.PositionalAudio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('sound.mp3', (buffer) => {
  sound.setBuffer(buffer);
  sound.setVolume(0.5);
  sound.play();
});
```

**Horizon Worlds:**
```typescript
// 1. Import audio in Asset Library
// 2. Place Audio Gizmo in world or connect via props
// 3. Play from script:

if (this.audioSuccess) {
  this.audioSuccess.play();
}

// Or with spatial audio:
this.context.audio.playSpatial(this.audioSuccess, position);
```

### Particle Effects

**Three.js:**
```javascript
// 50+ lines of particle system setup...
const particles = new THREE.Points(geometry, material);
scene.add(particles);
```

**Horizon Worlds:**
```typescript
// 1. Drag Particle FX Gizmo into world
// 2. Connect via props
// 3. Trigger from script:

if (this.confettiEffect) {
  this.confettiEffect.play();
}
```

### Haptic Feedback

**Three.js + WebXR:**
```javascript
const session = renderer.xr.getSession();
for (const source of session.inputSources) {
  if (source.gamepad?.hapticActuators?.[0]) {
    source.gamepad.hapticActuators[0].pulse(0.5, 100);
  }
}
```

**Horizon Worlds:**
```typescript
player.vibrate(0.5, 100); // intensity, duration(ms)
```

---

<a name="common-gotchas--solutions"></a>
## ⚠️ Common Gotchas & Solutions

### 1. "My object isn't moving!"

**Problem:** Setting position directly doesn't work like Three.js

**Solution:**
```typescript
// ❌ This might not work
entity.position.x = 5;

// ✅ Use set() method
entity.position.set(new Vector3(5, entity.position.y, entity.position.z));
```

### 2. "Performance is terrible!"

**Problem:** Running expensive operations every frame

**Solution:**
```typescript
// ❌ Don't do this every frame
private tick(dt: number): void {
  const entity = this.world.findEntity('target'); // SLOW!
  this.updateHUD(); // Maybe unnecessary
}

// ✅ Cache references, throttle updates
private targetEntity?: Entity;
private lastHUDUpdate = 0;

preStart(): void {
  this.targetEntity = this.world.findEntity('target'); // Once!
}

private tick(dt: number): void {
  const now = Date.now();
  if (now - this.lastHUDUpdate > 100) { // Every 100ms
    this.updateHUD();
    this.lastHUDUpdate = now;
  }
}
```

### 3. "My sounds overlap weirdly!"

**Problem:** Playing too many sounds simultaneously

**Solution:**
```typescript
private activeSounds = 0;
private readonly MAX_SOUNDS = 8;

playSound(audio: AudioSource): void {
  if (this.activeSounds >= this.MAX_SOUNDS) return;
  
  this.activeSounds++;
  audio.play();
  
  // Estimate duration and decrement
  this.context.timer.setTimeout(() => {
    this.activeSounds--;
  }, 2000);
}
```

### 4. "Dynamic lights aren't showing!"

**Problem:** Hit the 20 dynamic light limit

**Solution:**
Use Static Glow instead:
1. Paint > Texture > Glow
2. Set glow intensity
3. Paint the object
4. Optional: Set Visible=off, Light&Shadow=on (invisible light source!)

### 5. "My TypeScript types aren't working!"

**Problem:** Horizon's types are different from your development environment

**Solution:**
```typescript
// Use the HorizonTypeStubs.ts file for development
// Remove ALL 'declare' statements when pasting into Horizon

// Cast when needed:
const grabbable = entity as HZ.GrabbableEntity;
const audio = entity as HZ.AudioGizmo;
```

---

<a name="build-your-own"></a>
## 🛠️ Building Your Own Delivery Game

### The Pizza Express Foundation

This entire project is **open for you to use**. Here's how to build YOUR delivery game on top of it:

### Step 1: Fork the Foundation

```
The core systems you get:
├── Drone flight mechanics
├── Tilt-based damage system
├── Order generation & delivery zones
├── XP & rank progression
├── Badge achievement system
├── Leaderboards integration
├── Daily rewards system
├── Multi-platform support (VR/Desktop/Mobile)
├── Debt & insurance mechanics
├── Audio & haptic feedback
└── Performance-optimized architecture
```

### Step 2: Customize Your Theme

Change the constants to match YOUR game:

```typescript
// Instead of pizza types:
const DELIVERY_ITEMS: ItemType[] = [
  { name: 'Standard Package', price: 10, emoji: '📦' },
  { name: 'Fragile Package', price: 25, emoji: '🔮' },
  { name: 'Express Letter', price: 5, emoji: '✉️' },
  { name: 'VIP Delivery', price: 100, emoji: '👑' },
];

// Rename the game
export class YourDeliveryGame extends PizzaDeliveryVR {
  // Override what you need
}
```

### Step 3: Swap the Visuals

1. Replace pizza box model → Your package/item model
2. Replace drone model → Your vehicle (drone/car/bike/jetpack)
3. Replace delivery zones → Your destination markers
4. Replace shop interior → Your hub/garage

### Step 4: Adjust the Mechanics

```typescript
// Example: Fragile items take more damage from tilt
calculateDamage(tilt: number, itemType: ItemType): number {
  const baseDamage = tilt * PIZZA_DAMAGE_RATE;
  
  if (itemType.name === 'Fragile Package') {
    return baseDamage * 2; // Double damage!
  }
  return baseDamage;
}
```

### Ideas for Your Delivery Game

| Theme | Vehicle | Items | Special Mechanic |
|-------|---------|-------|------------------|
| **Medical Drone** | Emergency drone | Organs, blood, medicine | Time pressure + temperature |
| **Food Delivery** | Bicycle/scooter | Various cuisines | Keep food hot/cold |
| **Package Courier** | Delivery van | Boxes of different sizes | Tetris-style loading |
| **Flower Delivery** | Walking | Bouquets | Avoid rain/wind damage |
| **Space Cargo** | Spaceship | Alien artifacts | Zero-gravity physics |
| **Ghost Mail** | Flying ghost | Spirit letters | Avoid sunlight |

---

## 🙏 Final Words

This project exists because of the incredible community Meta has built around Horizon Worlds. Every tutorial video, every documentation page, every forum answer contributed to making this possible.

**To everyone learning to build in VR:**

- Start small
- Experiment constantly
- Break things and learn why
- Share what you learn
- Help others on the same journey

The future of social VR is being built right now, by people just like you and me. Every world you create, every game you make, every experience you share adds to something bigger than any of us.

**Pizza Express VR is just the beginning.** 

Take this foundation. Build something amazing. And when you do – share it with the community so others can learn from YOUR journey too.

---

## 📎 Quick Links

- **QUICK_START_GUIDE.md** - How to import into Horizon Worlds
- **HORIZON_WORLDS_CHECKLIST.md** - Setup verification checklist
- **HORIZON_DOCUMENTATION.md** - Complete API reference
- **HorizonTypeStubs.ts** - Type declarations for IDE
- **PizzaDeliveryVR.ts** - The complete game source

---

## 🔗 Resources That Helped Me Learn

- [Meta Horizon Worlds Documentation](https://developer.oculus.com/documentation/horizon-worlds/)
- [Horizon Worlds Scripting Reference](https://developer.oculus.com/documentation/horizon-worlds/scripting/)
- YouTube creators making Horizon tutorials
- The Horizon Worlds Discord community
- Other world builders who shared their knowledge

---

*Made with ❤️ for the Horizon Worlds community*

*Pizza Express VR © 2024 - Built by Alejandro Samid*
*Open source foundation for the community*
