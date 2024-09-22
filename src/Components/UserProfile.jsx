import React, { useState, useEffect } from 'react';
import { useProfile } from '../store/Auth';

const UserProfile = () => {
  const { user, loading, error } = useProfile();

  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.name);
      setAddress(user.addresses.join(', '));
      setPhone(user.phone);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !address || !phone || !password ) {
      alert('Please fill in all required fields.');
      return;
    }


    const formData = new FormData();
    formData.append('name', firstName);
    formData.append('addresses', address.split(',').map(addr => addr.trim()));
    formData.append('phone', phone);
    formData.append('password', password);
    if (profileImage) {
      formData.append('profilePic', profileImage);
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: firstName,
          addresses: address.split(',').map(addr => addr.trim()),
          phone: phone,
          password: password,
          profilePic: profileImage ? URL.createObjectURL(profileImage) : user.profilePic,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit data.');
      }

      alert('Profile updated successfully!');


      // Reset form fields
    setFirstName('');
    setAddress('');
    setPhone('');
    setPassword('');
    setProfileImage(null);

     


    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to update profile.');
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div>
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Profile
            </h1>
            <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className=" w-full  rounded-sm bg-[url('https://upanah.com/wp-content/uploads/2024/02/cropped-Upanah-Logo.png')] bg-cover bg-center bg-no-repeat items-center">
                  <label htmlFor="uploadProfileImage">
                    <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">
                      {profileImage ? (
                        <img
                          src={URL.createObjectURL(profileImage)}
                          alt="Profile"
                          className="w-[141px] h-[141px] rounded-full"
                        />
                      ) : (
                        <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                          <svg
                            className="w-6 h-5 text-blue-700"
                            fill="none"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </label>
                <input
                  type="file"
                  id="uploadProfileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </div>
              <h2 className="text-center mt-1 font-semibold dark:text-gray-300">Upload Profile and Cover Image</h2>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4">
                  <label htmlFor="firstName" className="mb-2 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="w-full mb-4">
                  <label htmlFor="email" className="mb-2 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Email"
                    value={user.email}
                    disabled
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4">
                  <label htmlFor="address" className="mb-2 dark:text-gray-300">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="w-full mb-4">
                  <label htmlFor="phone" className="mb-2 dark:text-gray-300">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4">
                  <label htmlFor="password" className="mb-2 dark:text-gray-300"> Change Password</label>
                  <input
                    type="password"
                    id="password"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
