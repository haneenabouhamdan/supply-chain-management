import React, { useRef, useState } from 'react';
import { Avatar, Box, Spinner, useToast } from '@chakra-ui/react';
import { uploadFile } from '../../resolvers/upload';

interface AvatarUploaderProps {
  onUploadComplete?: (fileUrl: string) => void;
  size?: string;
  imgUrl?: string;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  onUploadComplete,
  size,
  imgUrl,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setIsUploading(true);
      const filePath = await uploadFile(file);
      setAvatarUrl(filePath);
      if (onUploadComplete) onUploadComplete(filePath);
      toast({
        title: 'Upload successful',
        description: 'Avatar has been uploaded successfully',
        status: 'success',
        position: 'top-right',
      });
    } catch (err: any) {
      toast({
        title: 'Upload failed',
        description: err.message,
        status: 'error',
        position: 'top-right',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box position="relative">
      <Avatar
        size={size ?? 'xl'}
        src={avatarUrl || imgUrl}
        cursor="pointer"
        onClick={handleClick}
      />
      {isUploading && (
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(255, 255, 255, 0.6)"
          borderRadius="50%"
        >
          <Spinner size="lg" />
        </Box>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </Box>
  );
};
