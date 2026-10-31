export interface UserProfile {
  name: string;
  email: string;
  role: 'giver' | 'taker';
  roleType?: 'restaurant' | 'ngo' | 'volunteer' | 'admin';
  org: string;
  subtype: string;
  fssaiLic: string;
  phone?: string;
  city?: string;
  joinedDate?: string;
}

export const DEMO_DONOR_USER: UserProfile = {
  name: 'Chef Michael (The Green Table)',
  email: 'restaurant@palmbeachharvest.com',
  role: 'giver',
  roleType: 'restaurant',
  org: 'The Green Table Restaurant',
  subtype: 'Restaurant Partner',
  fssaiLic: 'FL-FBO-2024-8891',
  phone: '+1 (561) 555-0192',
  city: 'Palm Beach, FL',
  joinedDate: 'Verified Donor Partner since 2024',
};

export const DEMO_RECEIVER_USER: UserProfile = {
  name: 'Priya Sharma (NGO Coordinator)',
  email: 'hope.foundation@palmbeachharvest.com',
  role: 'taker',
  roleType: 'ngo',
  org: 'Hope Foundation',
  subtype: 'Verified NGO',
  fssaiLic: 'FL-NGO-2023-4102',
  phone: '+1 (561) 555-0144',
  city: 'Palm Beach, FL',
  joinedDate: 'Verified Charity Partner since 2023',
};

export const DEMO_VOLUNTEER_USER: UserProfile = {
  name: 'Rahul Sharma',
  email: 'volunteer@palmbeachharvest.com',
  role: 'taker',
  roleType: 'volunteer',
  org: 'Palm Beach Harvest Volunteer Fleet',
  subtype: 'Verified Volunteer',
  fssaiLic: 'VOL-PB-2024-099',
  phone: '+1 (561) 555-0188',
  city: 'Palm Beach County, FL',
  joinedDate: 'Active Volunteer since 2024',
};
