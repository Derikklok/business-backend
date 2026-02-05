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
