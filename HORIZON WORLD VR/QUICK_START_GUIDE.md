# 🍕 Pizza Express VR - Quick Start Guide

## Importing into Meta Horizon Worlds

### Step 1: Prepare Your World
1. Open **Meta Horizon Worlds** on your Quest headset
2. Create a new world or open an existing one
3. **IMPORTANT**: If your world has existing scripts, clone it first as backup!

### Step 2: Enable File-Backed Scripts (Recommended)
1. Open your wearable (turn wrist)
2. Select **Script icon** → **Settings tab**
3. Select **Review** → **Update**
4. This enables unlimited scripts and faster loading

### Step 3: Create the Game Manager Object
1. Create an **empty object** in your world (use a simple cube, make it invisible)
2. Name it `PizzaGameManager`
3. This will hold the main game script

### Step 4: Import the Script
1. Open the **Script Editor** in Horizon
2. Create a new TypeScript file named `PizzaDeliveryVR`
3. Copy the contents of `PizzaDeliveryVR.ts` into the editor
4. **DELETE** the type stubs section at the top (lines marked "remove once inside Horizon")
   - Everything from `declare namespace HZ` down to before `export class PizzaDeliveryVR`
   - Horizon provides these types automatically!

### Step 5: Attach Script to Manager
1. Select your `PizzaGameManager` object
2. Open **Properties** → **Scripts**
3. Add the `PizzaDeliveryVR` script

### Step 6: Wire Up References
In the Properties panel, connect these public properties to your world objects:

#### Essential Objects
| Property | What to Connect |
|----------|-----------------|
| `worldRef` | (Auto-connected by Horizon) |
| `pizzaBoxPrefab` | Your pizza box 3D model |
| `drones` | Array of 4 drone objects (A, B, C, D) |
| `deliveryBases` | Array of 4 delivery target objects |

#### Audio (Voice Lines)
| Property | Audio Asset |
|----------|-------------|
| `voiceWelcome` | "Welcome to Pizza Express!" |
| `voiceNewOrder` | "New order incoming!" |
| `voiceGrabPizza` | "Grab your pizza!" |
| `voiceTakeoff` | "Taking off!" |
| etc... | (See full list in script) |

#### Gizmos
| Property | Gizmo Type |
|----------|------------|
| `triggerPizzaCounter` | Trigger Gizmo at pizza counter |
| `triggerDeliveryZones` | Array of Trigger Gizmos at bases |
| `environmentGizmo` | Environment Gizmo for sky/lighting |
| `debugConsole` | Debug Console Gizmo (for testing) |

### Step 7: Configure Physics
For each object, set the appropriate physics:

| Object | Motion | Physics Material |
|--------|--------|------------------|
| Pizza Box | Interactive > Both | Default |
| Drones | Interactive > Both | Metal |
| Delivery Platforms | None (Static) | - |
| Trigger Zones | None (Static) | - |

### Step 8: Test!
1. Click **Preview** in the Script panel
2. A player should spawn and see the welcome message
3. Walk to the counter to get a pizza order
4. Grab the pizza, load it on a drone, fly to the base!

---

## Troubleshooting

### "Script not found" Error
- Make sure the script file is named exactly `PizzaDeliveryVR`
- Check that you removed the type stubs (Horizon provides its own)

### Objects Not Connecting
- Ensure objects are named consistently
- Check that arrays have all 4 elements (drones, bases, etc.)

### Performance Issues
- Check **Build Menu** → **Capacity**
- Reduce dynamic lights (max 20!)
- Use fewer physics objects
- Set `DEBUG_MODE = false` in the constants

### Mobile/Web Players Can't Grab
- Ensure `disablePhysicsWhileGrabbed` is enabled on grabbables
- Set appropriate action icons for mobile buttons
- Check that HWXS grab anchors are configured

---

## Testing Platforms

### VR (Quest)
- Use controllers to grab pizza
- Feel haptic feedback
- Head-tracking HUD

### Desktop (Web Browser)
- Click to grab
- Keyboard for drone controls
- Mouse to look around

### Mobile (Meta Horizon App)
- Tap to interact
- Virtual joystick for drone
- Action buttons on screen

---

## Next Steps

1. **Customize the world** - Add decorations, signs, buildings
2. **Add more pizzas** - Create different pizza types with unique toppings
3. **Set up IWP** - Configure in-world purchases for passes
4. **Configure leaderboards** - Set up fastest delivery, most tips, etc.
5. **Publish!** - Submit for review when ready

---

## Support

- Check the `HORIZON_WORLDS_CHECKLIST.md` for a detailed setup checklist
- See `HorizonTypeStubs.ts` for API reference
- See `HORIZON_DOCUMENTATION.md` for complete feature docs

Happy delivering! 🍕🚀
