/**
 * HorizonTypeStubs.ts
 * =============================================================================
 * Meta Horizon Worlds API Type Declarations for IDE Support
 * 
 * IMPORTANT: These are STUB DECLARATIONS for development/IDE purposes only!
 * When you paste your code into the Horizon Worlds Script Editor, REMOVE THIS FILE
 * or do not import it - the Horizon editor provides these types automatically.
 * 
 * These types mirror the actual Horizon Worlds API surface and provide:
 * - IntelliSense/autocomplete support in VS Code
 * - Type checking during development
 * - API documentation via JSDoc comments
 * 
 * =============================================================================
 */

/* ============================================================================ */
/* CORE MATH CLASSES                                                           */
/* ============================================================================ */

declare class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(x?: number, y?: number, z?: number);
  set(x: number, y: number, z: number): this;
  copy(v: Vector3): this;
  add(v: Vector3): this;
  sub(v: Vector3): this;
  multiplyScalar(s: number): this;
  divideScalar(s: number): this;
  length(): number;
  lengthSq(): number;
  normalize(): this;
  dot(v: Vector3): number;
  cross(v: Vector3): this;
  distanceTo(v: Vector3): number;
  distanceToSquared(v: Vector3): number;
  lerp(v: Vector3, alpha: number): this;
  clone(): Vector3;
  equals(v: Vector3): boolean;
  toArray(): [number, number, number];
  static readonly ZERO: Vector3;
  static readonly ONE: Vector3;
  static readonly UP: Vector3;
  static readonly DOWN: Vector3;
  static readonly LEFT: Vector3;
  static readonly RIGHT: Vector3;
  static readonly FORWARD: Vector3;
  static readonly BACK: Vector3;
}

declare class Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
  constructor(x?: number, y?: number, z?: number, w?: number);
  set(x: number, y: number, z: number, w: number): this;
  copy(q: Quaternion): this;
  setFromEuler(euler: Euler): this;
  setFromAxisAngle(axis: Vector3, angle: number): this;
  multiply(q: Quaternion): this;
  premultiply(q: Quaternion): this;
  slerp(q: Quaternion, t: number): this;
  invert(): this;
  normalize(): this;
  clone(): Quaternion;
  equals(q: Quaternion): boolean;
  static readonly IDENTITY: Quaternion;
}

declare class Euler {
  x: number;
  y: number;
  z: number;
  order: 'XYZ' | 'YXZ' | 'ZXY' | 'ZYX' | 'YZX' | 'XZY';
  constructor(x?: number, y?: number, z?: number, order?: 'XYZ' | 'YXZ' | 'ZXY' | 'ZYX' | 'YZX' | 'XZY');
  set(x: number, y: number, z: number, order?: string): this;
  copy(e: Euler): this;
  setFromQuaternion(q: Quaternion, order?: string): this;
  clone(): Euler;
}

/* ============================================================================ */
/* CORE ENTITY CLASSES                                                         */
/* ============================================================================ */

/** Base class for all 3D objects in Horizon Worlds */
declare class Object3D {
  name: { get(): string; set(v: string): void };
  position: { get(): Vector3; set(v: Vector3): void };
  rotation: { get(): Quaternion; set(v: Quaternion): void };
  scale: { get(): Vector3; set(v: Vector3): void };
  visible: { get(): boolean; set(v: boolean): void };
  parent: { get(): Object3D | undefined };
  children: { get(): Object3D[] };
  
  // Transform methods
  localToWorld(v: Vector3): Vector3;
  worldToLocal(v: Vector3): Vector3;
  lookAt(target: Vector3): void;
  
  // Hierarchy methods
  add(child: Object3D): this;
  remove(child: Object3D): this;
  traverse(callback: (obj: Object3D) => void): void;
  getObjectByName(name: string): Object3D | undefined;
  
  // Utility
  clone(): Object3D;
}

