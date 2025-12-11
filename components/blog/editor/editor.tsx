import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

import "./editor.css";

interface EditorProps {
  initialContent?: string;
  onChange?: (value: string) => void;
  editable?: boolean;
}

export default function Editor({
  onChange,
  initialContent,
  editable,
}: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleImageUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleImageUpload,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={
        onChange
          ? () => {
              onChange(JSON.stringify(editor.document));
            }
          : () => {}
      }
      editable={editable}
    />
  );
}
