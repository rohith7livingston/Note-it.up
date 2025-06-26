import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../services/api';
import '../stylesheet/Auth.css'; // Shared CSS

function Register() {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmpassword: ''
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await registerUser(formData);
            alert("Registration Successful! Please log in.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                <h2>Create Your Account</h2>
                <p className="subtitle">Get started with the best notes app.</p>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input type="password" id="confirmpassword" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="switch-auth">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;