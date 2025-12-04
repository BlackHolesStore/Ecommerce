# 🍕 Pizza Express VR - Horizon Worlds Setup Checklist

Use this checklist when importing the game into Meta Horizon Worlds.

---

## Pre-Import Checklist

- [ ] **Backup your world** - Clone it before making changes
- [ ] **Check capacity** - Build Menu > Capacity (need headroom for game objects)
- [ ] **Enable file-backed scripts** - Script icon > Settings > Update

---

## Script Setup

- [ ] Create `PizzaGameManager` empty object in world
- [ ] Create new TypeScript file `PizzaDeliveryVR`
- [ ] Paste script content (without type stubs!)
- [ ] Attach script to `PizzaGameManager`
- [ ] Verify no compile errors in Script panel

---

## World Objects to Create

### Core Game Objects
- [ ] **Pizza Box** - Grabbable 3D model
  - [ ] Motion: Interactive > Both
  - [ ] Physics Material: Default
  - [ ] Avatar Pose: Default (for mobile)
  - [ ] Disable physics while grabbed: ✓
  
- [ ] **Drones (x4)** - Labeled A, B, C, D
  - [ ] Motion: Interactive > Both
  - [ ] Physics Material: Metal
  - [ ] Add propeller animation (Loop)
  
- [ ] **Delivery Bases (x4)** - Numbered 1, 2, 3, 4
  - [ ] Motion: None (Static)
  - [ ] Visible landing pad markings
  
- [ ] **Drone Cockpit** - Player sits in this
  - [ ] Motion: None
  - [ ] Controls display inside

### Trigger Zones (Invisible)
- [ ] **Pizza Counter Trigger** - Where players get orders
- [ ] **Delivery Zone Triggers (x4)** - At each base
- [ ] **Drone Pad Triggers (x4)** - Where drones are parked
- [ ] **Shop Entrance Trigger** - Entering the pizza shop
- [ ] **Drop Zone Triggers (x4)** - Where pizza lands

### Audio Assets
Voice Lines:
- [ ] voiceWelcome
- [ ] voiceNewOrder
- [ ] voiceGrabPizza
- [ ] voiceKeepLevel
- [ ] voiceLoadDrone
- [ ] voiceTakeoff
- [ ] voiceCruising
- [ ] voiceDescending
- [ ] voiceDropZone
- [ ] voicePerfect
- [ ] voiceGreatJob
- [ ] voiceDeliveryComplete
- [ ] voiceDamaged
- [ ] voicePizzaDestroyed
- [ ] voiceRankUp
- [ ] voiceRankDown
- [ ] voiceBadgeUnlocked
- [ ] voiceWindWarning
- [ ] voiceWrongDrone

Sound Effects:
- [ ] audioDroneHover
- [ ] audioDroneTakeoff
- [ ] audioDroneCruise
- [ ] audioGrab
- [ ] audioDrop
- [ ] audioPizzaSlide
- [ ] audioWind
- [ ] audioSuccess
- [ ] audioFailure

### Gizmos
- [ ] **Environment Gizmo** - Set to Sunny Day or custom
- [ ] **Debug Console Gizmo** - For testing (can hide later)
- [ ] **Spawn Point Gizmo** - Where players enter
- [ ] **Dynamic Lights** - Max 20! Count carefully

### UI Elements (Optional)
- [ ] **UI Gizmos** for HUD panels
- [ ] **TextMesh** objects for announcements
- [ ] **Leaderboard Gizmos** (x5)

---

## Property Wiring Checklist

Open the PizzaGameManager and wire each property:

### Objects
- [ ] `pizzaBoxPrefab` → Pizza Box object
- [ ] `drones[0-3]` → Drone A, B, C, D
- [ ] `deliveryBases[0-3]` → Base 1, 2, 3, 4
- [ ] `droneCockpitPrefab` → Cockpit object

### Triggers
- [ ] `triggerPizzaCounter` → Counter trigger
- [ ] `triggerDeliveryZones[0-3]` → Base triggers
- [ ] `triggerDronePads[0-3]` → Drone pad triggers
- [ ] `triggerShopEntrance` → Shop door trigger

### Audio
- [ ] All voice lines connected
- [ ] All sound effects connected

### Gizmos
- [ ] `environmentGizmo` → Environment Gizmo
- [ ] `debugConsole` → Debug Console Gizmo
- [ ] `primarySpawnPoint` → Main Spawn Point

---

## Configuration Checklist

### Constants (in script)
- [ ] Set `DEBUG_MODE = false` for production
- [ ] Adjust `TICK_RATE` if performance issues (60 default)
- [ ] Set `MAX_DYNAMIC_LIGHTS` based on your world (15 recommended)

### Physics Settings
- [ ] Pizza box has correct grab anchors
- [ ] Drones have appropriate weight (Metal material)
- [ ] Delivery platforms don't move

### Mobile/Web Support
- [ ] Action icons set for grabbables
- [ ] Crosshair type configured
- [ ] HWXS grab anchors enabled
- [ ] Aim assist for delivery zones

---

## Testing Checklist

### VR Testing
- [ ] Can grab pizza with controllers
- [ ] Haptics work on tilt damage
- [ ] Can load pizza onto drone
- [ ] Drone controls work (thumbsticks)
- [ ] Can release pizza over drop zone
- [ ] Score and tips calculate correctly
- [ ] Leaderboards update

### Desktop Testing
- [ ] Can click to grab pizza
- [ ] Keyboard controls work
- [ ] HUD is readable
- [ ] All buttons respond

### Mobile Testing
- [ ] Touch controls work
- [ ] Action buttons appear
- [ ] Virtual joystick works
- [ ] Performance is acceptable

---

## Pre-Publish Checklist

- [ ] `DEBUG_MODE = false`
- [ ] Remove or hide Debug Console Gizmo
- [ ] All console.log statements minimized
- [ ] Performance within capacity limits
- [ ] Test with multiple players (8+)
- [ ] All platforms tested (VR, Desktop, Mobile)
- [ ] World metadata set (name, description, images)
- [ ] Mobile compatibility tag selected

---

## Post-Publish Monitoring

- [ ] Check leaderboard submissions working
- [ ] Monitor for error reports
- [ ] Test IWP transactions
- [ ] Verify persistent storage saves

---

## Notes

```
_____________________________________
_____________________________________
_____________________________________
_____________________________________
_____________________________________
```

---

✅ **All done? Time to publish!** 🍕🚀
