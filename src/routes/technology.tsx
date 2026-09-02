import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionTitle } from "@/components/Reveal";
import pretargeting from "@/assets/Pretargeting_in_action.png.asset.json";
import tetrazine from "@/assets/Tetrazine_Ligation_click_chemistry.png.asset.json";
import bbb from "@/assets/BBB_crossing_PreTT.png.asset.json";
import decay from "@/assets/211At_decay_chain.png.asset.json";
import mouseDirect from "@/assets/Mouse_directly_labelled.png.asset.json";
import mousePretarget from "@/assets/Mouse_pretargeting.png.asset.json";
import stratification from "@/assets/Patient_Stratification.png.asset.json";
import {
  AT211_POINTS,
  CLICK_CHEMISTRY_POINTS,
  COMPARISON_BENEFITS,
  PATENTS,
  STEPS,
} from "@/lib/content";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — PreTT ApS Pretargeting Platform" },
      {
        name: "description",
        content:
          "PreTT's pretargeting platform uses tetrazine ligation click chemistry (IEDDA) and proprietary At-211 chemistry to deliver alpha radioligand therapy across the blood-brain barrier.",
      },
      { property: "og:title", content: "Technology — PreTT ApS Pretargeting Platform" },
      {
        property: "og:description",
        content:
          "Target, click, treat: decoupled kinetics combining high affinity with rapid clearance — the only pretargeting platform capable of crossing the BBB.",
      },
    ],
  }),
  component: Technology;
});

function Technology() {
  return null;
}
