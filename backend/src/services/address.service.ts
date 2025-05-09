type AddressLookupResult = {
  city: string;
  state: string;
};

// Mock database or API response
const pincodeDB: Record<string, AddressLookupResult> = {
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '560001': { city: 'Bangalore', state: 'Karnataka' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat' },
  '682001': { city: 'Kochi', state: 'Kerala' },
  '302001': { city: 'Jaipur', state: 'Rajasthan' },
  '144001': { city: 'Jalandhar', state: 'Punjab' },
  '800001': { city: 'Patna', state: 'Bihar' },
  '462001': { city: 'Bhopal', state: 'Madhya Pradesh' },
  '751001': { city: 'Bhubaneswar', state: 'Odisha' },
  '570001': { city: 'Mysore', state: 'Karnataka' },
  '395001': { city: 'Surat', state: 'Gujarat' },
};

export const lookupPincode = async (pincode: string): Promise<AddressLookupResult | null> => {
  return pincodeDB[pincode] || null;
};
