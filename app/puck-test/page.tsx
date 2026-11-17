import { Render } from "@puckeditor/core";
import type { Data } from "@puckeditor/core";
import { puckConfig } from "../../lib/puck/registry";
import { parsePuckBlueprint } from "../../lib/puck/blueprint";
import { sampleBlueprint } from "../../lib/puck/sample";

export const metadata = { title: "Forma Puck Integration Test" };

export default function PuckTestPage() {
  const validated = parsePuckBlueprint(sampleBlueprint);
  return <main><Render config={puckConfig} data={validated as Data} /></main>;
}
