import React, { useState } from 'react';

const useImageUpload = () => {
  const [fileBase, setFileBase] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFileBase(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setFileBase(null);
    }
  };

  return { fileBase, handleImageChange };
};

export default useImageUpload;
