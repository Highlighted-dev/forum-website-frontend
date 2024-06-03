"use client";
import { useEditor } from "@tiptap/react";
import "../../styles/editor.css";
import { toast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FaChevronLeft } from "react-icons/fa";
import { editorExtensions, editorProps } from "./editorConfig";
import EditorBase, { IFormData } from "./EditorBase";
import { Button } from "../ui/button";
import Link from "next/link";
import { Session } from "next-auth";
import { createDiscussion } from "./DiscussionSubmitAction";

export function DiscussionEditor({
  title,
  content,
  session,
}: {
  title: string;
  content: string;
  session: Session | null;
}) {
  const { register } = useForm<IFormData>();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const editor = useEditor({
    editorProps: editorProps,
    extensions: editorExtensions,
    content: content || "",
  });

  if (!editor) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <form
      action={async (formData) => {
        setIsSaving(true);
        const content = editor.getHTML();
        if (!content || !formData.get("title"))
          return toast({
            title: "Error",
            description: "Title and content are required",
          });
        await createDiscussion(
          formData.get("title") as string,
          content,
          session
        );
        setIsSaving(false);
        toast({
          title: "Post saved",
          description: "Your post has been saved",
        });
      }}
    >
      <div className="grid w-full">
        <EditorBase editor={editor} title={title} register={register} />
        <div className="flex w-full items-center justify-between relative">
          <div className="flex items-center space-x-10">
            <Button variant={"ghost"}>
              <Link href="/">
                <div className="flex items-center">
                  <FaChevronLeft className="mr-2 h-4 w-4" />
                  Go Back
                </div>
              </Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Check{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs">
              <Link href={"https://tiptap.dev/docs/editor/introduction"}>
                TipTap docs
              </Link>
            </kbd>{" "}
            for useful hotkeys
          </p>
          <Button type="submit">
            {isSaving && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Create</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