/** Entity with tags support (extends Object3D in Horizon) */
declare interface Entity extends Object3D {
  tags: {
    get(): string[];
    set(tags: string[]): void;
    add(tag: string): void;
    remove(tag: string): void;
    has(tag: string): boolean;
  };
}

/* ============================================================================ */
/* PLAYER & CONTROLLER                                                          */
/* ============================================================================ */

/** Player platform types */
declare type PlayerPlatform = 'vr' | 'desktop' | 'mobile';

/** Player in the world */
declare class Player {
  id: { get(): bigint };
  name: { get(): string };
  position: { get(): Vector3; set(v: Vector3): void };
  rotation: { get(): Quaternion; set(v: Quaternion): void };
  headPosition: { get(): Vector3 };
  headRotation: { get(): Quaternion };
  
  /** Player's platform (vr, desktop, mobile) */
  platform: PlayerPlatform;
  
  /** Is haptic feedback enabled for this player? */
  hapticsEnabled: boolean;
  
  /** Does HUD follow player's head? (VR) or fixed position (desktop/mobile) */
  hudFollowsHead: boolean;
  
  /** Use simplified grab mechanics? (desktop/mobile) */
  simplifiedGrab: boolean;
  
  /** Are voice commands enabled? (VR only) */
  voiceCommandsEnabled: boolean;
  
  // Methods
  teleport(position: Vector3, rotation?: Quaternion): void;
  getController(hand: 'left' | 'right'): Controller;
  sendHapticPulse(hand: 'left' | 'right', intensity: number, duration: number): void;
}

/** VR Controller */
declare class Controller {
  position: { get(): Vector3 };
  rotation: { get(): Quaternion };
  forward: { get(): Vector3 };
  trigger: { get(): number };
  grip: { get(): number };
  thumbstick: { get(): { x: number; y: number } };
  primaryButton: { get(): boolean };
  secondaryButton: { get(): boolean };
}

/* ============================================================================ */
/* PHYSICS                                                                      */
/* ============================================================================ */

/** Physics material types available in Horizon */
declare type PhysicsMaterial = 
  | 'default' 
  | 'feather' 
  | 'hardwood' 
  | 'ice' 
  | 'metal' 
  | 'rubberball' 
  | 'softwood' 
  | 'superball' 
  | 'superice';

/**
 * PHYSICS MATERIAL COMPARISON:
 * 
 * | Material    | Weight | Bounce | Friction | Best For                    |
 * |-------------|--------|--------|----------|-----------------------------|
 * | default     | Medium | Low    | Medium   | General objects             |
 * | feather     | Light  | None   | Low      | Leaves, paper, confetti     |
 * | hardwood    | Heavy  | None   | High     | Furniture, floors           |
 * | ice         | Medium | Low    | None     | Ice surfaces, slippery      |
 * | metal       | Heavy  | Medium | Medium   | Metal objects, coins        |
 * | rubberball  | Light  | High   | High     | Bouncy balls, toys          |
 * | softwood    | Medium | Low    | Medium   | Crates, light wood          |
 * | superball   | Light  | Max    | High     | Super bouncy objects        |
 * | superice    | Medium | Low    | None     | Extremely slippery surfaces |
 */

/** Motion types for objects */
declare type MotionType = 'static' | 'animated' | 'physics';

/** Interaction types */
declare type InteractionType = 'none' | 'grabbable' | 'button';

/** Physics service for raycasting and queries */
declare interface PhysicsService {
  raycast(origin: Vector3, direction: Vector3, maxDistance: number): RaycastResult | null;
  overlapSphere(center: Vector3, radius: number): Entity[];
}

declare interface RaycastResult {
  hitPoint: Vector3;
  hitNormal: Vector3;
  hitDistance: number;
  hitEntity: Entity | null;
}

/* ============================================================================ */
/* MOBILE & WEB SUPPORT - GRABBABLE ENTITIES                                   */
/* ============================================================================ */

