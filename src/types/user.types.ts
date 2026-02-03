export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserResponseDTO {
  _id: string;
  name: string;
  email: string;
}

export const toUserResponse = (user: any): UserResponseDTO => ({
  _id: user._id.toString(),
  name: user.name,
  email: user.email,
});