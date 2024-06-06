"use client";
import { useEditor } from "@tiptap/react";
import "../../styles/editor.css";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FaChevronLeft } from "react-icons/fa";
import { editorExtensions, editorProps } from "./editorConfig";
import EditorBase, { IFormData } from "./EditorBase";
import { Button } from "../ui/button";
import Link from "next/link";
import { Session } from "next-auth";
import { createPost } from "./PostSubmitAction";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export function ReplyEditor({
  session,
  _id,
}: {
  session: Session | null;
  _id: string;
}) {
  const { handleSubmit } = useForm();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();

  const editor = useEditor({
    editorProps: editorProps,
    extensions: editorExtensions,
    content: "",
  });

  if (!editor) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  const onSubmit = async () => {
    const content = editor.getHTML();
    if (!content || !_id)
      return toast({
        title: "Error",
        description: "Content and _id are required",
      });
    try {
      setIsSaving(true);
      await createPost(content, session, "/externalApi/discussion", _id);
    } catch (error) {
      console.error("Failed to create post", error);
    } finally {
      setIsSaving(false);
      toast({
        title: "Post created",
        description: "Your post has been created. It will appear soon...",
      });
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
      <div className="grid w-full">
        <EditorBase editor={editor} editorClassName="w-full" />
        <div className="flex w-full items-center justify-between relative">
          <div className="flex items-center space-x-10">
            <Button variant={"ghost"}>
              <Link href="/discussions">
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
          <Button type="submit" disabled={isSaving}>
            {isSaving && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Reply</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