/**
 * MOBILE/WEB SUPPORT:
 * Horizon Worlds supports VR, Desktop, and Mobile platforms.
 * Grabbable entities have special properties for non-VR interaction.
 */

/** Avatar pose when interacting with grabbable */
declare type AvatarPose = 
  | 'TwoHandedInteraction'  // Both hands on object (large items)
  | 'OneHandedInteraction'  // One hand interaction (default)
  | 'Handheld'             // Held at side (weapons)
  | 'TwoHandedCarry';      // Carrying with both hands

/** Grip animation for avatar hands */
declare type GripAnimationName =
  | 'Default'
  | 'Fist'
  | 'Point'
  | 'Pinch'
  | 'ThumbsUp'
  | 'Peace'
  | 'OpenHand';

/** Crosshair type for mobile/desktop aiming */
declare type CrosshairType =
  | 'Dot'
  | 'Cross'
  | 'Circle'
  | 'None';

/** Action icon types for mobile UI buttons */
declare type ActionIconType =
  | 'Grab'
  | 'Use'
  | 'Throw'
  | 'Drop'
  | 'Activate'
  | 'Custom';

/** Action icon configuration */
declare interface ActionIcon {
  type: ActionIconType;
  label?: string;
  icon?: string;
  onActivate?: () => void;
}

/** 
 * Entity interaction mode 
 * - None: No physics interaction
 * - Grabbable: Can be picked up
 * - Both: Full physics + grabbable
 */
declare enum EntityInteractionMode {
  None = 'none',
  Grabbable = 'grabbable',
  Both = 'both'
}

/** Events fired during focused interaction (mobile/desktop) */
declare interface FocusedInteractionEvents {
  onFocusEnter?: (player: Player) => void;
  onFocusExit?: (player: Player) => void;
  onFocusHold?: (player: Player, duration: number) => void;
}

/** Custom input binding for mobile/desktop */
declare interface CustomInputBinding {
  action: string;
  key?: string;
  button?: string;
  onPress?: (player: Player) => void;
  onRelease?: (player: Player) => void;
  onHold?: (player: Player, duration: number) => void;
}

/** Interaction range configuration */
declare interface InteractionRangeConfig {
  near: number;
  far: number;
  focusAngle: number;
}

/** Throw configuration for grabbables */
declare interface ThrowConfig {
  enabled: boolean;
  velocityMultiplier?: number;
  maxVelocity?: number;
  aimAssistEnabled?: boolean;
  aimAssistStrength?: number;
  trajectoryPreview?: boolean;
}

/** Aim assist configuration for mobile */
declare interface AimAssistConfig {
  enabled: boolean;
  strength: number;
  range: number;
  targetTags?: string[];
  snapToTarget?: boolean;
}

/** Grab anchor for positioning in hand */
declare interface GrabAnchor {
  position: Vector3;
  rotation: Quaternion;
}

/* ============================================================================ */
/* GRABBABLE ENTITY                                                             */
/* ============================================================================ */

/** 
 * Horizon GrabbableEntity - Extended with Mobile/Web Support
 * Access via HZ namespace in Horizon editor
 */
declare namespace HZ {
  /** Property types for component props */
  namespace PropTypes {
    type String = string;
    type Number = number;
    type Boolean = boolean;
    type Vec3 = Vector3;
    type Color = string;
    type Entity = Object3D;
    type Asset = { id: string };
    type Array<T> = T[];
    type Optional<T> = T | undefined;
  }

  /** 
   * GrabbableEntity - Full interface for grabbable objects
   * Includes all mobile/web platform properties
   */
  interface GrabbableEntity extends Entity {
    // Core grabbable properties
    isGrabbed(): boolean;
    getHoldingPlayer(): Player | null;
    forceRelease(): void;
    setGrabbable(enabled: boolean): void;
    
