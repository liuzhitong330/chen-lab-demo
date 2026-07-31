(function () {
  "use strict";

  window.CHEN_DATA = {
    behavior: [
      {
        id: "rtpp",
        assay: "Real-time place preference",
        context: "neutral",
        readout: "Time on paced side",
        p: 0.67,
        pLabel: "P = 0.67",
        sample: "16 control + 16 ChRmine mice",
        direction: "No detectable avoidance",
        note: "At 900 bpm, cardiac pacing was not intrinsically aversive in the stimulation chamber."
      },
      {
        id: "velocity",
        assay: "Real-time place preference",
        context: "neutral",
        readout: "Velocity on paced side",
        p: 0.81,
        pLabel: "P = 0.81",
        sample: "16 control + 16 ChRmine mice",
        direction: "No locomotor difference",
        note: "The pacing manipulation did not measurably impair movement in this assay."
      },
      {
        id: "epm",
        assay: "Elevated plus maze",
        context: "risk",
        readout: "Open-arm exploration",
        p: 0.0079,
        pLabel: "P = 0.0079",
        sample: "16 control + 16 ChRmine mice",
        direction: "Reduced during pacing",
        note: "Paced mice explored the exposed open arms less during the ON epoch."
      },
      {
        id: "oft",
        assay: "Open-field test",
        context: "risk",
        readout: "Time in center",
        p: 0.018,
        pLabel: "P = 0.018",
        sample: "5 control + 9 ChRmine mice",
        direction: "Reduced during pacing",
        note: "Paced mice avoided the exposed center during the ON epoch."
      },
      {
        id: "vogel-rate",
        assay: "Vogel conflict task",
        context: "risk",
        readout: "Lever-pressing rate at 10% shock",
        p: 0.001,
        pLabel: "P = 0.0010",
        sample: "8 control + 8 ChRmine mice",
        direction: "Reduced during pacing",
        note: "The pacing effect emerged when reward seeking carried a small probability of shock."
      },
      {
        id: "vogel-latency",
        assay: "Vogel conflict task",
        context: "risk",
        readout: "Time to next press after shock",
        p: 0.0074,
        pLabel: "P = 0.0074",
        sample: "40, 40, 40 and 32 presses across conditions",
        direction: "Increased during pacing",
        note: "Paced mice showed greater post-shock apprehension."
      },
      {
        id: "pic-rescue",
        assay: "Vogel task + pIC inhibition",
        context: "rescue",
        readout: "Completion of 50-press session",
        p: 0.0152,
        pLabel: "P = 0.0152",
        sample: "6 YFP + 6 iC++ mice",
        direction: "6/6 completed with pIC inhibition; 1/6 controls",
        note: "Inhibiting posterior insula attenuated the pacing-linked apprehensive response."
      }
    ],

    regions: [
      { id: "aca", name: "Anterior cingulate", acronym: "ACA", system: "Prefrontal", p: 0.05, pLabel: "P = 0.050", significant: true, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 260, y: 98 },
      { id: "pl", name: "Prelimbic area", acronym: "PL", system: "Prefrontal", p: 0.027, pLabel: "P = 0.027", significant: true, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 290, y: 125 },
      { id: "ila", name: "Infralimbic area", acronym: "ILA", system: "Prefrontal", p: 0.0086, pLabel: "P = 0.0086", significant: true, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 300, y: 154 },
      { id: "gu", name: "Gustatory area", acronym: "GU", system: "Insular", p: 0.013, pLabel: "P = 0.013", significant: true, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 205, y: 168 },
      { id: "visc", name: "Visceral area", acronym: "VISC", system: "Insular", p: 0.018, pLabel: "P = 0.018", significant: true, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 185, y: 202 },
      { id: "ai", name: "Agranular insular area", acronym: "AI", system: "Insular", p: 0.016, pLabel: "P = 0.016", significant: true, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 210, y: 233 },
      { id: "pons", name: "Pons", acronym: "P", system: "Brainstem", p: 0.03, pLabel: "P = 0.030", significant: true, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 470, y: 232 },
      { id: "medulla", name: "Medulla", acronym: "MY", system: "Brainstem", p: 0.054, pLabel: "P = 0.054", significant: true, n: "9 + 9 mice", assay: "TRAP whole-brain screen; listed significant at FDR 10%", x: 508, y: 266 },
      { id: "aud", name: "Auditory cortex", acronym: "AUD", system: "Sensory control", p: 0.082, pLabel: "P = 0.082", significant: false, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 370, y: 102 },
      { id: "vis", name: "Visual cortex", acronym: "VIS", system: "Sensory control", p: 0.31, pLabel: "P = 0.31", significant: false, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 438, y: 130 },
      { id: "verm", name: "Cerebellar vermis", acronym: "VERM", system: "Cerebellar control", p: 0.5, pLabel: "P = 0.50", significant: false, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 500, y: 172 },
      { id: "cbn", name: "Cerebellar nuclei", acronym: "CBN", system: "Cerebellar control", p: 0.92, pLabel: "P = 0.92", significant: false, n: "9 + 9 mice", assay: "TRAP whole-brain screen", x: 532, y: 198 },
      { id: "pic", name: "Posterior insular cortex", acronym: "pIC", system: "Insular", p: 0.02, pLabel: "P = 0.020", significant: true, n: "4 + 4 mice", assay: "Fos mRNA in situ hybridization", x: 225, y: 202 },
      { id: "nts", name: "Nucleus tractus solitarius", acronym: "NTS", system: "Brainstem relay", p: 0.00029, pLabel: "P = 0.00029", significant: true, n: "4 + 4 mice", assay: "Fos mRNA in situ hybridization", x: 486, y: 287 },
      { id: "lc", name: "Locus coeruleus", acronym: "LC", system: "Brainstem relay", p: 0.0027, pLabel: "P = 0.0027", significant: true, n: "4 + 4 mice", assay: "Fos mRNA in situ hybridization", x: 452, y: 266 }
    ]
  };
})();
