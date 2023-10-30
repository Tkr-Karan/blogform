


// Images Blocks

import { axiosInstance } from "."

export const ImagesBlocks = async(payload) => {
    try{
        const response = await axiosInstance.post("/api/image/add-images-block", payload);
        return response.data;
    }catch(error){
        return error
    }
}