    // Grab anchors
    setRightHandAnchor(anchor: GrabAnchor): void;
    setLeftHandAnchor(anchor: GrabAnchor): void;
    
    // Mobile/Web platform properties
    
    /** Interaction mode for physics vs grabbable behavior */
    interactionMode: EntityInteractionMode;
    
    /** Avatar pose when holding this object */
    avatarPose: AvatarPose;
    
    /** Crosshair type when aiming at this object (mobile/desktop) */
    crosshairType: CrosshairType;
    
    /** Action icons shown on mobile UI */
    actionIcons: ActionIcon[];
    
    /** Grab anchors for left and right hands */
    grabAnchors: {
      left?: GrabAnchor;
      right?: GrabAnchor;
    };
    
    /** Aim direction for ranged interactions */
    aimDirection: Vector3;
    
    /** Throw configuration */
    throwConfig: ThrowConfig;
    
    /** Aim assist configuration */
    aimAssistConfig: AimAssistConfig;
    
    /** Focused interaction events (mobile/desktop) */
    focusedInteractionEvents: FocusedInteractionEvents;
    
    /** Custom input bindings */
    customInputBindings: CustomInputBinding[];
    
    /** Interaction range settings */
    interactionRange: InteractionRangeConfig;
    
    // Events
    onGrabbed: LocalEvent<{ player: Player; hand: 'left' | 'right' }>;
    onReleased: LocalEvent<{ player: Player; hand: 'left' | 'right' }>;
    onThrown: LocalEvent<{ player: Player; velocity: Vector3 }>;
  }
  
  /** Audio Gizmo for sound playback */
  interface AudioGizmo {
    play(): void;
    stop(): void;
    pause(): void;
    setVolume(volume: number): void;
    setLoop(loop: boolean): void;
    setPitch(pitch: number): void;
    isPlaying(): boolean;
  }
  
  /** Particle Gizmo for visual effects */
  interface ParticleGizmo {
    play(): void;
    stop(): void;
    setLoop(loop: boolean): void;
    setColor(color: string): void;
    setScale(scale: number): void;
  }
  
  // Mobile helper functions
  
  /** Trigger grip animation on player's avatar */
  function triggerGripAnimation(player: Player, hand: 'left' | 'right', animation: GripAnimationName): void;
  
  /** Throw held item with velocity */
  function throwHeldItem(player: Player, hand: 'left' | 'right', velocity: Vector3): void;
  
  /** Configure aim assist for player */
  function configureAimAssist(player: Player, config: AimAssistConfig): void;
  
  /** Set up focused interaction on entity */
  function setupFocusedInteraction(entity: Entity, events: FocusedInteractionEvents): void;
  
  /** Bind custom input for player */
  function bindCustomInput(player: Player, binding: CustomInputBinding): void;
  
  /** Remove focus from current target */
  function unfocus(player: Player): void;
}

/* ============================================================================ */
/* AUDIO                                                                        */
/* ============================================================================ */

/** Text mesh for in-world text display */
declare interface TextMesh {
  text: { get(): string; set(v: string): void };
  color: { get(): string; set(v: string): void };
  fontSize: { get(): number; set(v: number): void };
  alignment: { get(): string; set(v: string): void };
}

/** Audio source for sound playback */
declare interface AudioSource {
  play(): void;
  stop(): void;
  pause(): void;
  setVolume(volume: number): void;
  setLoop(loop: boolean): void;
  setPitch(pitch: number): void;
  isPlaying(): boolean;
}

/** Audio manager for global audio control */
declare interface AudioManager {
  playSound(source: AudioSource): void;
  stopAll(): void;
  setMasterVolume(volume: number): void;
}

/* ============================================================================ */
/* SERVICES                                                                     */
/* ============================================================================ */

/** Timer service */
declare interface TimerService {
  setTimeout(callback: () => void, ms: number): number;
  setInterval(callback: () => void, ms: number): number;
  clearTimeout(id: number): void;
  clearInterval(id: number): void;
}

