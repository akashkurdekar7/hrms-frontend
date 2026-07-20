import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Close,
  LocationOn,
  Person,
  Apartment,
} from "@mui/icons-material";
import {
  departmentApi,
  type DepartmentPayload,
} from "../../services/departmentApi";
import type { Department } from "../../services/employeeApi";
import toast from "react-hot-toast";

const emptyForm: DepartmentPayload = {
  name: "",
  location: "",
  manager: "",
};

const gradients = [
  "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
  "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
  "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
  "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
];

const DepartmentPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<DepartmentPayload>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Confirm-delete state
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await departmentApi.getAll();
      setDepartments(res.data);
    } catch {
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  };

  const openEdit = (dept: Department) => {
    setEditingId(dept.id);
    setForm({
      name: dept.name,
      location: dept.location,
      manager: dept.manager,
    });
    setError("");
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await departmentApi.update(editingId, form);
        toast.success("Department updated");
      } else {
        await departmentApi.create(form);
        toast.success("Department created");
      }
      setOpen(false);
      fetchDepartments();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await departmentApi.delete(deleteId);
      toast.success("Department deleted");
      setDeleteId(null);
      fetchDepartments();
    } catch {
      toast.error("Failed to delete department");
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Departments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your organizational structure
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openCreate}
          sx={{
            background: "linear-gradient(135deg, #6366f1, #0ea5e9)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5, #0284c7)",
            },
          }}>
          Add Department
        </Button>
      </Box>

      {/* Department Cards Grid */}
      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Card elevation={0}>
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton
                      variant="rounded"
                      width={48}
                      height={48}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton width="70%" height={24} sx={{ mb: 1 }} />
                    <Skeleton width="50%" height={16} />
                    <Skeleton width="40%" height={16} sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : departments.map((dept, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dept.id}>
                <Card elevation={0}>
                  <CardContent sx={{ p: 3 }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          gradients[idx % gradients.length],
                        color: "#fff",
                        mb: 2,
                      }}>
                      <Apartment />
                    </Box>

                    {/* Name */}
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {dept.name}
                    </Typography>

                    {/* Location */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 0.5,
                      }}>
                      <LocationOn
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {dept.location || "—"}
                      </Typography>
                    </Box>

                    {/* Manager */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 2,
                      }}>
                      <Person
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {dept.manager || "—"}
                      </Typography>
                    </Box>

                    {/* Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-end",
                      }}>
                      <Chip
                        label="Edit"
                        size="small"
                        icon={<Edit sx={{ fontSize: "14px !important" }} />}
                        onClick={() => openEdit(dept)}
                        variant="outlined"
                        color="primary"
                        clickable
                      />
                      <Chip
                        label="Delete"
                        size="small"
                        icon={<Delete sx={{ fontSize: "14px !important" }} />}
                        onClick={() => setDeleteId(dept.id)}
                        variant="outlined"
                        color="error"
                        clickable
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* No departments message */}
      {!loading && departments.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}>
          <Apartment sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
          <Typography variant="h6">No departments yet</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Click "Add Department" to create one
          </Typography>
        </Box>
      )}

      {/* ---- Create / Edit Dialog ---- */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          {editingId ? "Edit Department" : "Add New Department"}
          <IconButton size="small" onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}>
            <TextField
              label="Department Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm((p) => ({ ...p, name: e.target.value }))
              }
            />
            <TextField
              label="Location"
              value={form.location}
              onChange={(e) =>
                setForm((p) => ({ ...p, location: e.target.value }))
              }
            />
            <TextField
              label="Manager"
              value={form.manager}
              onChange={(e) =>
                setForm((p) => ({ ...p, manager: e.target.value }))
              }
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} /> : undefined}>
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---- Delete Confirmation ---- */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        maxWidth="xs"
        fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this department? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteId(null)} color="inherit">
            Cancel
          </Button>
          <Tooltip title="This will also affect related employees">
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentPage;
