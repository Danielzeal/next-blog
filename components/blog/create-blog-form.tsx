"use client";

import { BlogSchema, BlogSchemaType } from "@/schemas/blog-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import FormField from "../common/form-field";
import AddCoverImage from "./add-cover-image";
import { useState } from "react";
import CoverImage from "./cover-image";
import { tags } from "@/lib/tags";
import Editor from "./editor/editor";

const CreateBlogForm = () => {
  const session = useSession();

  const userId = session?.data?.user.userId;
  const [coverImageUrl, setCoverImageUrl] = useState<string>();
  const [content, setContent] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      isPublished: false,
      userId,
    },
  });

  const onChange = (content: string) => {
    setContent(content);
  };

  const values = watch("tags");
  console.log(values);
  return (
    <form className="flex flex-col justify-between max-w-[1200px] m-auto min-h-[85vh]">
      <div>
        {coverImageUrl && (
          <CoverImage
            setCoverImageUrl={setCoverImageUrl}
            coverImageUrl={coverImageUrl}
            isEditor
          />
        )}
        {!coverImageUrl && (
          <AddCoverImage setCoverImageUrl={setCoverImageUrl} />
        )}

        <FormField
          id="title"
          register={register}
          errors={errors}
          placeholder="Blog Title"
          disable={false}
          inputClassName="border-none text-5xl font-bold background-transparent px-0"
        />

        <fieldset className="flex flex-col border-y mb-4 py-2">
          <legend className="mb-2 pr-2">Select 4 Tags</legend>
          <div className="flex gap-4 flex-wrap w-full">
            {tags.map((tag: string, ind: number) => {
              const isChecked = values.includes(tag);
              if (tag === "All") return null;
              return (
                <label key={tag + ind} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={tag}
                    {...register("tags")}
                    disabled={!isChecked && values.length === 4 ? true : false}
                  />
                  <span>{tag}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <Editor onChange={onChange} />
      </div>
    </form>
  );
};

export default CreateBlogForm;
