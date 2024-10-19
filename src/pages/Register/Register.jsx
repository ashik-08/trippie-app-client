const Register = () => {
  return (
    // <section className="bg-slate/60 min-h-screen flex items-center justify-center">
    <div className="flex items-center justify-center min-h-screen bg-[#d5e8e8]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Welcome to <span className="text-green-500">Trippie</span>
          </h1>
          <div className="flex justify-between items-center mt-2">
            <h2 className="text-3xl font-bold">Sign up</h2>
            <div>
              <span className="text-gray-500">Have an Account ? </span>
              <a href="#" className="text-green-500">
                Sign in
              </a>
            </div>
          </div>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Enter your username or email address
            </label>
            <input
              type="text"
              placeholder="Username or email address"
              className="w-full p-3 border border-green-500 rounded-md"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <label className="block text-gray-700 mb-2">User name</label>
              <input
                type="text"
                placeholder="User name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 mb-2">Contact Number</label>
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Enter your Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-600"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
    // </section>
  );
};

export default Register;
