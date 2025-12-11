"use client";

import Image from "next/image";
import AddCoverImage from "./add-cover-image";
import { X } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  coverImageUrl: string;
  setCoverImageUrl: (url: string | undefined) => void;
  isEditor?: boolean;
}

const CoverImage = ({
  coverImageUrl,
  setCoverImageUrl,
  isEditor,
}: CoverImageProps) => {
  const { edgestore } = useEdgeStore();

  const handleRemove = async (url: string) => {
    try {
      await edgestore.publicFiles.delete({ url });
      setCoverImageUrl(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full h-[35vh] group">
      <Image
        src={coverImageUrl}
        fill
        alt="Cover Image"
        className="object-cover"
      />
      {isEditor && (
        <div className="absolute top-8 right-5 opacity-0 group-hover:opacity-100 flex items-center gap-x-2">
          <AddCoverImage
            setCoverImageUrl={setCoverImageUrl}
            replaceUrl={coverImageUrl}
          />
          <button
            className="flex gap-2 items-center ml-4"
            type="button"
            onClick={() => {
              handleRemove(coverImageUrl);
            }}
          >
            <X size={20} />
            <span>Remove</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverImage;
