/* =========================================================================
   TU-144 Addon from Concorde
   -------------------------------------------------------------------------
   Turns the stock GeoFS Concorde into a Tupolev Tu-144 "Concordski".

   Created by: Agas (age 10)  |  with code help from an AI assistant
   For: GeoFS (https://www.geo-fs.com)

   HOW TO USE:
     1. Open GeoFS and select the Concorde.
     2. Wait a few seconds for the aircraft to fully load.
     3. Open the browser console (press F12, then click "Console").
     4. Paste this whole file in and press Enter.
     5. (Optional) Install LiverySelector first for the Aeroflot livery.

   CONTROLS:
     Z .......... deploy / stow the drag chute (slows you on landing)
     9 .......... full throttle
     0 .......... idle throttle
     1-8 ........ work on the ground (for taxiing), blocked in the air

   NOTE: These are runtime tweaks. They last until you refresh the page.
   ========================================================================= */

(function tu144Addon() {

  // Make sure the aircraft is loaded before we touch it.
  var ac = geofs.aircraft.instance;
  if (!ac || !ac.definition) {
    console.log("Tu-144 Addon: aircraft not ready yet. Load the Concorde, then run again.");
    return;
  }

  /* ----- 1. PERFORMANCE: make it fly like a Tu-144 ----- */
  // The Tu-144 was bigger and faster than the Concorde (about Mach 2.29 top).
  ac.definition.driveRatio        *= 2.5;  // more thrust = faster, still flyable
  ac.definition.zeroThrustAltitude *= 1.5;  // keeps thrust higher up so it reaches cruise speed
  ac.definition.dragFactor        *= 0.7;  // less drag = higher top speed

  /* ----- 2. LANDING GEAR: Tu-144 style ----- */
  // Raised nose strut (the Tu-144 sat nose-high on the ground).
  ac.parts.frontGearPiston.object3d.scale([1, 1, 2]);
  // Wider main bogies so they read like the Tu-144's multi-wheel gear.
  ac.parts.gearLeftBogie.object3d.scale([1.6, 1, 1]);
  ac.parts.gearRightBogie.object3d.scale([1.6, 1, 1]);

  /* ----- 3. DRAG CHUTE (on-screen indicator + Z key) ----- */
  // The real Tu-144 had NO reverse thrust, so a braking parachute was its
  // only way to slow down on landing. We fake the *effect* with extra wheel
  // friction, and show a clickable indicator on screen.
  window.chuteOn = false;

  window.chuteBox = document.createElement("div");
  window.chuteBox.style.cssText =
    "position:fixed;top:120px;right:20px;z-index:9999;padding:10px 16px;" +
    "font-family:sans-serif;font-weight:bold;font-size:16px;border-radius:8px;" +
    "background:#444;color:white;cursor:pointer;user-select:none;";
  window.chuteBox.textContent = "CHUTE: IN";
  document.body.appendChild(window.chuteBox);

  window.toggleChute = function () {
    window.chuteOn = !window.chuteOn;
    var wheel = geofs.aircraft.instance.definition.contactProperties.wheel;
    wheel.frictionCoef    = window.chuteOn ? 25   : 12.5;     // stronger braking when chute is out
    wheel.rollingFriction = window.chuteOn ? 0.03 : 0.00001;  // chute "catching air"
    window.chuteBox.textContent = window.chuteOn ? "CHUTE: DEPLOYED" : "CHUTE: IN";
    window.chuteBox.style.background = window.chuteOn ? "#c0392b" : "#444";
  };
  window.chuteBox.addEventListener("click", window.toggleChute);

  /* ----- 4. KEYBOARD CONTROLS ----- */
  document.addEventListener("keydown", function (e) {
    // Z toggles the drag chute
    if (e.key === "z" || e.key === "Z") {
      window.toggleChute();
    }
    // Keys 1-8 work on the ground (taxi), but are blocked in the air
    if (["1","2","3","4","5","6","7","8"].includes(e.key) &&
        !geofs.aircraft.instance.groundContact) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
    // Two-position throttle: 9 = full, 0 = idle
    if (e.key === "9") { geofs.aircraft.instance.animationValue.throttle = 1; }
    if (e.key === "0") { geofs.aircraft.instance.animationValue.throttle = 0; }
  }, true);

  /* ----- 5. AEROFLOT LIVERY (needs LiverySelector installed) ----- */
  try {
    var lac = LiverySelector.liveryobj.aircrafts[geofs.aircraft.instance.id];
    var liv = lac.liveries.find(function (l) { return l.name === "Aeroflot"; });
    LiverySelector.loadLivery(liv.texture, lac.index, lac.parts, liv.materials);
    console.log("Tu-144 Addon: Aeroflot livery applied.");
  } catch (err) {
    console.log("Tu-144 Addon: livery skipped (install LiverySelector for the Aeroflot paint).");
  }

  console.log("TU-144 ADDON FROM CONCORDE LOADED! Press Z for chute, 9/0 for throttle. Fly safe!");

})();
