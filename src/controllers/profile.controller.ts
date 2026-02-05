import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";
import { BusinessProfile } from "../models/BusinessProfile";
import {
  BusinessProfileResponseDTO,
  CreateProfileRequest,
  UpdateProfileRequest,
} from "../types/profile.types";

/**
 * Create business profile (only one allowed)
 */
export const createProfile = async ({ body, set }: any) => {
  try {
    const dto = body as CreateProfileRequest;
    // check if profile already exists
    const existing = await BusinessProfile.findOne();
    if (existing) {
      set.status = 400;
      return { message: "Business profile already exists" };
    }

    const profile = await BusinessProfile.create(dto);
    return mapProfile(profile);
  } catch (error) {}
};

/**
 * Get business profile
 */
export const getProfile = async ({ set }: any) => {
  const profile = await BusinessProfile.findOne();

  if (!profile) {
    set.status = 404;
    return { message: "Business profile not found" };
  }

  return mapProfile(profile);
};

/**
 * Update business profile
 */
export const updateProfile = async ({ body, set }: any) => {
  try {
    const dto = body as UpdateProfileRequest;

    const profile = await BusinessProfile.findOneAndUpdate({}, dto, {
      new: true,
    });

    if (!profile) {
      set.status = 404;
      return { message: "Business profile not found" };
    }

    return mapProfile(profile);
  } catch (err: any) {
    set.status = 400;
    return { message: err.message };
  }
};

export const updateLogo = async ({ body, set }: any) => {
  try {
    const file = body.logo;

    if (!file) {
      set.status = 400;
      return { message: "Logo file is required" };
    }

    // Check if it's a File object
    if (!file.arrayBuffer) {
      set.status = 400;
      return { message: "Invalid file format" };
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary - each image gets unique ID
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "business-logos",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(stream);
    });

    return {
      message: "Image upload successful",
      url: uploadResult.secure_url
    };
  } catch (err: any) {
    // console.error("Upload error:", err);
    set.status = 500;
    return { message: err.message };
  }
};



/*
 * Response mapper
 */

const mapProfile = (profile: any): BusinessProfileResponseDTO => ({
  id: profile._id.toString(),

  businessName: profile.businessName,
  registrationNumber: profile.registrationNumber,
  address: profile.address,

  contactNumbers: profile.contactNumbers,
  emailAddresses: profile.emailAddresses, // ✅ NEW

  logo: profile.logo,

  createdAt: profile.createdAt.toISOString(),
  updatedAt: profile.updatedAt.toISOString(),
});
