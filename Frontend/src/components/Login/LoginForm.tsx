function LoginForm() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <input
        required={true}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-small rounded-lg w-full p-2.5"
        name="email"
        placeholder="user@email.com"
        type="email"
      />
      <input
        required={true}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-small rounded-lg w-full p-2.5"
        name="password"
        placeholder="******"
        type="password"
      />
    </div>
  );
}

export default LoginForm;
