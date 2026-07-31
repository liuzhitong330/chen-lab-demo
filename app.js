(function () {
  "use strict";

  var D = window.CHEN_DATA;
  var NS = "http://www.w3.org/2000/svg";
  var currentScenario = "risk";
  var currentRegion = "pic";

  function svgNode(tag, attrs, text) {
    var el = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (key) { el.setAttribute(key, attrs[key]); });
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function drawCircuit(scenario) {
    var svg = document.getElementById("circuitViz");
    svg.innerHTML = "";
    var blocked = scenario === "rescue";
    var active = scenario !== "neutral";

    var defs = svgNode("defs", {});
    var marker = svgNode("marker", { id: "arrow", viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 6, markerHeight: 6, orient: "auto-start-reverse" });
    marker.appendChild(svgNode("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#75839d" }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    var path1 = svgNode("path", { d: "M142 156 C205 156 220 156 270 156", fill: "none", stroke: active ? "#16a3a3" : "#9eabba", "stroke-width": 4, "stroke-dasharray": active ? "8 7" : "0", "marker-end": "url(#arrow)", class: active ? "pulse" : "" });
    var path2 = svgNode("path", { d: "M355 156 C405 156 420 156 470 156", fill: "none", stroke: active ? "#6752b7" : "#9eabba", "stroke-width": 4, "stroke-dasharray": active ? "8 7" : "0", "marker-end": "url(#arrow)", class: active ? "pulse" : "" });
    var path3 = svgNode("path", { d: "M555 156 C598 156 615 156 650 156", fill: "none", stroke: blocked ? "#c9cfda" : (active ? "#df6a55" : "#9eabba"), "stroke-width": 4, "stroke-dasharray": active && !blocked ? "8 7" : "0", "marker-end": "url(#arrow)", class: active && !blocked ? "pulse" : "" });
    svg.appendChild(path1); svg.appendChild(path2); svg.appendChild(path3);

    var nodes = [
      { x: 78, y: 156, r: 47, fill: "#fff0ec", stroke: "#df6a55", title: "Heart", sub: "900 bpm pacing" },
      { x: 312, y: 156, r: 48, fill: "#e8f7f6", stroke: "#16a3a3", title: "NTS / LC", sub: "brainstem relays" },
      { x: 513, y: 156, r: 48, fill: blocked ? "#f1effb" : "#eeeafd", stroke: "#6752b7", title: "pIC", sub: blocked ? "optically inhibited" : "insula hub" },
      { x: 666, y: 156, r: 28, fill: scenario === "neutral" || blocked ? "#f1f3f7" : "#fff0ec", stroke: scenario === "neutral" || blocked ? "#a5afbf" : "#df6a55", title: "Behavior", sub: scenario === "neutral" ? "no avoidance" : (blocked ? "attenuated" : "risk-gated") }
    ];

    nodes.forEach(function (n, i) {
      svg.appendChild(svgNode("circle", { cx: n.x, cy: n.y, r: n.r, fill: n.fill, stroke: n.stroke, "stroke-width": i === 3 ? 2.2 : 2.8 }));
      if (i === 0) {
        svg.appendChild(svgNode("path", { d: "M58 151 C58 133 76 130 78 146 C81 130 100 133 99 152 C98 168 80 178 78 181 C74 176 58 169 58 151Z", fill: "#df6a55", opacity: .84 }));
      }
      if (i === 2 && blocked) {
        svg.appendChild(svgNode("line", { x1: 483, y1: 126, x2: 543, y2: 186, stroke: "#6752b7", "stroke-width": 6, "stroke-linecap": "round", opacity: .72 }));
      }
      svg.appendChild(svgNode("text", { x: n.x, y: i === 0 ? 218 : (i === 3 ? 209 : 224), "text-anchor": "middle", class: "circuit-label" }, n.title));
      svg.appendChild(svgNode("text", { x: n.x, y: i === 0 ? 234 : (i === 3 ? 225 : 241), "text-anchor": "middle", class: "circuit-sub" }, n.sub));
    });

    svg.appendChild(svgNode("text", { x: 78, y: 52, "text-anchor": "middle", class: "circuit-sub" }, "peripheral state"));
    svg.appendChild(svgNode("text", { x: 414, y: 52, "text-anchor": "middle", class: "circuit-sub" }, "ascending interoceptive pathway"));
    svg.appendChild(svgNode("text", { x: 622, y: 52, "text-anchor": "middle", class: "circuit-sub" }, "contextual output"));
  }

  function renderScenario(scenario) {
    currentScenario = scenario;
    document.querySelectorAll("[data-scenario]").forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-scenario") === scenario);
    });
    drawCircuit(scenario);

    var copy = {
      neutral: "In a neutral place-preference setting, pacing did not produce detectable place avoidance or reduced velocity. The peripheral perturbation was therefore not sufficient, by itself, to create a broad aversive or motor effect.",
      risk: "When the environment contained exposed space or shock risk, the same pacing protocol reduced open exploration and reward seeking. The pattern supports a context gate: cardiac state biased behavior when central risk information was present.",
      rescue: "During 10% shock trials, posterior-insula inhibition attenuated apprehensive behavior: all 6 inhibited mice completed the 50-press session, compared with 1 of 6 YFP controls."
    };
    document.getElementById("scenarioReadout").innerHTML = "<strong>Interpretation.</strong> " + copy[scenario];

    var list = document.getElementById("evidenceList");
    list.innerHTML = "";
    D.behavior.filter(function (d) { return d.context === scenario; }).forEach(function (d) {
      var card = document.createElement("div");
      card.className = "evidence-card " + (scenario === "neutral" ? "neutral" : "");
      card.innerHTML = '<div class="assay">' + d.assay + '</div><div class="effect"><strong>' + d.direction + '</strong><br>' + d.readout + '<br>' + d.sample + '</div><span class="pval">' + d.pLabel + '</span>';
      card.title = d.note;
      list.appendChild(card);
    });
  }

  function colorFor(region) {
    if (region.id === "pic" || region.id === "nts" || region.id === "lc") return "#6752b7";
    return region.significant ? "#df6a55" : "#c7cfdd";
  }

  function drawBrain() {
    var svg = document.getElementById("brainViz");
    svg.innerHTML = "";
    svg.appendChild(svgNode("path", { d: "M120 214 C110 123 193 56 328 51 C454 47 566 91 578 159 C586 207 555 224 534 239 C508 258 507 307 457 324 C377 351 240 328 164 282 C137 266 124 243 120 214Z", fill: "#f2f5fa", stroke: "#aab5c8", "stroke-width": 2.2 }));
    svg.appendChild(svgNode("path", { d: "M510 151 C582 137 620 174 605 217 C593 252 552 244 526 228", fill: "#eef1f7", stroke: "#aab5c8", "stroke-width": 2 }));
    svg.appendChild(svgNode("path", { d: "M479 262 C515 285 541 315 531 344", fill: "none", stroke: "#aab5c8", "stroke-width": 18, "stroke-linecap": "round" }));

    D.regions.forEach(function (r) {
      var radius = r.id === "pic" || r.id === "nts" || r.id === "lc" ? 10 : 8;
      var group = svgNode("g", { class: "brain-node" + (r.id === currentRegion ? " selected" : ""), "data-id": r.id, tabindex: 0, role: "button", "aria-label": r.name + ", " + r.pLabel });
      group.appendChild(svgNode("circle", { cx: r.x, cy: r.y, r: radius, fill: colorFor(r), stroke: r.significant ? "#fff" : "#77849b", "stroke-width": r.significant ? 2 : 1.5 }));
      group.appendChild(svgNode("text", { x: r.x + 12, y: r.y + 4, "font-size": 10.5, "font-family": "ui-sans-serif,system-ui,sans-serif", fill: "#34415a", "font-weight": r.significant ? 720 : 560 }, r.acronym));
      group.addEventListener("click", function () { inspectRegion(r.id); });
      group.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") inspectRegion(r.id); });
      svg.appendChild(group);
    });

    svg.appendChild(svgNode("text", { x: 130, y: 365, class: "circuit-sub" }, "anterior"));
    svg.appendChild(svgNode("text", { x: 525, y: 365, class: "circuit-sub" }, "posterior"));
  }

  function findRegion(raw) {
    var q = String(raw || "").trim().toLowerCase();
    return D.regions.find(function (r) { return r.id === q || r.name.toLowerCase() === q || r.acronym.toLowerCase() === q; });
  }

  function inspectRegion(idOrName) {
    var region = findRegion(idOrName);
    if (!region) {
      document.getElementById("regionReadout").innerHTML = "<strong>Region not found.</strong> Try pIC, NTS, LC, VISC, ILA, AUD, VIS, VERM, or CBN.";
      return;
    }
    currentRegion = region.id;
    document.getElementById("regionSearch").value = region.name;
    drawBrain();
    var interpretation;
    if (region.id === "pic") interpretation = "Targeted Fos labeling and electrophysiology support posterior insula as a cortical hub: 391 paced-cohort and 228 control units contributed to the population analysis, with P = 0.026 during pacing and P = 0.357 after pacing.";
    else if (region.id === "nts") interpretation = "NTS is a primary visceral sensory relay. The targeted Fos assay showed one of the strongest reported pacing-associated signals.";
    else if (region.id === "lc") interpretation = "LC links interoceptive input with arousal and stress; targeted Fos mRNA increased after cardiac pacing.";
    else if (region.significant) interpretation = "This region was included among pacing-responsive central-autonomic areas in the paper's brain-wide screen.";
    else interpretation = "This region served as a specificity control and was not significant in the brain-wide screen.";

    document.getElementById("regionReadout").innerHTML = "<strong>" + region.name + " (" + region.acronym + ").</strong> " + region.assay + "; " + region.n + "; " + region.pLabel + ". " + interpretation;
  }

  document.querySelectorAll("[data-scenario]").forEach(function (button) {
    button.addEventListener("click", function () { renderScenario(button.getAttribute("data-scenario")); });
  });

  var datalist = document.getElementById("regionList");
  D.regions.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (r) {
    var option = document.createElement("option");
    option.value = r.name;
    option.label = r.acronym;
    datalist.appendChild(option);
  });

  document.getElementById("inspectRegion").addEventListener("click", function () { inspectRegion(document.getElementById("regionSearch").value); });
  document.getElementById("regionSearch").addEventListener("keydown", function (e) { if (e.key === "Enter") inspectRegion(e.target.value); });
  document.getElementById("regionSearch").addEventListener("change", function (e) { inspectRegion(e.target.value); });

  renderScenario(currentScenario);
  inspectRegion(currentRegion);
})();
