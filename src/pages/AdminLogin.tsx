import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      navigate("/admin/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-card rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-border animate-slide-up">
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-center text-card-foreground mb-6">Admin Login</h1>
        <Input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          className="mb-4"
        />
        {error && <p className="text-destructive text-sm mb-4 text-center">Invalid password</p>}
        <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold">
          Login
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-4">Default: admin123</p>
      </form>
    </div>
  );
};

export default AdminLogin;
