

(function tu144Addon() {


  var ac = geofs.aircraft.instance;
  if (!ac || !ac.definition) {
    console.log("Tu-144 Addon: aircraft not ready yet. Load the Concorde, then run again.");
    return;
  }


  ac.definition.driveRatio        *= 2.5;  
  ac.definition.zeroThrustAltitude *= 1.5; 
  ac.definition.dragFactor        *= 0.7;  


  ac.parts.frontGearPiston.object3d.scale([1, 1, 2]);

  ac.parts.gearLeftBogie.object3d.scale([1.6, 1, 1]);
  ac.parts.gearRightBogie.object3d.scale([1.6, 1, 1]);


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


  document.addEventListener("keydown", function (e) {
    // Z toggles the drag chute
    if (e.key === "z" || e.key === "Z") {
      window.toggleChute();
    }
    
    if (["1","2","3","4","5","6","7","8"].includes(e.key) &&
        !geofs.aircraft.instance.groundContact) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  
    if (e.key === "9") { geofs.aircraft.instance.animationValue.throttle = 1; }
    if (e.key === "0") { geofs.aircraft.instance.animationValue.throttle = 0; }
  }, true);


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

