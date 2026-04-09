import { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { isAdminLoggedIn, adminLogout } from "@/lib/store";
import { LayoutDashboard, Gift, Lock, Settings, LogOut, Home, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Manage Offers", path: "/admin/offers", icon: Gift },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { label: "Content Locker", path: "/admin/locker", icon: Lock },
  { label: "Site Settings", path: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate("/admin");
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-card-foreground">RewardHub</h2>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Home className="w-4 h-4" /> View Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-destructive transition-colors w-full">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
