
export class UpdateDto {
  uid: string;  // Add the uid to identify the user
  email?: string;  // Optional email for updating
  firstName?: string;  // Optional firstName for updating
  lastName?: string;  // Optional lastName for updating
  password?: string;  // Optional password for updating
}
