import { useState } from "react";

const HomePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch("https://mern-test-app-qj95.vercel.app/api/auth/tester
    try {
      const response = await fetch("https://mern-test-app-qj95.vercel.app/api/auth/tester", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.firstName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("User created successfully!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };



  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomePage;
