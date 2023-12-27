'use-client';

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Url } from "next/dist/shared/lib/router/router";
import { error } from "console";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

// export const FileUpload = ({
//     onChange,
//     endpoint
// }: FileUploadProps) => {
//     return(
//         <UploadDropzone 
//         endpoint={endpoint}
//         onClientUploadComplete={(res) =>{
//             onChange(res?.[0].url);
//         }}
//         onUploadError={(error: Error) => {
//             toast.error(`${error.message}`);
//         }}
//         />
//     )
// }

export const FileUpload = ({
    onChange,
    endpoint
}: FileUploadProps) => {
    const handleUploadComplete = async (res: { url: string }[]) => {
        try {
            // Ensure that the first element of the array exists and has a 'url' property
            const imageUrl = res?.[0]?.url;

            if (imageUrl) {
                onChange(imageUrl);
            } else {
                // Handle the case where the 'url' property is missing
                toast.error("Upload response is missing the 'url' property");
            }
        } catch (error) {
            // Handle other errors during upload
            toast.error(`Error handling upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
                toast.error(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }}
        />
    );
};