/** Persistent storage for per-player data */
declare interface PersistentStorageService {
  getPlayerData<T>(player: Player, key: string): Promise<T | null> | T | null;
  setPlayerData<T>(player: Player, key: string, value: T): Promise<void> | void;
  deletePlayerData(player: Player, key: string): Promise<void> | void;
  getWorldData<T>(key: string): Promise<T | null> | T | null;
  setWorldData<T>(key: string, value: T): Promise<void> | void;
}

/** Quest service for managing quests */
declare interface QuestService {
  startQuest?(player: Player, questId: string): Promise<void> | void;
  completeQuest?(player: Player, questId: string): Promise<void> | void;
  updateProgress?(player: Player, questId: string, progress: number): Promise<void> | void;
  getProgress?(player: Player, questId: string): Promise<number> | number;
  isCompleted?(player: Player, questId: string): Promise<boolean> | boolean;
}

/* ============================================================================ */
/* LOCAL EVENTS                                                                 */
/* ============================================================================ */

/** Local event for subscribing to world events */
declare interface LocalEvent<T> {
  connect(handler: (data: T) => void): { disconnect(): void };
}

/* ============================================================================ */
/* UI SYSTEM                                                                    */
/* ============================================================================ */

/** Bindable value - can be static or reactive */
type Bindable<T> = T | { get(): T; set(value: T): void };

/** UI children can be nodes or arrays */
type UIChildren = UINode | UINode[] | null | undefined;

/** Base props for all UI components */
declare interface UIComponentProps {
  children?: UIChildren;
  style?: UIStyle;
}

/** UINode represents a UI element */
declare class UINode<T extends UIComponentProps = UIComponentProps> {
  static if(
    condition: Bindable<boolean>, 
    trueComponent?: UIChildren, 
    falseComponent?: UIChildren
  ): UINode;
}

