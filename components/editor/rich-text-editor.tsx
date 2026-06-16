"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { createEditorExtensions } from "@/components/editor/extensions";
import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
};

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: createEditorExtensions(placeholder),
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[320px] px-4 py-3 focus:outline-none dark:prose-invert [&_table]:w-full [&_td]:border [&_th]:border [&_td]:p-2 [&_th]:p-2 [&_img]:max-w-full [&_img]:rounded-md",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHtml = editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-input bg-background",
        className
      )}
    >
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
