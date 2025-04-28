import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="space-y-4">
        <div>
          <span className="font-semibold">Username:</span> {user.username}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {user.role}
        </div>
      </div>

      {/* You can add Edit Profile button here */}
    </div>
  );
};

export default UserProfile;