/** Style properties for UI components */
declare interface UIStyle {
  width?: number | string;
  height?: number | string;
  padding?: number;
  margin?: number;
  flex?: number;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  opacity?: number;
  position?: 'relative' | 'absolute';
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

/** Props for View component */
declare interface ViewProps extends UIComponentProps {
  style?: UIStyle;
}

/** Props for Text component */
declare interface TextProps extends UIComponentProps {
  text?: Bindable<string>;
  style?: UIStyle & {
    fontSize?: number;
    fontWeight?: 'normal' | 'bold';
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

/** Props for Pressable component */
declare interface PressableProps extends UIComponentProps {
  onPress?: () => void;
  onHoverEnter?: () => void;
  onHoverExit?: () => void;
  style?: UIStyle;
}

/** Props for Image component */
declare interface ImageProps extends UIComponentProps {
  source?: Asset | string;
  style?: UIStyle;
}

/** Props for ScrollView component */
declare interface ScrollViewProps extends UIComponentProps {
  style?: UIStyle;
  horizontal?: boolean;
}

/** Props for DynamicList component */
declare interface DynamicListProps<T> extends UIComponentProps {
  data: Bindable<T[]>;
  renderItem: (item: T, index: number) => UINode;
  keyExtractor?: (item: T, index: number) => string;
}

// UI Component Functions
declare function View(props: Readonly<ViewProps>): UINode<ViewProps>;
declare function Text(props: Readonly<TextProps>): UINode<TextProps>;
declare function Pressable(props: Readonly<PressableProps>): UINode<PressableProps>;
declare function Image_2(props: Readonly<ImageProps>): UINode<ImageProps>;
declare function ScrollView(props: Readonly<ScrollViewProps>): UINode<ScrollViewProps>;
declare function DynamicList<T>(props: Readonly<DynamicListProps<T>>): UINode<DynamicListProps<T>>;

/** UI Gizmo for custom UI panels */
declare interface UIGizmo extends Entity {
  setContent(content: UINode): void;
  toString(): string;
}

/* ============================================================================ */
/* GIZMOS                                                                       */
/* ============================================================================ */

/** Trigger event data */
declare interface TriggerEventData {
  player?: Player;
  object?: Entity;
  trigger: TriggerGizmo;
}

/** Trigger Gizmo for collision detection */
declare interface TriggerGizmo extends Entity {
  setDetectionEnabled(enabled: boolean): void;
  isDetectionEnabled(): boolean;
  setDetectionMode(mode: 'player' | 'object' | 'both'): void;
  setObjectTags(tags: string[]): void;
  onPlayerEnter: LocalEvent<TriggerEventData>;
  onPlayerExit: LocalEvent<TriggerEventData>;
  onObjectEnter: LocalEvent<TriggerEventData>;
  onObjectExit: LocalEvent<TriggerEventData>;
}

/** Raycast hit result data */
declare interface RaycastHitData {
  didHit: boolean;
  didHitObject: boolean;
  didHitPlayer: boolean;
  hitPoint: Vector3;
  hitDistance: number;
  hitEntity?: Entity;
  hitPlayer?: Player;
}

/** Raycast Gizmo for hit detection */
declare interface RaycastGizmo extends Entity {
  fire(): RaycastHitData;
  setLength(length: number): void;
  getLength(): number;
  setObjectTags(tags: string[]): void;
  setDetectPlayers(enabled: boolean): void;
  setDetectObjects(enabled: boolean): void;
}

/** Projectile configuration */
declare interface ProjectileConfig {
  speed?: number;
  color?: string;
  size?: number;
  tailLength?: number;
  gravity?: number;
  lifetime?: number;
}

/** Projectile Launcher Gizmo */
declare interface ProjectileLauncherGizmo extends Entity {
  fire(): void;
  fireWithConfig(config: ProjectileConfig): void;
  setConfig(config: ProjectileConfig): void;
  onProjectileHit: LocalEvent<{
    hitPoint: Vector3;
    hitEntity?: Entity;
    hitPlayer?: Player;
  }>;
}

/** Environment preset types */
declare type EnvironmentPreset = 
  | 'sunnyDay' | 'cloudy' | 'overcast'
  | 'sunset' | 'goldenHour'
  | 'night' | 'nightPanorama'
  | 'studio';

/** Environment Gizmo for sky/lighting */
declare interface EnvironmentGizmo extends Entity {
  setPreset(preset: EnvironmentPreset): void;
  setExposure(exposure: number): void;
  setLightIntensity(intensity: number): void;
  setFogEnabled(enabled: boolean): void;
  setFogDensity(density: number): void;
  setFogColor(color: string): void;
}

/** Dynamic Light Gizmo (max 20 per world!) */
declare interface DynamicLightGizmo extends Entity {
  setIntensity(intensity: number): void;
  getIntensity(): number;
  setRange(range: number): void;
  getRange(): number;
  setColor(color: string): void;
  setEnabled(enabled: boolean): void;
}

/** Trail FX Gizmo */
declare interface TrailFXGizmo extends Entity {
  setColor(color: string): void;
  setWidth(width: number): void;
  setDuration(duration: number): void;
  setEnabled(enabled: boolean): void;
}

/** Particle FX Gizmo */
declare interface ParticleFXGizmo extends Entity {
  play(): void;
  stop(): void;
  setLoop(loop: boolean): void;
  setPlayOnStart(playOnStart: boolean): void;
  setColor(color: string): void;
  setScale(scale: number): void;
}

/** Sound Recorder Gizmo */
declare interface SoundRecorderGizmo extends Entity {
  play(): void;
  stop(): void;
  setVolume(volume: number): void;
  setLoop(loop: boolean): void;
  setPlayOnStart(playOnStart: boolean): void;
}

/** Debug Console Gizmo */
declare interface DebugConsoleGizmo extends Entity {
  setVisibility(mode: 'editOnly' | 'editAndPreview' | 'published'): void;
  clear(): void;
}

/** Door Gizmo for world links */
declare interface DoorGizmo extends Entity {
  setTargetWorld(worldId: string): void;
  getTargetWorld(): string;
}

/** Snap Destination Gizmo */
declare interface SnapDestinationGizmo extends Entity {
  setEnabled(enabled: boolean): void;
}

/** Spawn Point Gizmo */
declare interface SpawnPointGizmo extends Entity {
  setPrimary(primary: boolean): void;
  isPrimary(): boolean;
  teleportPlayer(player: Player): void;
}

/* ============================================================================ */
/* IN-WORLD PURCHASES (IWP)                                                     */
/* ============================================================================ */

/** Item entitlement */
declare interface ItemEntitlement {
  sku: string;
  quantity?: number;
}

/** World Inventory API */
declare const WorldInventory: {
  getPlayerEntitlements(player: Player): Promise<ItemEntitlement[]>;
};

/** IWP Seller Gizmo */
declare interface IWPSellerGizmo {
  playerOwnsItem(player: Player, itemSku: string): boolean;
  consumeItemForPlayer(player: Player, itemSku: string): void;
  getItemSku(): string;
}

/* ============================================================================ */
/* LEADERBOARDS                                                                 */
/* ============================================================================ */

/** Leaderboard entry */
declare interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  score: number;
  rank: number;
}

/** Leaderboards interface - ACTUAL HORIZON API */
declare interface ILeaderboards {
  setScoreForPlayer(leaderboardName: string, player: Player, score: number, override: boolean): void;
}

/** Leaderboard Gizmo */
declare interface LeaderboardGizmo {
  leaderboardId: string;
  displayCount: number;
  updateInterval: number;
  refresh(): void;
}

/* ============================================================================ */
/* PERSISTENT STORAGE - ACTUAL HORIZON API                                      */
/* ============================================================================ */

/** Type for persistent serializable state */
type PersistentSerializableState = number | string | boolean | object | null;

/** Result type for world variable updates */
declare interface WorldVariableUpdateResult<T> {
  success: boolean;
  value: T;
}

/** Per-player persistent storage */
declare interface IPersistentStorage {
  getPlayerVariable<T extends PersistentSerializableState = number>(player: Player, key: string): T extends number ? T : T | null;
  setPlayerVariable<T extends PersistentSerializableState>(player: Player, key: string, value: T): void;
}

/** World-level persistent storage */
declare interface IPersistentStorageWorld {
  getWorldCounter(key: string): number;
  getWorldVariable<T extends PersistentSerializableState>(key: string): T | null;
  fetchWorldVariableAsync<T extends PersistentSerializableState>(key: string): Promise<T | null>;
  incrementWorldCounterAsync(key: string, amount: number): Promise<number>;
  setWorldVariableAcrossAllInstancesAsync<T extends PersistentSerializableState>(
    key: string, 
    value: T, 
    allowConcurrentOverride?: boolean
  ): Promise<T | WorldVariableUpdateResult<T>>;
}

/** Compression helpers */
declare function compressAndEncode(data: string): string;
declare function decodeAndInflate(data: string): string;

/* ============================================================================ */
/* COMMERCE & REWARDS                                                           */
/* ============================================================================ */

/** Commerce service */
declare interface CommerceService {
  grantItem?(sku: string, player: Player): Promise<void> | void;
  notifyAvailability?(sku: string, available: boolean): Promise<void> | void;
  hasItem?(sku: string, player: Player): Promise<boolean> | boolean;
}

/** Reward item */
declare interface RewardItem {
  sku: string;
  name: string;
  description: string;
  type: 'consumable' | 'durable' | 'currency' | 'cosmetic';
  value?: number;
}

/** Daily Rewards service */
declare interface DailyRewardsService {
  getStreak?(player: Player): Promise<number> | number;
  getLastClaimTime?(player: Player): Promise<number | null> | (number | null);
  claimDailyReward?(player: Player): Promise<number | null> | (number | null);
  canClaimToday?(player: Player): Promise<boolean> | boolean;
  grantReward?(reward: RewardItem, player: Player): Promise<void> | void;
}

/* ============================================================================ */
/* WORLD CLASS - CENTRAL API                                                    */
/* ============================================================================ */

/** UI interface */
declare interface IUI {
  showPopup(player: Player, options: {
    title?: string;
    body: string;
    buttons?: Array<{ label: string; onClick?: () => void }>;
  }): void;
  showTooltip(player: Player, text: string, duration?: number): void;
  hideTooltip(player: Player): void;
}

/** Asset for spawning */
declare interface Asset {
  id: string;
}

/** The World class - central API for Horizon Worlds */
declare class World {
  id: { get(): bigint };
  name: { get(): string };
  
