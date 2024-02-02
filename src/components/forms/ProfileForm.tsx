import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { UserValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useUpdateUser } from "@/lib/react-query/queriesAndMutations";

type ProfileFormProps = {
  user?: Models.Document;
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  const { mutateAsync: updateUser, isPending: isUserUpdating } =
    useUpdateUser();

  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      file: [],
      name: user?.name,
      username: user?.username,
      email: user?.email,
      bio: user?.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const updatedUser = await updateUser({
      ...values,
      userId: user?.$id || "",
      imageId: user?.imageId,
      imageUrl: user?.imageUrl,
    });

    if (!updatedUser) {
      return toast({ title: "Please try again!" });
    }

    return navigate(`/profile/${user?.$id}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9  w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhotoUploader
                  fieldChange={field.onChange}
                  mediaUrl={user?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isUserUpdating}
          >
            {isUserUpdating ? "Loading..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ProfileForm;

function PhotoUploader({
  fieldChange,
  mediaUrl,
}: {
  fieldChange: (FILE: File[]) => void;
  mediaUrl: string;
}) {
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex items-center gap-4">
        <img
          src={fileUrl}
          alt="profile-photo"
          className="rounded-full h-[100px] w-[100px] object-cover"
        />
        <Button type="button" className="text-primary-500">
          Change Profile Photo
        </Button>
      </div>
    </div>
  );
}
