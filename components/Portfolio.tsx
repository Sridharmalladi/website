import Space from "@/components/world/Space";
import Sky from "@/components/world/Sky";
import Surface from "@/components/world/Surface";
import Underground from "@/components/world/Underground";
import Cables from "@/components/world/Cables";
import Fossils from "@/components/world/Fossils";
import Core from "@/components/world/Core";
import DepthGauge from "@/components/DepthGauge";

/** One descent: space -> sky -> surface -> subway -> power grid -> fossils -> core. */
export default function Portfolio() {
  return (
    <div className="relative z-10">
      <DepthGauge />
      <Space />
      <Sky />
      <Surface />
      <Underground />
      <Cables />
      <Fossils />
      <Core />
    </div>
  );
}
