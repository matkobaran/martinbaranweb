import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, FolderPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Please log in to access the admin panel.",
        });
        navigate("/");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (!roles || roles.role !== "admin") {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have admin privileges.",
        });
        navigate("/");
        return;
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while checking access.",
      });
      navigate("/");
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Photo Management</h2>
          <div className="space-y-4">
            <Button 
              onClick={() => navigate("/admin/upload")}
              className="w-full"
            >
              <Upload className="mr-2" />
              Upload Photos
            </Button>
          </div>
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Category Management</h2>
          <div className="space-y-4">
            <Button 
              onClick={() => navigate("/admin/categories")}
              className="w-full"
            >
              <FolderPlus className="mr-2" />
              Manage Categories
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;