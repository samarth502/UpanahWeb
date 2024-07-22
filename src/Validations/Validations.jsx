

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required.";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };
  
  export const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };
  
  export const validateName = (name) => {
    if (!name) {
      return "Name is required.";
    }
    return null;
  };
  
  export const validateUserType = (userType) => {
    if (!userType) {
      return "Please select whether you are a customer or vendor.";
    }
    return null;
  };
  
  export const validateVendorFields = (data) => {
    const errors = {};
  
    if (!data.firstName) {
      errors.firstName = "First Name is required.";
    }
    if (!data.lastName) {
      errors.lastName = "Last Name is required.";
    }
    if (!data.vendorName) {
      errors.vendorName = "Vendor Name is required.";
    }
    if (!data.gstNumber) {
      errors.gstNumber = "GST Number is required.";
    }
    if (!data.address) {
      errors.address = "Address is required.";
    }
  
    return errors;
  };
  