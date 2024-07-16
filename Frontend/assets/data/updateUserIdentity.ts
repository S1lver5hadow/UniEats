import { BACKEND_URL } from "@/src/constants/Backend";
import { ImagePickerAsset } from "expo-image-picker"; 
import { Platform } from "react-native";

interface EditUserIdentityAsyncProps {
  username: string;
  newName?: string;
  image?: ImagePickerAsset;
}

export function EditUserIdentityAsync({username, newName, image}: EditUserIdentityAsyncProps) {
  const editOrderStatus = async () => {
    const endpoint = `${BACKEND_URL}/users/${username}`;
    const data = new FormData();

    if (image) {
      const ext = image.uri.split(".").pop()
      data.append('identification', {
        name: (image.fileName || username) + (Platform.OS == 'ios' ? `.${ext}` : ""),
        type: "image/" + (Platform.OS == 'ios' ? ext : image.type),
        uri: image.uri
       } as any);
    }

    if (newName) {
      data.append("legalName", newName);
    }

    try {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        body: data
      });
      const json = await response.json();
      console.log("Response from server:", json);
      return json;
    } catch (err) {
      console.error(err);
    }
  }

  return editOrderStatus();
}

