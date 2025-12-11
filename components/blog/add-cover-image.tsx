"use client";
import { useEdgeStore } from "@/lib/edgestore";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AddCoverImageProps {
  setCoverImageUrl: (url: string) => void;
  replaceUrl?: string;
}

const AddCoverImage = ({
  setCoverImageUrl,
  replaceUrl,
}: AddCoverImageProps) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<Boolean>(false);
  const { edgestore } = useEdgeStore();

  const handleClick = async () => {
    imgRef.current?.click();
  };

  useEffect(() => {
    let isMounted = true;

    const uploadImage = async () => {
      if (!file) return;
      setUploading(true);

      try {
        const res = await edgestore.publicFiles.upload({
          file,
          options: replaceUrl ? { replaceTargetUrl: replaceUrl } : undefined,
        });

        if (isMounted) {
          setCoverImageUrl(res.url);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setUploading(false);
        }
      }
    };

    uploadImage();

    return () => {
      isMounted = false;
    };
  }, [file, edgestore, replaceUrl, setCoverImageUrl]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        ref={imgRef}
        className="hidden"
      />
      <button
        className="flex items-center gap-2"
        type="button"
        onClick={() => handleClick()}
      >
        <ImageIcon size={20} />
        <span>{!!replaceUrl ? "Change Cover" : "Add Cover"}</span>
      </button>
      {uploading && <p className="text-green-500">Uploading...</p>}
    </div>
  );
};

export default AddCoverImage;
