# TU-144 Addon from Concorde ✈️🇷🇺

Turn the stock GeoFS **Concorde** into a Tupolev **Tu-144** — the Soviet
supersonic airliner nicknamed the *"Concordski."*

Made by **Agas** (age 10), with code help from an AI assistant.

---

## What it does

This addon tweaks the Concorde to fly and look more like the real Tu-144:

- 🚀 **Tu-144 speed & acceleration** — tuned thrust and reduced drag so it
  cruises supersonic (the real Tu-144 topped out around Mach 2.29).
- 🛬 **Drag chute** — the real Tu-144 had no reverse thrust, so it used a
  braking parachute. Press **Z** to deploy a braking effect, with a clickable
  on-screen indicator.
- 🎚️ **Two-position throttle** — press **9** for full power, **0** for idle.
  Keys **1–8** still work on the ground for taxiing, but are blocked in the air.
- 🛞 **Tu-144-style landing gear** — wider main bogies and a raised nose strut.
- 🎨 **Aeroflot livery** — auto-applied if you have
  [LiverySelector](https://github.com/kolos26/GEOFS-LiverySelector) installed.

---

## How to use it

1. Open [GeoFS](https://www.geo-fs.com) and select the **Concorde**.
2. Wait a few seconds for the aircraft to fully load.
3. Open the browser console: press **F12**, then click the **Console** tab.
4. Copy everything in `tu144-addon.js`, paste it into the console, and press **Enter**.
5. You should see: `TU-144 ADDON FROM CONCORDE LOADED!`

> 💡 The tweaks last until you refresh the page. Just paste again to reload them.

### Controls

| Key | Action |
|-----|--------|
| `Z` | Deploy / stow the drag chute |
| `9` | Full throttle |
| `0` | Idle throttle |
| `1`–`8` | Work on the ground (taxi), blocked in the air |

---

## Flying tips

- **Take off gently** — let the plane build speed on the runway, then ease the
  nose up. Pulling up too hard at high power can stall it.
- **Climb high for top speed** — the thin air above 50,000 ft lets you go
  fastest. The real Tu-144 cruised around 52,000 ft.
- **Deploy the chute only when straight** — wait until you've touched down and
  all wheels are rolling straight before pressing **Z**, or it can pull you
  sideways.

---

## A note on how it works

These are **runtime tweaks** — they change the Concorde's settings *after* the
game loads, just for your session. They don't modify the GeoFS game files
themselves. Some Tu-144 features (visible canards, a visible parachute, lit
windows, true extra wheels) would need a real 3D model built in the
[GeoFS aircraft editor](https://www.geo-fs.com/backend/aircraft) — a fun
future project!

---

## Credits

- **Aircraft & tuning:** Agas
- **Code assistance:** AI assistant
- **Aeroflot livery:** via the GeoFS LiverySelector community addon
- Built for the GeoFS flight simulator
