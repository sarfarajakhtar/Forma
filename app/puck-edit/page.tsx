"use client";

import { useState } from "react";
import { Puck, type Data } from "@puckeditor/core";
import { puckConfig } from "../../lib/puck/registry";
import { PageBlueprintSchema } from "../../lib/puck/blueprint";
import { sampleBlueprint } from "../../lib/puck/sample";

/**
 * Isolated, non-persistent editor experiment.
 * Changes exist only in the current browser session.
 * "Publish" validates locally; it never publishes a live website.
 */
export default function PuckEditorTest() {
  const [validation, setValidation] = useState<string | null>(null);

  const onPublish = async (data: Data) => {
    const parsed = PageBlueprintSchema.safeParse(data);
    if (!parsed.success) {
      setValidation("Validation failed: " + parsed.error.issues.map((issue) => issue.path.join(".") + ": " + issue.message).join("; "));
      return;
    }
    setValidation("Validated locally. No data was saved or published. This is only a test editor.");
  };

  return (
    <div className="min-h-screen">
      <div role="status" className="border-b border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-950">
        <strong>Forma visual-editor experiment.</strong> Edit text, images and section order. Changes are temporary. The Puck Publish button only validates the JSON locally; it does not save or publish.
        {validation && <p className="mt-2 font-semibold" aria-live="polite">{validation}</p>}
      </div>
      <Puck config={puckConfig} data={sampleBlueprint as Data} onPublish={onPublish} />
    </div>
  );
}
