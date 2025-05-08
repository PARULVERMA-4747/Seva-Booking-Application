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
};

export const lookupPincode = async (pincode: string): Promise<AddressLookupResult | null> => {
  return pincodeDB[pincode] || null;
};