  leaderboards: ILeaderboards;
  persistentStorage: IPersistentStorage;
  persistentStorageWorld: IPersistentStorageWorld;
  ui: IUI;
  
  static readonly onUpdate: LocalEvent<{ deltaTime: number }>;
  static readonly onPrePhysicsUpdate: LocalEvent<{ deltaTime: number }>;
  
  findEntity(name: string): Entity | undefined;
  findEntities(name: string, options?: { matchOperation?: string }): Entity[];
  spawnAsset(asset: Asset, position: Vector3, rotation?: Quaternion, scale?: Vector3): Promise<Entity[]>;
  deleteAsset(entity: Entity): Promise<void>;
  getPlayers(): Player[];
  getLocalPlayer(): Player;
  getServerPlayer(): Player;
  reset(): void;
  setShopOverlayVisible(player: Player, shopGizmo: Entity, visible: boolean): Promise<void>;
}

/* ============================================================================ */
/* HORIZON CONTEXT                                                              */
/* ============================================================================ */

declare interface HorizonScriptContext {
  timer: TimerService;
  worldRoot: Object3D;
  audio: AudioManager;
  physics: PhysicsService;
  log(message: string): void;
  persistent?: PersistentStorageService;
  quests?: QuestService;
  leaderboards?: LeaderboardService;
  commerce?: CommerceService;
  dailyRewards?: DailyRewardsService;
  worldInventory?: {
    getPlayerEntitlements(player: Player): Promise<ItemEntitlement[]>;
  };
}

/** Leaderboard service */
declare interface LeaderboardService {
  submitScore?(
    leaderboardId: string,
    player: Player,
    value: number,
    options?: { order?: 'asc' | 'desc'; overwrite?: boolean }
  ): Promise<void> | void;
  getTopScores?(
    leaderboardId: string,
    count: number
  ): Promise<LeaderboardEntry[]> | LeaderboardEntry[];
  getPlayerRank?(
    leaderboardId: string,
    player: Player
  ): Promise<LeaderboardEntry | null> | (LeaderboardEntry | null);
}

/* ============================================================================ */
/* CODE BLOCK EVENTS                                                            */
/* ============================================================================ */

declare const CodeBlockEvents: {
  OnPlayerEnterWorld: string;
  OnPlayerExitWorld: string;
  OnItemPurchaseComplete: string;
  OnItemConsumeStart: string;
  OnItemConsumeComplete: string;
  OnGrabStart: string;
  OnGrabEnd: string;
  OnPlayerEnterTrigger: string;
  OnPlayerExitTrigger: string;
  OnObjectEnterTrigger: string;
  OnObjectExitTrigger: string;
  OnCollisionEnter: string;
  OnCollisionExit: string;
  OnAnimationEnd: string;
  OnProjectileHit: string;
};

/* ============================================================================ */
/* END OF TYPE STUBS                                                            */
/* ============================================================================ */
