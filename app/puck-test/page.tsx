"use client";

import { Render } from "@puckeditor/core";
import { puckConfig } from "../../lib/puck/registry";
import { sampleBlueprint } from "../../lib/puck/sample";

export default function PuckTestPage() {
  return (
    <div className="w-full min-h-screen">
      <Render config={puckConfig} data={sampleBlueprint} />
    </div>
  );
}
