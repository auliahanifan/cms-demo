"use client";

import { useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Table,
  Underline,
  Undo2,
  Upload,
  MonitorPlay,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="icon-xs"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
    >
      {children}
    </Button>
  );
}

type DialogType = "link" | "image" | "youtube" | null;

export function EditorToolbar({ editor }: { editor: Editor | null }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialog, setDialog] = useState<DialogType>(null);
  const [urlValue, setUrlValue] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!editor) return null;

  const openDialog = (type: DialogType) => {
    setUploadError(null);
    if (type === "link") {
      setUrlValue(editor.getAttributes("link").href ?? "");
    } else {
      setUrlValue("");
    }
    setDialog(type);
  };

  const applyLink = () => {
    const url = urlValue.trim();
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setDialog(null);
  };

  const applyImageUrl = () => {
    const url = urlValue.trim();
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setDialog(null);
  };

  const applyYoutube = () => {
    const url = urlValue.trim();
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
    setDialog(null);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Gagal mengunggah gambar");
      }

      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Gagal mengunggah gambar"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-0.5 rounded-t-lg border border-b-0 bg-muted/40 p-1">
        <ToolbarButton
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 />
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </ToolbarButton>
        <ToolbarButton
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline />
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </ToolbarButton>
        <ToolbarButton
          title="Inline code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </ToolbarButton>
        <ToolbarButton
          title="Ordered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </ToolbarButton>
        <ToolbarButton
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote />
        </ToolbarButton>
        <ToolbarButton
          title="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          title="Align left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft />
        </ToolbarButton>
        <ToolbarButton
          title="Align center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter />
        </ToolbarButton>
        <ToolbarButton
          title="Align right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight />
        </ToolbarButton>
        <ToolbarButton
          title="Justify"
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <AlignJustify />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          title="Link"
          active={editor.isActive("link")}
          onClick={() => openDialog("link")}
        >
          <Link2 />
        </ToolbarButton>
        <ToolbarButton title="Gambar dari URL" onClick={() => openDialog("image")}>
          <ImageIcon />
        </ToolbarButton>
        <ToolbarButton
          title="Upload gambar"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload />
        </ToolbarButton>
        <ToolbarButton title="YouTube embed" onClick={() => openDialog("youtube")}>
          <MonitorPlay />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          title="Insert table"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <Table />
        </ToolbarButton>
        {editor.isActive("table") && (
          <>
            <ToolbarButton
              title="Add column"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              <span className="text-xs font-medium">Col+</span>
            </ToolbarButton>
            <ToolbarButton
              title="Add row"
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <span className="text-xs font-medium">Row+</span>
            </ToolbarButton>
            <ToolbarButton
              title="Delete table"
              onClick={() => editor.chain().focus().deleteTable().run()}
            >
              <span className="text-xs font-medium">Del</span>
            </ToolbarButton>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleUpload(file);
          event.target.value = "";
        }}
      />

      {uploadError && (
        <p className="px-1 pt-2 text-sm text-destructive">{uploadError}</p>
      )}

      <Dialog open={dialog === "link"} onOpenChange={(open) => !open && setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sisipkan link</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              value={urlValue}
              onChange={(event) => setUrlValue(event.target.value)}
              placeholder="https://..."
            />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Batal
            </DialogClose>
            <Button onClick={applyLink}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialog === "image"} onOpenChange={(open) => !open && setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sisipkan gambar dari URL</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="image-url">URL gambar</Label>
            <Input
              id="image-url"
              value={urlValue}
              onChange={(event) => setUrlValue(event.target.value)}
              placeholder="https://..."
            />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Batal
            </DialogClose>
            <Button onClick={applyImageUrl}>Sisipkan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialog === "youtube"}
        onOpenChange={(open) => !open && setDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sisipkan video YouTube</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="youtube-url">URL YouTube</Label>
            <Input
              id="youtube-url"
              value={urlValue}
              onChange={(event) => setUrlValue(event.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Batal
            </DialogClose>
            <Button onClick={applyYoutube}>Sisipkan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
